"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Users, 
  EyeIcon,
  Gamepad2, 
  Music, 
  HeartIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const featuredStreams = [
  {
    id: 1,
    title: "Grand Tournament Finals | Top Players Competing",
    thumbnail: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Gaming",
    categoryIcon: <Gamepad2 className="h-3 w-3 mr-1" />,
    streamer: {
      name: "GameMaster",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      followers: "245K"
    },
    viewers: 12485,
    isLive: true
  },
  {
    id: 2,
    title: "Live Music Session - Acoustic Covers",
    thumbnail: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Music",
    categoryIcon: <Music className="h-3 w-3 mr-1" />,
    streamer: {
      name: "MelodyMaker",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      followers: "189K"
    },
    viewers: 8721,
    isLive: true
  },
  {
    id: 3,
    title: "Speedrunning World Record Attempts",
    thumbnail: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Gaming",
    categoryIcon: <Gamepad2 className="h-3 w-3 mr-1" />,
    streamer: {
      name: "SpeedKing",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      followers: "320K"
    },
    viewers: 15231,
    isLive: true
  },
  {
    id: 4,
    title: "Cooking Show: Gourmet Recipes Made Easy",
    thumbnail: "https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Food",
    categoryIcon: <Gamepad2 className="h-3 w-3 mr-1" />,
    streamer: {
      name: "ChefMaster",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg",
      followers: "178K"
    },
    viewers: 6532,
    isLive: true
  },
];

export function FeaturedStreams() {
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
    
    const element = document.getElementById("featured-streams");
    if (element) observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <section 
      id="featured-streams" 
      className={`container py-12 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Featured Streams</h2>
          <p className="text-muted-foreground mt-1">Popular livestreams you don't want to miss</p>
        </div>
        <Button variant="ghost" className="hidden sm:flex items-center gap-2">
          See all <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {featuredStreams.map((stream) => (
            <CarouselItem key={stream.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Link href={`/stream/${stream.id}`}>
                <div className="stream-card overflow-hidden rounded-lg bg-card">
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                    {stream.isLive && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <Badge variant="destructive" className="flex items-center gap-1 px-2 py-0.5">
                          <span className="h-2 w-2 rounded-full bg-white live-indicator"></span>
                          LIVE
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1 px-2 py-0.5">
                          <EyeIcon className="h-3 w-3" />
                          {formatViewers(stream.viewers)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-primary">
                          <AvatarImage src={stream.streamer.avatar} alt={stream.streamer.name} />
                          <AvatarFallback>{stream.streamer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium truncate text-sm">{stream.streamer.name}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            {stream.streamer.followers} followers
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <HeartIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <h3 className="mt-3 font-semibold line-clamp-1">{stream.title}</h3>
                    
                    <div className="mt-3 flex items-center">
                      <Badge variant="outline" className="rounded-full text-xs flex items-center">
                        {stream.categoryIcon}
                        {stream.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
      
      <div className="mt-6 flex justify-center sm:hidden">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          See all featured streams <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}