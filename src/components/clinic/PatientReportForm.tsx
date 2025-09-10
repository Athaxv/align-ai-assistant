import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Stethoscope,
  FileText,
  AlertTriangle 
} from 'lucide-react';

interface PatientReportFormProps {
  onClose: () => void;
}

const PatientReportForm = ({ onClose }: PatientReportFormProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientAddress: '',
    visitDate: new Date().toISOString().split('T')[0],
    symptoms: [] as string[],
    diagnosis: '',
    treatment: '',
    notes: '',
    followUpRequired: false,
    followUpDate: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSymptomToggle = (symptomId: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(id => id !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage for demo
      const existingReports = JSON.parse(localStorage.getItem('clinic_reports') || '[]');
      const newReport = {
        id: Date.now().toString(),
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };
      
      localStorage.setItem('clinic_reports', JSON.stringify([...existingReports, newReport]));
      
      alert('Patient report submitted successfully!');
      onClose();
    } catch (error) {
      alert('Error submitting report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onClose} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">Patient Report</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Patient Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Patient Name</Label>
                    <Input
                      placeholder="Enter patient name"
                      value={formData.patientName}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input
                      type="number"
                      placeholder="Age"
                      value={formData.patientAge}
                      onChange={(e) => setFormData({...formData, patientAge: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={formData.patientGender} onValueChange={(value) => setFormData({...formData, patientGender: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Visit Date</Label>
                    <Input
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Patient Address</Label>
                  <Input
                    placeholder="Enter patient address"
                    value={formData.patientAddress}
                    onChange={(e) => setFormData({...formData, patientAddress: e.target.value})}
                  />
                </div>

                <Button 
                  type="button" 
                  onClick={() => setCurrentStep(2)}
                  className="w-full"
                  disabled={!formData.patientName || !formData.patientAge || !formData.patientGender}
                >
                  Continue to Symptoms
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Symptoms */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Symptoms & Diagnosis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-3 block">Reported Symptoms</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {symptoms.map((symptom) => (
                      <div key={symptom.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom.id}
                          checked={formData.symptoms.includes(symptom.id)}
                          onCheckedChange={() => handleSymptomToggle(symptom.id)}
                        />
                        <Label htmlFor={symptom.id} className="flex items-center gap-2 cursor-pointer">
                          <span>{symptom.icon}</span>
                          <span className="text-sm">{symptom.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Diagnosis (if any)</Label>
                  <Textarea
                    placeholder="Enter diagnosis or preliminary assessment..."
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Treatment Given</Label>
                  <Textarea
                    placeholder="Medications prescribed, treatment provided..."
                    value={formData.treatment}
                    onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setCurrentStep(3)}
                    className="flex-1"
                    disabled={formData.symptoms.length === 0}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Additional Details */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea
                    placeholder="Any additional observations, patient history, or recommendations..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="followUp"
                    checked={formData.followUpRequired}
                    onCheckedChange={(checked) => setFormData({...formData, followUpRequired: !!checked})}
                  />
                  <Label htmlFor="followUp">Follow-up required</Label>
                </div>

                {formData.followUpRequired && (
                  <div className="space-y-2">
                    <Label>Follow-up Date</Label>
                    <Input
                      type="date"
                      value={formData.followUpDate}
                      onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                    />
                  </div>
                )}

                {/* Summary */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Report Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Patient:</strong> {formData.patientName}, {formData.patientAge} years</p>
                    <p><strong>Visit Date:</strong> {formData.visitDate}</p>
                    <p><strong>Symptoms:</strong> {formData.symptoms.length} reported</p>
                    <p><strong>Follow-up:</strong> {formData.followUpRequired ? 'Required' : 'Not required'}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
};

export default PatientReportForm;