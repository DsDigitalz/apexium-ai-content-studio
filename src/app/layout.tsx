import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apexium AI Content Studio",
  description: "High-performance AI generation interface for enterprise content creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
