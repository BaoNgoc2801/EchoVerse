"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CURRENT_USER } from "@/lib/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  const handleGoLive = () => {
    router.push("/setup");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLiveStreamPage = pathname.startsWith("/stream/");

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="font-bold text-white">EV</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">EchoVerse</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={cn(
              "text-sm font-medium transition-colors hover:text-emerald-500",
              pathname === "/" ? "text-emerald-500" : "text-muted-foreground"
            )}>
              Home
            </Link>
            <Link href="/following" className={cn(
              "text-sm font-medium transition-colors hover:text-emerald-500",
              pathname === "/following" ? "text-emerald-500" : "text-muted-foreground"
            )}>
              Following
            </Link>
            <Link href="/categories" className={cn(
              "text-sm font-medium transition-colors hover:text-emerald-500",
              pathname === "/categories" ? "text-emerald-500" : "text-muted-foreground"
            )}>
              Categories
            </Link>
          </div>
        </div>

        {/* Search Bar - Visible on larger screens */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-sm flex-1 mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search streams..."
              className="w-full pl-8 bg-background/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right Side Items */}
        <div className="flex items-center gap-2">
          {!isLiveStreamPage && (
            <Button
              onClick={handleGoLive}
              size="sm"
              className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Go Live
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/chat")}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.push("/profile")}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={CURRENT_USER.imageUrl} alt={CURRENT_USER.name} />
                <AvatarFallback>{CURRENT_USER.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search streams..."
                  className="w-full pl-8 bg-background/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className={cn(
                  "p-2 rounded-md hover:bg-accent",
                  pathname === "/" ? "bg-accent text-emerald-500" : ""
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/following"
                className={cn(
                  "p-2 rounded-md hover:bg-accent",
                  pathname === "/following" ? "bg-accent text-emerald-500" : ""
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Following
              </Link>
              <Link
                href="/categories"
                className={cn(
                  "p-2 rounded-md hover:bg-accent",
                  pathname === "/categories" ? "bg-accent text-emerald-500" : ""
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/chat"
                className={cn(
                  "p-2 rounded-md hover:bg-accent",
                  pathname === "/chat" ? "bg-accent text-emerald-500" : ""
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                href="/profile"
                className={cn(
                  "p-2 rounded-md hover:bg-accent",
                  pathname === "/profile" ? "bg-accent text-emerald-500" : ""
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>

              {!isLiveStreamPage && (
                <Button
                  onClick={() => {
                    handleGoLive();
                    setIsMenuOpen(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Go Live
                </Button>
              )}

              <div className="flex items-center justify-between p-2">
                <span className="text-sm">Toggle theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}