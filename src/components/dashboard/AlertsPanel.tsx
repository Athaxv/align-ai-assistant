import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle, Clock, MapPin, User, Calendar, Bell, Settings } from 'lucide-react';
import { mockAlerts } from '@/data/mockData';
import { format } from 'date-fns';
import { Alert } from '@/types/dashboard';

const AlertsPanel = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [actionNotes, setActionNotes] = useState('');

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'outbreak_risk': return AlertTriangle;
      case 'water_quality': return AlertTriangle;
      case 'weather': return Cloud;
      case 'system': return Settings;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-risk-critical text-white';
      case 'high': return 'bg-risk-high text-white';
      case 'medium': return 'bg-risk-medium text-white';
      case 'low': return 'bg-risk-low text-white';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-destructive';
      case 'acknowledged': return 'text-warning';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return AlertTriangle;
      case 'acknowledged': return Clock;
      case 'resolved': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    // Mock acknowledgment - in real app would update backend
    console.log('Acknowledging alert:', alertId, actionNotes);
    setSelectedAlert(null);
    setActionNotes('');
  };

  const handleResolve = (alertId: string) => {
    // Mock resolution - in real app would update backend
    console.log('Resolving alert:', alertId, actionNotes);
    setSelectedAlert(null);
    setActionNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alert Management</h1>
          <p className="text-muted-foreground">
            Monitor and respond to system alerts and notifications
          </p>
        </div>
        <Button>
          <Bell className="w-4 h-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      {/* Alert Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">
                  {mockAlerts.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Acknowledged</p>
                <p className="text-2xl font-bold">
                  {mockAlerts.filter(a => a.status === 'acknowledged').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold">
                  {mockAlerts.filter(a => a.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-risk-critical" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-risk-critical">
                  {mockAlerts.filter(a => a.severity === 'critical').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-48">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {filteredAlerts.length} of {mockAlerts.length} alerts
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const StatusIcon = getStatusIcon(alert.status);
          const AlertIcon = getAlertIcon(alert.type);
          
          return (
            <Card key={alert.id} className={`${alert.severity === 'critical' || alert.severity === 'high' ? 'border-destructive' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Alert Header */}
                    <div className="flex items-center gap-3">
                      <AlertIcon className="w-5 h-5 text-muted-foreground" />
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <div className={`flex items-center gap-1 ${getStatusColor(alert.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">{alert.status}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {alert.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>

                    {/* Alert Content */}
                    <div>
                      <h3 className="text-lg font-semibold">{alert.title}</h3>
                      <p className="text-muted-foreground">{alert.description}</p>
                    </div>

                    {/* Alert Details */}
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{alert.location.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {format(new Date(alert.triggeredAt), 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Triggered by {alert.triggeredBy}</span>
                      </div>
                    </div>

                    {/* Acknowledgment/Resolution Info */}
                    {alert.acknowledgedBy && (
                      <div className="p-3 bg-warning/10 rounded-lg">
                        <p className="text-sm">
                          <strong>Acknowledged by:</strong> {alert.acknowledgedBy}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(alert.acknowledgedAt!), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    )}

                    {alert.resolvedAt && (
                      <div className="p-3 bg-success/10 rounded-lg">
                        <p className="text-sm">
                          <strong>Resolved at:</strong> {format(new Date(alert.resolvedAt), 'MMM dd, yyyy HH:mm')}
                        </p>
                        {alert.actionsTaken && alert.actionsTaken.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Actions taken:</p>
                            <ul className="text-sm text-muted-foreground mt-1">
                              {alert.actionsTaken.map((action, index) => (
                                <li key={index} className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 ml-4">
                    {alert.status === 'active' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        Acknowledge
                      </Button>
                    )}
                    {alert.status === 'acknowledged' && (
                      <Button 
                        size="sm"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {selectedAlert.status === 'active' ? 'Acknowledge Alert' : 'Resolve Alert'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedAlert.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
              </div>
              
              <div>
                <Label htmlFor="actionNotes">Action Notes</Label>
                <Textarea
                  id="actionNotes"
                  placeholder={
                    selectedAlert.status === 'active' 
                      ? "Describe the steps you're taking to address this alert..."
                      : "Describe how this alert was resolved..."
                  }
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedAlert(null);
                    setActionNotes('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    if (selectedAlert.status === 'active') {
                      handleAcknowledge(selectedAlert.id);
                    } else {
                      handleResolve(selectedAlert.id);
                    }
                  }}
                >
                  {selectedAlert.status === 'active' ? 'Acknowledge' : 'Resolve'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Cloud icon placeholder (should import from lucide-react in real app)
const Cloud = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
  </svg>
);

export default AlertsPanel;