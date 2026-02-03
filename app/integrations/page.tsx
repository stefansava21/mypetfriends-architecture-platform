"use client";

import Navigation from "@/components/Navigation";
import { GitBranch, ExternalLink } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Capacity Provider / Reinsurer",
      purpose: "Bind capacity, report bordereaux, manage limits",
      pattern: "API + SFTP",
      priority: "P0 - Critical",
    },
    {
      name: "Payment Processor (Stripe)",
      purpose: "Collect premiums, settle claims",
      pattern: "REST API",
      priority: "P0 - Critical",
    },
    {
      name: "Vet Record Systems",
      purpose: "Pre-fill medical history, validate claims",
      pattern: "FHIR or custom API",
      priority: "P1 - High",
    },
    {
      name: "Pet Microchip Database",
      purpose: "Verify pet identity, reduce fraud",
      pattern: "REST API",
      priority: "P1 - High",
    },
    {
      name: "Accounting System (Xero)",
      purpose: "GL entries, reconciliation",
      pattern: "API or Webhook",
      priority: "P1 - High",
    },
    {
      name: "CRM / Marketing (HubSpot)",
      purpose: "Customer segmentation, campaigns",
      pattern: "Event-driven (Segment)",
      priority: "P2 - Medium",
    },
    {
      name: "Comparison Sites",
      purpose: "Distribution channel",
      pattern: "REST API, quote aggregation",
      priority: "P2 - Medium",
    },
    {
      name: "Regulatory Bodies",
      purpose: "Compliance reporting",
      pattern: "SFTP/API per jurisdiction",
      priority: "P1 - High",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center">
                <GitBranch className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Key Integrations
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl">
              Third-party integrations critical for the platform's operation. Each integration is designed with proper error handling, retry logic, and monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">{integration.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    integration.priority === "P0 - Critical"
                      ? "bg-red-100 text-red-700"
                      : integration.priority === "P1 - High"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {integration.priority.split(" - ")[0]}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{integration.purpose}</p>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <strong>Pattern:</strong> {integration.pattern}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Integration Strategy</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">API-First</h3>
                <p className="text-gray-700">
                  All integrations exposed as versioned APIs with OpenAPI specs. Webhook support for event-driven flows.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Error Handling</h3>
                <p className="text-gray-700">
                  Exponential backoff, circuit breakers, dead letter queues. Graceful degradation when third parties fail.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Monitoring</h3>
                <p className="text-gray-700">
                  SLA monitoring, latency tracking, success rate dashboards. Alerts for integration failures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
