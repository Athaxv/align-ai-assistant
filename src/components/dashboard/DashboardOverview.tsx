import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Activity, 
  Users, 
  Droplets,
  MapPin,
  Calendar,
  BarChart3
} from 'lucide-react';
import { mockDashboardStats, mockAlerts, mockHealthReports, mockRiskAssessment } from '@/data/mockData';

const DashboardOverview = () => {
  const stats = mockDashboardStats;
  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active');
  const recentReports = mockHealthReports.slice(0, 5);
  const riskAreas = mockRiskAssessment;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Monitor health indicators and outbreak risks across your region
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`inline-flex items-center ${stats.trendsVsPreviousMonth.reports > 0 ? 'text-success' : 'text-destructive'}`}>
                {stats.trendsVsPreviousMonth.reports > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(stats.trendsVsPreviousMonth.reports)}%
              </span>
              {' '}from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`inline-flex items-center ${stats.trendsVsPreviousMonth.alerts < 0 ? 'text-success' : 'text-warning'}`}>
                {stats.trendsVsPreviousMonth.alerts < 0 ? (
                  <TrendingDown className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingUp className="w-3 h-3 mr-1" />
                )}
                {Math.abs(stats.trendsVsPreviousMonth.alerts)}%
              </span>
              {' '}from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Areas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.riskAreas}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`inline-flex items-center ${stats.trendsVsPreviousMonth.riskAreas > 0 ? 'text-warning' : 'text-success'}`}>
                {stats.trendsVsPreviousMonth.riskAreas > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(stats.trendsVsPreviousMonth.riskAreas)}%
              </span>
              {' '}from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interventions</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interventions}</div>
            <p className="text-xs text-muted-foreground">
              Active health interventions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts & Recent Reports */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeAlerts.length > 0 ? (
              activeAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={
                          alert.severity === 'critical' || alert.severity === 'high' 
                            ? 'destructive' 
                            : alert.severity === 'medium' 
                            ? 'secondary' 
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                      <span className="text-sm font-medium">{alert.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">📍 {alert.location.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No active alerts
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Health Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Health Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant={
                        report.severity === 'severe' 
                          ? 'destructive' 
                          : report.severity === 'moderate' 
                          ? 'secondary' 
                          : 'outline'
                      }
                      className="text-xs"
                    >
                      {report.severity}
                    </Badge>
                    <span className="text-sm font-medium">
                      {report.patientName || `${report.patientGender}, ${report.patientAge}y`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Symptoms: {report.symptoms.join(', ')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    📍 {report.location.name} • Reported by {report.reporterName}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Risk Assessment by Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAreas.map((area) => (
              <div key={area.location.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{area.location.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Prediction confidence: {Math.round(area.prediction.confidence * 100)}%
                    </p>
                  </div>
                  <Badge 
                    className={
                      area.overallRisk === 'critical' 
                        ? 'bg-risk-critical text-white' 
                        : area.overallRisk === 'high' 
                        ? 'bg-risk-high text-white'
                        : area.overallRisk === 'medium' 
                        ? 'bg-risk-medium text-white'
                        : 'bg-risk-low text-white'
                    }
                  >
                    {area.overallRisk.toUpperCase()} RISK
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Health Reports</p>
                    <Progress value={area.factors.healthReports} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{area.factors.healthReports}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Water Quality</p>
                    <Progress value={area.factors.waterQuality} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{area.factors.waterQuality}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Weather</p>
                    <Progress value={area.factors.weatherConditions} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{area.factors.weatherConditions}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Seasonal</p>
                    <Progress value={area.factors.seasonalPattern} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{area.factors.seasonalPattern}%</p>
                  </div>
                </div>

                {area.recommendedActions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Recommended Actions:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {area.recommendedActions.slice(0, 2).map((action, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;