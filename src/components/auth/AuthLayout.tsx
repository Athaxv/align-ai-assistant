import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Droplets } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-primary rounded-lg">
              <Droplets className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Arogyam</h1>
          </div>
          <p className="text-muted-foreground">
            Community Health & Water Monitoring System
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Empowering communities through data-driven health monitoring
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;