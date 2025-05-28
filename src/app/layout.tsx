import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-provider';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'EchoVerse - Livestream Platform',
    description: 'A modern livestreaming platform built with Next.js and Tailwind CSS',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={cn(
            inter.className,
            "min-h-screen bg-background text-foreground antialiased"
        )}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
        >
            <div className="relative min-h-screen bg-background">
                <Navbar />
                <main className="pt-16 bg-background">
                    {children}
                </main>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}