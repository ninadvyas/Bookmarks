import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/nextjs'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider>
      <Component {...pageProps} />
      <Toaster />
      </ClerkProvider>
    </>
  );
}
