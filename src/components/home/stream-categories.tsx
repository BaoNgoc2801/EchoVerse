"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Gamepad2, 
  Music, 
  Palette, 
  Tv, 
  HeartPulse, 
  BookOpen, 
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Gaming",
    icon: <Gamepad2 className="h-6 w-6" />,
    image: "https://images.pexels.com/photos/596750/pexels-photo-596750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: "450K",
    channels: 3200,
    color: "from-emerald-500 to-emerald-700"
  },
  {
    id: 2,
    name: "Music",
    icon: <Music className="h-6 w-6" />,
    image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: "120K",
    channels: 1800,
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 3,
    name: "Creative",
    icon: <Palette className="h-6 w-6" />,
    image: "https://images.pexels.com/photos/5767589/pexels-photo-5767589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: "85K",
    channels: 1200,
    color: "from-purple-500 to-purple-700"
  },
  {
    id: 4,
    name: "IRL",
    icon: <Tv className="h-6 w-6" />,
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: "250K",
    channels: 2100,
    color: "from-orange-500 to-orange-700"
  },
  {
    id: 5,
    name: "Health & Fitness",
    icon: <HeartPulse className="h-6 w-6" />,
    image: "https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: "75K",
    channels: 950,
    color: "from-red-500 to-red-700"
  },
  {
    id: 6,
    name: "Education",
    icon: <BookOpen className="h-6 w-6" />,
    image: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: "100K",
    channels: 1500,
    color: "from-yellow-500 to-yellow-700"
  }
];

export function StreamCategories() {
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
    
    const element = document.getElementById("stream-categories");
    if (element) observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="stream-categories"
      className={`bg-muted py-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Explore Categories</h2>
            <p className="text-muted-foreground mt-1">Discover streams by your favorite categories</p>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-2">
            View all categories <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.name.toLowerCase()}`}
              className="group stream-card"
            >
              <div className="relative rounded-lg overflow-hidden bg-card border border-border h-full">
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-background/60 to-background/90" />
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />
                
                <div className="absolute inset-0 flex items-end p-6 z-20">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{category.name}</h3>
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {category.icon}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {category.viewers} viewers
                      </div>
                      <div>
                        {category.channels} channels
                      </div>
                    </div>
                  </div>
                </div>
                
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            View all categories <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}