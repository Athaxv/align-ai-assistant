
import React from 'react';
import { Camera, Users, Activity, Brain, BarChart, Zap } from 'lucide-react';
import Container from '../ui/Container';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: <Activity className="h-6 w-6 text-primary" />,
      title: 'Real-time Health Data Collection',
      description: 'Clinics and community health volunteers submit health data through our secure mobile and web platforms for instant monitoring.',
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: 'AI Disease Pattern Detection',
      description: 'Advanced machine learning algorithms analyze health data patterns to identify potential disease outbreak indicators before they spread.',
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: 'Water Quality Sensor Integration',
      description: 'IoT sensors monitor water quality parameters including pH, turbidity, and bacterial levels to detect contamination sources.',
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Multi-language Alert System',
      description: 'Instant notifications sent to communities and health officials in local languages via SMS, app, and voice messages.',
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: 'Community Health Dashboard',
      description: 'Visual analytics and reporting tools for health officials to track outbreaks, allocate resources, and monitor intervention success.',
    },
    {
      icon: <Camera className="h-6 w-6 text-primary" />,
      title: 'Predictive Risk Assessment',
      description: 'Early warning system uses historical data and environmental factors to predict high-risk areas and timeframes for outbreaks.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-accent/50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Disease Prevention Technology
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our integrated monitoring system combines real-time health data, water quality sensors, and AI-powered analytics to protect vulnerable communities from water-borne disease outbreaks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
