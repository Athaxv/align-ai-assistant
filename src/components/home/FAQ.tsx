import React, { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Container from '../ui/Container';

const FAQ = () => {
  const faqRef = useRef<HTMLDivElement>(null);

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

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) observer.unobserve(faqRef.current);
    };
  }, []);

  const faqs = [
    {
      question: "How does the system detect disease outbreaks?",
      answer: "Our AI analyzes health data patterns from multiple sources including clinic reports, community health volunteer submissions, and water quality sensors. The machine learning algorithms identify unusual patterns in symptoms, geographical clusters, and environmental factors that may indicate the start of an outbreak."
    },
    {
      question: "What types of water sensors are supported?",
      answer: "AquaGuard integrates with various IoT water quality sensors that measure pH levels, turbidity, bacterial counts, chemical contaminants, and temperature. The system supports both wireless and cellular-connected sensors for remote monitoring in areas with limited connectivity."
    },
    {
      question: "How accurate is the AI prediction model?",
      answer: "Our AI model has demonstrated 85% accuracy in early outbreak detection based on pilot programs across multiple regions. The system continuously learns from new data to improve prediction accuracy and reduce false positives while maintaining high sensitivity to actual outbreaks."
    },
    {
      question: "Can the system work in remote areas with limited internet?",
      answer: "Yes, AquaGuard is designed for challenging environments. The mobile app works offline and syncs data when connectivity is available. We also support SMS alerts and satellite communication options for the most remote locations."
    },
    {
      question: "What languages are supported for alerts?",
      answer: "The system currently supports over 20 languages including major regional languages in Africa, Asia, and Latin America. Alerts can be customized by region and delivered via SMS, voice calls, mobile app notifications, and community bulletin boards."
    },
    {
      question: "How is patient data privacy protected?",
      answer: "All health data is encrypted using military-grade security and stored in compliance with international privacy standards. Personal identifying information is separated from health metrics, and data access is restricted based on role-based permissions for healthcare workers and officials."
    },
    {
      question: "What training is required for health workers?",
      answer: "We provide comprehensive training programs including online modules, mobile app tutorials, and on-site training sessions. Most health workers can become proficient with the basic data collection features within 2-3 hours of training."
    },
    {
      question: "How quickly can alerts be sent during an outbreak?",
      answer: "Once our AI detects a potential outbreak pattern, alerts are automatically sent within 5-10 minutes to all relevant stakeholders including health officials, community leaders, and affected populations through multiple communication channels."
    }
  ];

  return (
    <section id="faq" className="section bg-muted/30">
      <Container>
        <div 
          ref={faqRef}
          className="max-w-4xl mx-auto reveal-animation"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about AquaGuard's disease monitoring and prevention technology.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border px-6 py-2"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;