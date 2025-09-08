import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import HealthReports from '@/components/dashboard/HealthReports';
import SensorData from '@/components/dashboard/SensorData';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import InteractiveMap from '@/components/dashboard/InteractiveMap';
import Interventions from '@/components/dashboard/Interventions';
import EducationalContent from '@/components/dashboard/EducationalContent';
import UserManagement from '@/components/dashboard/UserManagement';
import SettingsPanel from '@/components/dashboard/SettingsPanel';

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/reports" element={<HealthReports />} />
            <Route path="/sensors" element={<SensorData />} />
            <Route path="/alerts" element={<AlertsPanel />} />
            <Route path="/map" element={<InteractiveMap />} />
            <Route path="/interventions" element={<Interventions />} />
            <Route path="/education" element={<EducationalContent />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<SettingsPanel />} />
          </Routes>
        </DashboardLayout>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;