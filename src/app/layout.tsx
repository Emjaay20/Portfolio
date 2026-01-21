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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-swiss-bg text-swiss-charcoal selection:bg-international-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
