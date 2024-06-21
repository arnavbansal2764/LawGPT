import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
import Navbar from "@/components/main/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LawGPT",
  description: "Your AI law assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
          {/* <Navbar/> */}
          <ToastProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
