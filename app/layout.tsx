import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
const font = Urbanist({ subsets: ["latin"] });
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
        <body className={`${font.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>

  );
}
