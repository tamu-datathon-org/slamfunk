import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Providers } from "./providers";
import Image from "next/image";
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
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Bayon&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white dark:bg-black min-h-screen">
        <div className="fixed inset-0 bg-[#1e3a5f]">
            <Image
                src="/background.svg"
                alt="Background"
                fill
                className="object-cover"
                priority
            />
        </div>

        <Providers>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
