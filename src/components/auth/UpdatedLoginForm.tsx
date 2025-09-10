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

const UpdatedLoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const roles = [
    { 
      value: 'asha_worker', 
      label: 'ASHA Worker / Volunteer', 
      icon: Users,
      description: 'Community health workers and volunteers' 
    },
    { 
      value: 'clinic_staff', 
      label: 'Clinic Doctor / Staff', 
      icon: Stethoscope,
      description: 'Medical facility personnel' 
    },
    { 
      value: 'researcher', 
      label: 'Water Quality Researcher', 
      icon: Microscope,
      description: 'Research and water quality specialists' 
    },
    { 
      value: 'health_official', 
      label: 'Health Official / Admin', 
      icon: Shield,
      description: 'Administrative and oversight roles' 
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - in real app this would validate against backend
    const userData = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.email.split('@')[0], // Extract name from email for demo
      role: formData.role as any,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
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

  const selectedRole = roles.find(role => role.value === formData.role);

  return (
    <AuthLayout 
      title="Sign In" 
      subtitle="Access your AquaGuard dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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

        {/* Sign In Button */}
        <Button 
          type="submit" 
          className="w-full"
          disabled={!formData.email || !formData.password || !formData.role}
        >
          Sign In
        </Button>

        {/* Additional Options */}
        <div className="text-center space-y-2">
          <Button variant="link" size="sm" className="text-xs">
            Forgot your password?
          </Button>
          <div className="text-xs text-muted-foreground">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              size="sm" 
              className="text-xs p-0 h-auto"
              onClick={() => navigate('/signup')}
            >
              Sign up here
            </Button>
          </div>
        </div>
      </form>

      {/* Development Notice */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-600">
          <strong>Demo:</strong> Use any email/password to login. For production, 
          connect to Supabase for secure authentication.
        </p>
      </div>
    </AuthLayout>
  );
};

export default UpdatedLoginForm;