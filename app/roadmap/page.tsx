"use client";

import Navigation from "@/components/Navigation";
import { config } from "@/config/settings";
import { Calendar, Target, Users, DollarSign, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Roadmap to MVP
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              A realistic 3-quarter plan to launch our AI-native pet insurance platform. Each phase builds on the previous, with clear milestones, deliverables, and team scaling.
            </p>
          </div>

          {/* Timeline Summary */}
          <div className="mb-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-primary-100 text-sm mb-2">Start Date</div>
                <div className="text-2xl font-bold">{new Date(config.roadmap.startDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</div>
              </div>
              <div>
                <div className="text-primary-100 text-sm mb-2">MVP Target</div>
                <div className="text-2xl font-bold">{new Date(config.roadmap.mvp.targetDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</div>
              </div>
              <div>
                <div className="text-primary-100 text-sm mb-2">Duration</div>
                <div className="text-2xl font-bold">9 Months</div>
              </div>
              <div>
                <div className="text-primary-100 text-sm mb-2">Target Policies</div>
                <div className="text-2xl font-bold">{config.roadmap.mvp.targetMetrics.policiesSold.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Quarter-by-Quarter Breakdown */}
          <div className="space-y-8 mb-12">
            {config.roadmap.quarters.map((quarter, index) => (
              <motion.div
                key={quarter.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <QuarterCard quarter={quarter} index={index} />
              </motion.div>
            ))}
          </div>

          {/* MVP Success Criteria */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">MVP Success Criteria</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(config.roadmap.mvp.targetMetrics).map(([key, value], index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
                    <div className="text-3xl font-bold text-primary-600 mb-2">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Scaling */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Scaling Plan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { phase: "Phase 1 (Q1)", headcount: config.team.phase1.headcount, roles: config.team.phase1.roles },
                { phase: "Phase 2 (Q2)", headcount: config.team.phase2.headcount, roles: config.team.phase2.roles },
                { phase: "Phase 3 (Q3)", headcount: config.team.phase3.headcount, roles: config.team.phase3.roles },
              ].map((teamPhase, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{teamPhase.phase}</h3>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary-600" />
                      <span className="text-2xl font-bold text-primary-600">{teamPhase.headcount}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {teamPhase.roles.map((role, idx) => (
                      <div
                        key={idx}
                        className={`text-sm px-3 py-2 rounded-lg ${
                          role.startsWith('+')
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Metrics Evolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics Evolution</h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Metric</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Q1 Target</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Q2 Target</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Q3 (MVP)</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Long-term</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: "Quote Conversion", p1: config.metrics.phase1.quoteConversion, p2: config.metrics.phase2.quoteConversion, p3: config.metrics.phase3.quoteConversion, lt: config.metrics.longTerm.quoteConversion },
                      { name: "Time to Quote", p1: config.metrics.phase1.timeToQuote, p2: config.metrics.phase2.timeToQuote, p3: config.metrics.phase3.timeToQuote, lt: config.metrics.longTerm.timeToQuote },
                      { name: "UW STP Rate", p1: config.metrics.phase1.underwritingSTP, p2: config.metrics.phase2.underwritingSTP, p3: config.metrics.phase3.underwritingSTP, lt: config.metrics.longTerm.underwritingSTP },
                      { name: "Claims FNOL→Decision", p1: config.metrics.phase1.claimsFNOLToDecision, p2: config.metrics.phase2.claimsFNOLToDecision, p3: config.metrics.phase3.claimsFNOLToDecision, lt: config.metrics.longTerm.claimsFNOLToDecision },
                      { name: "Claims Auto-Adjudication", p1: "-", p2: config.metrics.phase2.claimsAutoAdjudication, p3: config.metrics.phase3.claimsAutoAdjudication, lt: config.metrics.longTerm.claimsAutoAdjudication },
                      { name: "Platform Uptime", p1: config.metrics.phase1.platformUptime, p2: config.metrics.phase2.platformUptime, p3: config.metrics.phase3.platformUptime, lt: config.metrics.longTerm.platformUptime },
                      { name: "Deployment Frequency", p1: config.metrics.phase1.deploymentFrequency, p2: config.metrics.phase2.deploymentFrequency, p3: config.metrics.phase3.deploymentFrequency, lt: config.metrics.longTerm.deploymentFrequency },
                    ].map((metric, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{metric.name}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-700">{metric.p1}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-700">{metric.p2}</td>
                        <td className="px-6 py-4 text-sm text-center font-semibold text-primary-700">{metric.p3}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-500">{metric.lt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Quarter Card Component
function QuarterCard({ quarter, index }: { quarter: typeof config.roadmap.quarters[number]; index: number }) {
  const colors = ["primary", "secondary", "accent"];
  const color = colors[index % colors.length];

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      {/* Quarter Header */}
      <div className={`bg-gradient-to-r from-${color}-500 to-${color}-600 p-6 text-white`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm font-semibold mb-1 opacity-90">{quarter.name}</div>
            <h3 className="text-2xl font-bold mb-2">{quarter.label}</h3>
            <div className="flex items-center space-x-2 text-sm opacity-90">
              <Calendar className="w-4 h-4" />
              <span>{new Date(quarter.startDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} - {new Date(quarter.endDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{quarter.duration}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">Q{index + 1}</div>
          </div>
        </div>

        {/* Themes */}
        <div className="flex flex-wrap gap-2">
          {quarter.themes.map((theme, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-sm font-medium">
              {theme}
            </span>
          ))}
        </div>
      </div>

      {/* Quarter Content */}
      <div className="p-6">
        {/* Key Milestones */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600" />
            <span>Key Milestones</span>
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {quarter.keyMilestones.map((milestone, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200"
              >
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{idx + 1}</span>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{milestone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase-Specific Details */}
        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {index === 0 && (
            <>
              <DetailCard
                icon={Users}
                label="Team Size"
                value={`${config.team.phase1.headcount} people`}
                color="primary"
              />
              <DetailCard
                icon={DollarSign}
                label="Infrastructure"
                value={`${config.costs.currency}${config.costs.infrastructure.phase1.toLocaleString()}/mo`}
                color="primary"
              />
              <DetailCard
                icon={TrendingUp}
                label="Focus"
                value="Foundation"
                color="primary"
              />
            </>
          )}
          {index === 1 && (
            <>
              <DetailCard
                icon={Users}
                label="Team Size"
                value={`${config.team.phase2.headcount} people (+4)`}
                color="secondary"
              />
              <DetailCard
                icon={DollarSign}
                label="Infrastructure"
                value={`${config.costs.currency}${config.costs.infrastructure.phase2.toLocaleString()}/mo`}
                color="secondary"
              />
              <DetailCard
                icon={TrendingUp}
                label="Focus"
                value="AI & Data"
                color="secondary"
              />
            </>
          )}
          {index === 2 && (
            <>
              <DetailCard
                icon={Users}
                label="Team Size"
                value={`${config.team.phase3.headcount} people (+4)`}
                color="accent"
              />
              <DetailCard
                icon={DollarSign}
                label="Infrastructure"
                value={`${config.costs.currency}${config.costs.infrastructure.phase3.toLocaleString()}/mo`}
                color="accent"
              />
              <DetailCard
                icon={TrendingUp}
                label="Target"
                value={`${config.roadmap.mvp.targetMetrics.policiesSold.toLocaleString()} policies`}
                color="accent"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
