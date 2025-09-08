import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EducationalContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Educational Content</h1>
        <p className="text-muted-foreground">Manage hygiene awareness and educational materials</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-lg font-medium text-muted-foreground">Educational Content Module</p>
          <p className="text-sm text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationalContent;