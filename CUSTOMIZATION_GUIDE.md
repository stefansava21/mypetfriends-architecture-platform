# Quick Customization Guide

## 🎯 Most Common Changes

### 1. Change Currency (£ → RON or $)

**File**: `config/settings.ts`

```typescript
regional: {
  currency: "RON",          // or "$", "€"
  currencyCode: "RON",      // or "USD", "EUR"
  locale: "ro-RO",          // or "en-US", "en-GB"
  primaryMarket: "Romania",
},
```

### 2. Update Dates & Version

**File**: `config/settings.ts`

```typescript
document: {
  version: "1.1",
  date: "March 2026",
  lastUpdated: "2026-03-15",
},

roadmap: {
  startDate: "2026-03-01",  // Adjust start date
  quarters: [
    {
      startDate: "2026-03-01",
      endDate: "2026-05-31",
      // ...
    },
  ],
},
```

### 3. Change Target Metrics

**File**: `config/settings.ts`

```typescript
mvp: {
  targetDate: "2026-10-31",
  targetMetrics: {
    policiesSold: 2000,      // Change target
    quoteConversion: "10%",
    claimsSTP: "70%",
    customerNPS: 50,
  },
},
```

### 4. Add a New Component

**File**: `data/architecture.ts`

Find the appropriate layer and add to `components` array:

```typescript
{
  id: "fraud-ml-model",
  name: "Fraud Detection ML Model",
  description: "Real-time fraud scoring using ML",
  category: "AI/ML",
  priority: "P1 - High",
  phase: 2,
  strategicRationale: "Reduce fraud losses",
  businessOutcomes: ["Fraud reduction", "Cost savings"],
  technical: {
    deployment: {
      type: "Container",
      platform: "SageMaker",
    },
  },
  decision: {
    status: "Build",
    recommendation: "Build with SageMaker",
    reasoning: "Custom model for our data",
  },
  security: {
    dataClassification: "Restricted",
    piiHandling: true,
    compliance: ["GDPR"],
  },
  integrations: ["claims-engine"],
  team: "ML Team",
}
```

### 5. Mark a Framework as Selected

**File**: `data/architecture.ts`

Find framework in `agenticFrameworks` array:

```typescript
{
  id: "framework-name",
  // ... other fields
  selected: true,  // Change to false to deselect
  reasoning: "Why we chose this",
  // ...
}
```

### 6. Update Cost Estimates

**File**: `config/settings.ts`

```typescript
costs: {
  currency: "RON",
  engineer: {
    senior: 16000,  // RON per month
    mid: 12000,
    junior: 9000,
  },
  infrastructure: {
    phase1: 4000,   // RON per month
    phase2: 8000,
    phase3: 16000,
  },
},
```

## 🔄 After Making Changes

```bash
# Changes auto-reload in development
# Just refresh your browser at http://localhost:3001

# To rebuild for production
npm run build
```

## 📦 Deploy Changes

```bash
# Deploy to Vercel
npx vercel --prod

# Or build for manual hosting
npm run build
# Upload .next/ folder
```

---

All changes take effect immediately in development mode!
