"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { fetchContacts, Contact } from "@/services/chat-api";
import debounce from "lodash.debounce";
import { fetchUserProfile } from "@/services/profile-api";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allChannels, setAllChannels] = useState<Contact[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<Contact[]>([]);
  const [imgProfile, setImgProfile] = useState<string>("");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setAuthToken(token);
  }, []);

  useEffect(() => {
    const fetchUserImageProfile = async () => {
      if (!authToken) return setLoading(false);
      try {
        const res = await fetchUserProfile();
        if (res.profile.avatar) {
          setImgProfile(res.profile.avatar);
        } else {
          const firstLetter = res.profile.firstName?.charAt(0) || "U";
          setImgProfile(firstLetter);
        }
      } catch (error) {
        localStorage.removeItem("auth_token");
        setAuthToken(null);
      }
      setLoading(false);
    };

    fetchUserImageProfile();
  }, [authToken]);

  const handleSearchDebounced = debounce((query: string) => {
    const filtered = allChannels.filter((channel) =>
        channel.chanelName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredChannels(filtered);
  }, 300);

  useEffect(() => {
    const loadContacts = async () => {
      const contacts = await fetchContacts();
      setAllChannels(contacts);
    };
    loadContacts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearchDebounced(searchQuery);
    } else {
      setFilteredChannels([]);
    }
    return () => {
      handleSearchDebounced.cancel();
    };
  }, [searchQuery]);

  const handleGoLive = () => {
    router.push("/setup");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLiveStreamPage = pathname.startsWith("/stream/");

  return (
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="font-bold text-white">EV</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline-block text-foreground">
              EchoVerse
            </span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {["/", "/following", "/categories"].map((path, i) => (
                  <Link
                      key={path}
                      href={path}
                      className={cn(
                          "text-sm font-medium transition-colors hover:text-emerald-500",
                          pathname === path ? "text-emerald-500" : "text-muted-foreground"
                      )}
                  >
                    {["Home", "Following", "Categories"][i]}
                  </Link>
              ))}
            </div>
          </div>

          <form
              onSubmit={(e) => e.preventDefault()}
              className="hidden md:flex items-center max-w-sm flex-1 mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  type="search"
                  placeholder="Search streams..."
                  className="w-full pl-8 bg-background/60 border-input text-foreground placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />

              {filteredChannels.length > 0 && (
                  <div className="absolute top-full mt-1 w-full bg-black border border-border rounded shadow z-50 max-h-60 overflow-y-auto">
                    {filteredChannels.map((channel) => (
                        <Link
                            key={channel.userId}
                            href={`/chat`}
                            className="block px-4 py-2 hover:bg-muted text-foreground"
                            onClick={() => setSearchQuery("")}
                        >
                          {channel.chanelName}
                        </Link>
                    ))}
                  </div>
              )}
            </div>
          </form>

          <div className="flex items-center gap-2">
            {!isLiveStreamPage && (
                <Button
                    onClick={handleGoLive}
                    size="sm"
                    className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Go Live
                </Button>
            )}

            <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
                onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
                onClick={() => router.push("/chat")}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            {loading ? (
                <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
            ) : authToken ? (
                imgProfile.startsWith("http") ? (
                    <img
                        src={imgProfile}
                        alt="img-profile"
                        className="size-10 rounded-full"
                    />
                ) : (
                    <span className="p-2 rounded-full bg-black text-white">
                {imgProfile}
              </span>
                )
            ) : (
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => router.push("/auth/signin")}
                    className="text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Login
                </Button>
            )}
          </div>
        </div>
      </nav>
  );
}
