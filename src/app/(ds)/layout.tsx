import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { SideNav } from "@/components/SideNav";
import { MobileHeader } from "@/components/MobileHeader";

export const metadata: Metadata = {
  title: "Mindora - Workplace Wellness",
  description: "Manage workplace stress and boost productivity with Mindora",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          {/* Desktop Sidebar */}
          <SideNav />

          {/* Mobile Header */}
          <MobileHeader />

          {/* Main Content */}
          <main className="lg:pl-64">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}