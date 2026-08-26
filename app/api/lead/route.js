import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PACKAGES } from "@/data/iris-data";
import { calculatePricing } from "@/lib/pricing";

export const runtime = "nodejs";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  if (typeof phone !== "string") return false;
  let digits = phone.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length > 10 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits.length === 10;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, packageId, planIds } = body || {};

    // Validate inputs
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const rawPhone = typeof phone === "string" ? phone.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!isValidPhone(rawPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    let cleanPhone = rawPhone.replace(/\D/g, "");
    if (cleanPhone.length > 10 && cleanPhone.startsWith("91")) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.length > 10 && cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Determine target package(s)
    let selectedIds = [];
    if (Array.isArray(planIds) && planIds.length > 0) {
      selectedIds = planIds;
    } else if (packageId) {
      selectedIds = [packageId];
    }

    if (selectedIds.length === 0) {
      return NextResponse.json(
        { error: "Please select a valid package before submitting." },
        { status: 400 }
      );
    }

    // Validate that selected IDs exist in our package data
    const validPackages = selectedIds
      .map((id) => PACKAGES.find((p) => p.id === id))
      .filter(Boolean);

    if (validPackages.length === 0) {
      return NextResponse.json(
        { error: "Invalid package selection." },
        { status: 400 }
      );
    }

    const pricing = calculatePricing(validPackages.map((p) => p.id));

    // 1. Find existing customer by email, or create new one
    let customer = await prisma.customer.findFirst({
      where: { email: trimmedEmail },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: trimmedName,
          phone: cleanPhone,
          email: trimmedEmail,
        },
      });
    } else {
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          name: trimmedName,
          phone: cleanPhone,
        },
      });
    }

    // 2. Ensure each selected package exists in packages table
    for (const pkg of validPackages) {
      await prisma.package.upsert({
        where: { id: pkg.id },
        update: { name: pkg.name, price: pkg.price },
        create: { id: pkg.id, name: pkg.name, price: pkg.price },
      });
    }

    // 3. Create order record(s) in SQLite orders table with status = "interested"
    const primaryPackage = validPackages[0];
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        packageId: primaryPackage.id,
        status: "interested",
        amount: pricing.total,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: "Your interest has been recorded successfully!",
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    });
  } catch (error) {
    console.error("[api/lead] Error saving lead/order:", error);
    return NextResponse.json(
      { error: "Failed to process submission. Please try again." },
      { status: 500 }
    );
  }
}
