import React, { useState } from 'react';
import { Users, Plus, Trash2, Star, Award } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  age: number;
  photo: string;
  customersServed: number;
  rating: number;
  yearsExperience: number;
  specialties: string[];
}

interface SummaryStat {
  value: string | number;
  label: string;
  color: string;
}

const DriversManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      age: 35,
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      customersServed: 247,
      rating: 4.8,
      yearsExperience: 8,
      specialties: ['Highway Driving', 'Test Preparation'],
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      age: 29,
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      customersServed: 189,
      rating: 4.9,
      yearsExperience: 6,
      specialties: ['Parallel Parking', 'City Driving'],
    },
    {
      id: '3',
      name: 'Mike Davis',
      age: 42,
      photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400',
      customersServed: 312,
      rating: 4.7,
      yearsExperience: 12,
      specialties: ['Defensive Driving', 'Commercial License'],
    },
    {
      id: '4',
      name: 'Lisa Rodriguez',
      age: 31,
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      customersServed: 203,
      rating: 4.9,
      yearsExperience: 7,
      specialties: ['Night Driving', 'Anxiety Management'],
    },
  ]);


  const deleteDriver = (id: string) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  const addNewDriver = () => {
    // TODO: Implement add driver functionality
    console.log('Add new driver clicked');
  };

  const calculateSummaryStats = (): SummaryStat[] => [
    {
      value: drivers.length,
      label: 'Total Drivers',
      color: 'text-[#FFD43B]'
    },
    {
      value: drivers.reduce((sum, driver) => sum + driver.customersServed, 0),
      label: 'Total Customers Served',
      color: 'icon-success'
    },
    {
      value: (drivers.reduce((sum, driver) => sum + driver.rating, 0) / drivers.length).toFixed(1),
      label: 'Average Rating',
      color: 'icon-info'
    }
  ];

  const renderSummaryStat = (stat: SummaryStat, index: number) => (
    <div key={index} className="card text-center">
      <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
      <p className="text-body">{stat.label}</p>
    </div>
  );

  const renderDriverCard = (driver: Driver) => (
    <div key={driver.id} className="card card-hover">
      <div className="text-center mb-4">
        <img
          src={driver.photo}
          alt={driver.name}
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-[#FFD43B]"
        />
        <h3 className="text-xl font-semibold text-white">{driver.name}</h3>
        <p className="text-body">Age: {driver.age}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-body">Customers Served</span>
          <span className="text-[#FFD43B] font-bold">{driver.customersServed}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-body">Rating</span>
          <div className="flex items-center space-x-1">
            <Star className="icon-warning fill-current" size={16} />
            <span className="text-white font-bold">{driver.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-body">Experience</span>
          <div className="flex items-center space-x-1">
            <Award className="icon-info" size={16} />
            <span className="text-white font-bold">{driver.yearsExperience}y</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-600">
          <p className="text-body text-sm mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-1">
            {driver.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#434546] text-xs text-[#FFD43B] rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteDriver(driver.id)}
        className="btn btn-danger w-full mt-6 flex items-center justify-center space-x-2"
      >
        <Trash2 size={16} />
        <span>Remove Driver</span>
      </button>
    </div>
  );

  const renderAddDriverCard = () => (
    <div className="card border-2 border-dashed border-gray-600 hover:border-[#FFD43B] transition-colors">
      <div className="text-center">
        <Plus className="icon-secondary mx-auto mb-4" size={48} />
        <p className="text-body text-lg font-medium">Add New Driver</p>
        <p className="text-muted text-sm mt-2">Click to add a new driver to your team</p>
        <button
          onClick={addNewDriver}
          className="btn btn-primary mt-4"
        >
          Add Driver
        </button>
      </div>
    </div>
  );

  return (
    <div className="section-spacing">
      {/* Header Section */}
      <header className="flex-responsive">
        <div className="flex items-center space-x-3">
          <Users className="icon-primary" size={32} />
          <h1 className="text-heading">Drivers Management</h1>
        </div>
        <button
          onClick={addNewDriver}
          className="btn btn-primary mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Driver</span>
        </button>
      </header>

      {/* Summary Stats */}
      <section>
        <div className="grid-responsive">
          {calculateSummaryStats().map(renderSummaryStat)}
        </div>
      </section>

      {/* Drivers Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {drivers.map(renderDriverCard)}
          {renderAddDriverCard()}
        </div>
      </section>
    </div>
  );
};

export default DriversManagement;