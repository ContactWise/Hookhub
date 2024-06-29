import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { EnvironmentProvider } from "@/context/envContext";
import ReactQueryWrapper from "@/components/reactQueryWrapper";
import { QueryClient } from "@tanstack/react-query";
import { getTenants } from "@/queries/getUserDetails";
import AuthWrapper from "@/components/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hookhub",
  description:
    "The Hookhub project aims to create a Scalable Webhook Notification Service (SWNS) that provides a robust, scalable, and user-friendly platform for businesses to send and manage webhook notifications.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <AuthWrapper>
        <ReactQueryWrapper>
          <EnvironmentProvider>
            <Toaster />
            {/* <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      > */}
            <body className={inter.className}>{children}</body>
          </EnvironmentProvider>
        </ReactQueryWrapper>
      </AuthWrapper>

      {/* </ThemeProvider> */}
    </html>
  );
}
