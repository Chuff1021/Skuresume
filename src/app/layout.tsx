import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKU Resume AI Builder",
  description:
    "A free, AI-powered resume builder. Create stunning resumes with live preview, multiple templates, and intelligent content suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
