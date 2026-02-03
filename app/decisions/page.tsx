"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { architectureData, getAllComponents } from "@/data/architecture";
import { FileCheck, Filter, Download } from "lucide-react";
import { motion } from "framer-motion";

type FilterType = "All" | "Build" | "SaaS" | "Hybrid" | "Undecided";

export default function DecisionsPage() {
  const [filter, setFilter] = useState<FilterType>("All");
  const allComponents = getAllComponents();

  const filteredComponents = filter === "All"
    ? allComponents
    : allComponents.filter(c => c.decision.status === filter);

  const stats = {
    total: allComponents.length,
    build: allComponents.filter(c => c.decision.status === "Build").length,
    saas: allComponents.filter(c => c.decision.status === "SaaS").length,
    hybrid: allComponents.filter(c => c.decision.status === "Hybrid").length,
    undecided: allComponents.filter(c => c.decision.status === "Undecided").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Build vs Buy Decision Matrix
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl">
                  Strategic evaluation of {allComponents.length} components across build-in-house, SaaS, and hybrid approaches.
                  Each decision is backed by cost analysis, time estimates, and strategic rationale.
                </p>
              </div>
              <button className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                <Download className="w-5 h-5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total", value: stats.total, color: "gray", filter: "All" as FilterType },
              { label: "Build", value: stats.build, color: "green", filter: "Build" as FilterType },
              { label: "SaaS", value: stats.saas, color: "blue", filter: "SaaS" as FilterType },
              { label: "Hybrid", value: stats.hybrid, color: "purple", filter: "Hybrid" as FilterType },
              { label: "Undecided", value: stats.undecided, color: "gray", filter: "Undecided" as FilterType },
            ].map((stat, index) => (
              <button
                key={index}
                onClick={() => setFilter(stat.filter)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  filter === stat.filter
                    ? `border-${stat.color}-500 bg-${stat.color}-50`
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </button>
            ))}
          </div>

          {/* Filter Badge */}
          {filter !== "All" && (
            <div className="mb-6 flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Showing <strong>{filteredComponents.length}</strong> {filter} components
              </span>
              <button
                onClick={() => setFilter("All")}
                className="text-sm text-primary-600 hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Decision Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Component</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Layer</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase">Priority</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase">Phase</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase">Decision</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Recommendation</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Est. Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredComponents.map((component, index) => {
                    const layer = architectureData.find(l =>
                      l.components.some(c => c.id === component.id)
                    );

                    return (
                      <motion.tr
                        key={component.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{component.name}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">{component.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{layer?.name}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            component.priority === "P0 - Critical"
                              ? "bg-red-100 text-red-700"
                              : component.priority === "P1 - High"
                              ? "bg-orange-100 text-orange-700"
                              : component.priority === "P2 - Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {component.priority.split(" - ")[0]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm text-gray-700">Q{component.phase}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                            component.decision.status === "Build"
                              ? "bg-green-100 text-green-700"
                              : component.decision.status === "SaaS"
                              ? "bg-blue-100 text-blue-700"
                              : component.decision.status === "Hybrid"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {component.decision.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-gray-700 line-clamp-2">
                            {component.decision.recommendation}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {component.decision.buildOption ? (
                            <div className="text-sm font-medium text-gray-900">
                              £{component.decision.buildOption.estimatedCost.toLocaleString()}/mo
                            </div>
                          ) : component.decision.saasOptions && component.decision.saasOptions[0] ? (
                            <div className="text-sm font-medium text-gray-900">
                              {component.decision.saasOptions[0].pricing.split(" ")[0]}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">TBD</div>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Analysis */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-900 mb-3">Build In-House ({stats.build})</h3>
              <p className="text-sm text-green-800 mb-4">
                Core business logic and competitive differentiators. Full control, IP ownership, and strategic flexibility.
              </p>
              <div className="text-2xl font-bold text-green-700">
                £{allComponents
                  .filter(c => c.decision.status === "Build" && c.decision.buildOption)
                  .reduce((sum, c) => sum + (c.decision.buildOption?.estimatedCost || 0), 0)
                  .toLocaleString()}/mo
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-3">SaaS Solutions ({stats.saas})</h3>
              <p className="text-sm text-blue-800 mb-4">
                Commoditized capabilities where SaaS offers faster time-to-market and lower operational overhead.
              </p>
              <div className="text-2xl font-bold text-blue-700">Managed</div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="font-bold text-purple-900 mb-3">Hybrid Approach ({stats.hybrid})</h3>
              <p className="text-sm text-purple-800 mb-4">
                Best of both: SaaS for commodity layers, custom logic on top for business-specific requirements.
              </p>
              <div className="text-2xl font-bold text-purple-700">Optimized</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
