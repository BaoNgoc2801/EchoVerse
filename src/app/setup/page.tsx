"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Camera, ScreenShare, Settings, ShieldAlert } from "lucide-react";

export default function LivestreamSetup() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mediaType, setMediaType] = useState<"webcam" | "screen">("webcam");
  const [previewActive, setPreviewActive] = useState(false);

  const startPreview = async () => {
    try {
      setPreviewActive(true);
      // In a real application, we would actually connect to the user's camera here
      console.log(`Starting preview with ${mediaType}`);
    } catch (error) {
      console.error("Failed to start preview:", error);
      setPreviewActive(false);
    }
  };

  const stopPreview = () => {
    setPreviewActive(false);
    // Clean up any media streams in a real app
  };

  const handleStartStream = () => {
    if (!title || !category) {
      return;
    }

    setIsLoading(true);
    
    // Navigate to the stream page with query parameters
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/stream?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`);
    }, 1500);
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Set Up Your Livestream</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Stream Preview</CardTitle>
              <CardDescription>
                Check your camera, lighting, and audio before going live
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black/90 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                {previewActive ? (
                  <div className="relative w-full h-full bg-gradient-to-r from-emerald-500/10 to-emerald-700/10 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-emerald-400">Preview Active</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {mediaType === "webcam" ? "Camera" : "Screen"} is being displayed
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">No preview active</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click the button below to start your preview
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={mediaType === "webcam" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMediaType("webcam")}
                      className={mediaType === "webcam" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      Camera
                    </Button>
                    <Button
                      variant={mediaType === "screen" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMediaType("screen")}
                      className={mediaType === "screen" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      <ScreenShare className="h-4 w-4 mr-1" />
                      Screen
                    </Button>
                  </div>
                  
                  <Button
                    variant={previewActive ? "destructive" : "default"}
                    onClick={previewActive ? stopPreview : startPreview}
                    className={previewActive ? "" : "bg-emerald-600 hover:bg-emerald-700"}
                  >
                    {previewActive ? "Stop Preview" : "Start Preview"}
                  </Button>
                </div>

                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="flex items-start space-x-2">
                    <ShieldAlert className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Stream Responsibly</h4>
                      <p className="text-xs text-muted-foreground">
                        Ensure your content follows our community guidelines and that you have permission to stream any copyrighted material.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Configure additional stream settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Stream Quality</span>
                    </div>
                    <Select defaultValue="720p">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1080p">1080p</SelectItem>
                        <SelectItem value="720p">720p</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="360p">360p</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stream Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Stream Details</CardTitle>
              <CardDescription>
                Add information about your stream to help viewers find it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Stream Title <span className="text-destructive">*</span></Label>
                  <Input
                    id="title"
                    placeholder="Enter an engaging title for your stream"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Music">Music</SelectItem>
                      <SelectItem value="Talk Shows">Talk Shows</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell viewers more about your stream..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Briefly describe what viewers can expect from your stream.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g. tutorial, gameplay, beginner-friendly"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add tags to help viewers discover your content.
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button
                onClick={handleStartStream}
                disabled={!title || !category || isLoading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading ? "Preparing Stream..." : "Start Streaming"} 
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}