import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Users, 
  Filter, 
  Download, 
  Eye,
  Search,
  Stethoscope 
} from 'lucide-react';

const ClinicLogsHistory = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem('clinic_reports') || '[]');
    setReports(savedReports);
    setFilteredReports(savedReports);
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.patientAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterGender !== 'all') {
      filtered = filtered.filter(report => report.patientGender === filterGender);
    }

    setFilteredReports(filtered);
  }, [searchTerm, filterGender, reports]);

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Patient Name', 'Age', 'Gender', 'Symptoms', 'Diagnosis', 'Treatment'],
      ...filteredReports.map(report => [
        report.visitDate,
        report.patientName,
        report.patientAge,
        report.patientGender,
        report.symptoms.length,
        report.diagnosis || 'N/A',
        report.treatment || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clinic_reports.csv';
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
    { id: 'skin_rash', label: 'Skin Rash', icon: '🔴' },
    { id: 'respiratory', label: 'Respiratory Issues', icon: '😮‍💨' },
    { id: 'joint_pain', label: 'Joint Pain', icon: '🦴' }
  ];

  const getSymptomLabel = (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    return symptom ? `${symptom.icon} ${symptom.label}` : symptomId;
  };

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Patient Report Details</CardTitle>
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Back to List
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium">{selectedReport.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age & Gender</p>
                <p className="font-medium">{selectedReport.patientAge} years, {selectedReport.patientGender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visit Date</p>
                <p className="font-medium">{new Date(selectedReport.visitDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Follow-up</p>
                <Badge variant={selectedReport.followUpRequired ? 'destructive' : 'secondary'}>
                  {selectedReport.followUpRequired ? 'Required' : 'Not Required'}
                </Badge>
              </div>
            </div>

            {selectedReport.patientAddress && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Patient Address</p>
                <div className="p-2 bg-muted rounded text-sm">
                  {selectedReport.patientAddress}
                </div>
              </div>
            )}

            {selectedReport.symptoms.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Symptoms Reported</p>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.symptoms.map((symptomId: string) => (
                    <Badge key={symptomId} variant="outline">
                      {getSymptomLabel(symptomId)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedReport.diagnosis && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Diagnosis</p>
                <div className="p-3 bg-muted rounded text-sm">
                  {selectedReport.diagnosis}
                </div>
              </div>
            )}

            {selectedReport.treatment && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Treatment Given</p>
                <div className="p-3 bg-muted rounded text-sm">
                  {selectedReport.treatment}
                </div>
              </div>
            )}

            {selectedReport.notes && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Additional Notes</p>
                <div className="p-3 bg-muted rounded text-sm">
                  {selectedReport.notes}
                </div>
              </div>
            )}

            {selectedReport.followUpRequired && selectedReport.followUpDate && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Follow-up Date</p>
                <div className="p-2 bg-warning/10 border border-warning/20 rounded text-sm">
                  {new Date(selectedReport.followUpDate).toLocaleDateString()}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Report submitted on {new Date(selectedReport.submittedAt).toLocaleString()}
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
            <span>Patient Reports History</span>
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
                  placeholder="Search by patient name, diagnosis, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterGender} onValueChange={setFilterGender}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
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
              <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No patient reports found</h3>
              <p className="text-muted-foreground">
                {reports.length === 0 
                  ? "No patient reports have been submitted yet." 
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
                    <h4 className="font-medium">{report.patientName}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{report.patientAge} years, {report.patientGender}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(report.visitDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {report.followUpRequired && (
                      <Badge variant="destructive" className="mb-2">
                        Follow-up Required
                      </Badge>
                    )}
                  </div>
                </div>

                {report.symptoms.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    <span className="text-sm">{report.symptoms.length} symptoms reported</span>
                  </div>
                )}

                {report.diagnosis && (
                  <div className="text-sm">
                    <strong>Diagnosis:</strong> {report.diagnosis.substring(0, 100)}
                    {report.diagnosis.length > 100 && '...'}
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

export default ClinicLogsHistory;