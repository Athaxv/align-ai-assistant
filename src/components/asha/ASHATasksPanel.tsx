import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  BookOpen,
  Droplets,
  AlertTriangle 
} from 'lucide-react';

const ASHATasksPanel = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const activeTasks = [
    {
      id: 'task-1',
      title: 'Conduct Water Safety Awareness Session',
      description: 'Organize a community meeting to discuss water safety practices',
      assignedBy: 'District Health Officer',
      dueDate: '2024-01-15',
      priority: 'high',
      type: 'awareness',
      location: 'Village Community Center',
      icon: BookOpen
    },
    {
      id: 'task-2', 
      title: 'Collect Water Samples from 3 Wells',
      description: 'Collect water samples from village wells for quality testing',
      assignedBy: 'Water Quality Team',
      dueDate: '2024-01-12',
      priority: 'medium',
      type: 'sampling',
      location: 'Village Wells 1, 2, 3',
      icon: Droplets
    },
    {
      id: 'task-3',
      title: 'Follow-up on Previous Cases',
      description: 'Check on 5 households that reported symptoms last week',
      assignedBy: 'Clinic Supervisor',
      dueDate: '2024-01-10',
      priority: 'high',
      type: 'followup',
      location: 'Various households',
      icon: Users
    }
  ];

  const recentlyCompleted = [
    {
      id: 'completed-1',
      title: 'Weekly Health Survey',
      completedDate: '2024-01-08',
      assignedBy: 'Health Coordinator',
      type: 'survey'
    },
    {
      id: 'completed-2',
      title: 'Distribute Health Leaflets',
      completedDate: '2024-01-07',
      assignedBy: 'District Health Officer',
      type: 'awareness'
    },
    {
      id: 'completed-3',
      title: 'Report Community Concerns',
      completedDate: '2024-01-06',
      assignedBy: 'Field Supervisor',
      type: 'reporting'
    }
  ];

  const handleMarkComplete = (taskId: string) => {
    setCompletedTasks([...completedTasks, taskId]);
    // In real app, this would update the backend
    alert('Task marked as completed!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'awareness': return BookOpen;
      case 'sampling': return Droplets;
      case 'followup': return Users;
      case 'survey': return Calendar;
      case 'reporting': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Tasks ({activeTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({recentlyCompleted.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeTasks.filter(task => !completedTasks.includes(task.id)).map((task) => {
            const IconComponent = task.icon;
            return (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                      </div>
                      <Badge variant={getPriorityColor(task.priority) as any}>
                        {task.priority}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Assigned by:</span>
                        <span>{task.assignedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Due:</span>
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Location:</span>
                      <span>{task.location}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleMarkComplete(task.id)}
                        className="gap-2"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Mark Complete
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {activeTasks.filter(task => !completedTasks.includes(task.id)).length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="font-medium mb-2">All tasks completed!</h3>
                <p className="text-muted-foreground">Great work! Check back later for new assignments.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {recentlyCompleted.map((task) => {
            const IconComponent = getTypeIcon(task.type);
            return (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{task.assignedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Completed {new Date(task.completedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success border-success">
                      Completed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ASHATasksPanel;