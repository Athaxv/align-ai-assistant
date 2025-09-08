import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Interventions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interventions</h1>
        <p className="text-muted-foreground">Track health interventions and response actions</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-lg font-medium text-muted-foreground">Interventions Module</p>
          <p className="text-sm text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Interventions;