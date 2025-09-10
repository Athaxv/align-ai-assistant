import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Filter, 
  Download, 
  Eye,
  Search,
  AlertTriangle 
} from 'lucide-react';

const ASHALogsHistory = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem('asha_surveys') || '[]');
    setReports(savedReports);
    setFilteredReports(savedReports);
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.areaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(report => report.surveyType === filterType);
    }

    setFilteredReports(filtered);
  }, [searchTerm, filterType, reports]);

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Area', 'Type', 'Symptoms Found', 'Suspected Cases', 'Status'],
      ...filteredReports.map(report => [
        report.surveyDate,
        report.areaName,
        report.surveyType,
        report.symptomsFound.length,
        report.suspectedCases,
        report.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asha_reports.csv';
    a.click();
  };

  const symptoms = [
    { id: 'fever', label: 'Fever', icon: '🤒' },
    { id: 'nausea', label: 'Nausea', icon: '🤢' },
    { id: 'vomiting', label: 'Vomiting', icon: '🤮' },
    { id: 'diarrhea', label: 'Diarrhea', icon: '💩' },
    { id: 'headache', label: 'Headache', icon: '🤕' },
    { id: 'bodyache', label: 'Body Ache', icon: '💪' },
    { id: 'dehydration', label: 'Dehydration', icon: '💧' },
    { id: 'abdominal_pain', label: 'Abdominal Pain', icon: '🫃' },
    { id: 'weakness', label: 'General Weakness', icon: '😴' },
    { id: 'skin_rash', label: 'Skin Rash', icon: '🔴' }
  ];

  const getSymptomLabel = (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    return symptom ? `${symptom.icon} ${symptom.label}` : symptomId;
  };

  const getSeverityColor = (suspectedCases: number) => {
    if (suspectedCases === 0) return 'secondary';
    if (suspectedCases <= 2) return 'default';
    if (suspectedCases <= 5) return 'destructive';
    return 'destructive';
  };

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Report Details</CardTitle>
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Back to List
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Survey Date</p>
                <p className="font-medium">{new Date(selectedReport.surveyDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Survey Type</p>
                <p className="font-medium capitalize">{selectedReport.surveyType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Area/Village</p>
                <p className="font-medium">{selectedReport.areaName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suspected Cases</p>
                <Badge variant={getSeverityColor(selectedReport.suspectedCases) as any}>
                  {selectedReport.suspectedCases} cases
                </Badge>
              </div>
            </div>

            {selectedReport.location && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Location (GPS)</p>
                <div className="p-2 bg-muted rounded text-sm">
                  Lat: {selectedReport.location.latitude.toFixed(6)}, 
                  Lng: {selectedReport.location.longitude.toFixed(6)}
                </div>
              </div>
            )}

            {selectedReport.symptomsFound.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Symptoms Found</p>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.symptomsFound.map((symptomId: string) => (
                    <Badge key={symptomId} variant="outline">
                      {getSymptomLabel(symptomId)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedReport.notes && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Notes/Observations</p>
                <div className="p-3 bg-muted rounded text-sm">
                  {selectedReport.notes}
                </div>
              </div>
            )}

            {selectedReport.photos && selectedReport.photos.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Photos Attached</p>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.photos.map((photo: any, index: number) => (
                    <Badge key={index} variant="secondary">
                      Photo {index + 1}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Submitted on {new Date(selectedReport.submittedAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Survey Reports History</span>
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by area name or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="special">Special</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No reports found</h3>
              <p className="text-muted-foreground">
                {reports.length === 0 
                  ? "You haven't submitted any surveys yet." 
                  : "No reports match your current search criteria."}
              </p>
            </CardContent>
          </Card>
        )}

        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{report.areaName}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(report.surveyDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{report.location ? 'GPS captured' : 'No GPS'}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.surveyType}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getSeverityColor(report.suspectedCases) as any}>
                      {report.suspectedCases} cases
                    </Badge>
                  </div>
                </div>

                {report.symptomsFound.length > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-sm">{report.symptomsFound.length} symptoms reported</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <div className="text-xs text-muted-foreground">
                    Submitted {new Date(report.submittedAt).toLocaleDateString()}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedReport(report)}
                    className="gap-2"
                  >
                    <Eye className="h-3 w-3" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ASHALogsHistory;