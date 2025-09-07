import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import { Button } from '../ui/Button';

const CTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div 
          ref={ctaRef}
          className="relative rounded-2xl overflow-hidden reveal-animation"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-600/90"></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10 py-16 px-6 sm:py-24 sm:px-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Ready to protect your community?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
              Join health organizations worldwide using AquaGuard to prevent water-borne disease outbreaks and save lives.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="rounded-full bg-white text-primary hover:bg-white/90 group"
              >
                <span>Request Demo</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-white/30 text-white hover:bg-white/10"
              >
                Contact Health Team
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
