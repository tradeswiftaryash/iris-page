// ---------------------------------------------------------------------------
// Content for the IRIS (Investment and Research Intelligence Services) page.
// Copy is sourced verbatim from the client-provided Figma file and the
// FAQ.docx / Fianl.xlsx uploads — kept in one place so the page components
// stay presentational and the content can be edited without touching JSX.
// ---------------------------------------------------------------------------

export const HERO = {
  eyebrow: "Research & Advisory",
  title: "Investment and Research Intelligence Services (IRIS)",
  description:
    "IRIS is designed to provide investors/traders with timely, data-driven and actionable market data points and inputs to support better investment decisions. The service has three subscription models — Fundamental, Technical and Option Strategies. With a focus on quality research, disciplined analysis and practical insights, IRIS helps investors/traders cut through market noise and provides high-conviction trading ideas.",
  primaryCta: { label: "See Our Packages", href: "#packages" }, // "button 1"
  secondaryCta: { label: "Know More", href: "#our-plans" }, // "button 3"
  badge: "SEBI Registered Research Analyst",
};

// "OUR PLANS" — the three descriptive cards (Figma: Rectangle 4 / 5 / 6)
export const PLANS = [
  {
    id: "fundamental",
    name: "Fundamental",
    tagline:
      "The service empowers confident, informed decision-making, providing valuable insights to support your journey toward sustainable wealth creation and long-term financial growth.",
    benefitsTitle: "Benefits: Fundamentals",
    benefits: [
      "Fundamentally sound stock picks — curated for long-term portfolio growth and wealth creation",
      "Regular fundamental market updates — key developments and their impact on your holdings",
      "News and article analysis — expert interpretation of market-moving events and reports",
      "Webinars — live sessions on fundamental analysis, portfolio strategy, and market outlook",
      "Sector and industry insights — spotting emerging themes and rotation opportunities",
      "Quarterly earnings analysis — breakdown of company results and their portfolio implications",
    ],
  },
  {
    id: "technical",
    name: "Technical",
    tagline:
      "Get ahead of the markets with high-conviction short-term trading and investment ideas designed to help you make informed decisions and maximize short-term opportunities.",
    benefitsTitle: "Benefits: Technicals",
    benefits: [
      "Smart capital allocation — every trade sized and risk-managed with discipline",
      "Quality over quantity — no impulsive entries, no overtrading; only high-conviction setups",
      "Balanced trade mix — a calculated split between intraday and positional strategies",
      "Short-term return focus — capturing near-term market opportunities efficiently",
      "Timely market insights — consistent updates to keep you ahead of price action",
      "Live webinars — interactive sessions for deeper strategy discussion and market outlook",
    ],
  },
  {
    id: "option-strategy",
    name: "Option Strategy",
    tagline:
      "Get well-researched and curated, all-season options strategies and timely market updates designed to help you navigate volatility, manage risk, and stay ahead of the market.",
    benefitsTitle: "Benefits: Option Strategies",
    benefits: [
      "Return-based option strategies — structured trades designed around defined risk-reward outcomes",
      "Live market analysis — real-time reads on price action to guide strategy adjustments",
      "OI (Open Interest) analysis — deeper insight into market positioning and sentiment",
      "Mid-session live webinars on expiry day — real-time guidance during high-volatility expiry sessions",
      "Educational material — curated resources to strengthen your options trading fundamentals",
      "Post-market webinars — daily wrap-up sessions covering key moves and next-day setup",
    ],
  },
];

// "OUR PACKAGES" — pricing / comparison table (Fianl.xlsx, Sheet1)
export const PACKAGES = [
  {
    id: "fundamental",
    name: "Fundamental",
    price: 50000, // INR, excl. GST
    columns: ["Positional", "Short", "Medium", "Long Term", "Special Situation"],
    rows: [
      { label: "No. of Calls (Monthly)", values: ["3 - 5", "2 - 5", "1 - 3", "1 - 3", "1 per event"] },
      { label: "Stop Loss", values: ["3 - 7%", "5 - 10%", "5 - 10%", "5 - 20%", "2 - 5%"] },
      { label: "Target", values: ["5 - 15%", "5 - 15%", "10 - 20%", "15 - 50%", "5 - 15%"] },
      { label: "Duration", values: ["1 - 3 Months", "1 - 6 Months", "3 - 12 Months", "12 - 24 Months", "As per situation"] },
      { label: "Call Flash Mode", values: ["Cash Level", "Cash Level", "Cash Level", "Cash Level", "As per situation"] },
      { label: "Buy/Sell", values: ["Buy Only", "Buy Only", "Buy Only", "Buy Only", "Buy & Sell"] },
    ],
    desirableAmount: "5 Lakhs",
  },
  {
    id: "technical",
    name: "Technicals",
    price: 40000,
    columns: ["Intraday", "BTST/STBT", "Medium to Long Term", "Momentum Trades"],
    rows: [
      { label: "No. of Calls (Monthly)", values: ["30 - 80", "5 - 15", "0 - 2", "20 - 30"] },
      { label: "Stop Loss", values: ["1 - 3%", "2 - 3%", "7 - 15%", "2 - 5%"] },
      { label: "Target", values: ["1 - 5%", "3 - 6%", "15 - 30%", "5 - 10%"] },
      { label: "Duration", values: ["1 Day", "Overnight", "4 - 12 Months", "5 - 20 Days"] },
      { label: "Call Flash Mode", values: ["Cash/Future", "Cash/Future", "Cash", "Cash"] },
      { label: "Buy/Sell", values: ["Buy/Sell", "Buy/Sell", "Buy Only", "Buy Only"] },
    ],
    desirableAmount: "5 Lakhs",
  },
  {
    id: "option-strategy",
    name: "Option Strategy",
    price: 30000,
    columns: ["Index Options", "Stock Options", "Option + Futures"],
    rows: [
      { label: "No. of Calls (Monthly)", values: ["10 - 20", "5 - 6", "1 - 3"] },
      { label: "Stop Loss (On Margin)", values: ["2 - 5%", "4 - 5%", "4 - 5%"] },
      { label: "Target (On Margin)", values: ["2 - 10%", "5 - 10%", "5 - 10%"] },
      { label: "Duration", values: ["1 Week - 1 Month", "2 - 10 Days", "2 - 10 Days"] },
      { label: "Index/Stock Covered", values: ["All Traded Index", "Liquid Stocks", "Index + Liquid Stocks"] },
      { label: "Margin Required", values: ["6 Lakhs", "2 Lakhs", "2 Lakhs"] },
    ],
    desirableAmount: "10 Lakhs",
  },
];

export const COMBO_DISCOUNTS = {
  2: 0.15, // Combine any 2 subscriptions — 15% off
  3: 0.25, // Combine all 3 subscriptions — 25% off
};

export const GST_RATE = 0.18; // "Charges Exclude GST — GST Rate 18%"

// FAQ.docx — "Tradeswift Research – Frequently Asked Questions"
export const FAQS = [
  {
    q: "What is Tradeswift Research?",
    a: "Tradeswift Research provides research-based market insights and recommendations to investors and market participants. The research services are provided in accordance with the applicable regulatory framework governing SEBI-registered Research Analysts.",
  },
  {
    q: "Is Tradeswift SEBI registered?",
    a: "Yes. Tradeswift's Research Analyst activities are undertaken under its SEBI registration. The applicable SEBI registration details, disclosures and Investor Charter are available on our website.",
  },
  {
    q: "What type of research does Tradeswift provide?",
    a: "Depending on the subscription/service selected, research may cover different segments and strategies, including long-term investment ideas, short-term trading opportunities, positional opportunities and other securities-market research. The nature and scope of recommendations will depend on the particular research product subscribed.",
  },
  {
    q: "Is Tradeswift's Research service the same as its stock broking service?",
    a: "No. Research services and stock broking/execution services are distinct activities. The Research Analyst provides research and recommendations, whereas the stock broker provides brokerage and execution-related services to clients who maintain the relevant trading account. A research recommendation does not constitute an instruction to execute a trade, and the final investment or trading decision remains with the investor.",
  },
  {
    q: "What are the paid Telegram research channels?",
    a: "Paid Telegram channels are subscription-based research services through which subscribers receive research recommendations and market updates according to the specific objective and scope of the selected channel. The features, nature of recommendations and coverage may differ between channels.",
  },
  {
    q: "Who provides the research recommendations?",
    a: "Research recommendations are generated and disseminated by the Tradeswift Research team in accordance with the applicable research process and regulatory requirements. Recommendations include parameters such as entry price, target price and stop-loss.",
  },
  {
    q: "Are returns or profits guaranteed?",
    a: "No. Tradeswift does not guarantee or assure any return, profit, accuracy or outcome from any research recommendation. Investment and trading in securities are subject to market risks, and actual performance may differ materially from the expected outcome of a recommendation.",
  },
  {
    q: "What is the maximum risk in a recommendation?",
    a: "There is no universally applicable maximum loss for a market recommendation. Risk depends on factors such as the security, market conditions, volatility, position size, entry price and execution price. Tradeswift provides stop-loss levels as part of a recommendation. Investors should independently assess their risk tolerance and position sizing before acting on any recommendation.",
  },
  {
    q: "Can I lose money even if I follow the recommendation exactly?",
    a: "Yes. Market movements, volatility, liquidity, gaps and execution conditions can result in losses even when a recommendation is followed as communicated. Past performance of any recommendation or strategy should not be considered indicative of future results.",
  },
  {
    q: "Why should I subscribe to a Tradeswift Research channel?",
    a: "Subscribers may receive research-based market opportunities, timely research updates, entry/target/stop-loss parameters, market commentary and updates, access to selected webinars or analyst interactions (depending on the subscription), and a structured research framework for evaluating market opportunities. Research services are intended to assist investors in making informed decisions and should not be construed as a guarantee of profits.",
  },
  {
    q: "Do I have to be a client of Tradeswift Broking to subscribe to Research?",
    a: "No. A person may subscribe to the Research service without maintaining a broking relationship with Tradeswift. The Research service and brokerage/execution services are separate.",
  },
  {
    q: "If I am a Tradeswift Broking client, will I receive different research recommendations?",
    a: "The research service is intended to be available on the same basis to eligible subscribers irrespective of whether they maintain a broking relationship with Tradeswift.",
  },
  {
    q: "Can Tradeswift execute trades on my behalf based on the research call?",
    a: "A research recommendation by itself does not constitute an instruction to execute a transaction. The subscriber can separately use Tradeswift's brokerage services — the trade is executed only on the basis of the client's valid instructions and applicable brokerage processes.",
  },
  {
    q: "How many research calls will I receive?",
    a: "There is no fixed or guaranteed number of recommendations. Tradeswift focuses on the quality and suitability of research opportunities rather than targeting a predetermined number of calls. The frequency will therefore depend on market conditions and the availability of opportunities that meet the relevant research criteria.",
  },
  {
    q: "What will be the mix of calls?",
    a: "The call mix depends on the service pack you wish to subscribe to. The mix will also depend on market conditions and the opportunities identified through the research process. Different research products may focus on different investment horizons, securities or strategies, and there is no assurance that a particular category of recommendation will be issued with a predetermined frequency.",
  },
  {
    q: "Will calls be issued at fixed times?",
    a: "No. Research recommendations may be communicated when a relevant market opportunity is identified. The timing and frequency of recommendations may therefore vary depending on market conditions.",
  },
  {
    q: "Are there days when no recommendations may be issued?",
    a: "Yes. If no opportunity meets the relevant research criteria, Tradeswift may choose not to issue a recommendation. The absence of a recommendation should not be interpreted as a lack of market activity.",
  },
  {
    q: "Is there a trial period?",
    a: "Currently, Tradeswift does not offer a trial period for its paid Research services. Investors may review the publicly available research content and disclosures before deciding whether to subscribe.",
  },
  {
    q: "What subscription periods are available?",
    a: "Currently, Tradeswift offers annual subscription plans for its paid Research services. The available plans, pricing and features are subject to change.",
  },
  {
    q: "How do I subscribe?",
    a: (
      <>
        You may contact Tradeswift through the official contact details provided on our website or submit your details on the registration portal (
        <a href="#packages" className="font-semibold text-brand-blue hover:underline">
          click here
        </a>
        ). Our authorised team will explain the available Research services, applicable fees and subscription process.
      </>
    ),
  },
  {
    q: "Should I invest my entire capital based on Tradeswift's recommendations?",
    a: "No. Investors should consider appropriate diversification and position sizing and should not commit their entire capital to a single security, strategy or recommendation. The amount invested should be consistent with the investor's own risk tolerance and financial circumstances.",
  },
  {
    q: "Does SEBI registration mean that my investment is safe?",
    a: "No. SEBI registration signifies that the Research Analyst is registered with SEBI and is subject to the applicable regulatory framework. It does not mean that SEBI has approved or guaranteed any particular recommendation, security, return or investment outcome.",
  },
  {
    q: "Does Tradeswift have any financial interest in the securities it researches?",
    a: "Tradeswift maintains the disclosures required under the applicable regulatory framework. Where required, relevant financial interests, conflicts of interest and other material disclosures are disclosed along with the research recommendation/report.",
  },
  {
    q: "Does Tradeswift's broking business influence its research recommendations?",
    a: "Research recommendations are required to be prepared and disseminated in accordance with the applicable regulatory framework and internal policies governing research activities. The existence of a separate broking business does not mean that a client is required to execute a trade based on a research recommendation.",
  },
];

export const CONTACT = {
  heading: "Ready for subscription?",
  body: "Talk to our Research specialists today. We'll guide you through the onboarding process, understand your goals and craft a personalised research subscription.",
  cta: { label: "Subscribe Now", href: "#packages" },
  whatsapp: "+91 9460450505",
  landline: "0141-4050517",
  email: "advisory@tradeswift.net",
  address: "4th Floor, Baid House, 1, Tara Nagar, Ajmer Road, Jaipur",
};
