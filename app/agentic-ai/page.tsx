"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { agenticFrameworks, getFrameworksByCategory, type AgenticFramework } from "@/data/architecture";
import { Bot, CheckCircle2, XCircle, ExternalLink, Zap, Shield, Eye, GitBranch } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["Orchestration", "LLM Provider", "Framework", "Tool", "Memory", "Observability"] as const;

export default function AgenticAIPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<AgenticFramework | null>(null);

  const selectedFrameworks = agenticFrameworks.filter(f => f.selected);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Agentic AI Platform
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl">
              Our multi-agent architecture leverages best-of-breed frameworks to deliver autonomous, intelligent workflows across quotes, claims, and customer service. Built for production-grade reliability, observability, and continuous improvement.
            </p>
          </div>

          {/* Key Capabilities */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Bot, title: "Multi-Agent", description: "Specialized agents for quotes, claims, policy service", color: "primary" },
              { icon: Zap, title: "Auto-Adjudication", description: "60% of claims processed autonomously", color: "secondary" },
              { icon: Shield, title: "Safety Guardrails", description: "Multi-layer validation and HITL triggers", color: "accent" },
              { icon: Eye, title: "Full Observability", description: "Trace every LLM call, tool invocation, decision", color: "success" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200"
              >
                <div className={`w-10 h-10 rounded-lg bg-${item.color}-100 flex items-center justify-center mb-3`}>
                  <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Selected Framework Stack */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Technology Stack</h2>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-200">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedFrameworks.map((framework, index) => (
                  <motion.button
                    key={framework.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedFramework(framework)}
                    className="bg-white p-5 rounded-xl border-2 border-transparent hover:border-primary-300 transition-all text-left group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-bold text-gray-900">{framework.name}</div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-xs text-gray-500 mb-3">{framework.category}</div>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                      {framework.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        framework.maturity === "Production"
                          ? "bg-green-100 text-green-700"
                          : framework.maturity === "Beta"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {framework.maturity}
                      </span>
                      <span className="text-xs text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* All Frameworks by Category */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Framework Evaluation Matrix</h2>
            <p className="text-gray-600 mb-6">
              We evaluated {agenticFrameworks.length} frameworks across {categories.length} categories. Selected frameworks are highlighted.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === null
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-primary-300"
                }`}
              >
                All ({agenticFrameworks.length})
              </button>
              {categories.map((category) => {
                const count = getFrameworksByCategory(category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>

            {/* Framework Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {(selectedCategory
                ? getFrameworksByCategory(selectedCategory as any)
                : agenticFrameworks
              ).map((framework, index) => (
                <motion.div
                  key={framework.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    framework.selected
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-gray-900">{framework.name}</h3>
                        {framework.selected ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{framework.category}</div>
                    </div>
                    <a
                      href={framework.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{framework.description}</p>

                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Use Cases:</div>
                      <div className="flex flex-wrap gap-1">
                        {framework.useCases.slice(0, 3).map((useCase, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div>
                        <div className="text-xs font-semibold text-green-700 mb-1">Pros</div>
                        <ul className="space-y-0.5">
                          {framework.pros.slice(0, 2).map((pro, idx) => (
                            <li key={idx} className="text-xs text-gray-600">• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-red-700 mb-1">Cons</div>
                        <ul className="space-y-0.5">
                          {framework.cons.slice(0, 2).map((con, idx) => (
                            <li key={idx} className="text-xs text-gray-600">• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {framework.selected && framework.reasoning && (
                      <div className="pt-2 border-t border-green-200">
                        <div className="text-xs font-semibold text-green-800 mb-1">Why Selected:</div>
                        <p className="text-xs text-green-700">{framework.reasoning}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500">{framework.license}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        framework.maturity === "Production"
                          ? "bg-green-100 text-green-700"
                          : framework.maturity === "Beta"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {framework.maturity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Agent Architecture Diagram */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Multi-Agent Architecture</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Customer-Facing Agents */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-600" />
                    </div>
                    <span>Customer-Facing Agents</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Quote Agent", description: "Conversational quoting, pricing, product selection", confidence: "95%" },
                      { name: "Claims Agent", description: "FNOL intake, document upload, status updates", confidence: "90%" },
                      { name: "Policy Service Agent", description: "Coverage Q&A, MTAs, renewals", confidence: "92%" },
                      { name: "Wellness Agent", description: "Proactive health tips, vaccination reminders", confidence: "88%" },
                    ].map((agent, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-primary-50 border border-primary-200">
                        <div className="font-semibold text-gray-900 mb-1">{agent.name}</div>
                        <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Target Accuracy</span>
                          <span className="font-semibold text-primary-700">{agent.confidence}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Internal Ops Agents */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                      <GitBranch className="w-5 h-5 text-secondary-600" />
                    </div>
                    <span>Internal Ops Agents</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Underwriting Assistant", description: "Risk assessment support, similar case retrieval", sla: "<5s" },
                      { name: "Claims Adjuster Assistant", description: "Case analysis, fraud detection, decision support", sla: "<8s" },
                      { name: "Fraud Investigator", description: "Anomaly detection, evidence gathering", sla: "<10s" },
                      { name: "Data Analyst Agent", description: "Query warehouse, generate reports, insights", sla: "<15s" },
                    ].map((agent, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-secondary-50 border border-secondary-200">
                        <div className="font-semibold text-gray-900 mb-1">{agent.name}</div>
                        <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Response SLA</span>
                          <span className="font-semibold text-secondary-700">{agent.sla}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Orchestrator */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-6 border border-accent-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">Orchestrator Agent</h3>
                  <p className="text-gray-700 mb-4">
                    Central routing and coordination layer. Classifies intent, routes to appropriate specialist agent, manages state and context, handles agent-to-agent handoffs.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Intent Classification</div>
                      <div className="text-gray-600">Claude 3 Haiku (fast, cost-effective)</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">State Management</div>
                      <div className="text-gray-600">Redis (session context, memory)</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Routing Logic</div>
                      <div className="text-gray-600">LangGraph (state machine)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Evaluation & Quality */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluation & Quality Assurance</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Unit Testing (Offline)",
                  icon: CheckCircle2,
                  items: [
                    "500+ curated examples per agent",
                    "Tool selection accuracy",
                    "Output correctness vs golden answers",
                    "Latency & cost per interaction",
                    "Automated regression suite",
                  ],
                },
                {
                  title: "LLM-as-Judge (Automated)",
                  icon: Bot,
                  items: [
                    "GPT-4/Claude as evaluator",
                    "Rate response quality (1-5)",
                    "Hallucination detection",
                    "Policy compliance verification",
                    "Tone and empathy assessment",
                  ],
                },
                {
                  title: "Human Evaluation (Gold Standard)",
                  icon: Shield,
                  items: [
                    "Weekly sample review (100 interactions)",
                    "Expert adjudicators rate quality",
                    "Identify edge cases",
                    "Update eval dataset",
                    "Inter-rater agreement >90%",
                  ],
                },
                {
                  title: "Production Metrics (Live)",
                  icon: Eye,
                  items: [
                    "Real-time completion rate",
                    "Escalation rate monitoring",
                    "CSAT surveys post-interaction",
                    "Task success rate tracking",
                    "Latency and cost dashboards",
                  ],
                },
              ].map((section, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
