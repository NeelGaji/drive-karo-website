import React, { useState } from 'react';
import { Car, Plus, Trash2, Gauge, Calendar, Fuel } from 'lucide-react';

interface CarData {
  id: string;
  name: string;
  year: number;
  photo: string;
  totalKilometers: number;
  fuelType: string;
  transmission: string;
  status: 'available' | 'in-use' | 'maintenance';
  lastMaintenance: string;
}

const CarsManagement: React.FC = () => {
  const [cars, setCars] = useState<CarData[]>([
    {
      id: '1',
      name: 'Toyota Corolla',
      year: 2022,
      photo: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalKilometers: 45000,
      fuelType: 'Gasoline',
      transmission: 'Manual',
      status: 'available',
      lastMaintenance: '2024-12-15',
    },
    {
      id: '2',
      name: 'Honda Civic',
      year: 2021,
      photo: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalKilometers: 38000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      status: 'in-use',
      lastMaintenance: '2024-11-20',
    },
    {
      id: '3',
      name: 'Nissan Sentra',
      year: 2023,
      photo: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalKilometers: 22000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      status: 'available',
      lastMaintenance: '2024-12-01',
    },
    {
      id: '4',
      name: 'Ford Focus',
      year: 2020,
      photo: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalKilometers: 67000,
      fuelType: 'Gasoline',
      transmission: 'Manual',
      status: 'maintenance',
      lastMaintenance: '2024-12-18',
    },
    {
      id: '5',
      name: 'Hyundai Elantra',
      year: 2022,
      photo: 'https://images.pexels.com/photos/1729647/pexels-photo-1729647.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalKilometers: 31000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      status: 'available',
      lastMaintenance: '2024-11-28',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const deleteCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const addNewCar = () => {
    setShowAddForm(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-600 text-white';
      case 'in-use':
        return 'bg-blue-600 text-white';
      case 'maintenance':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const formatKilometers = (km: number) => {
    return km.toLocaleString() + ' km';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <Car className="text-[#FFD43B]" size={32} />
          <h1 className="text-3xl font-bold text-[#FFD43B]">Cars Management</h1>
        </div>
        <button
          onClick={addNewCar}
          className="mt-4 sm:mt-0 flex items-center space-x-2 px-6 py-3 bg-[#FFD43B] text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
        >
          <Plus size={20} />
          <span>Add New Car</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#8B8E8F] rounded-xl p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#FFD43B]">{cars.length}</p>
            <p className="text-gray-300">Total Cars</p>
          </div>
        </div>
        <div className="bg-[#8B8E8F] rounded-xl p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400">
              {cars.filter(car => car.status === 'available').length}
            </p>
            <p className="text-gray-300">Available</p>
          </div>
        </div>
        <div className="bg-[#8B8E8F] rounded-xl p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">
              {cars.filter(car => car.status === 'in-use').length}
            </p>
            <p className="text-gray-300">In Use</p>
          </div>
        </div>
        <div className="bg-[#8B8E8F] rounded-xl p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">
              {cars.filter(car => car.status === 'maintenance').length}
            </p>
            <p className="text-gray-300">Maintenance</p>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-[#8B8E8F] rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="relative mb-4">
              <img
                src={car.photo}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(car.status)}`}>
                  {car.status.charAt(0).toUpperCase() + car.status.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{car.name}</h3>
                <p className="text-gray-300">Year: {car.year}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Gauge className="text-[#FFD43B]" size={16} />
                    <span className="text-gray-300">Total Distance</span>
                  </div>
                  <span className="text-white font-bold">{formatKilometers(car.totalKilometers)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Fuel className="text-blue-400" size={16} />
                    <span className="text-gray-300">Fuel Type</span>
                  </div>
                  <span className="text-white font-bold">{car.fuelType}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Transmission</span>
                  <span className="text-white font-bold">{car.transmission}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-green-400" size={16} />
                    <span className="text-gray-300">Last Service</span>
                  </div>
                  <span className="text-white font-bold">
                    {new Date(car.lastMaintenance).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => deleteCar(car.id)}
              className="w-full mt-6 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} />
              <span>Remove Car</span>
            </button>
          </div>
        ))}

        {/* Add New Car Card */}
        <div className="bg-[#8B8E8F] rounded-xl p-6 border-2 border-dashed border-gray-600 hover:border-[#FFD43B] transition-colors">
          <div className="text-center h-full flex flex-col justify-center">
            <Plus className="text-gray-400 mx-auto mb-4" size={48} />
            <p className="text-gray-300 text-lg font-medium">Add New Car</p>
            <p className="text-gray-400 text-sm mt-2 mb-4">Expand your fleet with a new vehicle</p>
            <button
              onClick={addNewCar}
              className="px-6 py-2 bg-[#FFD43B] text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Add Car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsManagement;