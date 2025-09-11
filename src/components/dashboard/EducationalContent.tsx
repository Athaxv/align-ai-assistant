import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, Award, Users, Globe, Play, Download } from 'lucide-react';
import CertificateSystem from '@/components/certificates/CertificateSystem';

const EducationalContent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'as', name: 'Assamese' },
    { code: 'bn', name: 'Bengali' },
    { code: 'hi', name: 'Hindi' },
    { code: 'mz', name: 'Mizo' },
    { code: 'kh', name: 'Khasi' }
  ];

  const educationalModules = [
    {
      id: 1,
      title: 'Safe Water Usage',
      type: 'article',
      category: 'hygiene',
      duration: '15 min',
      difficulty: 'beginner',
      description: 'Learn proper water collection, storage, and purification techniques',
      progress: 100,
      points: 50
    },
    {
      id: 2,
      title: 'Disease Prevention Basics',
      type: 'video',
      category: 'prevention',
      duration: '20 min',
      difficulty: 'intermediate',
      description: 'Understanding waterborne diseases and prevention strategies',
      progress: 60,
      points: 75
    },
    {
      id: 3,
      title: 'Hygiene Practices for Families',
      type: 'infographic',
      category: 'hygiene',
      duration: '10 min',
      difficulty: 'beginner',
      description: 'Essential hygiene practices for household members',
      progress: 0,
      points: 40
    },
    {
      id: 4,
      title: 'Water Quality Testing',
      type: 'interactive',
      category: 'technical',
      duration: '30 min',
      difficulty: 'advanced',
      description: 'Learn to conduct basic water quality tests',
      progress: 25,
      points: 100
    }
  ];

  const quizzes = [
    { id: 1, title: 'Water Safety Quiz', questions: 10, difficulty: 'easy', points: 50, completed: true, score: 8 },
    { id: 2, title: 'Disease Prevention Quiz', questions: 15, difficulty: 'medium', points: 75, completed: true, score: 12 },
    { id: 3, title: 'Hygiene Practices Quiz', questions: 12, difficulty: 'easy', points: 60, completed: false, score: null }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'article': return FileText;
      case 'infographic': return BookOpen;
      case 'interactive': return Play;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Educational Content</h1>
          <p className="text-muted-foreground">Learn, earn certificates, and contribute to community health</p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={selectedLanguage === lang.code ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage(lang.code)}
            >
              {lang.name}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes & Assessment</TabsTrigger>
          <TabsTrigger value="certificates">Certificates & Achievements</TabsTrigger>
          <TabsTrigger value="community">Community Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="modules">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalModules.map((module) => {
              const TypeIcon = getTypeIcon(module.type);
              return (
                <Card key={module.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <TypeIcon className="h-8 w-8 text-primary" />
                        <Badge variant="outline">{module.difficulty}</Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{module.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">{module.duration}</span>
                          <Badge variant="secondary">{module.category}</Badge>
                        </div>
                        <span className="font-medium text-primary">{module.points} pts</span>
                      </div>
                      
                      {module.progress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full" 
                        variant={module.progress === 100 ? "outline" : "default"}
                      >
                        {module.progress === 100 ? 'Review' : module.progress > 0 ? 'Continue' : 'Start Learning'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="quizzes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{quiz.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              {quiz.questions} questions
                            </span>
                            <Badge 
                              variant="outline" 
                              className={quiz.difficulty === 'easy' ? 'text-green-600' : 
                                         quiz.difficulty === 'medium' ? 'text-yellow-600' : 'text-red-600'}
                            >
                              {quiz.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{quiz.points} pts</div>
                          {quiz.completed && quiz.score && (
                            <div className="text-sm text-green-600">
                              Score: {quiz.score}/{quiz.questions}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-3" 
                        variant={quiz.completed ? "outline" : "default"}
                      >
                        {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiz Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Priya Sharma', score: 485, quizzes: 12 },
                    { rank: 2, name: 'Raj Kumar', score: 420, quizzes: 10 },
                    { rank: 3, name: 'You', score: 125, quizzes: 2 },
                    { rank: 4, name: 'Anita Das', score: 95, quizzes: 3 }
                  ].map((entry) => (
                    <div 
                      key={entry.rank} 
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        entry.name === 'You' ? 'bg-primary/5 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
                          entry.rank === 1 ? 'bg-yellow-500' : 
                          entry.rank === 2 ? 'bg-gray-400' : 
                          entry.rank === 3 ? 'bg-amber-600' : 'bg-gray-500'
                        }`}>
                          {entry.rank}
                        </div>
                        <span className="font-medium">{entry.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{entry.score} pts</div>
                        <div className="text-sm text-muted-foreground">{entry.quizzes} quizzes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <CertificateSystem />
        </TabsContent>

        <TabsContent value="community">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-muted-foreground">Active Learners</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold">34</div>
                    <div className="text-sm text-muted-foreground">Learning Modules</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">Certificates Issued</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold">89%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'ASHA Worker - Guwahati', contributions: 45, type: 'field_data' },
                    { name: 'Health Officer - Jorhat', contributions: 32, type: 'content_creation' },
                    { name: 'Clinic Staff - Silchar', contributions: 28, type: 'case_studies' },
                    { name: 'Researcher - Dibrugarh', contributions: 24, type: 'analysis' }
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{contributor.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {contributor.type.replace('_', ' ')}
                        </div>
                      </div>
                      <Badge variant="secondary">{contributor.contributions} contributions</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalContent;