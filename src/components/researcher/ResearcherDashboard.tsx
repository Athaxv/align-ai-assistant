import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Microscope, Database, Upload, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ResearcherDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Water Quality Research Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user?.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Microscope className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Water Body Data</h3>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Bodies monitored</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Database className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Data Points</h3>
                      <p className="text-2xl font-bold">1,248</p>
                      <p className="text-sm text-muted-foreground">Total samples</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Quality Score</h3>
                      <p className="text-2xl font-bold">7.2</p>
                      <p className="text-sm text-muted-foreground">Average pH</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Water Quality Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload CSV Data
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Upload water quality measurements in CSV format
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Water quality analytics and trend visualization will be available here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResearcherDashboard;