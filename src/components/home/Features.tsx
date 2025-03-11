
import React from 'react';
import { Camera, Users, Activity, Brain, BarChart, Zap } from 'lucide-react';
import Container from '../ui/Container';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: <Camera className="h-6 w-6 text-primary" />,
      title: 'Real-time Posture Detection',
      description: 'Advanced AI algorithms detect incorrect postures in real-time using your webcam or uploaded videos.',
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: 'AI Virtual Trainer',
      description: 'A 3D virtual trainer guides you through exercises with personalized corrections.',
    },
    {
      icon: <Activity className="h-6 w-6 text-primary" />,
      title: 'Personalized Feedback',
      description: 'Receive instant feedback and recommendations tailored to your specific posture issues.',
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: 'Progress Tracking',
      description: 'Track your improvement over time with detailed analytics and visual progress charts.',
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: 'Custom Workout Plans',
      description: 'AI-generated workout plans customized to address your unique posture concerns.',
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Community Challenges',
      description: 'Join posture challenges with others and earn achievements for consistency.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-accent/50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful AI Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            PostTracker combines cutting-edge AI technology with user-friendly design to provide a comprehensive posture improvement experience.
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
