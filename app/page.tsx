"use client";

import Navigation from "@/components/Navigation";
import { config } from "@/config/settings";
import { ArrowRight, Zap, Target, TrendingUp, Shield, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Centered, clean typography */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white -z-10" />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium">
              <span>{config.document.classification}</span>
              <span className="w-1 h-1 rounded-full bg-primary-400" />
              <span>v{config.document.version}</span>
            </div>

            {/* Main Heading - Better typography */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-gray-900">{config.company.name}</span>
                <br />
                <span className="bg-gradient-to-r from-[#07a9ae] to-[#ff6600] bg-clip-text text-transparent">
                  Technology Architecture
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-900 font-semibold max-w-3xl mx-auto">
                AI-Native Pet Insurance Platform
              </p>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Building the Future of Insurance with Agentic AI,<br className="hidden sm:block" />
                Real-Time Data, and Customer-Centric Design
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/architecture"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Explore Architecture</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/agentic-ai"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
              >
                <span>Agentic AI Platform</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Differentiators - Enterprise card design */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Competitive Differentiators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How our architecture enables market-leading capabilities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="relative group"
            >
              <div className="h-full p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100">
                    <Zap className="w-8 h-8 text-primary-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Agentic AI</h3>
                  <div className="text-4xl font-bold text-primary-600">85%</div>
                  <p className="text-sm uppercase tracking-wide text-primary-600 font-semibold">Automation</p>
                  <p className="text-gray-600 leading-relaxed pt-2">
                    Multi-agent system handling quotes, claims, and customer service autonomously
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="h-full p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Fast Claims</h3>
                  <div className="text-4xl font-bold text-orange-600">&lt;4h</div>
                  <p className="text-sm uppercase tracking-wide text-orange-600 font-semibold">Processing Time</p>
                  <p className="text-gray-600 leading-relaxed pt-2">
                    AI-powered auto-adjudication with OCR and fraud detection
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="h-full p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Rapid Experimentation</h3>
                  <div className="text-4xl font-bold text-blue-600">4+</div>
                  <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Tests/Month</p>
                  <p className="text-gray-600 leading-relaxed pt-2">
                    Built-in A/B testing framework for continuous optimization
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="h-full p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Customer Understanding</h3>
                  <div className="text-4xl font-bold text-green-600">360°</div>
                  <p className="text-sm uppercase tracking-wide text-green-600 font-semibold">Data View</p>
                  <p className="text-gray-600 leading-relaxed pt-2">
                    Real-time data platform with predictive analytics and personalization
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four Strategic Pillars - Clean layout */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Four Strategic Pillars
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The foundation of our AI-native architecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Community-First CX</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Deep understanding of pet owners through personalized journeys, persona-driven UX, and continuous engagement loops
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Persona-aware experiences', 'Real-time personalization', 'Proactive engagement'].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium">
                        <Check className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Data & AI Native</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Embedded intelligence across pricing, underwriting, claims, and customer interactions using modern ML/AI and agentic architectures
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['ML-powered pricing', 'Agentic workflows', 'Predictive analytics'].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-sm font-medium">
                        <Check className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Automation at Scale</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    End-to-end process automation from quote-to-claim, enabling speed, consistency, and operational leverage
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Auto-adjudication', 'Smart routing', '85%+ automation'].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
                        <Check className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Composable & Extensible</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    API-first, event-driven architecture that enables rapid experimentation, A/B testing, and seamless third-party integration
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Event-driven core', 'API-first design', 'Rapid experimentation'].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
                        <Check className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MVP Timeline - Modern design */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Roadmap to MVP
            </h2>
            <p className="text-xl text-gray-300">
              3 Quarters to Market Launch • February - October 2026
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {config.roadmap.quarters.map((quarter, index) => (
              <motion.div
                key={quarter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-400 mb-1">{quarter.name}</div>
                    <h3 className="text-2xl font-bold">{quarter.label}</h3>
                  </div>

                  <ul className="space-y-3">
                    {quarter.keyMilestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              <span>View Full Roadmap</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Ready to Explore?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deep into our architecture, evaluate build vs buy decisions, and understand how we're building the future of pet insurance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>5-Layer Architecture</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/decisions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
            >
              <span>Build vs Buy Matrix</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            {config.document.classification} • Last Updated: {config.document.lastUpdated}
          </p>
        </div>
      </footer>
    </div>
  );
}
