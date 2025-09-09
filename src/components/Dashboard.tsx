import React from 'react';
import { Users, Car, Clock } from 'lucide-react';
import LiveTracking from './LiveTracking';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Available Drivers',
      value: '12',
      total: '15',
      icon: Users,
      color: 'text-green-400',
    },
    {
      title: 'Available Cars',
      value: '8',
      total: '10',
      icon: Car,
      color: 'text-blue-400',
    },
    {
      title: 'Active Lessons',
      value: '5',
      icon: Clock,
      color: 'text-[#FFD43B]',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-[#FFD43B]">Dashboard</h1>
        <p className="text-gray-300 mt-2 sm:mt-0">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#8B8E8F] rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    {stat.total && (
                      <p className="text-gray-400 text-lg">/ {stat.total}</p>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-opacity-20 ${stat.color}`}>
                  <IconComponent size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Tracking Component */}
      <LiveTracking />

      {/* Recent Activity */}
      <div className="bg-[#8B8E8F] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        
        <div className="space-y-4">
          {[
            { action: 'Lesson completed', driver: 'John Smith', time: '2 hours ago' },
            { action: 'New booking', driver: 'Sarah Wilson', time: '4 hours ago' },
            { action: 'Car maintenance', driver: 'Vehicle #1234', time: '1 day ago' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#434546] rounded-lg"
            >
              <div>
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-gray-400 text-sm">{activity.driver}</p>
              </div>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;