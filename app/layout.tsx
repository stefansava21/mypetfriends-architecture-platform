import type { Metadata } from "next";
import "./globals.css";
import { config } from "@/config/settings";

export const metadata: Metadata = {
  title: `${config.company.name} - ${config.company.tagline} | Architecture Platform`,
  description: config.company.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
