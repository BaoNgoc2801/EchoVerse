"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Users, Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const featuredStreamers = [
  {
    id: 1,
    name: "GameMaster",
    username: "@gamemaster",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    followers: "245K",
    description: "Professional gamer specializing in FPS and Battle Royale games. Tournament winner and strategy expert.",
    tags: ["Gaming", "FPS", "Tournaments"],
    verified: true
  },
  {
    id: 2,
    name: "MelodyMaker",
    username: "@melodymaker",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    followers: "189K",
    description: "Singer-songwriter sharing live music sessions, covers, and original songs. Music production tutorials weekly.",
    tags: ["Music", "Singing", "Production"],
    verified: true
  },
  {
    id: 3,
    name: "ArtistAlly",
    username: "@artistally",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    followers: "132K",
    description: "Digital artist showcasing creative process, tutorials, and commissioned artwork. Weekly art challenges.",
    tags: ["Art", "Digital", "Tutorials"],
    verified: false
  },
  {
    id: 4,
    name: "TechGuru",
    username: "@techguru",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    followers: "310K",
    description: "Technology expert reviewing latest gadgets, coding tutorials, and industry insights. Q&A sessions every Friday.",
    tags: ["Tech", "Reviews", "Coding"],
    verified: true
  }
];

export function StreamerSpotlight() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById("streamer-spotlight");
    if (element) observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="streamer-spotlight"
      className={`container py-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Popular Creators</h2>
          <p className="text-muted-foreground mt-1">Discover trending streamers worth following</p>
        </div>
        <Button variant="ghost" className="hidden sm:flex items-center gap-2">
          View all creators <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredStreamers.map((streamer) => (
          <Link 
            key={streamer.id} 
            href={`/channel/${streamer.username}`}
            className="stream-card"
          >
            <div className="rounded-lg overflow-hidden bg-card border border-border h-full p-6 flex flex-col">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-primary">
                    <AvatarImage src={streamer.avatar} alt={streamer.name} />
                    <AvatarFallback>{streamer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {streamer.verified && (
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
                      <BadgeCheck className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg flex items-center justify-center gap-1">
                  {streamer.name}
                </h3>
                <p className="text-sm text-muted-foreground">{streamer.username}</p>
                <div className="flex items-center justify-center text-sm mt-1 text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  {streamer.followers} followers
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center mb-4 flex-grow line-clamp-3">
                {streamer.description}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {streamer.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button variant="outline" className="mt-4 w-full">
                Follow
              </Button>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center sm:hidden">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          View all creators <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}