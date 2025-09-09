import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Activity, 
  AlertTriangle, 
  Map, 
  Wrench,
  BookOpen,
  Users,
  Settings,
  Shield,
  TrendingUp,
  Droplets
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: Home,
    description: 'Dashboard overview and key metrics'
  },
  {
    title: 'Analytics',
    url: '/dashboard/analytics',
    icon: TrendingUp,
    description: 'Charts and trend analysis'
  },
  {
    title: 'Health Reports',
    url: '/dashboard/reports',
    icon: FileText,
    description: 'Symptom reports and health data'
  },
  {
    title: 'Sensor Data',
    url: '/dashboard/sensors',
    icon: Activity,
    description: 'Water quality and environmental sensors'
  },
  {
    title: 'Alerts',
    url: '/dashboard/alerts',
    icon: AlertTriangle,
    description: 'Active alerts and notifications'
  },
  {
    title: 'Risk Map',
    url: '/dashboard/map',
    icon: Map,
    description: 'Interactive risk assessment map'
  },
  {
    title: 'Interventions',
    url: '/dashboard/interventions',
    icon: Wrench,
    description: 'Health interventions and actions'
  }
];

const adminItems = [
  {
    title: 'Education',
    url: '/dashboard/education',
    icon: BookOpen,
    description: 'Educational content management'
  },
  {
    title: 'User Management',
    url: '/dashboard/users',
    icon: Users,
    description: 'Manage system users'
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
    description: 'System configuration'
  }
];

const DashboardSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar()
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }
    return location.pathname.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary text-primary-foreground font-medium hover:bg-primary/90" 
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      {/* Logo and Brand */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Droplets className="w-4 h-4 text-primary-foreground" />
          </div>
          {!state || state === "expanded" && (
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">AquaGuard</h1>
              <p className="text-xs text-sidebar-foreground/60">Health Monitor</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/dashboard'}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="w-4 h-4" />
                      {!state || state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="w-4 h-4" />
                      {!state || state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;