import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Star, Trophy, Shield, Download, Share, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Certificate {
  id: string;
  title: string;
  type: 'achievement' | 'completion' | 'contribution' | 'recognition';
  description: string;
  issueDate: string;
  blockchainHash?: string;
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  category: 'high_risk_zone' | 'education' | 'data_quality' | 'community_service';
}

const CertificateSystem = () => {
  const { user } = useAuth();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Mock certificates data - in real app, fetch from blockchain/database
  const userCertificates: Certificate[] = [
    {
      id: '1',
      title: 'High-Risk Zone Service Excellence',
      type: 'achievement',
      description: 'Outstanding service in flood-affected areas during monsoon 2024',
      issueDate: '2024-01-15',
      blockchainHash: '0x1a2b3c4d5e6f7g8h9i0j',
      points: 500,
      level: 'gold',
      category: 'high_risk_zone'
    },
    {
      id: '2',
      title: 'Water Quality Data Contributor',
      type: 'contribution',
      description: 'Submitted 50+ accurate water quality measurements',
      issueDate: '2024-01-10',
      blockchainHash: '0x2b3c4d5e6f7g8h9i0j1k',
      points: 300,
      level: 'silver',
      category: 'data_quality'
    },
    {
      id: '3',
      title: 'Hygiene Education Specialist',
      type: 'completion',
      description: 'Completed advanced hygiene awareness training program',
      issueDate: '2024-01-05',
      blockchainHash: '0x3c4d5e6f7g8h9i0j1k2l',
      points: 200,
      level: 'bronze',
      category: 'education'
    }
  ];

  const achievements = [
    { name: 'First Report', description: 'Submit your first health report', points: 50, achieved: true },
    { name: 'Data Champion', description: 'Submit 100+ quality data points', points: 500, achieved: true },
    { name: 'Emergency Responder', description: 'Respond to 5 emergency situations', points: 750, achieved: false },
    { name: 'Community Hero', description: 'Serve in high-risk zones for 6 months', points: 1000, achieved: true }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', points: 2450, certificates: 8, location: 'Guwahati' },
    { rank: 2, name: 'Raj Kumar', points: 2180, certificates: 6, location: 'Jorhat' },
    { rank: 3, name: 'Anita Das', points: 1950, certificates: 7, location: 'Dibrugarh' },
    { rank: 4, name: user?.name || 'You', points: 1000, certificates: 3, location: 'Your Area' },
    { rank: 5, name: 'Suresh Patel', points: 890, certificates: 4, location: 'Silchar' }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'platinum': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'high_risk_zone': return Shield;
      case 'education': return Award;
      case 'data_quality': return Star;
      case 'community_service': return Trophy;
      default: return Award;
    }
  };

  const downloadCertificate = (certificate: Certificate) => {
    // Generate and download certificate PDF
    console.log('Downloading certificate:', certificate.id);
    // Implementation for PDF generation would go here
  };

  const shareCertificate = (certificate: Certificate) => {
    // Share certificate on social media or generate link
    console.log('Sharing certificate:', certificate.id);
    // Implementation for sharing would go here
  };

  const verifyCertificate = (blockchainHash: string) => {
    // Verify certificate on blockchain
    console.log('Verifying certificate with hash:', blockchainHash);
    // Implementation for blockchain verification would go here
  };

  const totalPoints = userCertificates.reduce((sum, cert) => sum + cert.points, 0);

  return (
    <div className="space-y-6">
      {/* User Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userCertificates.length}</div>
            <div className="text-sm text-muted-foreground">Certificates</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {achievements.filter(a => a.achieved).length}/{achievements.length}
            </div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">#4</div>
            <div className="text-sm text-muted-foreground">District Rank</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="certificates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="certificates">My Certificates</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="verify">Verify Certificate</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userCertificates.map((certificate) => {
              const CategoryIcon = getCategoryIcon(certificate.category);
              return (
                <Card key={certificate.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <CategoryIcon className="h-8 w-8 text-primary" />
                        <Badge className={`${getLevelColor(certificate.level)} text-white`}>
                          {certificate.level.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">{certificate.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {certificate.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Issued: {certificate.issueDate}</span>
                        <span>{certificate.points} points</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => downloadCertificate(certificate)}
                          className="flex-1"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => shareCertificate(certificate)}
                          className="flex-1"
                        >
                          <Share className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                      
                      {certificate.blockchainHash && (
                        <div className="text-xs text-muted-foreground">
                          Blockchain: {certificate.blockchainHash.substring(0, 10)}...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.achieved ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {achievement.achieved ? (
                          <Star className="h-4 w-4 text-white" />
                        ) : (
                          <Star className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{achievement.points} pts</div>
                      <Badge variant={achievement.achieved ? 'default' : 'secondary'}>
                        {achievement.achieved ? 'Achieved' : 'Locked'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>District Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      entry.name === user?.name ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        entry.rank === 1 ? 'bg-yellow-500' :
                        entry.rank === 2 ? 'bg-gray-400' :
                        entry.rank === 3 ? 'bg-amber-600' : 'bg-gray-500'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">{entry.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{entry.points} pts</div>
                      <div className="text-sm text-muted-foreground">{entry.certificates} certificates</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card>
            <CardHeader>
              <CardTitle>Verify Certificate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Blockchain Hash</label>
                <div className="flex gap-2 mt-1">
                  <input 
                    type="text" 
                    placeholder="Enter blockchain hash (e.g., 0x1a2b3c4d...)"
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <Button onClick={() => verifyCertificate('')}>
                    <Eye className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-medium mb-2">How Certificate Verification Works</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Each certificate is stored on blockchain for immutability</li>
                  <li>• Blockchain hash provides cryptographic proof of authenticity</li>
                  <li>• Verification confirms certificate was issued by authorized entity</li>
                  <li>• Public verification ensures transparency and trust</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificateSystem;