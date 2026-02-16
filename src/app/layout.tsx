import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Yusuf Saka — Product Engineer · Software Architect · Systems Researcher",
  description:
    "Designing and building product-grade systems with engineering rigor and research depth.",
};

import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-swiss-bg text-swiss-charcoal selection:bg-international-orange selection:text-white min-h-screen flex flex-col">
        <ConditionalHeader />
        <main className="flex-1 w-full">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
