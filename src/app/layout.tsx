import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { QueryClient } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next With Void",
  description: "Learn Next With Void",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
