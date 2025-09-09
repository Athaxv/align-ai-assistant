import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Filter, Search, MapPin, Calendar as CalendarIcon, Users, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { mockHealthReports, mockLocations } from '@/data/mockData';
import { HealthReport } from '@/types/dashboard';

const HealthReports = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newReport, setNewReport] = useState<{
    patientName: string;
    patientAge: string;
    patientGender: 'male' | 'female' | 'other';
    symptoms: string[];
    onsetDate: Date | undefined;
    locationId: string;
    severity: 'mild' | 'moderate' | 'severe';
    notes: string;
  }>({
    patientName: '',
    patientAge: '',
    patientGender: 'female',
    symptoms: [],
    onsetDate: undefined,
    locationId: '',
    severity: 'mild',
    notes: ''
  });

  const availableSymptoms = [
    'Diarrhea', 'Fever', 'Nausea', 'Vomiting', 'Stomach Pain', 
    'Dehydration', 'Abdominal Cramps', 'Headache', 'Fatigue', 'Loss of Appetite'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setNewReport(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in real app would submit to backend
    console.log('Submitting report:', newReport);
    setShowForm(false);
    setNewReport({
      patientName: '',
      patientAge: '',
      patientGender: 'female',
      symptoms: [],
      onsetDate: undefined,
      locationId: '',
      severity: 'mild',
      notes: ''
    });
  };

  const filteredReports = mockHealthReports.filter(report => {
    const matchesSearch = searchTerm === '' || 
      report.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
      report.location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporterName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || report.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Reports</h1>
          <p className="text-muted-foreground">
            Manage symptom reports and health data collection
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{mockHealthReports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold">
                  {mockHealthReports.filter(r => r.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Locations</p>
                <p className="text-2xl font-bold">
                  {new Set(mockHealthReports.map(r => r.location.id)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Severe Cases</p>
                <p className="text-2xl font-bold">
                  {mockHealthReports.filter(r => r.severity === 'severe').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="search">Search Reports</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search symptoms, locations..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Severity</Label>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="All severities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All severities</SelectItem>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={
                        report.severity === 'severe' 
                          ? 'destructive' 
                          : report.severity === 'moderate' 
                          ? 'secondary' 
                          : 'outline'
                      }
                    >
                      {report.severity}
                    </Badge>
                    <Badge 
                      variant={report.status === 'active' ? 'default' : 'outline'}
                    >
                      {report.status}
                    </Badge>
                    <span className="text-sm font-medium">
                      {report.patientName || `${report.patientGender}, ${report.patientAge}y`}
                    </span>
                  </div>
                  
                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Symptoms</p>
                      <p className="text-sm">{report.symptoms.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Onset Date</p>
                      <p className="text-sm">{format(new Date(report.onsetDate), 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-sm">📍 {report.location.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reported by</p>
                      <p className="text-sm">{report.reporterName}</p>
                    </div>
                  </div>

                  {report.notes && (
                    <div>
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p className="text-sm">{report.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Report Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle>New Health Report</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="patientName">Patient Name (Optional)</Label>
                    <Input
                      id="patientName"
                      value={newReport.patientName}
                      onChange={(e) => setNewReport(prev => ({ ...prev, patientName: e.target.value }))}
                      placeholder="Leave blank for anonymity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientAge">Patient Age</Label>
                    <Input
                      id="patientAge"
                      type="number"
                      value={newReport.patientAge}
                      onChange={(e) => setNewReport(prev => ({ ...prev, patientAge: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Gender</Label>
                    <Select 
                      value={newReport.patientGender} 
                      onValueChange={(value: 'male' | 'female' | 'other') => 
                        setNewReport(prev => ({ ...prev, patientGender: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Severity</Label>
                    <Select 
                      value={newReport.severity} 
                      onValueChange={(value: 'mild' | 'moderate' | 'severe') => 
                        setNewReport(prev => ({ ...prev, severity: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <GPSLocationCapture 
                    onLocationSelect={(location) => setNewReport({...newReport, locationId: location.name})}
                    selectedLocation={newReport.locationId ? {name: newReport.locationId} : null}
                  />
                </div>

                <div>
                  <Label>Onset Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newReport.onsetDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newReport.onsetDate ? format(newReport.onsetDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newReport.onsetDate}
                        onSelect={(date) => setNewReport(prev => ({ ...prev, onsetDate: date }))}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Symptoms</Label>
                  <div className="grid gap-2 md:grid-cols-2 mt-2">
                    {availableSymptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={newReport.symptoms.includes(symptom)}
                          onCheckedChange={() => handleSymptomToggle(symptom)}
                        />
                        <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={newReport.notes}
                    onChange={(e) => setNewReport(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any additional information..."
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Report</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HealthReports;