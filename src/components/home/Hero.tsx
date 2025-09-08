
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import dashboardImage from '@/assets/aquaguard-dashboard.jpg';
import Spline from '@splinetool/react-spline';
import SplineProvider from '../ui/splineProvider';

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 30 - 15;
      const y = (clientY / window.innerHeight) * 30 - 15;
      
      bgRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    // Intersection Observer for revealing the hero section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <div className="relative overflow-hidden  pt-24 pb-16 md:pb-20 lg:pt-32 lg:pb-24">
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none" style={{ transform: 'translateY(-300px)' }}>
        <SplineProvider>
          <Spline scene="https://prod.spline.design/kIEq55kPdfiYfLCV/scene.splinecode" />
        </SplineProvider>
      </div>
        
      <div 
        ref={bgRef}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5]/30 to-[#9089fc]/30 opacity-30"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <Container className="relative">
        <div 
          ref={heroRef} 
          className="max-w-2xl mx-auto text-center opacity-0"
        >
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-foreground/80 ring-1 ring-foreground/10 hover:ring-foreground/20 transition-all">
              <span className="hidden md:inline">
                AI-powered disease outbreak prevention technology
              </span>
              <span className="md:hidden">Disease outbreak prevention</span>
              <a href="#features" className="font-semibold text-primary ml-1">
                <span className="absolute inset-0" aria-hidden="true" />
                Learn more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-6">
            Protect Communities from Water-borne Disease
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-lg mx-auto">
            AquaGuard uses advanced AI to detect, track, and prevent water-borne disease outbreaks through real-time health monitoring and smart alerts.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="rounded-full group">
              <span>Request Demo</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              See How It Works
            </Button>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 relative overflow-hidden rounded-xl  shadow-xl ring-1 ring-foreground/5 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-blue-400/5 pointer-events-none"></div>
          
          <img
            src={dashboardImage}
            alt="AquaGuard Health Monitoring Dashboard showing real-time disease prevention analytics"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          
          {/* Overlay elements showing posture detection */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-md mx-auto px-4 py-3 bg-white/80 backdrop-blur-md rounded-lg border border-white/30 shadow-lg text-center">
              <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">AI Monitoring</div>
              <div className="text-lg font-semibold">Disease Outbreak Risk: Low</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
