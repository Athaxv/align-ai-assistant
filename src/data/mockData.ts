import { User, Location, HealthReport, SensorData, Alert, Intervention, WeatherData, RiskAssessment, EducationalContent, DashboardStats } from '@/types/dashboard';

// Mock Locations
export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Jharia Village',
    coordinates: { lat: 23.7461, lng: 86.4092 },
    type: 'village'
  },
  {
    id: '2',
    name: 'Bokaro Clinic',
    coordinates: { lat: 23.7794, lng: 85.9596 },
    type: 'clinic'
  },
  {
    id: '3',
    name: 'Dhanbad District',
    coordinates: { lat: 23.8021, lng: 86.4304 },
    type: 'district'
  },
  {
    id: '4',
    name: 'Ramgarh Village',
    coordinates: { lat: 23.6315, lng: 85.5131 },
    type: 'village'
  },
  {
    id: '5',
    name: 'Hazaribagh Health Center',
    coordinates: { lat: 23.9929, lng: 85.3647 },
    type: 'clinic'
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'priya.sharma@health.gov.in',
    name: 'Priya Sharma',
    role: 'health_worker',
    location: mockLocations[0],
    createdAt: '2024-01-15T09:00:00Z',
    lastLogin: '2024-01-20T08:30:00Z'
  },
  {
    id: '2',
    email: 'dr.kumar@bokaro-clinic.in',
    name: 'Dr. Rajesh Kumar',
    role: 'clinic_staff',
    location: mockLocations[1],
    createdAt: '2024-01-10T10:00:00Z',
    lastLogin: '2024-01-20T07:45:00Z'
  },
  {
    id: '3',
    email: 'admin@dhanbad-health.gov.in',
    name: 'Sita Devi',
    role: 'admin',
    location: mockLocations[2],
    createdAt: '2024-01-05T11:00:00Z',
    lastLogin: '2024-01-20T09:15:00Z'
  }
];

// Mock Health Reports
export const mockHealthReports: HealthReport[] = [
  {
    id: '1',
    patientName: 'Anonymous Patient 1',
    patientAge: 35,
    patientGender: 'female',
    symptoms: ['Diarrhea', 'Fever', 'Nausea'],
    onsetDate: '2024-01-18T00:00:00Z',
    location: mockLocations[0],
    reporterId: '1',
    reporterName: 'Priya Sharma',
    severity: 'moderate',
    status: 'active',
    notes: 'Patient reports drinking from local well',
    createdAt: '2024-01-19T10:30:00Z',
    updatedAt: '2024-01-19T10:30:00Z'
  },
  {
    id: '2',
    patientAge: 8,
    patientGender: 'male',
    symptoms: ['Vomiting', 'Stomach Pain', 'Dehydration'],
    onsetDate: '2024-01-17T00:00:00Z',
    location: mockLocations[0],
    reporterId: '1',
    reporterName: 'Priya Sharma',
    severity: 'severe',
    status: 'followup',
    notes: 'Child shows signs of severe dehydration',
    createdAt: '2024-01-18T14:20:00Z',
    updatedAt: '2024-01-19T08:15:00Z'
  },
  {
    id: '3',
    patientAge: 42,
    patientGender: 'male',
    symptoms: ['Diarrhea', 'Abdominal Cramps'],
    onsetDate: '2024-01-19T00:00:00Z',
    location: mockLocations[3],
    reporterId: '2',
    reporterName: 'Dr. Rajesh Kumar',
    severity: 'mild',
    status: 'active',
    createdAt: '2024-01-19T16:45:00Z',
    updatedAt: '2024-01-19T16:45:00Z'
  }
];

// Mock Sensor Data
export const mockSensorData: SensorData[] = [
  {
    id: '1',
    sensorId: 'WQ001',
    location: mockLocations[0],
    parameters: {
      turbidity: 15.2,
      ph: 6.8,
      bacterial: 450,
      temperature: 24.5,
      dissolved_oxygen: 5.2
    },
    timestamp: '2024-01-20T08:00:00Z',
    quality: 'poor'
  },
  {
    id: '2',
    sensorId: 'WQ002',
    location: mockLocations[1],
    parameters: {
      turbidity: 8.1,
      ph: 7.2,
      bacterial: 120,
      temperature: 23.8,
      dissolved_oxygen: 6.8
    },
    timestamp: '2024-01-20T08:00:00Z',
    quality: 'fair'
  },
  {
    id: '3',
    sensorId: 'WQ003',
    location: mockLocations[3],
    parameters: {
      turbidity: 22.5,
      ph: 6.3,
      bacterial: 780,
      temperature: 25.1,
      dissolved_oxygen: 4.1
    },
    timestamp: '2024-01-20T08:00:00Z',
    quality: 'critical'
  }
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'outbreak_risk',
    severity: 'high',
    title: 'High Outbreak Risk - Jharia Village',
    description: 'Multiple diarrheal cases reported with poor water quality indicators',
    location: mockLocations[0],
    status: 'active',
    triggeredBy: 'Prediction System',
    triggeredAt: '2024-01-20T06:30:00Z'
  },
  {
    id: '2',
    type: 'water_quality',
    severity: 'critical',
    title: 'Critical Water Quality - Ramgarh Village',
    description: 'Bacterial levels exceed safe limits by 300%',
    location: mockLocations[3],
    status: 'acknowledged',
    triggeredBy: 'Sensor WQ003',
    triggeredAt: '2024-01-20T08:15:00Z',
    acknowledgedBy: 'Sita Devi',
    acknowledgedAt: '2024-01-20T08:45:00Z'
  },
  {
    id: '3',
    type: 'weather',
    severity: 'medium',
    title: 'Heavy Rainfall Warning',
    description: 'Predicted heavy rainfall may affect water sources',
    location: mockLocations[2],
    status: 'active',
    triggeredBy: 'Weather Service',
    triggeredAt: '2024-01-20T05:00:00Z'
  }
];

// Mock Interventions
export const mockInterventions: Intervention[] = [
  {
    id: '1',
    type: 'water_treatment',
    title: 'Emergency Water Purification - Jharia Village',
    description: 'Deploy mobile water purification unit and distribute chlorine tablets',
    location: mockLocations[0],
    implementedBy: 'District Health Team',
    implementedAt: '2024-01-19T12:00:00Z',
    status: 'in_progress',
    successMetrics: [
      { metric: 'Households Served', target: 150, achieved: 89 },
      { metric: 'Water Quality Improvement', target: 90, achieved: 75 }
    ],
    cost: 25000
  },
  {
    id: '2',
    type: 'awareness_campaign',
    title: 'Hygiene Awareness Drive',
    description: 'Community education on water safety and hygiene practices',
    location: mockLocations[3],
    implementedBy: 'Health Workers Team',
    implementedAt: '2024-01-18T09:00:00Z',
    completedAt: '2024-01-19T17:00:00Z',
    status: 'completed',
    successMetrics: [
      { metric: 'People Reached', target: 500, achieved: 623 },
      { metric: 'Materials Distributed', target: 400, achieved: 450 }
    ],
    cost: 8000
  }
];

// Mock Weather Data
export const mockWeatherData: WeatherData = {
  location: mockLocations[2],
  temperature: 28,
  humidity: 72,
  rainfall: 15.2,
  floodRisk: 'medium',
  forecast: [
    { date: '2024-01-21', temperature: { min: 22, max: 30 }, rainfall: 8.5, conditions: 'Partly Cloudy' },
    { date: '2024-01-22', temperature: { min: 20, max: 28 }, rainfall: 22.1, conditions: 'Heavy Rain' },
    { date: '2024-01-23', temperature: { min: 21, max: 29 }, rainfall: 5.2, conditions: 'Light Rain' }
  ],
  timestamp: '2024-01-20T09:00:00Z'
};

// Mock Risk Assessment
export const mockRiskAssessment: RiskAssessment[] = [
  {
    location: mockLocations[0],
    overallRisk: 'high',
    factors: {
      healthReports: 85,
      waterQuality: 75,
      weatherConditions: 60,
      seasonalPattern: 70
    },
    prediction: {
      nextWeek: 'high',
      confidence: 0.82
    },
    recommendedActions: [
      'Immediate water treatment intervention',
      'Increase health surveillance',
      'Deploy medical response team',
      'Community awareness campaign'
    ],
    lastUpdated: '2024-01-20T09:00:00Z'
  },
  {
    location: mockLocations[3],
    overallRisk: 'critical',
    factors: {
      healthReports: 45,
      waterQuality: 95,
      weatherConditions: 70,
      seasonalPattern: 60
    },
    prediction: {
      nextWeek: 'critical',
      confidence: 0.91
    },
    recommendedActions: [
      'Emergency response activation',
      'Alternative water source provision',
      'Mass health screening',
      'Coordinate with disaster management'
    ],
    lastUpdated: '2024-01-20T09:00:00Z'
  }
];

// Mock Educational Content
export const mockEducationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'Safe Water Storage Practices',
    description: 'Learn how to store water safely to prevent contamination',
    content: 'Always cover water containers, clean storage vessels regularly...',
    type: 'article',
    category: 'prevention',
    language: 'en',
    views: 1247,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Recognizing Diarrheal Disease Symptoms',
    description: 'Early identification of symptoms can save lives',
    content: 'Watch for frequent loose stools, dehydration signs...',
    type: 'infographic',
    category: 'symptoms',
    language: 'hi',
    views: 892,
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalReports: 127,
  activeAlerts: 5,
  riskAreas: 8,
  interventions: 23,
  averageRiskLevel: 2.3,
  trendsVsPreviousMonth: {
    reports: 15,
    alerts: -2,
    riskAreas: 3
  }
};