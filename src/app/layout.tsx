import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "SKU Resume AI Builder",
  description:
    "A free, AI-powered resume builder. Create stunning resumes with live preview, multiple templates, and intelligent content suggestions.",
  openGraph: {
    title: "SKU Resume AI Builder",
    description:
      "A free, AI-powered resume builder. Create stunning resumes with live preview, multiple templates, and intelligent content suggestions.",
    type: "website",
    siteName: "SKU Resume AI Builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKU Resume AI Builder",
    description:
      "A free, AI-powered resume builder. Create stunning resumes with live preview, multiple templates, and intelligent content suggestions.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
