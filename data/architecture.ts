// Architecture Data Model
// All layers, components, integrations, and technical specifications

export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: 'P0 - Critical' | 'P1 - High' | 'P2 - Medium' | 'P3 - Low';
  phase: 1 | 2 | 3 | 4;

  // Strategic rationale
  strategicRationale: string;
  businessOutcomes: string[];

  // Technical details
  technical: {
    deployment: {
      type: 'Serverless' | 'Container' | 'Managed Service' | 'SaaS';
      platform?: string; // e.g., "AWS Lambda", "ECS Fargate", "Vercel"
      scaling?: string;
      availability?: string;
    };
    stack?: {
      language?: string;
      framework?: string;
      database?: string;
      other?: string[];
    };
    apis?: string[];
    events?: string[];
  };

  // Build vs Buy decision
  decision: {
    status: 'Undecided' | 'Build' | 'SaaS' | 'Hybrid';
    recommendation: string;
    reasoning: string;

    buildOption?: {
      estimatedCost: number; // in currency per month
      timeToImplement: string;
      teamSize: number;
      pros: string[];
      cons: string[];
      risks: string[];
    };

    saasOptions?: Array<{
      name: string;
      vendor: string;
      website: string;
      pricing: string;
      fitScore: number; // 1-10
      pros: string[];
      cons: string[];
      integrationComplexity: 'Low' | 'Medium' | 'High';
    }>;

    tco3Year?: {
      build: number;
      saas: number;
    };
  };

  // Security & Compliance
  security: {
    dataClassification: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
    piiHandling: boolean;
    compliance: string[]; // e.g., ["GDPR", "Insurance Regulation"]
  };

  // Integration points
  integrations: string[]; // IDs of other components

  // Team ownership
  team: string;
}

export interface Layer {
  id: string;
  name: string;
  description: string;
  color: string;
  order: number;
  components: Component[];
}

export interface AgenticFramework {
  id: string;
  name: string;
  category: 'Orchestration' | 'LLM Provider' | 'Framework' | 'Tool' | 'Memory' | 'Observability';
  description: string;
  website: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  selected: boolean;
  reasoning?: string;
  license: string;
  maturity: 'Production' | 'Beta' | 'Experimental';
}

// Export the full architecture data
export const architectureData: Layer[] = [
  {
    id: 'experience',
    name: 'Experience Layer',
    description: 'All customer & internal touchpoints',
    color: '#ff6600',
    order: 1,
    components: [
      {
        id: 'web-app',
        name: 'Customer Web Application',
        description: 'Primary customer-facing web app for quoting, policy management, and claims',
        category: 'Frontend',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Direct customer acquisition channel and self-service portal',
        businessOutcomes: ['Customer acquisition', 'Reduce support costs', 'Improve NPS'],
        technical: {
          deployment: {
            type: 'Serverless',
            platform: 'Vercel Edge Network',
            scaling: 'Auto-scaling based on traffic',
            availability: '99.99% (Vercel SLA)',
          },
          stack: {
            language: 'TypeScript',
            framework: 'Next.js 15 (React, App Router)',
            other: ['Tailwind CSS', 'Framer Motion', 'React Query', 'Zustand'],
          },
          apis: ['Quote API', 'Policy API', 'Claims API', 'Auth API'],
          events: ['quote_started', 'policy_purchased', 'claim_submitted'],
        },
        decision: {
          status: 'Build',
          recommendation: 'Build in-house',
          reasoning: 'Core brand experience and competitive differentiator. Full control over UX and experimentation required.',
          buildOption: {
            estimatedCost: 12000,
            timeToImplement: '8 weeks (Phase 1 MVP)',
            teamSize: 3,
            pros: ['Full control', 'Custom UX', 'Fast iteration', 'No vendor lock-in'],
            cons: ['Requires ongoing maintenance', 'Team needed'],
            risks: ['Hiring delays', 'UX expertise required'],
          },
          tco3Year: {
            build: 450000,
            saas: 0,
          },
        },
        security: {
          dataClassification: 'Confidential',
          piiHandling: true,
          compliance: ['GDPR', 'Web Accessibility WCAG 2.1 AA'],
        },
        integrations: ['api-gateway', 'auth-service', 'analytics-platform'],
        team: 'Experience Team',
      },
      {
        id: 'mobile-app',
        name: 'Mobile Application',
        description: 'iOS & Android native apps for claims submission and policy management',
        category: 'Frontend',
        priority: 'P1 - High',
        phase: 3,
        strategicRationale: 'Mobile-first claims experience (photo upload, document capture)',
        businessOutcomes: ['Faster FNOL', 'Better claims UX', 'Customer engagement'],
        technical: {
          deployment: {
            type: 'Managed Service',
            platform: 'App Store & Google Play',
            scaling: 'Client-side',
          },
          stack: {
            language: 'TypeScript / Dart',
            framework: 'React Native or Flutter',
            other: ['Expo (if React Native)', 'Push notifications'],
          },
          apis: ['Quote API', 'Claims API', 'Policy API'],
        },
        decision: {
          status: 'Undecided',
          recommendation: 'Delay to Phase 3, evaluate React Native vs Flutter',
          reasoning: 'Not critical for MVP. Can start with responsive web app. Decide based on team skills.',
          buildOption: {
            estimatedCost: 14000,
            timeToImplement: '12 weeks',
            teamSize: 2,
            pros: ['Better UX than mobile web', 'Push notifications', 'Offline capability'],
            cons: ['App store approval delays', 'Platform-specific bugs', 'Maintenance overhead'],
            risks: ['Team lacks mobile experience', 'Dual platform complexity'],
          },
        },
        security: {
          dataClassification: 'Confidential',
          piiHandling: true,
          compliance: ['GDPR', 'Mobile security best practices'],
        },
        integrations: ['api-gateway', 'auth-service', 'push-notification-service'],
        team: 'Experience Team',
      },
      {
        id: 'cms',
        name: 'Headless CMS',
        description: 'Content management for marketing pages, blog, FAQs, and educational content',
        category: 'Content',
        priority: 'P2 - Medium',
        phase: 2,
        strategicRationale: 'Enable non-technical team to manage content, drive SEO',
        businessOutcomes: ['Marketing agility', 'SEO performance', 'Customer education'],
        technical: {
          deployment: {
            type: 'SaaS',
            platform: 'Contentful / Sanity',
            scaling: 'Managed by vendor',
            availability: '99.95%',
          },
          stack: {
            other: ['GraphQL API', 'Webhooks for cache invalidation'],
          },
          apis: ['CMS GraphQL API'],
        },
        decision: {
          status: 'SaaS',
          recommendation: 'Use Sanity.io',
          reasoning: 'Commoditized capability. Building CMS is poor use of eng time. Sanity has great DX and is cost-effective.',
          saasOptions: [
            {
              name: 'Sanity',
              vendor: 'Sanity.io',
              website: 'https://www.sanity.io',
              pricing: '£0-199/mo (usage-based)',
              fitScore: 9,
              pros: ['Excellent DX', 'Flexible schema', 'Real-time collaboration', 'Affordable'],
              cons: ['Learning curve for content team', 'Query complexity'],
              integrationComplexity: 'Low',
            },
            {
              name: 'Contentful',
              vendor: 'Contentful',
              website: 'https://www.contentful.com',
              pricing: '£239-879/mo',
              fitScore: 8,
              pros: ['Mature', 'Great UI', 'Large ecosystem'],
              cons: ['More expensive', 'Enterprise-focused'],
              integrationComplexity: 'Low',
            },
          ],
          tco3Year: {
            build: 180000,
            saas: 7200,
          },
        },
        security: {
          dataClassification: 'Public',
          piiHandling: false,
          compliance: [],
        },
        integrations: ['web-app'],
        team: 'Experience Team',
      },
    ],
  },

  {
    id: 'orchestration',
    name: 'Orchestration Layer',
    description: 'Business process management, routing, experimentation',
    color: '#ec5a00',
    order: 2,
    components: [
      {
        id: 'api-gateway',
        name: 'API Gateway',
        description: 'Centralized entry point for all API requests with auth, rate limiting, and routing',
        category: 'Infrastructure',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Security, observability, and traffic management at the edge',
        businessOutcomes: ['API security', 'Rate limiting', 'Versioning', 'Observability'],
        technical: {
          deployment: {
            type: 'Managed Service',
            platform: 'AWS API Gateway or Kong',
            scaling: 'Auto-scaling, handles millions of requests',
            availability: '99.95%',
          },
          stack: {
            other: ['OpenAPI 3.0 specs', 'OAuth 2.0 / OIDC'],
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'AWS API Gateway for Phase 1, evaluate Kong if more control needed',
          reasoning: 'Managed service reduces operational overhead. Kong offers more flexibility but requires maintenance.',
          saasOptions: [
            {
              name: 'AWS API Gateway',
              vendor: 'AWS',
              website: 'https://aws.amazon.com/api-gateway',
              pricing: '£3-4/million requests',
              fitScore: 8,
              pros: ['Fully managed', 'Tight AWS integration', 'Auto-scaling', 'Low ops'],
              cons: ['AWS lock-in', 'Limited customization', 'Can get expensive at scale'],
              integrationComplexity: 'Low',
            },
            {
              name: 'Kong Gateway',
              vendor: 'Kong Inc',
              website: 'https://konghq.com',
              pricing: '£0 (OSS) or £500+/mo (Enterprise)',
              fitScore: 7,
              pros: ['Flexible', 'Plugin ecosystem', 'Multi-cloud', 'Open source option'],
              cons: ['Requires infrastructure', 'More ops overhead', 'Team learning curve'],
              integrationComplexity: 'Medium',
            },
          ],
        },
        security: {
          dataClassification: 'Internal',
          piiHandling: false,
          compliance: ['API security best practices', 'OAuth 2.0'],
        },
        integrations: ['all-backend-services'],
        team: 'Platform Team',
      },
      {
        id: 'feature-flags',
        name: 'Feature Flag & Experimentation Service',
        description: 'A/B testing, feature toggles, and gradual rollouts',
        category: 'Experimentation',
        priority: 'P1 - High',
        phase: 2,
        strategicRationale: 'Enable rapid experimentation and safe deployments',
        businessOutcomes: ['Fast iteration', 'Risk mitigation', 'Data-driven decisions'],
        technical: {
          deployment: {
            type: 'SaaS',
            platform: 'LaunchDarkly / Flagsmith',
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'Use Flagsmith (open-source, self-hostable)',
          reasoning: 'Core capability for experimentation culture. SaaS is faster than building. Flagsmith offers good balance of features and cost.',
          saasOptions: [
            {
              name: 'Flagsmith',
              vendor: 'Flagsmith',
              website: 'https://www.flagsmith.com',
              pricing: '£0 (OSS) or £150+/mo (Cloud)',
              fitScore: 9,
              pros: ['Open source', 'Self-host option', 'Affordable', 'Good DX'],
              cons: ['Smaller ecosystem than LaunchDarkly', 'Fewer enterprise features'],
              integrationComplexity: 'Low',
            },
            {
              name: 'LaunchDarkly',
              vendor: 'LaunchDarkly',
              website: 'https://launchdarkly.com',
              pricing: '£750+/mo',
              fitScore: 7,
              pros: ['Market leader', 'Enterprise features', 'Excellent support'],
              cons: ['Expensive', 'Overkill for startup phase'],
              integrationComplexity: 'Low',
            },
          ],
        },
        security: {
          dataClassification: 'Internal',
          piiHandling: false,
          compliance: [],
        },
        integrations: ['web-app', 'backend-services'],
        team: 'Platform Team',
      },
      {
        id: 'workflow-engine',
        name: 'Workflow Engine',
        description: 'Orchestrate multi-step business processes (renewals, MTAs, claims)',
        category: 'Business Logic',
        priority: 'P2 - Medium',
        phase: 2,
        strategicRationale: 'Complex stateful processes require orchestration (e.g., claims lifecycle)',
        businessOutcomes: ['Process consistency', 'Visibility', 'Automation'],
        technical: {
          deployment: {
            type: 'Container',
            platform: 'ECS Fargate',
          },
          stack: {
            framework: 'Temporal / Camunda',
          },
        },
        decision: {
          status: 'Undecided',
          recommendation: 'Delay to Phase 2. Evaluate Temporal (code-first) vs simpler state machines',
          reasoning: 'Not needed for MVP. Many workflows can be event-driven. Add when complexity warrants.',
          buildOption: {
            estimatedCost: 4000,
            timeToImplement: '4 weeks (integration)',
            teamSize: 1,
            pros: ['Visibility into processes', 'Retry/error handling', 'Audit trail'],
            cons: ['Additional complexity', 'Team learning curve'],
            risks: ['Over-engineering for simple flows'],
          },
          saasOptions: [
            {
              name: 'Temporal Cloud',
              vendor: 'Temporal',
              website: 'https://temporal.io',
              pricing: '£200+/mo',
              fitScore: 8,
              pros: ['Code-first', 'Strong guarantees', 'Active development'],
              cons: ['Steep learning curve', 'Relatively new'],
              integrationComplexity: 'Medium',
            },
          ],
        },
        security: {
          dataClassification: 'Internal',
          piiHandling: false,
          compliance: [],
        },
        integrations: ['policy-admin', 'claims-engine', 'event-bus'],
        team: 'Platform Team',
      },
    ],
  },

  {
    id: 'domain-services',
    name: 'Domain Services Layer',
    description: 'Core insurance business logic',
    color: '#07a9ae',
    order: 3,
    components: [
      {
        id: 'quote-engine',
        name: 'Quote & Underwriting Engine',
        description: 'Dynamic questionnaire, risk assessment, and real-time pricing',
        category: 'Core Business',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Revenue generation - every quote is a potential customer',
        businessOutcomes: ['Customer acquisition', 'Conversion optimization', 'STP rate'],
        technical: {
          deployment: {
            type: 'Container',
            platform: 'ECS Fargate',
            scaling: 'Auto-scaling (CPU-based)',
            availability: '99.9% target',
          },
          stack: {
            language: 'TypeScript (Node.js)',
            framework: 'NestJS',
            database: 'PostgreSQL (Aurora)',
            other: ['Redis (caching)', 'OpenAPI'],
          },
          apis: ['/quote/start', '/quote/calculate', '/quote/bind'],
          events: ['quote.created', 'quote.calculated', 'quote.bound'],
        },
        decision: {
          status: 'Build',
          recommendation: 'Build in-house',
          reasoning: 'Core IP and competitive differentiator. Pricing logic is strategic. Off-the-shelf solutions are rigid and expensive.',
          buildOption: {
            estimatedCost: 18000,
            timeToImplement: '10 weeks',
            teamSize: 3,
            pros: ['Full control', 'Fast iteration', 'Custom logic', 'IP ownership'],
            cons: ['Requires actuarial collaboration', 'Complex domain'],
            risks: ['Actuarial model accuracy', 'Regulatory compliance'],
          },
          tco3Year: {
            build: 650000,
            saas: 1200000,
          },
        },
        security: {
          dataClassification: 'Confidential',
          piiHandling: true,
          compliance: ['GDPR', 'Insurance regulation', 'Actuarial standards'],
        },
        integrations: ['pricing-engine', 'policy-admin', 'api-gateway'],
        team: 'Quoting & Underwriting Team',
      },
      {
        id: 'pricing-engine',
        name: 'Pricing Engine',
        description: 'ML-based risk pricing with A/B testing and champion/challenger models',
        category: 'Core Business',
        priority: 'P0 - Critical',
        phase: 2,
        strategicRationale: 'Competitive pricing is the key to profitability and market share',
        businessOutcomes: ['Loss ratio optimization', 'Price competitiveness', 'Market share'],
        technical: {
          deployment: {
            type: 'Container',
            platform: 'ECS Fargate or SageMaker',
            scaling: 'Auto-scaling',
          },
          stack: {
            language: 'Python',
            framework: 'FastAPI',
            database: 'PostgreSQL + S3 (model storage)',
            other: ['MLflow (model registry)', 'Scikit-learn / XGBoost'],
          },
          apis: ['/pricing/calculate', '/pricing/models/list'],
          events: ['pricing.model_deployed', 'pricing.calculated'],
        },
        decision: {
          status: 'Build',
          recommendation: 'Build in-house with actuarial team',
          reasoning: 'Core competitive advantage. Actuarial models are company-specific. No SaaS can replicate our pricing strategy.',
          buildOption: {
            estimatedCost: 16000,
            timeToImplement: '8 weeks (Phase 2)',
            teamSize: 2,
            pros: ['Competitive moat', 'IP ownership', 'Full experimentation control'],
            cons: ['Requires ML + actuarial expertise', 'Model governance complexity'],
            risks: ['Model accuracy', 'Regulatory acceptance of ML models'],
          },
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: false,
          compliance: ['Actuarial standards', 'Model governance', 'Fairness testing'],
        },
        integrations: ['quote-engine', 'data-warehouse', 'feature-store'],
        team: 'Quoting & Underwriting Team + ML Team',
      },
      {
        id: 'policy-admin',
        name: 'Policy Administration System (PAS)',
        description: 'Lightweight policy lifecycle management (new business, MTAs, renewals, cancellations)',
        category: 'Core Business',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'System of record for all policies',
        businessOutcomes: ['Policy accuracy', 'Compliance', 'Customer trust'],
        technical: {
          deployment: {
            type: 'Container',
            platform: 'ECS Fargate',
            scaling: 'Auto-scaling',
            availability: '99.95%',
          },
          stack: {
            language: 'TypeScript',
            framework: 'NestJS',
            database: 'PostgreSQL (Aurora) with event sourcing',
          },
          apis: ['/policies', '/policies/{id}/mta', '/policies/{id}/renew'],
          events: ['policy.created', 'policy.updated', 'policy.cancelled', 'policy.renewed'],
        },
        decision: {
          status: 'Build',
          recommendation: 'Build lightweight PAS in-house',
          reasoning: 'Legacy PAS systems (Duck Creek, Guidewire) are bloated and expensive. For pet insurance, a lightweight event-sourced PAS is sufficient.',
          buildOption: {
            estimatedCost: 14000,
            timeToImplement: '8 weeks',
            teamSize: 2,
            pros: ['Fast iteration', 'Modern architecture', 'Lower cost', 'No vendor lock-in'],
            cons: ['Requires robust testing', 'Compliance burden'],
            risks: ['Data integrity', 'Audit trail completeness'],
          },
          tco3Year: {
            build: 500000,
            saas: 1800000,
          },
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: true,
          compliance: ['GDPR', 'Insurance regulation', 'Event sourcing for audit'],
        },
        integrations: ['quote-engine', 'billing-engine', 'event-bus', 'document-generation'],
        team: 'Policy & Billing Team',
      },
      {
        id: 'claims-engine',
        name: 'Claims Engine',
        description: 'FNOL, triage, auto-adjudication, and settlement',
        category: 'Core Business',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Claims experience is the moment of truth for customer satisfaction',
        businessOutcomes: ['NPS', 'Retention', 'Claims efficiency', 'Fraud reduction'],
        technical: {
          deployment: {
            type: 'Container',
            platform: 'ECS Fargate',
            scaling: 'Auto-scaling',
          },
          stack: {
            language: 'TypeScript + Python (ML)',
            framework: 'NestJS',
            database: 'PostgreSQL',
          },
          apis: ['/claims', '/claims/{id}/documents', '/claims/{id}/adjudicate'],
          events: ['claim.submitted', 'claim.approved', 'claim.denied', 'claim.paid'],
        },
        decision: {
          status: 'Build',
          recommendation: 'Build core claims engine, integrate SaaS for OCR and fraud',
          reasoning: 'Claims logic is business-specific. However, OCR and fraud detection are commoditized - use SaaS.',
          buildOption: {
            estimatedCost: 16000,
            timeToImplement: '10 weeks',
            teamSize: 3,
            pros: ['Custom auto-adjudication logic', 'Fast iteration', 'Integration with agents'],
            cons: ['Complex domain', 'Fraud detection needs ML expertise'],
            risks: ['Auto-adjudication errors', 'Regulatory compliance'],
          },
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: true,
          compliance: ['GDPR', 'Insurance regulation', 'Fraud detection'],
        },
        integrations: ['policy-admin', 'ocr-service', 'fraud-detection', 'payment-gateway', 'claims-agent'],
        team: 'Claims Team',
      },
      {
        id: 'billing-engine',
        name: 'Billing & Payments',
        description: 'Payment processing, dunning, reconciliation',
        category: 'Core Business',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Revenue collection - critical for cash flow',
        businessOutcomes: ['Revenue collection', 'Payment success rate', 'Dunning automation'],
        technical: {
          deployment: {
            type: 'Container',
            platform: 'ECS Fargate',
          },
          stack: {
            language: 'TypeScript',
            framework: 'NestJS',
            database: 'PostgreSQL',
          },
          apis: ['/payments', '/billing/invoices'],
          events: ['payment.received', 'payment.failed', 'invoice.generated'],
        },
        decision: {
          status: 'Hybrid',
          recommendation: 'Use Stripe for payment processing, build billing logic in-house',
          reasoning: 'Stripe handles PCI compliance and payment complexity. Custom billing logic needed for insurance-specific flows (pro-rata, MTAs).',
          saasOptions: [
            {
              name: 'Stripe',
              vendor: 'Stripe',
              website: 'https://stripe.com',
              pricing: '1.5% + £0.20 per transaction',
              fitScore: 10,
              pros: ['Best-in-class', 'PCI compliance handled', 'Excellent DX', 'Webhooks'],
              cons: ['Transaction fees', 'Some vendor lock-in'],
              integrationComplexity: 'Low',
            },
          ],
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: true,
          compliance: ['PCI DSS (via Stripe)', 'GDPR'],
        },
        integrations: ['policy-admin', 'payment-gateway-stripe', 'accounting-system'],
        team: 'Policy & Billing Team',
      },
    ],
  },

  {
    id: 'intelligence',
    name: 'Intelligence Layer',
    description: 'AI/ML, analytics, agentic frameworks',
    color: '#008994',
    order: 4,
    components: [
      {
        id: 'agentic-platform',
        name: 'Agentic AI Platform',
        description: 'Multi-agent orchestration, LLM integration, tool registry, and observability',
        category: 'AI/ML',
        priority: 'P0 - Critical',
        phase: 3,
        strategicRationale: 'The core competitive differentiator - autonomous AI agents for quotes, claims, and customer service',
        businessOutcomes: ['Automation rate 85%+', 'Customer satisfaction', 'Operational leverage'],
        technical: {
          deployment: {
            type: 'Container',
            platform: 'ECS Fargate or Lambda (for stateless agents)',
            scaling: 'Auto-scaling based on agent concurrency',
          },
          stack: {
            language: 'Python',
            framework: 'LangGraph (orchestration) + FastAPI (API layer)',
            database: 'PostgreSQL + Pinecone (vector DB for memory)',
            other: ['LangSmith (observability)', 'Redis (session state)'],
          },
          apis: ['/agents/chat', '/agents/orchestrate', '/agents/eval'],
          events: ['agent.invoked', 'agent.completed', 'agent.escalated'],
        },
        decision: {
          status: 'Build',
          recommendation: 'Build on top of best-of-breed frameworks (LangGraph, LangChain)',
          reasoning: 'Core competitive moat. Use open-source frameworks to move fast, but own the orchestration and business logic.',
          buildOption: {
            estimatedCost: 20000,
            timeToImplement: '12 weeks (Phase 3)',
            teamSize: 2,
            pros: ['Competitive differentiation', 'Full control', 'IP ownership', 'Fast iteration'],
            cons: ['Complex domain', 'Requires LLM expertise', 'Prompt engineering'],
            risks: ['LLM reliability', 'Cost management', 'Quality control'],
          },
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: true,
          compliance: ['GDPR', 'AI governance', 'Model explainability'],
        },
        integrations: ['llm-provider', 'quote-engine', 'claims-engine', 'policy-admin', 'vector-db'],
        team: 'AI/Agent Team',
      },
      {
        id: 'llm-provider',
        name: 'LLM Provider (Claude API)',
        description: 'Primary LLM for agent reasoning, with fallbacks',
        category: 'AI/ML',
        priority: 'P0 - Critical',
        phase: 3,
        strategicRationale: 'Reasoning engine for all AI agents',
        businessOutcomes: ['Agent quality', 'Response accuracy', 'Safety'],
        technical: {
          deployment: {
            type: 'SaaS',
            platform: 'Anthropic Claude API',
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'Claude 3.5 Sonnet (primary), Claude 3 Haiku (fast path)',
          reasoning: 'Best-in-class reasoning and safety. Tool use is excellent. Avoid model hosting complexity.',
          saasOptions: [
            {
              name: 'Anthropic Claude',
              vendor: 'Anthropic',
              website: 'https://anthropic.com',
              pricing: '$3/MTok (Sonnet), $0.25/MTok (Haiku)',
              fitScore: 10,
              pros: ['Best reasoning', 'Excellent tool use', 'Strong safety', 'Long context'],
              cons: ['Cost at scale', 'API dependency'],
              integrationComplexity: 'Low',
            },
            {
              name: 'OpenAI GPT-4',
              vendor: 'OpenAI',
              website: 'https://openai.com',
              pricing: '$10/MTok (GPT-4 Turbo)',
              fitScore: 8,
              pros: ['Widely used', 'Good ecosystem', 'Function calling'],
              cons: ['More expensive', 'Safety concerns', 'Less transparent'],
              integrationComplexity: 'Low',
            },
          ],
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: true,
          compliance: ['Data processing agreement', 'No training on customer data'],
        },
        integrations: ['agentic-platform'],
        team: 'AI/Agent Team',
      },
      {
        id: 'vector-db',
        name: 'Vector Database (RAG & Memory)',
        description: 'Semantic search for knowledge base, customer history, and agent memory',
        category: 'AI/ML',
        priority: 'P1 - High',
        phase: 3,
        strategicRationale: 'Enable agents to access company knowledge and customer context',
        businessOutcomes: ['Agent accuracy', 'Personalization', 'Knowledge retrieval'],
        technical: {
          deployment: {
            type: 'SaaS',
            platform: 'Pinecone or Weaviate',
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'Pinecone for Phase 3, consider pgvector if cost becomes issue',
          reasoning: 'Managed vector DB is faster than self-hosting. Pinecone has best DX. Can migrate to pgvector later if needed.',
          saasOptions: [
            {
              name: 'Pinecone',
              vendor: 'Pinecone',
              website: 'https://pinecone.io',
              pricing: '£70+/mo',
              fitScore: 9,
              pros: ['Managed', 'Fast', 'Great DX', 'Scalable'],
              cons: ['Cost at scale', 'Vendor lock-in'],
              integrationComplexity: 'Low',
            },
            {
              name: 'pgvector (PostgreSQL)',
              vendor: 'Open Source',
              website: 'https://github.com/pgvector/pgvector',
              pricing: '£0 (infrastructure costs only)',
              fitScore: 7,
              pros: ['No vendor lock-in', 'Integrated with PostgreSQL', 'Cost-effective'],
              cons: ['Self-managed', 'Less performant at scale', 'More ops'],
              integrationComplexity: 'Medium',
            },
          ],
        },
        security: {
          dataClassification: 'Confidential',
          piiHandling: true,
          compliance: ['GDPR'],
        },
        integrations: ['agentic-platform', 'cms'],
        team: 'AI/Agent Team',
      },
      {
        id: 'ml-platform',
        name: 'ML Platform (Training, Registry, Serving)',
        description: 'MLOps platform for pricing models, fraud detection, churn prediction',
        category: 'AI/ML',
        priority: 'P1 - High',
        phase: 2,
        strategicRationale: 'Enable rapid ML experimentation and deployment',
        businessOutcomes: ['Model accuracy', 'Deployment speed', 'Model governance'],
        technical: {
          deployment: {
            type: 'Managed Service',
            platform: 'AWS SageMaker or Databricks',
          },
          stack: {
            other: ['MLflow (model registry)', 'Jupyter notebooks', 'Python (scikit-learn, XGBoost)'],
          },
        },
        decision: {
          status: 'Hybrid',
          recommendation: 'Use MLflow (OSS) for registry, SageMaker for training large models',
          reasoning: 'MLflow is free and sufficient for model registry. SageMaker for heavy workloads when needed.',
          saasOptions: [
            {
              name: 'AWS SageMaker',
              vendor: 'AWS',
              website: 'https://aws.amazon.com/sagemaker',
              pricing: 'Pay-per-use (compute + storage)',
              fitScore: 7,
              pros: ['Fully managed', 'Tight AWS integration', 'Auto-scaling'],
              cons: ['Cost can escalate', 'AWS lock-in', 'Complexity'],
              integrationComplexity: 'Medium',
            },
          ],
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: true,
          compliance: ['Model governance', 'GDPR'],
        },
        integrations: ['pricing-engine', 'fraud-detection', 'data-warehouse'],
        team: 'ML Team',
      },
      {
        id: 'data-warehouse',
        name: 'Data Warehouse & Analytics',
        description: 'Centralized analytical data store for BI, ML, and regulatory reporting',
        category: 'Data',
        priority: 'P1 - High',
        phase: 2,
        strategicRationale: 'Single source of truth for business intelligence and ML',
        businessOutcomes: ['Data-driven decisions', 'Regulatory reporting', 'Actuarial analysis'],
        technical: {
          deployment: {
            type: 'Managed Service',
            platform: 'Snowflake or BigQuery',
          },
          stack: {
            other: ['dbt (transformations)', 'Fivetran/Airbyte (ELT)'],
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'BigQuery for cost efficiency, Snowflake if need multi-cloud',
          reasoning: 'Managed warehouse is table stakes. BigQuery is more cost-effective for startups. Snowflake if multi-cloud is strategic.',
          saasOptions: [
            {
              name: 'Google BigQuery',
              vendor: 'Google Cloud',
              website: 'https://cloud.google.com/bigquery',
              pricing: '$5/TB scanned (on-demand)',
              fitScore: 9,
              pros: ['Serverless', 'Pay-per-query', 'Fast', 'ML integration'],
              cons: ['GCP lock-in', 'Query cost can surprise'],
              integrationComplexity: 'Low',
            },
            {
              name: 'Snowflake',
              vendor: 'Snowflake',
              website: 'https://www.snowflake.com',
              pricing: '$2/credit + storage',
              fitScore: 8,
              pros: ['Multi-cloud', 'Separation of compute/storage', 'Great performance'],
              cons: ['More expensive', 'Credit management complexity'],
              integrationComplexity: 'Low',
            },
          ],
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: true,
          compliance: ['GDPR', 'Data retention policies'],
        },
        integrations: ['all-operational-services', 'ml-platform'],
        team: 'Platform & Data Team',
      },
    ],
  },

  {
    id: 'infrastructure',
    name: 'Infrastructure Layer',
    description: 'Platform services, integration, security',
    color: '#10b981',
    order: 5,
    components: [
      {
        id: 'cloud-infra',
        name: 'Cloud Infrastructure (AWS)',
        description: 'Compute, networking, storage, and managed services',
        category: 'Infrastructure',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Foundation for all services',
        businessOutcomes: ['Scalability', 'Reliability', 'Cost efficiency'],
        technical: {
          deployment: {
            type: 'Managed Service',
            platform: 'AWS (Multi-AZ, single region initially)',
            scaling: 'Auto-scaling groups, Fargate, Lambda',
            availability: '99.95% (multi-AZ)',
          },
          stack: {
            other: ['Terraform (IaC)', 'VPC, ECS, RDS Aurora, S3, EventBridge'],
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'AWS for Phase 1-3, evaluate multi-cloud later',
          reasoning: 'AWS has best insurance-specific services and maturity. Multi-cloud adds complexity without clear benefit at this stage.',
        },
        security: {
          dataClassification: 'Internal',
          piiHandling: false,
          compliance: ['AWS security best practices', 'SOC 2'],
        },
        integrations: ['all-services'],
        team: 'Platform Team',
      },
      {
        id: 'event-bus',
        name: 'Event Bus (Kafka / EventBridge)',
        description: 'Centralized event streaming for domain events',
        category: 'Infrastructure',
        priority: 'P1 - High',
        phase: 1,
        strategicRationale: 'Enable event-driven architecture and loose coupling',
        businessOutcomes: ['Service decoupling', 'Real-time processing', 'Audit trail'],
        technical: {
          deployment: {
            type: 'Managed Service',
            platform: 'AWS EventBridge (Phase 1), migrate to MSK (Kafka) if needed',
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'EventBridge for simplicity, Kafka if high throughput needed',
          reasoning: 'EventBridge is serverless and simple. Kafka adds operational overhead but better for high-scale event streaming.',
        },
        security: {
          dataClassification: 'Internal',
          piiHandling: false,
          compliance: [],
        },
        integrations: ['all-domain-services'],
        team: 'Platform Team',
      },
      {
        id: 'auth-service',
        name: 'Authentication & Authorization',
        description: 'Customer and internal user authentication (OAuth 2.0, OIDC)',
        category: 'Security',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Secure access to customer data and internal systems',
        businessOutcomes: ['Security', 'Compliance', 'User experience'],
        technical: {
          deployment: {
            type: 'SaaS',
            platform: 'Auth0 or Clerk',
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'Clerk for best DX, Auth0 if need enterprise features',
          reasoning: 'Auth is critical but undifferentiated. SaaS is faster and more secure than building.',
          saasOptions: [
            {
              name: 'Clerk',
              vendor: 'Clerk',
              website: 'https://clerk.com',
              pricing: '£25/mo + MAU',
              fitScore: 9,
              pros: ['Excellent DX', 'Modern', 'Beautiful UI', 'Affordable'],
              cons: ['Newer vendor', 'Less enterprise features than Auth0'],
              integrationComplexity: 'Low',
            },
            {
              name: 'Auth0',
              vendor: 'Auth0 (Okta)',
              website: 'https://auth0.com',
              pricing: '£200+/mo',
              fitScore: 8,
              pros: ['Mature', 'Enterprise features', 'Extensive integrations'],
              cons: ['More expensive', 'Complex for simple use cases'],
              integrationComplexity: 'Low',
            },
          ],
        },
        security: {
          dataClassification: 'Restricted',
          piiHandling: true,
          compliance: ['GDPR', 'OAuth 2.0', 'OIDC'],
        },
        integrations: ['web-app', 'api-gateway'],
        team: 'Platform Team',
      },
      {
        id: 'observability',
        name: 'Observability (Logs, Metrics, Traces)',
        description: 'Centralized logging, monitoring, alerting, and distributed tracing',
        category: 'Operations',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Production reliability and debugging',
        businessOutcomes: ['Uptime', 'MTTR', 'Operational efficiency'],
        technical: {
          deployment: {
            type: 'SaaS',
            platform: 'Datadog or Grafana Cloud',
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'Datadog for all-in-one, or Grafana Stack (OSS) for cost savings',
          reasoning: 'Observability is critical but commoditized. All-in-one SaaS saves time. Grafana if cost-conscious.',
          saasOptions: [
            {
              name: 'Datadog',
              vendor: 'Datadog',
              website: 'https://www.datadoghq.com',
              pricing: '$15/host/mo + usage',
              fitScore: 9,
              pros: ['All-in-one', 'Excellent UX', 'APM + logs + metrics', 'Great integrations'],
              cons: ['Expensive at scale', 'Vendor lock-in'],
              integrationComplexity: 'Low',
            },
            {
              name: 'Grafana Cloud',
              vendor: 'Grafana Labs',
              website: 'https://grafana.com',
              pricing: '£0 (OSS) or £49+/mo',
              fitScore: 8,
              pros: ['Open source option', 'Cost-effective', 'Flexible'],
              cons: ['More setup', 'Less all-in-one than Datadog'],
              integrationComplexity: 'Medium',
            },
          ],
        },
        security: {
          dataClassification: 'Internal',
          piiHandling: false,
          compliance: [],
        },
        integrations: ['all-services'],
        team: 'Platform Team',
      },
      {
        id: 'cicd',
        name: 'CI/CD Pipelines',
        description: 'Automated build, test, and deployment pipelines',
        category: 'DevOps',
        priority: 'P0 - Critical',
        phase: 1,
        strategicRationale: 'Enable fast, safe deployments',
        businessOutcomes: ['Deployment frequency', 'Lead time', 'Change failure rate'],
        technical: {
          deployment: {
            type: 'SaaS',
            platform: 'GitHub Actions',
          },
          stack: {
            other: ['Docker', 'Terraform', 'SAST/DAST scanning'],
          },
        },
        decision: {
          status: 'SaaS',
          recommendation: 'GitHub Actions (already using GitHub)',
          reasoning: 'Tight integration with GitHub. Free for private repos. Good ecosystem.',
        },
        security: {
          dataClassification: 'Internal',
          piiHandling: false,
          compliance: ['SAST', 'Dependency scanning', 'Secrets management'],
        },
        integrations: ['all-services'],
        team: 'Platform Team',
      },
    ],
  },
];

// Agentic AI Frameworks & Tools
export const agenticFrameworks: AgenticFramework[] = [
  // Orchestration Frameworks
  {
    id: 'langgraph',
    name: 'LangGraph',
    category: 'Orchestration',
    description: 'State machine framework for building multi-agent workflows with cycles, persistence, and human-in-the-loop',
    website: 'https://langchain-ai.github.io/langgraph',
    useCases: ['Multi-step agent workflows', 'State management', 'HITL workflows', 'Complex orchestration'],
    pros: ['Built by LangChain team', 'Great for stateful agents', 'Supports cycles and branching', 'Python & JS'],
    cons: ['Relatively new', 'Learning curve', 'Documentation still growing'],
    selected: true,
    reasoning: 'Best-in-class for our multi-agent orchestration needs. State management and HITL support are critical.',
    license: 'MIT',
    maturity: 'Production',
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'Framework',
    description: 'Popular framework for building LLM applications with tool use, memory, and chains',
    website: 'https://langchain.com',
    useCases: ['RAG', 'Tool calling', 'Chain-of-thought', 'Prompt management'],
    pros: ['Mature', 'Large ecosystem', 'Extensive integrations', 'Active community'],
    cons: ['Can be over-engineered', 'Abstractions sometimes leaky'],
    selected: true,
    reasoning: 'Industry standard. Use for individual agent logic, LangGraph for orchestration.',
    license: 'MIT',
    maturity: 'Production',
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    category: 'Orchestration',
    description: 'Multi-agent framework with role-based agents collaborating on tasks',
    website: 'https://crewai.com',
    useCases: ['Role-based agents', 'Team collaboration', 'Task delegation'],
    pros: ['Simple API', 'Good for team-based workflows', 'Built-in task management'],
    cons: ['Less flexible than LangGraph', 'Opinionated structure'],
    selected: false,
    reasoning: 'Considered but LangGraph offers more control and flexibility for our use cases.',
    license: 'MIT',
    maturity: 'Production',
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    category: 'Orchestration',
    description: 'Microsoft framework for multi-agent conversations and code execution',
    website: 'https://microsoft.github.io/autogen',
    useCases: ['Conversational agents', 'Code generation', 'Multi-agent debates'],
    pros: ['Microsoft backing', 'Good for code-heavy workflows', 'Conversational patterns'],
    cons: ['Code execution security concerns', 'Less production-ready than LangGraph'],
    selected: false,
    reasoning: 'Impressive but optimized for code generation use cases, not our domain.',
    license: 'MIT',
    maturity: 'Beta',
  },

  // LLM Providers
  {
    id: 'anthropic-claude',
    name: 'Anthropic Claude',
    category: 'LLM Provider',
    description: 'Best-in-class reasoning, safety, and tool use. Long context (200K tokens).',
    website: 'https://anthropic.com',
    useCases: ['Primary reasoning engine', 'Complex tool use', 'Safety-critical applications'],
    pros: ['Best reasoning quality', 'Excellent tool use', 'Strong safety', 'Long context', '200K context'],
    cons: ['Cost at scale', 'API dependency', 'No self-hosting'],
    selected: true,
    reasoning: 'Claude 3.5 Sonnet for complex reasoning, Claude 3 Haiku for high-volume simple tasks.',
    license: 'Proprietary',
    maturity: 'Production',
  },
  {
    id: 'openai-gpt4',
    name: 'OpenAI GPT-4',
    category: 'LLM Provider',
    description: 'Widely-used LLM with strong general capabilities',
    website: 'https://openai.com',
    useCases: ['Fallback LLM', 'Function calling', 'General reasoning'],
    pros: ['Mature ecosystem', 'Good function calling', 'Wide adoption'],
    cons: ['More expensive than Claude', 'Safety concerns', 'Less transparent'],
    selected: false,
    reasoning: 'Fallback option if Claude has availability issues. Not primary due to cost and safety.',
    license: 'Proprietary',
    maturity: 'Production',
  },

  // Memory & Vector Databases
  {
    id: 'pinecone',
    name: 'Pinecone',
    category: 'Memory',
    description: 'Managed vector database for semantic search and agent memory',
    website: 'https://pinecone.io',
    useCases: ['RAG', 'Semantic search', 'Long-term agent memory', 'Customer history retrieval'],
    pros: ['Fully managed', 'Fast', 'Great DX', 'Scalable'],
    cons: ['Cost at scale', 'Vendor lock-in'],
    selected: true,
    reasoning: 'Best managed option for Phase 3. Can migrate to pgvector later if cost becomes an issue.',
    license: 'Proprietary',
    maturity: 'Production',
  },
  {
    id: 'pgvector',
    name: 'pgvector (PostgreSQL)',
    category: 'Memory',
    description: 'Open-source vector extension for PostgreSQL',
    website: 'https://github.com/pgvector/pgvector',
    useCases: ['RAG', 'Semantic search', 'Cost-effective vector storage'],
    pros: ['No vendor lock-in', 'Integrated with PostgreSQL', 'Cost-effective', 'Open source'],
    cons: ['Self-managed', 'Less performant at scale', 'Requires more ops'],
    selected: false,
    reasoning: 'Fallback if Pinecone cost becomes prohibitive. Good for smaller scale.',
    license: 'PostgreSQL License',
    maturity: 'Production',
  },

  // Observability & Evaluation
  {
    id: 'langsmith',
    name: 'LangSmith',
    category: 'Observability',
    description: 'LLM observability, tracing, evaluation, and dataset management by LangChain',
    website: 'https://smith.langchain.com',
    useCases: ['Agent tracing', 'Debugging', 'Evaluation', 'Quality monitoring'],
    pros: ['Best integration with LangChain/LangGraph', 'Great tracing UI', 'Evaluation framework'],
    cons: ['SaaS only', 'Cost at high volume', 'Vendor lock-in'],
    selected: true,
    reasoning: 'Essential for debugging and evaluating agent quality. Best-in-class for LangChain ecosystem.',
    license: 'Proprietary',
    maturity: 'Production',
  },
  {
    id: 'langfuse',
    name: 'Langfuse',
    category: 'Observability',
    description: 'Open-source LLM observability and analytics platform',
    website: 'https://langfuse.com',
    useCases: ['LLM tracing', 'Cost tracking', 'Evaluation', 'Open-source alternative'],
    pros: ['Open source', 'Self-hostable', 'Good feature set', 'Cost tracking'],
    cons: ['Smaller community than LangSmith', 'Less mature'],
    selected: false,
    reasoning: 'Backup option if LangSmith cost becomes prohibitive. Open-source is appealing.',
    license: 'MIT',
    maturity: 'Production',
  },

  // Tools & Utilities
  {
    id: 'guardrails-ai',
    name: 'Guardrails AI',
    category: 'Tool',
    description: 'Framework for validating and correcting LLM outputs',
    website: 'https://www.guardrailsai.com',
    useCases: ['Output validation', 'Schema enforcement', 'PII detection', 'Safety checks'],
    pros: ['Structured output validation', 'Open source', 'Good for compliance'],
    cons: ['Additional latency', 'Learning curve'],
    selected: true,
    reasoning: 'Critical for claims auto-adjudication and policy interpretation. Output validation is required for compliance.',
    license: 'Apache 2.0',
    maturity: 'Production',
  },
  {
    id: 'semantic-kernel',
    name: 'Semantic Kernel',
    category: 'Framework',
    description: 'Microsoft lightweight SDK for integrating LLMs with conventional code',
    website: 'https://github.com/microsoft/semantic-kernel',
    useCases: ['LLM integration', 'Enterprise .NET/Java apps', 'Plugins'],
    pros: ['Microsoft backing', 'Multi-language (C#, Python, Java)', 'Good for .NET shops'],
    cons: ['Less adoption than LangChain', 'Optimized for Microsoft stack'],
    selected: false,
    reasoning: 'Not relevant - we are Python/TypeScript focused, not .NET.',
    license: 'MIT',
    maturity: 'Production',
  },
  {
    id: 'llamaindex',
    name: 'LlamaIndex',
    category: 'Framework',
    description: 'Data framework for connecting LLMs to external data sources (RAG focus)',
    website: 'https://www.llamaindex.ai',
    useCases: ['RAG', 'Data ingestion', 'Document loaders', 'Knowledge bases'],
    pros: ['Best-in-class for RAG', 'Extensive data connectors', 'Good for knowledge bases'],
    cons: ['Overlap with LangChain', 'Additional dependency'],
    selected: true,
    reasoning: 'Use for RAG pipelines (policy documents, FAQs). Complements LangChain well.',
    license: 'MIT',
    maturity: 'Production',
  },
];

// Helper function to get components by layer
export function getComponentsByLayer(layerId: string): Component[] {
  const layer = architectureData.find(l => l.id === layerId);
  return layer?.components || [];
}

// Helper function to get all components
export function getAllComponents(): Component[] {
  return architectureData.flatMap(layer => layer.components);
}

// Helper function to get selected agentic frameworks
export function getSelectedFrameworks(): AgenticFramework[] {
  return agenticFrameworks.filter(f => f.selected);
}

// Helper function to get frameworks by category
export function getFrameworksByCategory(category: AgenticFramework['category']): AgenticFramework[] {
  return agenticFrameworks.filter(f => f.category === category);
}
