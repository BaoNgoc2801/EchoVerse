"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Stream } from "@/lib/types";
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
  const {
    title,
    thumbnailUrl,
    viewerCount,
    user,
    isLive,
    createdAt,
    category,
  } = stream;

  const handleClick = () => {
    if (isLive) {
      router.push(
        `/stream?title=${encodeURIComponent(
          title
        )}&category=${encodeURIComponent(category)}`
      );
    } else {
      console.log("This stream is no longer live");
    }
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] border-0 bg-gray-800 dark:bg-gray-800 bg-black shadow-lg shadow-black/50 light:shadow-white/50 shadow-gray-200/20"
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
              <Badge className="bg-red-500 hover:bg-red-500 text-white">
                LIVE
              </Badge>
            )}
            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">
              {category}
            </Badge>
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
              <h3 className="font-semibold line-clamp-1 text-white dark:text-white text-gray-900">
                {title}
              </h3>
              <p className="text-sm text-gray-400 dark:text-gray-400 text-gray-600">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 text-gray-500">
                {isLive
                  ? "Streaming now"
                  : `Streamed ${formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                    })}`}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
