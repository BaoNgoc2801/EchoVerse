"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  Menu,
  Search,
  Video,
  VideoIcon,
  Gamepad2,
  Music,
  MonitorPlay,
  BookOpen,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Gaming", icon: <Gamepad2 className="w-4 h-4 mr-2" />, href: "/categories/gaming" },
  { name: "Music", icon: <Music className="w-4 h-4 mr-2" />, href: "/categories/music" },
  { name: "IRL", icon: <MonitorPlay className="w-4 h-4 mr-2" />, href: "/categories/irl" },
  { name: "Education", icon: <BookOpen className="w-4 h-4 mr-2" />, href: "/categories/education" },
  { name: "Creative", icon: <Palette className="w-4 h-4 mr-2" />, href: "/categories/creative" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-200",
      isScrolled || pathname !== "/"
        ? "bg-background/95 backdrop-blur-md border-b"
        : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <VideoIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">StreamHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/browse" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Browse
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <Link href={category.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              pathname === category.href && "bg-accent text-accent-foreground"
                            )}
                          >
                            <div className="flex items-center">
                              {category.icon}
                              <div className="text-sm font-medium leading-none">
                                {category.name}
                              </div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/following" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Following
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search */}
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <input
              type="search"
              placeholder="Search streams, channels..."
              className="w-full pl-10 py-2 bg-muted text-sm rounded-full border border-input focus:border-primary focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Go Live</span>
          </Button>

          <Link href="/login">
            <Button variant="default" size="sm">Sign In</Button>
          </Link>

          <ModeToggle />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Navigate</h4>
                  <div className="flex flex-col space-y-1">
                    <Link href="/browse" className="py-2 text-foreground hover:text-primary transition-colors">
                      Browse
                    </Link>
                    <Link href="/following" className="py-2 text-foreground hover:text-primary transition-colors">
                      Following
                    </Link>
                    <Link href="/go-live" className="py-2 text-foreground hover:text-primary transition-colors">
                      Go Live
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Categories</h4>
                  <div className="flex flex-col space-y-1">
                    {categories.map((category) => (
                      <Link key={category.name} href={category.href} className="py-2 flex items-center text-foreground hover:text-primary transition-colors">
                        {category.icon}
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <Button className="w-full" variant="default">
                    Sign In
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}