import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Users, Stethoscope, Microscope, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const SignupForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    gender: '',
    phone: '',
    role: '',
    
    // Role-specific fields
    qualification: '',
    regionCovered: '',
    clinicName: '',
    clinicType: '',
    numDoctors: '',
    numStaff: '',
    inchargeName: '',
    institution: '',
    address: '',
  });

  const roles = [
    { 
      value: 'asha_worker', 
      label: 'ASHA Worker / Volunteer', 
      icon: Users,
      description: 'Community health workers and volunteers',
      fields: ['qualification', 'regionCovered']
    },
    { 
      value: 'clinic_staff', 
      label: 'Clinic Doctor / Staff', 
      icon: Stethoscope,
      description: 'Medical facility personnel',
      fields: ['clinicName', 'clinicType', 'numDoctors', 'numStaff', 'inchargeName']
    },
    { 
      value: 'researcher', 
      label: 'Water Quality Researcher', 
      icon: Microscope,
      description: 'Research and water quality specialists',
      fields: ['qualification', 'institution', 'address']
    },
    { 
      value: 'health_official', 
      label: 'Health Official / Admin', 
      icon: Shield,
      description: 'Administrative and oversight roles',
      fields: ['qualification', 'institution']
    }
  ];

  const selectedRole = roles.find(role => role.value === formData.role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create user object
    const userData = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name,
      role: formData.role as any,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      // Store additional profile data
      profile: {
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        qualification: formData.qualification,
        regionCovered: formData.regionCovered,
        clinicName: formData.clinicName,
        clinicType: formData.clinicType,
        numDoctors: formData.numDoctors,
        numStaff: formData.numStaff,
        inchargeName: formData.inchargeName,
        institution: formData.institution,
        address: formData.address,
      }
    };

    login(userData);

    // Redirect based on role
    const roleRoutes = {
      'asha_worker': '/dashboard/asha',
      'clinic_staff': '/dashboard/clinic',
      'researcher': '/dashboard/researcher',
      'health_official': '/dashboard'
    };

    navigate(roleRoutes[formData.role as keyof typeof roleRoutes] || '/dashboard');
  };

  const nextStep = () => setCurrentStep(2);
  const prevStep = () => setCurrentStep(1);

  const isStep1Valid = formData.email && formData.password && formData.confirmPassword && 
                      formData.name && formData.role && formData.password === formData.confirmPassword;

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join the AquaGuard community"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {currentStep === 1 && (
          <>
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
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
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <span>{role.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {selectedRole && (
                  <Card className="mt-2">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <selectedRole.icon className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">{selectedRole.label}</p>
                            <Badge variant="secondary" className="text-xs">
                              {selectedRole.value.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {selectedRole.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <Button 
              type="button" 
              onClick={nextStep}
              className="w-full"
              disabled={!isStep1Valid}
            >
              Continue to Profile Setup
            </Button>
          </>
        )}

        {currentStep === 2 && selectedRole && (
          <>
            {/* Role-specific fields */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" onClick={prevStep} className="p-1">
                  ←
                </Button>
                <h3 className="font-medium text-sm">Profile Setup for {selectedRole.label}</h3>
              </div>

              {/* ASHA Worker fields */}
              {formData.role === 'asha_worker' && (
                <>
                  <div className="space-y-2">
                    <Label>Qualification</Label>
                    <Input
                      placeholder="Educational qualification"
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Region Covered</Label>
                    <Input
                      placeholder="Villages/areas you cover"
                      value={formData.regionCovered}
                      onChange={(e) => setFormData({...formData, regionCovered: e.target.value})}
                    />
                  </div>
                </>
              )}

              {/* Clinic Staff fields */}
              {formData.role === 'clinic_staff' && (
                <>
                  <div className="space-y-2">
                    <Label>Clinic Name</Label>
                    <Input
                      placeholder="Name of clinic/hospital"
                      value={formData.clinicName}
                      onChange={(e) => setFormData({...formData, clinicName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Clinic Type</Label>
                    <Select value={formData.clinicType} onValueChange={(value) => setFormData({...formData, clinicType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select clinic type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="government">Government Dispensary</SelectItem>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="phc">Primary Health Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Number of Doctors</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={formData.numDoctors}
                        onChange={(e) => setFormData({...formData, numDoctors: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Number of Staff</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={formData.numStaff}
                        onChange={(e) => setFormData({...formData, numStaff: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>In-charge Name</Label>
                    <Input
                      placeholder="Name of person in-charge"
                      value={formData.inchargeName}
                      onChange={(e) => setFormData({...formData, inchargeName: e.target.value})}
                    />
                  </div>
                </>
              )}

              {/* Researcher fields */}
              {formData.role === 'researcher' && (
                <>
                  <div className="space-y-2">
                    <Label>Qualification</Label>
                    <Input
                      placeholder="Educational/research qualification"
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Institution Affiliated</Label>
                    <Input
                      placeholder="University/research institute"
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      placeholder="Full address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </>
              )}

              {/* Health Official fields */}
              {formData.role === 'health_official' && (
                <>
                  <div className="space-y-2">
                    <Label>Qualification</Label>
                    <Input
                      placeholder="Educational/professional qualification"
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      placeholder="Department/organization"
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>
                </>
              )}
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </>
        )}

        {/* Sign In Link */}
        <div className="text-center">
          <div className="text-xs text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              Sign in here
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignupForm;