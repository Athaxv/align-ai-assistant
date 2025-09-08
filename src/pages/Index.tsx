
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';
import Footer from '@/components/layout/Footer';

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    
    <div className="relative min-h-screen flex flex-col ">
      {/* Radial Gradient Background */}
  {/* Cool Blue Glow Top */}
 
  <div className="min-h-screen w-full relative">
  {/* Radial Gradient Background */}
  {/* <div
    className="absolute inset-0 z-[-1]"
    style={{
      background: "radial-gradient(125% 125% at 50% 10%, #93c5fd 0%, #2563eb 60%, #1e3a8a 100%)",
    }}
  /> */}
     {/* Your Content/Components */}

     <div className='relative z-10'>
        <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      </div>
</div>

      </div>
    // </div>
  );
};

export default Index;
