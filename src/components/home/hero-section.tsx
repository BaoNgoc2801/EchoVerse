"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      </div>
      
      <div className="container relative h-full flex items-center">
        <div className="max-w-2xl">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Live now: 2,400+ streams</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Watch &amp; Create <span className="text-primary">Livestreams</span> for Any Passion
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Join our community of creators and viewers. Stream your talents, games, music, and more to a supportive audience or discover amazing content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4" /> Watch Streams
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                Start Streaming <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${i}/200`}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="font-medium text-foreground">10K+</span> creators already streaming
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}