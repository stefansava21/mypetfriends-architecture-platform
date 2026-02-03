# MyPetFriends Architecture Platform

Interactive architecture visualization for board presentations, technical due diligence, and investor meetings.

## Quick Start

```bash
npm run dev          # Development (http://localhost:3001)
npm run build        # Production build
npx vercel --prod    # Deploy to Vercel
```

## Pages

- **/** - Strategic overview, differentiators, roadmap preview
- **/architecture** - 5 layers, 33 components, interactive exploration
- **/agentic-ai** - Multi-agent platform, 14 frameworks evaluated
- **/roadmap** - 3-quarter plan (Q1-Q3 2026) to 1,000 policies
- **/decisions** - Build vs Buy matrix with TCO analysis
- **/integrations** - Key third-party integrations

## Customization (No Code Changes Required)

### Update Dates/Currency/Metrics
Edit **`config/settings.ts`**:

```typescript
regional: {
  currency: "RON",        // Change to $, €, RON
  currencyCode: "RON",
  locale: "ro-RO",
},

document: {
  version: "1.1",         // Update version
  date: "March 2026",
  lastUpdated: "2026-03-15",
},

roadmap: {
  startDate: "2026-02-01", // Adjust timeline
  quarters: [...],         // Edit milestones
},

metrics: {
  phase1: {
    quoteConversion: "8%", // Update targets
    timeToQuote: "60s",
  },
},
```

### Modify Components/Frameworks
Edit **`data/architecture.ts`**:
- Add/remove components
- Update build vs buy decisions
- Change SaaS options and costs
- Mark frameworks as selected/not selected

## Presenting to Stakeholders

**Board Advisors**: Homepage → Roadmap → Build vs Buy
**Solution Architects**: Architecture (all 33 components) → Agentic AI → Integrations
**AI Specialists**: Agentic AI (frameworks, evaluation, HITL) → Architecture
**Investors**: Homepage (differentiators) → Roadmap (metrics) → Decisions (TCO)

## Tech Stack

Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons

## Key Features

✅ Enterprise-grade design
✅ Fully responsive
✅ Production-ready
✅ Static generation (fast loading)
✅ Easy customization via config files

---

All data centralized in `config/settings.ts` and `data/architecture.ts`
