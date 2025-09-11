import React from 'react';
import { Users, Car, Clock, LucideIcon } from 'lucide-react';
import LiveTracking from './LiveTracking';

interface StatCard {
  title: string;
  value: string;
  total?: string;
  icon: LucideIcon;
  color: string;
  description?: string;
}

interface ActivityItem {
  action: string;
  driver: string;
  time: string;
}

const Dashboard: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Available Drivers',
      value: '12',
      total: '15',
      icon: Users,
      color: 'icon-success',
      description: 'Active drivers ready for lessons'
    },
    {
      title: 'Available Cars',
      value: '8',
      total: '10',
      icon: Car,
      color: 'icon-info',
      description: 'Vehicles ready for training'
    },
    {
      title: 'Active Lessons',
      value: '5',
      icon: Clock,
      color: 'icon-warning',
      description: 'Currently ongoing sessions'
    },
  ];

  const recentActivities: ActivityItem[] = [
    { action: 'Lesson completed', driver: 'John Smith', time: '2 hours ago' },
    { action: 'New booking', driver: 'Sarah Wilson', time: '4 hours ago' },
    { action: 'Car maintenance', driver: 'Vehicle #1234', time: '1 day ago' },
  ];

  const formatDate = (): string => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStatCard = (stat: StatCard, index: number) => {
    const IconComponent = stat.icon;
    return (
      <div
        key={index}
        className="card card-hover"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-body text-sm font-medium mb-2">
              {stat.title}
            </p>
            <div className="flex items-baseline space-x-2 mb-1">
              <p className="text-3xl font-bold text-white">
                {stat.value}
              </p>
              {stat.total && (
                <p className="text-muted text-lg">/ {stat.total}</p>
              )}
            </div>
            {stat.description && (
              <p className="text-muted text-xs">{stat.description}</p>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-opacity-20 ${stat.color}`}>
            <IconComponent size={24} className={stat.color} />
          </div>
        </div>
      </div>
    );
  };

  const renderActivityItem = (activity: ActivityItem, index: number) => (
    <div
      key={index}
      className="flex items-center justify-between p-4 bg-[#434546] rounded-lg hover:bg-[#5A5B5C] transition-colors"
    >
      <div>
        <p className="text-white font-medium">{activity.action}</p>
        <p className="text-muted text-sm">{activity.driver}</p>
      </div>
      <p className="text-muted text-sm">{activity.time}</p>
    </div>
  );

  return (
    <div className="section-spacing">
      {/* Header Section */}
      <header className="flex-responsive">
        <h1 className="text-heading">Dashboard</h1>
        <p className="text-body mt-2 sm:mt-0">
          {formatDate()}
        </p>
      </header>

      {/* Statistics Cards */}
      <section>
        <div className="grid-responsive">
          {stats.map(renderStatCard)}
        </div>
      </section>

      {/* Live Tracking Component */}
      <LiveTracking />

      {/* Recent Activity */}
      <section className="card">
        <h2 className="text-subheading mb-6">Recent Activity</h2>
        
        <div className="space-y-4">
          {recentActivities.map(renderActivityItem)}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;