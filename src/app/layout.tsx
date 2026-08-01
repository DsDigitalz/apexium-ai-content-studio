import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apexium AI Content Studio",
  description: "High-performance Apple-designed AI content studio for enterprise teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0c] text-neutral-100 font-sans selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
