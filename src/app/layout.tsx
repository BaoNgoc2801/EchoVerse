// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Your App",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="mdl-js">
        <body className={inter.className}>
        <Theme
            appearance="dark"
            accentColor="purple"
            grayColor="mauve"
            radius="none"
        >
            {children}
            <ThemePanel defaultOpen={false} />
        </Theme>
        </body>
        </html>
    );
}
