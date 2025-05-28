"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <Button variant="ghost" size="icon" className="text-foreground">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
    );
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-foreground">
            {resolvedTheme === 'dark' ? (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border-border">
          <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer hover:bg-accent"
          >
            <Sun className="h-4 w-4 mr-2" />
            Light
            {theme === "light" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer hover:bg-accent"
          >
            <Moon className="h-4 w-4 mr-2" />
            Dark
            {theme === "dark" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="cursor-pointer hover:bg-accent"
          >
            <Monitor className="h-4 w-4 mr-2" />
            System
            {theme === "system" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}