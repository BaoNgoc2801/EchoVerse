"use client";

// import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {  Stream } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Users } from "lucide-react";

interface StreamCardProps {
  stream: Stream;
}

export function StreamCard({ stream }: StreamCardProps) {
  const router = useRouter();
  const { title, thumbnailUrl, viewerCount, user, isLive, createdAt, category } = stream;

  const handleClick = () => {
    if (isLive) {
      router.push(`/stream?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`);
    } else {
      // In a real app, maybe show past broadcast or show a message
      console.log("This stream is no longer live");
    }
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] bg-card border-border"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-video overflow-hidden relative">
            <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover"
            />

          </div>

          <div className="absolute top-2 left-2 flex gap-2">
            {isLive && (
              <Badge className="bg-red-500 hover:bg-red-500 text-white">LIVE</Badge>
            )}
            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">{category}</Badge>
          </div>

          {isLive && (
            <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
              <Users className="h-3 w-3" />
              {viewerCount.toLocaleString()}
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <h3 className="font-semibold line-clamp-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                {isLive
                  ? "Streaming now"
                  : `Streamed ${formatDistanceToNow(new Date(createdAt), { addSuffix: true })}`
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}