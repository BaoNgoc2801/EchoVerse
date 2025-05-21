import { HeroSection } from "@/components/home/hero-section";
import { FeaturedStreams } from "@/components/home/featured-streams";
import { StreamCategories } from "@/components/home/stream-categories";
import { StreamerSpotlight } from "@/components/home/streamer-spotlight";
import { FaqSection } from "@/components/home/faq-section";
import { CallToAction } from "@/components/home/call-to-action";

export default function Home() {
    return (
        <div className="flex flex-col gap-10 pb-10">
            <HeroSection />
            <FeaturedStreams />
            <StreamCategories />
            <StreamerSpotlight />
            <FaqSection />
            <CallToAction />
        </div>
    );
}