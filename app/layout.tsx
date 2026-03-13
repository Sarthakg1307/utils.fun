import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s ${siteConfig.titleSeparator} ${siteConfig.title}`,
  },
  applicationName: siteConfig.title,
  description: siteConfig.description,
  icons: siteConfig.logo
    ? {
        icon: siteConfig.logo.src,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="font-sans">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
