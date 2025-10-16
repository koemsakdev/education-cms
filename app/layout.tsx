import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EDU CMS",
  description: "Education CMS is a Content Management System for Education",
  icons: {
    icon: "/logo.svg",
  },
  keywords: [
    "Education",
    "CMS",
    "Content Management System",
    "Free Education CMS",
    "Next.js",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Free Education CMS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
