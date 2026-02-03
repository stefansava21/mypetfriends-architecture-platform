"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "@/config/settings";
import { Home, Layers, Bot, TrendingUp, FileCheck, GitBranch } from "lucide-react";

const navItems = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/architecture", label: "Architecture", icon: Layers },
  { href: "/agentic-ai", label: "Agentic AI", icon: Bot },
  { href: "/roadmap", label: "Roadmap", icon: TrendingUp },
  { href: "/decisions", label: "Build vs Buy", icon: FileCheck },
  { href: "/integrations", label: "Integrations", icon: GitBranch },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-lg">{config.company.name}</div>
              <div className="text-xs text-gray-500 -mt-0.5">{config.company.tagline}</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary-50 text-primary-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Version Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-xs text-gray-500 font-medium">
              v{config.document.version} • {config.document.date}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Can be expanded later */}
    </nav>
  );
}
