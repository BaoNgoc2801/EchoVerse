"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, ArrowRight } from "lucide-react";

export function CallToAction() {
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

    const element = document.getElementById("cta-section");
    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="cta-section"
      className={`container py-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="rounded-xl overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 p-1">
        <div className="bg-background rounded-lg p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-2/3">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to start your streaming journey?</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Join thousands of content creators sharing their passion with the world. Start streaming today and build your community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">
                  <Video className="h-5 w-5" /> Create Account
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  Learn More <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="lg:w-1/3 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7869238/pexels-photo-7869238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Streaming setup"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}