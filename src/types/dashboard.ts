// Dashboard Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'asha_worker' | 'clinic_staff' | 'researcher' | 'health_official';
  avatar?: string;
  location?: Location;
  createdAt: string;
  lastLogin?: string;
}

export interface Location {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'village' | 'clinic' | 'district';
  parentLocation?: string;
}

export interface HealthReport {
  id: string;
  patientName?: string;
  patientAge?: number;
  patientGender: 'male' | 'female' | 'other';
  symptoms: string[];
  onsetDate: string;
  location: Location;
  reporterId: string;
  reporterName: string;
  severity: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'resolved' | 'followup';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SensorData {
  id: string;
  sensorId: string;
  location: Location;
  parameters: {
    turbidity: number;
    ph: number;
    bacterial: number;
    temperature?: number;
    dissolved_oxygen?: number;
  };
  timestamp: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
}

export interface Alert {
  id: string;
  type: 'outbreak_risk' | 'water_quality' | 'weather' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: Location;
  status: 'active' | 'acknowledged' | 'resolved';
  triggeredBy: string;
  triggeredAt: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  actionsTaken?: string[];
}

export interface Intervention {
  id: string;
  type: 'water_treatment' | 'awareness_campaign' | 'medical_response' | 'vaccination' | 'other';
  title: string;
  description: string;
  location: Location;
  implementedBy: string;
  implementedAt: string;
  completedAt?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  successMetrics?: {
    metric: string;
    target: number;
    achieved?: number;
  }[];
  cost?: number;
  notes?: string;
}

export interface WeatherData {
  location: Location;
  temperature: number;
  humidity: number;
  rainfall: number;
  floodRisk: 'none' | 'low' | 'medium' | 'high';
  forecast: {
    date: string;
    temperature: { min: number; max: number };
    rainfall: number;
    conditions: string;
  }[];
  timestamp: string;
}

export interface RiskAssessment {
  location: Location;
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    healthReports: number;
    waterQuality: number;
    weatherConditions: number;
    seasonalPattern: number;
  };
  prediction: {
    nextWeek: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
  };
  recommendedActions: string[];
  lastUpdated: string;
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'article' | 'video' | 'infographic' | 'checklist';
  category: 'hygiene' | 'prevention' | 'symptoms' | 'treatment';
  language: string;
  mediaUrl?: string;
  downloadUrl?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalReports: number;
  activeAlerts: number;
  riskAreas: number;
  interventions: number;
  averageRiskLevel: number;
  trendsVsPreviousMonth: {
    reports: number;
    alerts: number;
    riskAreas: number;
  };
}