"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { architectureData, type Layer, type Component } from "@/data/architecture";
import { ChevronRight, ExternalLink, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ArchitecturePage() {
  const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              5-Layer Architecture
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Click on any layer to explore its components, technical specifications, and build-vs-buy decisions
            </p>
          </div>

          {/* Architecture Layers */}
          <div className="space-y-4 mb-8">
            {architectureData.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setSelectedLayer(selectedLayer?.id === layer.id ? null : layer)}
                  className={`
                    w-full text-left p-6 rounded-xl transition-all border-2
                    ${
                      selectedLayer?.id === layer.id
                        ? "border-primary-500 bg-white shadow-lg"
                        : "border-gray-200 bg-white hover:border-primary-200 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: layer.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{layer.name}</h3>
                        <p className="text-sm text-gray-600">{layer.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        {layer.components.length} components
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          selectedLayer?.id === layer.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Layer Components */}
                <AnimatePresence>
                  {selectedLayer?.id === layer.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {layer.components.map((component) => (
                        <ComponentCard
                          key={component.id}
                          component={component}
                          onSelect={() => setSelectedComponent(component)}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: "Total Components", value: architectureData.reduce((acc, layer) => acc + layer.components.length, 0) },
              { label: "Build In-House", value: architectureData.flatMap(l => l.components).filter(c => c.decision.status === "Build").length },
              { label: "SaaS Solutions", value: architectureData.flatMap(l => l.components).filter(c => c.decision.status === "SaaS").length },
              { label: "Hybrid Approach", value: architectureData.flatMap(l => l.components).filter(c => c.decision.status === "Hybrid").length },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Detail Modal */}
      <AnimatePresence>
        {selectedComponent && (
          <ComponentDetailModal
            component={selectedComponent}
            onClose={() => setSelectedComponent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Component Card
function ComponentCard({ component, onSelect }: { component: Component; onSelect: () => void }) {
  const getStatusIcon = () => {
    switch (component.decision.status) {
      case "Build":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "SaaS":
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case "Hybrid":
        return <CheckCircle2 className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (component.decision.status) {
      case "Build":
        return "bg-green-50 text-green-700 border-green-200";
      case "SaaS":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Hybrid":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <button
      onClick={onSelect}
      className="text-left p-5 rounded-lg border-2 border-gray-100 hover:border-primary-200 hover:shadow-md transition-all bg-white"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm leading-tight pr-2">
          {component.name}
        </h4>
        {getStatusIcon()}
      </div>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {component.description}
      </p>

      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor()}`}>
          {component.decision.status}
        </span>
        <span className="text-xs text-gray-500">{component.priority}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="text-gray-500">{component.technical.deployment.type}</span>
        <span className="text-primary-600 font-medium">View Details →</span>
      </div>
    </button>
  );
}

// Component Detail Modal
function ComponentDetailModal({ component, onClose }: { component: Component; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{component.name}</h2>
              <p className="text-gray-600">{component.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
              {component.priority}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
              Phase {component.phase}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Strategic Rationale */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Strategic Rationale</h3>
            <p className="text-gray-700">{component.strategicRationale}</p>
          </section>

          {/* Business Outcomes */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Business Outcomes</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {component.businessOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technical Specifications */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Technical Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Deployment</div>
                <div className="text-sm text-gray-600">
                  <div><strong>Type:</strong> {component.technical.deployment.type}</div>
                  {component.technical.deployment.platform && (
                    <div><strong>Platform:</strong> {component.technical.deployment.platform}</div>
                  )}
                  {component.technical.deployment.scaling && (
                    <div><strong>Scaling:</strong> {component.technical.deployment.scaling}</div>
                  )}
                  {component.technical.deployment.availability && (
                    <div><strong>Availability:</strong> {component.technical.deployment.availability}</div>
                  )}
                </div>
              </div>

              {component.technical.stack && (
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Tech Stack</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    {component.technical.stack.language && (
                      <div><strong>Language:</strong> {component.technical.stack.language}</div>
                    )}
                    {component.technical.stack.framework && (
                      <div><strong>Framework:</strong> {component.technical.stack.framework}</div>
                    )}
                    {component.technical.stack.database && (
                      <div><strong>Database:</strong> {component.technical.stack.database}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Build vs Buy Decision */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Build vs Buy Decision</h3>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
              <div className="font-semibold text-primary-900 mb-2">
                Recommendation: {component.decision.recommendation}
              </div>
              <p className="text-sm text-primary-800">{component.decision.reasoning}</p>
            </div>

            {/* Build Option */}
            {component.decision.buildOption && (
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Build In-House</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Estimated Cost</div>
                    <div className="font-semibold">£{component.decision.buildOption.estimatedCost.toLocaleString()}/mo</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Time to Implement</div>
                    <div className="font-semibold">{component.decision.buildOption.timeToImplement}</div>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold text-green-700 mb-2">Pros</div>
                    <ul className="space-y-1 text-sm">
                      {component.decision.buildOption.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-600 mt-0.5">+</span>
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-red-700 mb-2">Cons</div>
                    <ul className="space-y-1 text-sm">
                      {component.decision.buildOption.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-red-600 mt-0.5">-</span>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SaaS Options */}
            {component.decision.saasOptions && component.decision.saasOptions.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">SaaS Options</h4>
                <div className="space-y-3">
                  {component.decision.saasOptions.map((option, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-900">{option.name}</div>
                          <div className="text-sm text-gray-600">{option.vendor}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-semibold text-primary-600">
                            Fit: {option.fitScore}/10
                          </div>
                          <a
                            href={option.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <div className="text-sm text-gray-700 mb-3">
                        <strong>Pricing:</strong> {option.pricing}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-semibold text-green-700 mb-1">Pros</div>
                          <ul className="space-y-1 text-xs">
                            {option.pros.map((pro, pidx) => (
                              <li key={pidx} className="text-gray-600">• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-red-700 mb-1">Cons</div>
                          <ul className="space-y-1 text-xs">
                            {option.cons.map((con, cidx) => (
                              <li key={cidx} className="text-gray-600">• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Security & Compliance */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Security & Compliance</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div>
                <strong>Data Classification:</strong> {component.security.dataClassification}
              </div>
              <div>
                <strong>PII Handling:</strong> {component.security.piiHandling ? "Yes" : "No"}
              </div>
              {component.security.compliance.length > 0 && (
                <div>
                  <strong>Compliance:</strong> {component.security.compliance.join(", ")}
                </div>
              )}
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
