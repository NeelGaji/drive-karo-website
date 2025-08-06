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

  const [showAddForm, setShowAddForm] = useState(false);

  const deleteDriver = (id: string) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  const addNewDriver = () => {
    setShowAddForm(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <Users className="text-[#FFD43B]" size={32} />
          <h1 className="text-3xl font-bold text-[#FFD43B]">Drivers Management</h1>
        </div>
        <button
          onClick={addNewDriver}
          className="mt-4 sm:mt-0 flex items-center space-x-2 px-6 py-3 bg-[#FFD43B] text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
        >
          <Plus size={20} />
          <span>Add New Driver</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#8B8E8F] rounded-xl p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#FFD43B]">{drivers.length}</p>
            <p className="text-gray-300">Total Drivers</p>
          </div>
        </div>
        <div className="bg-[#8B8E8F] rounded-xl p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400">
              {drivers.reduce((sum, driver) => sum + driver.customersServed, 0)}
            </p>
            <p className="text-gray-300">Total Customers Served</p>
          </div>
        </div>
        <div className="bg-[#8B8E8F] rounded-xl p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">
              {(drivers.reduce((sum, driver) => sum + driver.rating, 0) / drivers.length).toFixed(1)}
            </p>
            <p className="text-gray-300">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-[#8B8E8F] rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="text-center mb-4">
              <img
                src={driver.photo}
                alt={driver.name}
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-[#FFD43B]"
              />
              <h3 className="text-xl font-semibold text-white">{driver.name}</h3>
              <p className="text-gray-300">Age: {driver.age}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Customers Served</span>
                <span className="text-[#FFD43B] font-bold">{driver.customersServed}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-white font-bold">{driver.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Experience</span>
                <div className="flex items-center space-x-1">
                  <Award className="text-blue-400" size={16} />
                  <span className="text-white font-bold">{driver.yearsExperience}y</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-600">
                <p className="text-gray-300 text-sm mb-2">Specialties:</p>
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
              className="w-full mt-6 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} />
              <span>Remove Driver</span>
            </button>
          </div>
        ))}

        {/* Add New Driver Card */}
        <div className="bg-[#8B8E8F] rounded-xl p-6 border-2 border-dashed border-gray-600 hover:border-[#FFD43B] transition-colors">
          <div className="text-center">
            <Plus className="text-gray-400 mx-auto mb-4" size={48} />
            <p className="text-gray-300 text-lg font-medium">Add New Driver</p>
            <p className="text-gray-400 text-sm mt-2">Click to add a new driver to your team</p>
            <button
              onClick={addNewDriver}
              className="mt-4 px-6 py-2 bg-[#FFD43B] text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Add Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriversManagement;