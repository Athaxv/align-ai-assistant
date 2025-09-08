import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-lg font-medium text-muted-foreground">Settings Panel</p>
          <p className="text-sm text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;