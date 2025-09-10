import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  Activity, 
  AlertTriangle, 
  Stethoscope,
  Plus,
  TrendingUp,
  Clock,
  FileText,
  MapPin,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PatientReportForm from './PatientReportForm';
import ClinicLogsHistory from './ClinicLogsHistory';
import ClinicAnalytics from './ClinicAnalytics';

const ClinicDashboard = () => {
  const { user } = useAuth();
  const [showPatientForm, setShowPatientForm] = useState(false);

  // Mock data for clinic
  const dashboardStats = {
    patientsToday: 23,
    totalPatients: 156,
    pendingReports: 3,
    outbreakZone: false,
    activeAlerts: 1,
  };

  const todayAppointments = [
    { id: 1, time: '09:00', patient: 'Ramesh Kumar', symptoms: ['Fever', 'Headache'], priority: 'medium' },
    { id: 2, time: '10:30', patient: 'Priya Sharma', symptoms: ['Nausea', 'Vomiting'], priority: 'high' },
    { id: 3, time: '14:00', patient: 'Ankit Singh', symptoms: ['Diarrhea'], priority: 'medium' },
    { id: 4, time: '15:30', patient: 'Maya Devi', symptoms: ['Body ache'], priority: 'low' }
  ];

  const recentAlerts = [
    {
      id: 1,
      title: 'Water contamination alert in nearby village',
      severity: 'high',
      description: 'Increased vigilance required for water-borne diseases',
      time: '2 hours ago'
    }
  ];

  const quickStats = [
    { label: 'Today', value: dashboardStats.patientsToday, icon: Calendar, color: 'primary' },
    { label: 'This Week', value: dashboardStats.totalPatients, icon: Users, color: 'info' },
    { label: 'Pending', value: dashboardStats.pendingReports, icon: Clock, color: 'warning' },
    { label: 'Alerts', value: dashboardStats.activeAlerts, icon: Bell, color: 'destructive' }
  ];

  if (showPatientForm) {
    return <PatientReportForm onClose={() => setShowPatientForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Clinic Dashboard</h1>
              <p className="text-muted-foreground">
                Medical Center - {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              {dashboardStats.outbreakZone && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Outbreak Zone
                </Badge>
              )}
              <Button onClick={() => setShowPatientForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Patient Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${stat.color}/10 rounded-lg`}>
                      <IconComponent className={`h-4 w-4 text-${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Alerts & Schedule */}
          <div className="space-y-6">
            {/* Active Alerts */}
            {recentAlerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-warning" />
                    Health Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <Badge variant="destructive">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-medium text-sm">{appointment.patient}</p>
                        <p className="text-xs text-muted-foreground">{appointment.time}</p>
                      </div>
                      <Badge variant={
                        appointment.priority === 'high' ? 'destructive' : 
                        appointment.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {appointment.priority}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {appointment.symptoms.map((symptom, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <Button onClick={() => setShowPatientForm(true)} className="h-auto p-4 flex-col gap-2">
                      <Plus className="h-6 w-6" />
                      <span>Add Patient Report</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                      <FileText className="h-6 w-6" />
                      <span>View Reports</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                      <TrendingUp className="h-6 w-6" />
                      <span>Analytics</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                      <MapPin className="h-6 w-6" />
                      <span>Outbreak Status</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-2">
                      <div className="p-1 bg-success/10 rounded">
                        <Stethoscope className="h-3 w-3 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Patient report submitted for fever case</p>
                        <p className="text-xs text-muted-foreground">30 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2">
                      <div className="p-1 bg-info/10 rounded">
                        <FileText className="h-3 w-3 text-info" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Daily report generated and submitted</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2">
                      <div className="p-1 bg-warning/10 rounded">
                        <Bell className="h-3 w-3 text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Received health alert from authorities</p>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patients">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Patient list and management features will be implemented here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <ClinicLogsHistory />
              </TabsContent>

              <TabsContent value="analytics">
                <ClinicAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDashboard;