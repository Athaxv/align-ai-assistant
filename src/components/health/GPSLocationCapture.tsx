import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Navigation, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { mockLocations } from '@/data/mockData';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface GPSLocationCaptureProps {
  onLocationSelect: (location: { coordinates: { lat: number; lng: number }; name: string; accuracy?: number }) => void;
  selectedLocation?: any;
}

const GPSLocationCapture = ({ onLocationSelect, selectedLocation }: GPSLocationCaptureProps) => {
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [manualLocation, setManualLocation] = useState('');
  const [useGPS, setUseGPS] = useState(true);
  const [error, setError] = useState<string>('');

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setGpsStatus('error');
      return;
    }

    setGpsStatus('loading');
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        };

        setCurrentLocation(locationData);
        setGpsStatus('success');

        // Auto-select the GPS location
        onLocationSelect({
          coordinates: {
            lat: locationData.latitude,
            lng: locationData.longitude
          },
          name: `GPS Location (${locationData.latitude.toFixed(6)}, ${locationData.longitude.toFixed(6)})`,
          accuracy: locationData.accuracy
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setError(errorMessage);
        setGpsStatus('error');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleManualLocationSelect = (locationId: string) => {
    const location = mockLocations.find(loc => loc.id === locationId);
    if (location) {
      setManualLocation(locationId);
      onLocationSelect({
        coordinates: location.coordinates,
        name: location.name
      });
    }
  };

  const getAccuracyStatus = (accuracy: number) => {
    if (accuracy <= 10) return { label: 'Excellent', color: 'bg-green-500', textColor: 'text-green-700' };
    if (accuracy <= 50) return { label: 'Good', color: 'bg-blue-500', textColor: 'text-blue-700' };
    if (accuracy <= 100) return { label: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { label: 'Poor', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Capture
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GPS vs Manual Toggle */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={useGPS ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUseGPS(true)}
            className="flex-1"
          >
            <Navigation className="h-4 w-4 mr-2" />
            GPS Auto-Capture
          </Button>
          <Button
            type="button"
            variant={!useGPS ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUseGPS(false)}
            className="flex-1"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Manual Selection
          </Button>
        </div>

        {useGPS ? (
          <div className="space-y-4">
            {/* GPS Capture Button */}
            <Button
              type="button"
              onClick={getCurrentLocation}
              disabled={gpsStatus === 'loading'}
              className="w-full"
            >
              {gpsStatus === 'loading' ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Current Location
                </>
              )}
            </Button>

            {/* GPS Status */}
            {gpsStatus === 'success' && currentLocation && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">
                      Location Captured Successfully
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-green-700">
                      <p>Latitude: {currentLocation.latitude.toFixed(6)}</p>
                      <p>Longitude: {currentLocation.longitude.toFixed(6)}</p>
                      <div className="flex items-center gap-2">
                        <span>Accuracy:</span>
                        <Badge 
                          variant="secondary" 
                          className={`${getAccuracyStatus(currentLocation.accuracy).color} text-white`}
                        >
                          {getAccuracyStatus(currentLocation.accuracy).label} (±{Math.round(currentLocation.accuracy)}m)
                        </Badge>
                      </div>
                      <p>Captured: {new Date(currentLocation.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {gpsStatus === 'error' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Location Capture Failed
                    </p>
                    <p className="text-xs text-red-700 mt-1">{error}</p>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={() => setUseGPS(false)}
                      className="text-red-600 p-0 h-auto mt-2"
                    >
                      Switch to manual selection
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Location Manually</label>
            <Select value={manualLocation} onValueChange={handleManualLocationSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a location" />
              </SelectTrigger>
              <SelectContent>
                {mockLocations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{location.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {location.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Current Selection Display */}
        {selectedLocation && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Selected Location</p>
                <p className="text-xs text-blue-700 mt-1">{selectedLocation.name}</p>
                {selectedLocation.accuracy && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    ±{Math.round(selectedLocation.accuracy)}m accuracy
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Location Permissions Notice */}
        <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Privacy Notice:</strong> Location data is used only for health reporting purposes and helps ensure accurate geographical tracking of health incidents.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GPSLocationCapture;