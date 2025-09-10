import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressChart = ({ progressData, milestones }) => {
  const [activeView, setActiveView] = useState('progress');

  const chartData = [
    { month: 'Jan', wellnessScore: 65, sessions: 4, symptoms: 8 },
    { month: 'Feb', wellnessScore: 72, sessions: 6, symptoms: 6 },
    { month: 'Mar', wellnessScore: 78, sessions: 8, symptoms: 4 },
    { month: 'Apr', wellnessScore: 85, sessions: 7, symptoms: 3 },
    { month: 'May', wellnessScore: 88, sessions: 9, symptoms: 2 },
    { month: 'Jun', wellnessScore: 92, sessions: 8, symptoms: 1 }
  ];

  const milestoneData = [
    {
      id: 1,
      title: 'Initial Assessment Complete',
      description: 'Prakriti (constitution) analysis completed',
      date: '2024-01-15',
      status: 'completed',
      icon: 'CheckCircle'
    },
    {
      id: 2,
      title: 'Detoxification Phase',
      description: 'Shodhana Chikitsa (purification) started',
      date: '2024-02-01',
      status: 'completed',
      icon: 'Droplets'
    },
    {
      id: 3,
      title: 'Strengthening Phase',
      description: 'Rasayana therapy (rejuvenation) in progress',
      date: '2024-03-15',
      status: 'current',
      icon: 'Zap'
    },
    {
      id: 4,
      title: 'Maintenance Phase',
      description: 'Swasthavritta (healthy lifestyle) guidance',
      date: '2024-05-01',
      status: 'upcoming',
      icon: 'Target'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'current': return 'text-accent bg-accent/10';
      case 'upcoming': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-body text-sm text-foreground mb-2">{`Month: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="font-caption text-xs" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}${entry?.dataKey === 'wellnessScore' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-breathing border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Chikitsa Pragati (Progress Tracking)
            </h3>
            <p className="font-body text-sm text-text-secondary">
              Your wellness journey overview
            </p>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <Button
            variant={activeView === 'progress' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('progress')}
          >
            Progress
          </Button>
          <Button
            variant={activeView === 'milestones' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('milestones')}
          >
            Milestones
          </Button>
        </div>
      </div>
      {activeView === 'progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-success/5 rounded-lg p-4 border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Heart" size={16} className="text-success" />
                <span className="font-body text-sm text-success">Wellness Score</span>
              </div>
              <p className="font-heading text-2xl font-semibold text-foreground">92%</p>
              <p className="font-caption text-xs text-text-secondary">+4% from last month</p>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="font-body text-sm text-primary">Sessions</span>
              </div>
              <p className="font-heading text-2xl font-semibold text-foreground">8</p>
              <p className="font-caption text-xs text-text-secondary">This month</p>
            </div>
            
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-accent" />
                <span className="font-body text-sm text-accent">Symptoms</span>
              </div>
              <p className="font-heading text-2xl font-semibold text-foreground">1</p>
              <p className="font-caption text-xs text-text-secondary">Significant improvement</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="wellnessScore" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="symptoms" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {activeView === 'milestones' && (
        <div className="space-y-4">
          {milestoneData?.map((milestone, index) => (
            <div key={milestone?.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(milestone?.status)}`}>
                  <Icon 
                    name={milestone?.icon} 
                    size={16} 
                    className={milestone?.status === 'completed' ? 'text-success' : 
                              milestone?.status === 'current' ? 'text-accent' : 'text-text-secondary'} 
                  />
                </div>
                {index < milestoneData?.length - 1 && (
                  <div className={`w-0.5 h-8 mt-2 ${
                    milestone?.status === 'completed' ? 'bg-success/30' : 'bg-border'
                  }`} />
                )}
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-body font-medium text-foreground">
                    {milestone?.title}
                  </h4>
                  <span className="font-caption text-xs text-text-secondary">
                    {new Date(milestone.date)?.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short'
                    })}
                  </span>
                </div>
                <p className="font-caption text-sm text-text-secondary">
                  {milestone?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressChart;