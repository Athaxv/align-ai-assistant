import React from 'react';
import { Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Badge, badgeVariants } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { mockUsers, mockAlerts } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const currentUser = mockUsers[0]; // Mock current user
  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active').length;

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="flex h-16 items-center gap-4">
        {/* Mobile menu trigger */}
        <SidebarTrigger className="md:hidden" />
        
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reports, locations, alerts..."
              className="pl-8"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {activeAlerts > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {activeAlerts}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockAlerts.slice(0, 3).map((alert) => (
                <DropdownMenuItem key={alert.id} className="flex flex-col items-start p-4">
                  <div className="flex items-center gap-2 w-full">
                    <Badge 
                      variant={alert.severity === 'critical' ? 'destructive' : alert.severity === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-sm font-medium">{alert.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.location.name}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  <Badge variant="outline" className="text-xs w-fit mt-1">
                    {currentUser.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/')}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;