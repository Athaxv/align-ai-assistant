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
  MapPin, 
  Calendar, 
  Camera, 
  Users, 
  AlertTriangle,
  CheckCircle 
} from 'lucide-react';
import GPSLocationCapture from '@/components/health/GPSLocationCapture';

interface DailySurveyFormProps {
  onClose: () => void;
}

const DailySurveyForm = ({ onClose }: DailySurveyFormProps) => {
  const [formData, setFormData] = useState({
    surveyDate: new Date().toISOString().split('T')[0],
    surveyType: 'daily',
    areaName: '',
    location: null as any,
    symptomsFound: [] as string[],
    suspectedCases: 0,
    notes: '',
    photos: [] as File[]
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
    { id: 'skin_rash', label: 'Skin Rash', icon: '🔴' }
  ];

  const handleSymptomToggle = (symptomId: string) => {
    setFormData(prev => ({
      ...prev,
      symptomsFound: prev.symptomsFound.includes(symptomId)
        ? prev.symptomsFound.filter(id => id !== symptomId)
        : [...prev.symptomsFound, symptomId]
    }));
  };

  const handleLocationCapture = (location: any) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage for demo
      const existingReports = JSON.parse(localStorage.getItem('asha_surveys') || '[]');
      const newReport = {
        id: Date.now().toString(),
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };
      
      localStorage.setItem('asha_surveys', JSON.stringify([...existingReports, newReport]));
      
      alert('Survey submitted successfully!');
      onClose();
    } catch (error) {
      alert('Error submitting survey. Please try again.');
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
              <h1 className="text-xl font-bold">Daily Health Survey</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Survey Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Survey Date</Label>
                    <Input
                      type="date"
                      value={formData.surveyDate}
                      onChange={(e) => setFormData({...formData, surveyDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Survey Type</Label>
                    <Select value={formData.surveyType} onValueChange={(value) => setFormData({...formData, surveyType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily Survey</SelectItem>
                        <SelectItem value="weekly">Weekly Survey</SelectItem>
                        <SelectItem value="special">Special Investigation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Area/Village Name</Label>
                  <Input
                    placeholder="Enter area or village name"
                    value={formData.areaName}
                    onChange={(e) => setFormData({...formData, areaName: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location (GPS)
                  </Label>
                  <GPSLocationCapture onLocationSelect={handleLocationCapture} />
                  {formData.location && (
                    <div className="p-2 bg-success/10 border border-success/20 rounded text-sm">
                      <p className="text-success font-medium">Location captured successfully</p>
                      <p className="text-xs text-muted-foreground">
                        Lat: {formData.location.latitude.toFixed(6)}, 
                        Lng: {formData.location.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>

                <Button 
                  type="button" 
                  onClick={() => setCurrentStep(2)}
                  className="w-full"
                  disabled={!formData.areaName || !formData.location}
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
                  Symptoms Found
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {symptoms.map((symptom) => (
                    <div key={symptom.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom.id}
                        checked={formData.symptomsFound.includes(symptom.id)}
                        onCheckedChange={() => handleSymptomToggle(symptom.id)}
                      />
                      <Label htmlFor={symptom.id} className="flex items-center gap-2 cursor-pointer">
                        <span>{symptom.icon}</span>
                        <span className="text-sm">{symptom.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>

                {formData.symptomsFound.length > 0 && (
                  <div className="space-y-2">
                    <Label>Number of Suspected Cases</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter number of suspected cases"
                      value={formData.suspectedCases}
                      onChange={(e) => setFormData({...formData, suspectedCases: parseInt(e.target.value) || 0})}
                    />
                  </div>
                )}

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
                  <CheckCircle className="h-5 w-5" />
                  Additional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Notes/Observations</Label>
                  <Textarea
                    placeholder="Any additional observations, community concerns, or recommendations..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Upload Photos (Optional)
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                  />
                  {formData.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.photos.map((photo, index) => (
                        <Badge key={index} variant="secondary">
                          {photo.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Survey Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Area:</strong> {formData.areaName}</p>
                    <p><strong>Date:</strong> {formData.surveyDate}</p>
                    <p><strong>Symptoms:</strong> {formData.symptomsFound.length} types found</p>
                    <p><strong>Suspected Cases:</strong> {formData.suspectedCases}</p>
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
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
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

export default DailySurveyForm;