"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I start streaming?",
    answer: "To start streaming, create an account, go to your dashboard, click on the 'Go Live' button, set up your stream details, and connect your streaming software (OBS, Streamlabs, etc.) using your unique stream key."
  },
  {
    question: "What equipment do I need to stream?",
    answer: "For basic streaming, you need a computer that meets minimum requirements, a stable internet connection (at least 5Mbps upload speed), a microphone for audio, and optionally a webcam. More advanced setups might include lighting, green screens, and capture cards."
  },
  {
    question: "How do streamers make money?",
    answer: "Streamers can earn through multiple revenue streams: channel subscriptions, donations from viewers, ad revenue, sponsored content, affiliate marketing, merchandise sales, and brand partnerships."
  },
  {
    question: "What are the platform's rules and guidelines?",
    answer: "Our platform prohibits harmful, illegal, or offensive content. This includes harassment, hate speech, violence, adult content without proper age restrictions, copyright infringement, and sharing personal information without consent. All streamers must adhere to our Community Guidelines."
  },
  {
    question: "Can I stream from mobile devices?",
    answer: "Yes! We support mobile streaming. Download our mobile app, log in to your account, tap the 'Go Live' button, set your stream title and category, and start broadcasting directly from your smartphone or tablet."
  }
];

export function FaqSection() {
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
    
    const element = document.getElementById("faq-section");
    if (element) observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="faq-section"
      className={`bg-card py-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-2">Everything you need to know about streaming on our platform</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}