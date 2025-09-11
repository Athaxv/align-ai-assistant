import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Droplets, MapPin, Plus } from 'lucide-react';
import GPSLocationCapture from '@/components/health/GPSLocationCapture';
import { toast } from 'sonner';

const WaterBodyDataForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    size: '',
    depth: '',
    usage: '',
    surroundings: '',
    accessibility: '',
    notes: '',
    location: null as any
  });

  const [samples, setSamples] = useState([
    { id: 1, parameter: 'pH', value: '', unit: 'pH units', method: '' },
    { id: 2, parameter: 'Turbidity', value: '', unit: 'NTU', method: '' },
    { id: 3, parameter: 'Bacterial Count', value: '', unit: 'CFU/ml', method: '' },
    { id: 4, parameter: 'Temperature', value: '', unit: '°C', method: '' },
    { id: 5, parameter: 'Dissolved Oxygen', value: '', unit: 'mg/L', method: '' }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationSelect = (location: any) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handleSampleChange = (id: number, field: string, value: string) => {
    setSamples(prev => prev.map(sample => 
      sample.id === id ? { ...sample, [field]: value } : sample
    ));
  };

  const addSample = () => {
    const newId = Math.max(...samples.map(s => s.id)) + 1;
    setSamples(prev => [...prev, {
      id: newId,
      parameter: '',
      value: '',
      unit: '',
      method: ''
    }]);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.location) {
      toast.error('Please fill in required fields and select location');
      return;
    }

    // Save to localStorage for now
    const waterBodyData = {
      ...formData,
      samples: samples.filter(s => s.parameter && s.value),
      submittedAt: new Date().toISOString(),
      id: Date.now().toString()
    };

    const existingData = JSON.parse(localStorage.getItem('waterBodies') || '[]');
    localStorage.setItem('waterBodies', JSON.stringify([...existingData, waterBodyData]));
    
    toast.success('Water body data submitted successfully!');
    
    // Reset form
    setFormData({
      name: '', type: '', size: '', depth: '', usage: '',
      surroundings: '', accessibility: '', notes: '', location: null
    });
    setSamples([
      { id: 1, parameter: 'pH', value: '', unit: 'pH units', method: '' },
      { id: 2, parameter: 'Turbidity', value: '', unit: 'NTU', method: '' },
      { id: 3, parameter: 'Bacterial Count', value: '', unit: 'CFU/ml', method: '' },
      { id: 4, parameter: 'Temperature', value: '', unit: '°C', method: '' },
      { id: 5, parameter: 'Dissolved Oxygen', value: '', unit: 'mg/L', method: '' }
    ]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Water Body Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Water Body Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Brahmaputra River"
              />
            </div>
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select water body type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="river">River</SelectItem>
                  <SelectItem value="lake">Lake</SelectItem>
                  <SelectItem value="pond">Pond</SelectItem>
                  <SelectItem value="well">Well</SelectItem>
                  <SelectItem value="borehole">Borehole</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="reservoir">Reservoir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="size">Size (sq meters)</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                placeholder="Approximate area"
              />
            </div>
            <div>
              <Label htmlFor="depth">Depth (meters)</Label>
              <Input
                id="depth"
                value={formData.depth}
                onChange={(e) => handleInputChange('depth', e.target.value)}
                placeholder="Average depth"
              />
            </div>
            <div>
              <Label htmlFor="usage">Primary Usage</Label>
              <Select value={formData.usage} onValueChange={(value) => handleInputChange('usage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary usage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drinking">Drinking Water</SelectItem>
                  <SelectItem value="irrigation">Irrigation</SelectItem>
                  <SelectItem value="domestic">Domestic Use</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="recreational">Recreational</SelectItem>
                  <SelectItem value="fishing">Fishing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accessibility">Accessibility</Label>
              <Select value={formData.accessibility} onValueChange={(value) => handleInputChange('accessibility', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How accessible is it?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy Access</SelectItem>
                  <SelectItem value="moderate">Moderate Access</SelectItem>
                  <SelectItem value="difficult">Difficult Access</SelectItem>
                  <SelectItem value="restricted">Restricted Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="surroundings">Surroundings Description</Label>
            <Textarea
              id="surroundings"
              value={formData.surroundings}
              onChange={(e) => handleInputChange('surroundings', e.target.value)}
              placeholder="Describe the area around the water body"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional observations or notes"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <GPSLocationCapture 
        onLocationSelect={handleLocationSelect}
        selectedLocation={formData.location}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Water Quality Samples</span>
            <Button onClick={addSample} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Sample
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {samples.map((sample) => (
              <div key={sample.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <Label>Parameter</Label>
                  <Input
                    value={sample.parameter}
                    onChange={(e) => handleSampleChange(sample.id, 'parameter', e.target.value)}
                    placeholder="e.g., pH"
                  />
                </div>
                <div>
                  <Label>Value</Label>
                  <Input
                    value={sample.value}
                    onChange={(e) => handleSampleChange(sample.id, 'value', e.target.value)}
                    placeholder="Measured value"
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Input
                    value={sample.unit}
                    onChange={(e) => handleSampleChange(sample.id, 'unit', e.target.value)}
                    placeholder="e.g., mg/L"
                  />
                </div>
                <div>
                  <Label>Method</Label>
                  <Input
                    value={sample.method}
                    onChange={(e) => handleSampleChange(sample.id, 'method', e.target.value)}
                    placeholder="Testing method"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} className="w-full" size="lg">
        Submit Water Body Data
      </Button>
    </div>
  );
};

export default WaterBodyDataForm;