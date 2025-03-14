import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Providers } from "./providers";

import "styles/globals.css";

export const metadata: Metadata = {
  title: "TAMU Datathon March Madness Mania",
  description: "TAMU Datathon's exciting March Madness competition!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/tdlogo.png" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white dark:bg-black min-h-screen">
        <Providers>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
