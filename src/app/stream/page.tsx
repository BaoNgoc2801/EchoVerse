"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CURRENT_USER, USERS } from "@/lib/constants";
import { Heart, MessageSquare, Share2, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  user: {
    name: string;
    imageUrl: string;
  };
  content: string;
  timestamp: Date;
}

export default function StreamPage() {
  const searchParams = useSearchParams();
  const streamTitle = searchParams.get("title") || "Live Stream";
  const streamCategory = searchParams.get("category") || "Gaming";
  
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [viewerCount, setViewerCount] = useState(Math.floor(Math.random() * 2000) + 100);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Simulate increasing viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 20) - 5;
        return Math.max(100, prev + change);
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate incoming chat messages
  useEffect(() => {
    const messages: ChatMessage[] = [
      {
        id: "1",
        user: { name: "GamingFan23", imageUrl: "" },
        content: "Hi everyone! Excited for the stream today!",
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: "2",
        user: { name: "StreamLover", imageUrl: "" },
        content: "Great content as always!",
        timestamp: new Date(Date.now() - 30000),
      },
      {
        id: "3",
        user: { name: "TechGuru", imageUrl: "" },
        content: "What settings are you using?",
        timestamp: new Date(Date.now() - 10000),
      },
    ];
    
    setChatMessages(messages);
    
    const interval = setInterval(() => {
      const randomUser = USERS[Math.floor(Math.random() * USERS.length)];
      const randomMessages = [
        "Nice stream!",
        "Hello from Germany!",
        "First time watching, love the content!",
        "Can you explain what you're doing?",
        "LOL 😂",
        "That was awesome!",
        "Incredible play!",
        "What's your strategy here?",
        "How long have you been streaming?",
        "Great to catch you live!",
      ];
      
      const newMessage: ChatMessage = {
        id: Math.random().toString(),
        user: { 
          name: randomUser.name,
          imageUrl: randomUser.imageUrl,
        },
        content: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, newMessage]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Math.random().toString(),
      user: { 
        name: CURRENT_USER.name,
        imageUrl: CURRENT_USER.imageUrl,
      },
      content: message,
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessage("");
  };
  
  return (
    <div className="container mx-auto px-0 md:px-4 py-0 md:py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 md:gap-4">
        {/* Stream Video */}
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black lg:rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">GL</span>
                </div>
                <h3 className="text-white text-lg">Live Stream Active</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  In a real application, the video stream would appear here
                </p>
              </div>
            </div>
            
            {/* Stream Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 border-2 border-emerald-500">
                  <AvatarImage src={CURRENT_USER.imageUrl} alt={CURRENT_USER.name} />
                  <AvatarFallback>{CURRENT_USER.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-semibold">{CURRENT_USER.name}</h3>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-red-500 hover:bg-red-500/90">LIVE</Badge>
                    <p className="text-xs text-white/80">{viewerCount.toLocaleString()} viewers</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-white/10 hover:bg-white/20 border-none text-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={isFollowing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={isFollowing ? "bg-emerald-600 hover:bg-emerald-700" : "bg-white/10 hover:bg-white/20 border-none text-white"}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h1 className="text-2xl font-bold">{streamTitle}</h1>
            <div className="flex items-center gap-3 mt-2 mb-4">
              <Badge className="bg-emerald-600 hover:bg-emerald-600">{streamCategory}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {viewerCount.toLocaleString()} viewers
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-t border-b py-4 mb-4">
              <Button variant="ghost" className="gap-2">
                <Heart className="h-5 w-5" />
                Like
              </Button>
              <Button variant="ghost" className="gap-2">
                <Share2 className="h-5 w-5" />
                Share
              </Button>
              <Button variant="ghost" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                Comment
              </Button>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">About this stream</h2>
              <p className="text-muted-foreground">
                Join me for an exciting livestream session! We'll be exploring new content, answering your questions, and having a great time together. Don't forget to follow for notifications when I go live.
              </p>
            </div>
          </div>
        </div>
        
        {/* Chat */}
        <div className="bg-background border-t lg:border-0 lg:rounded-lg border border-border overflow-hidden h-[600px] lg:h-auto flex flex-col">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Live Chat</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {Math.floor(viewerCount * 0.7).toLocaleString()} chatting
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2">
                  <Avatar className="h-6 w-6 mt-0.5">
                    <AvatarImage src={msg.user.imageUrl} alt={msg.user.name} />
                    <AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{msg.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Send a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Chat
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}