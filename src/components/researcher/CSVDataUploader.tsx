import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CSVRecord {
  [key: string]: string;
}

const CSVDataUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CSVRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setUploadStatus('idle');
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const parseCSV = (csvText: string): CSVRecord[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const records: CSVRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const record: CSVRecord = {};
      
      headers.forEach((header, index) => {
        record[header] = values[index] || '';
      });
      
      records.push(record);
    }

    return records;
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setUploadStatus('processing');

    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        throw new Error('No valid data found in CSV');
      }

      setCsvData(parsedData);
      setUploadStatus('success');
      toast.success(`Successfully processed ${parsedData.length} records`);
    } catch (error) {
      setUploadStatus('error');
      toast.error('Error processing CSV file');
      console.error('CSV processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadData = () => {
    if (csvData.length === 0) return;

    // Save to localStorage for now
    const existingUploads = JSON.parse(localStorage.getItem('csvUploads') || '[]');
    const newUpload = {
      id: Date.now().toString(),
      filename: file?.name,
      records: csvData.length,
      data: csvData,
      uploadedAt: new Date().toISOString()
    };

    localStorage.setItem('csvUploads', JSON.stringify([...existingUploads, newUpload]));
    toast.success('Data uploaded successfully!');
    
    // Reset
    setFile(null);
    setCsvData([]);
    setUploadStatus('idle');
  };

  const validateData = () => {
    if (csvData.length === 0) return { valid: 0, invalid: 0, errors: [] };
    
    let valid = 0;
    let invalid = 0;
    const errors: string[] = [];

    csvData.forEach((record, index) => {
      const hasRequiredFields = record['location'] && record['parameter'] && record['value'];
      if (hasRequiredFields) {
        valid++;
      } else {
        invalid++;
        errors.push(`Row ${index + 2}: Missing required fields`);
      }
    });

    return { valid, invalid, errors: errors.slice(0, 5) }; // Show first 5 errors
  };

  const validation = validateData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            CSV Data Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="csvFile">Select CSV File</Label>
            <Input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Expected columns: location, parameter, value, unit, date, method
            </p>
          </div>

          {file && (
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={processFile} 
              disabled={!file || isProcessing}
              className="flex-1"
            >
              {isProcessing ? 'Processing...' : 'Process CSV'}
            </Button>
            
            {uploadStatus === 'success' && (
              <Button onClick={uploadData} variant="outline">
                <Check className="h-4 w-4 mr-2" />
                Upload Data
              </Button>
            )}
          </div>

          {uploadStatus === 'error' && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive">Error processing file</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {csvData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{csvData.length}</div>
                  <div className="text-sm text-green-700">Total Records</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{validation.valid}</div>
                  <div className="text-sm text-blue-700">Valid Records</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{validation.invalid}</div>
                  <div className="text-sm text-red-700">Invalid Records</div>
                </div>
              </div>

              {validation.errors.length > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-2">Validation Issues:</div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {validation.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-60 overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary">
                      <tr>
                        {csvData[0] && Object.keys(csvData[0]).map((header) => (
                          <th key={header} className="p-2 text-left border-r">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.slice(0, 5).map((row, index) => (
                        <tr key={index} className="border-t">
                          {Object.values(row).map((value, cellIndex) => (
                            <td key={cellIndex} className="p-2 border-r">{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {csvData.length > 5 && (
                  <div className="p-2 bg-secondary text-center text-sm text-muted-foreground">
                    ... and {csvData.length - 5} more records
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CSVDataUploader;