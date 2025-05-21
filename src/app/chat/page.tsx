"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONVERSATIONS, CURRENT_USER } from "@/lib/constants";
import { Conversation } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Search, Plus, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = CONVERSATIONS.filter(
    (conv) => {
      const otherParticipant = conv.participantOne.id === CURRENT_USER.id 
        ? conv.participantTwo 
        : conv.participantOne;
        
      return otherParticipant.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  );
  
  const handleStartNewChat = () => {
    console.log("Start new chat");
  };
  
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Sidebar */}
          <div className="border-r border-border">
            <div className="p-4 border-b border-border">
              <h1 className="text-xl font-bold mb-4">Messages</h1>
              
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={handleStartNewChat}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Conversation
              </Button>
            </div>
            
            <div className="h-[calc(100vh-16rem)] overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => {
                  const otherParticipant = conversation.participantOne.id === CURRENT_USER.id 
                    ? conversation.participantTwo 
                    : conversation.participantOne;
                  
                  return (
                    <ConversationItem 
                      key={conversation.id}
                      conversation={conversation}
                      otherParticipant={otherParticipant}
                    />
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Empty State */}
          <div className="col-span-2 h-[calc(100vh-10rem)] flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-muted-foreground mb-6">
                Select a conversation from the sidebar or start a new one to send messages to your friends and fellow streamers.
              </p>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleStartNewChat}
              >
                <Plus className="mr-2 h-4 w-4" />
                Start a New Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationItem({ 
  conversation, 
  otherParticipant 
}: { 
  conversation: Conversation; 
  otherParticipant: { id: string; name: string; username: string; imageUrl: string; isLive?: boolean } 
}) {
  const router = useRouter();

  return (
    <Link 
      href={`/chat/${conversation.id}`}
      className={cn(
        "flex items-start gap-3 p-4 transition-colors hover:bg-accent/50",
        conversation.unreadCount && conversation.unreadCount > 0 
          ? "bg-accent/30" 
          : "bg-transparent"
      )}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={otherParticipant.imageUrl} alt={otherParticipant.name} />
          <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {otherParticipant.isLive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium truncate">{otherParticipant.name}</h3>
          {conversation.lastMessage && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
            </span>
          )}
        </div>
        
        {conversation.lastMessage && (
          <p className="text-sm text-muted-foreground truncate">
            {conversation.lastMessage.content}
          </p>
        )}
      </div>
      
      {conversation.unreadCount && conversation.unreadCount > 0 && (
        <Badge className="bg-emerald-600 hover:bg-emerald-600 rounded-full min-w-[1.5rem] h-[1.5rem] flex items-center justify-center">
          {conversation.unreadCount}
        </Badge>
      )}
    </Link>
  );
}

// This is a separate component to avoid duplicate imports
function MessageSquare(props: any) {
  return <MessageSquare {...props} />;
}