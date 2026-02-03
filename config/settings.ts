// Global configuration for MyPetFriends Architecture Platform
// All adjustable variables are centralized here for easy maintenance

export const config = {
  // Company Information
  company: {
    name: "MyPetFriends",
    tagline: "Insurtech MGA",
    description: "AI-Native Pet Insurance Platform",
    website: "https://mypetfriends.com",
  },

  // Document Metadata
  document: {
    version: "1.0",
    date: "February 2026",
    classification: "Confidential – Internal Use Only",
    lastUpdated: "2026-02-03",
  },

  // Regional Settings
  regional: {
    currency: "£",
    currencyCode: "GBP",
    locale: "en-GB",
    timezone: "Europe/Bucharest",
    primaryMarket: "Romania",
  },

  // Brand Colors
  brand: {
    colors: {
      primary: "#07a9ae",      // Teal
      secondary: "#ff6600",    // Orange
      accent: "#008994",       // Darker Teal
      accentOrange: "#ec5a00", // Darker Orange
      light: "#f8f8f8",        // Light Gray
      dark: "#1a1a1a",         // Dark
      white: "#ffffff",

      // Semantic colors
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    gradients: {
      primary: "linear-gradient(135deg, #07a9ae 0%, #008994 100%)",
      secondary: "linear-gradient(135deg, #ff6600 0%, #ec5a00 100%)",
      ai: "linear-gradient(135deg, #07a9ae 0%, #ff6600 50%, #ec5a00 100%)",
    },
  },

  // Roadmap Timeline (3 Quarters to MVP)
  roadmap: {
    startDate: "2026-02-01",

    quarters: [
      {
        id: "q1-2026",
        name: "Q1 2026",
        label: "Foundation & Core Platform",
        startDate: "2026-02-01",
        endDate: "2026-04-30",
        duration: "3 months",
        themes: ["Infrastructure", "Core Quote Engine", "Basic Claims"],
        keyMilestones: [
          "Cloud infrastructure deployed",
          "CI/CD pipelines operational",
          "Quote-to-bind MVP live",
          "Payment integration complete",
        ],
      },
      {
        id: "q2-2026",
        name: "Q2 2026",
        label: "Intelligence & Automation",
        startDate: "2026-05-01",
        endDate: "2026-07-31",
        duration: "3 months",
        themes: ["AI/ML Models", "Claims Automation", "Data Platform"],
        keyMilestones: [
          "Pricing engine ML models deployed",
          "Claims OCR & auto-adjudication live",
          "Data warehouse operational",
          "A/B testing framework deployed",
        ],
      },
      {
        id: "q3-2026",
        name: "Q3 2026",
        label: "Agentic AI & Market Launch",
        startDate: "2026-08-01",
        endDate: "2026-10-31",
        duration: "3 months",
        themes: ["Agentic Framework", "Customer Experience", "Go-to-Market"],
        keyMilestones: [
          "Quote & Claims agents live",
          "Multi-agent orchestration deployed",
          "Customer portal & mobile app launched",
          "First 1,000 policies sold",
        ],
      },
    ],

    // MVP Definition
    mvp: {
      targetDate: "2026-10-31",
      targetMetrics: {
        policiesSold: 1000,
        quoteConversion: "8%",
        claimsSTP: "60%",
        customerNPS: 40,
        systemUptime: "99.5%",
      },
    },
  },

  // Target Metrics & KPIs
  metrics: {
    // Phase 1 (Q1) Targets
    phase1: {
      quoteConversion: "5%",
      timeToQuote: "90s",
      underwritingSTP: "60%",
      claimsFNOLToDecision: "72h",
      platformUptime: "99.0%",
      deploymentFrequency: "Weekly",
    },

    // Phase 2 (Q2) Targets
    phase2: {
      quoteConversion: "8%",
      timeToQuote: "60s",
      underwritingSTP: "75%",
      claimsFNOLToDecision: "24h",
      claimsAutoAdjudication: "30%",
      platformUptime: "99.5%",
      deploymentFrequency: "2-3x/week",
    },

    // Phase 3 (Q3 - MVP) Targets
    phase3: {
      quoteConversion: "10%",
      timeToQuote: "45s",
      underwritingSTP: "85%",
      claimsFNOLToDecision: "8h",
      claimsAutoAdjudication: "50%",
      customerNPS: 40,
      platformUptime: "99.7%",
      deploymentFrequency: "Daily",
      experimentVelocity: "2/month",
    },

    // Long-term (12-18 months) Targets
    longTerm: {
      quoteConversion: "15%",
      timeToQuote: "30s",
      underwritingSTP: "90%",
      claimsFNOLToDecision: "4h",
      claimsAutoAdjudication: "60%",
      customerNPS: 60,
      platformUptime: "99.9%",
      deploymentFrequency: "Multiple/day",
      experimentVelocity: "4+/month",
      customerRetention12mo: "85%",
    },
  },

  // Team Structure (for roadmap planning)
  team: {
    phase1: {
      headcount: 8,
      roles: ["CTO", "Senior Backend Engineer", "Frontend Lead", "Platform Engineer", "Product Manager", "QA Engineer"],
    },
    phase2: {
      headcount: 12,
      roles: ["+ ML Engineer", "+ Data Engineer", "+ Backend Engineer", "+ Mobile Engineer"],
    },
    phase3: {
      headcount: 16,
      roles: ["+ AI/Agent Engineer", "+ UX Designer", "+ DevOps Engineer", "+ Claims Product Specialist"],
    },
  },

  // Cost Estimates (for build vs buy decisions)
  costs: {
    currency: "£",

    // Engineer costs (fully loaded, per month)
    engineer: {
      senior: 8000,
      mid: 6000,
      junior: 4500,
    },

    // Infrastructure baseline (monthly)
    infrastructure: {
      phase1: 2000,
      phase2: 4000,
      phase3: 8000,
    },

    // SaaS budget estimates (monthly)
    saasBaseline: {
      phase1: 3000,
      phase2: 6000,
      phase3: 10000,
    },
  },

  // Technical Thresholds (for HITL, auto-adjudication, etc.)
  thresholds: {
    claims: {
      autoAdjudicationLimit: 500,  // in currency
      fraudScoreThreshold: 0.7,
      agentConfidenceThreshold: 0.6,
    },

    agents: {
      maxConversationTurns: 15,
      escalationTimeout: 300, // seconds
      qualityScoreMinimum: 0.8,
    },
  },
} as const;

// Type exports for TypeScript autocomplete
export type Config = typeof config;
export type Roadmap = typeof config.roadmap;
export type Metrics = typeof config.metrics;
