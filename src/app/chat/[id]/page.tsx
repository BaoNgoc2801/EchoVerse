"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONVERSATIONS, CURRENT_USER, MESSAGES } from "@/lib/constants";
import { Message } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, MoreVertical, Send, Phone, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatConversationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const conversation = CONVERSATIONS.find(c => c.id === params.id);

  if (!conversation) {
    router.push("/chat");
    return null;
  }

  const otherParticipant = conversation.participantOne.id === CURRENT_USER.id 
    ? conversation.participantTwo 
    : conversation.participantOne;

  useEffect(() => {
    // Get messages for this conversation
    const conversationMessages = MESSAGES[params.id] || [];
    setMessages(conversationMessages);

    // Scroll to the bottom of the chat
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  }, [params.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      senderId: CURRENT_USER.id,
      receiverId: otherParticipant.id,
      timestamp: new Date().toISOString(),
      senderName: CURRENT_USER.name,
      senderImage: CURRENT_USER.imageUrl,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    // Scroll to the bottom
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="flex flex-col h-[calc(100vh-10rem)]">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
                onClick={() => router.push("/chat")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <Avatar>
                <AvatarImage src={otherParticipant.imageUrl} alt={otherParticipant.name} />
                <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="font-semibold">{otherParticipant.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {otherParticipant.isLive ? "Currently Live" : "Offline"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.senderId === CURRENT_USER.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.senderId === CURRENT_USER.id ? 'flex-row-reverse' : ''}`}>
                    {message.senderId !== CURRENT_USER.id && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.senderImage} alt={message.senderName} />
                        <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      <div 
                        className={`px-4 py-2 rounded-lg ${
                          message.senderId === CURRENT_USER.id 
                            ? 'bg-emerald-600 text-white rounded-tr-none' 
                            : 'bg-accent rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="p-3 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}