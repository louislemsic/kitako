import type { Metadata } from "next";
import { primaryFont } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Kitako | Privacy-First Expense Tracker",
  description: "Track your expenses privately, entirely in your browser.",
  openGraph: {
    title: "Kitako | Privacy-First Expense Tracker",
    description: "Track your expenses privately, entirely in your browser.",
    images: [
      {
        url: "https://i.imgur.com/cPUQ5PW.png",
        width: 1200,
        height: 630,
        alt: "Kitako",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    description: "Track your expenses privately, entirely in your browser.",
    images: ["https://i.imgur.com/cPUQ5PW.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primaryFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
