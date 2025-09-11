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

interface SummaryStat {
  value: string | number;
  label: string;
  color: string;
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

  const getStatusColor = (status: string): string => {
    const statusColors = {
      available: 'bg-green-600 text-white',
      'in-use': 'bg-blue-600 text-white',
      maintenance: 'bg-red-600 text-white',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-600 text-white';
  };

  const formatKilometers = (km: number): string => {
    return km.toLocaleString() + ' km';
  };

  const calculateSummaryStats = (): SummaryStat[] => [
    {
      value: cars.length,
      label: 'Total Cars',
      color: 'text-[#FFD43B]'
    },
    {
      value: cars.filter(car => car.status === 'available').length,
      label: 'Available',
      color: 'icon-success'
    },
    {
      value: cars.filter(car => car.status === 'in-use').length,
      label: 'In Use',
      color: 'icon-info'
    },
    {
      value: cars.filter(car => car.status === 'maintenance').length,
      label: 'Maintenance',
      color: 'icon-error'
    }
  ];

  const renderSummaryStat = (stat: SummaryStat, index: number) => (
    <div key={index} className="card text-center">
      <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
      <p className="text-body">{stat.label}</p>
    </div>
  );

  const renderCarCard = (car: CarData) => (
    <div key={car.id} className="card card-hover">
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
          <p className="text-body">Year: {car.year}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge className="icon-primary" size={16} />
              <span className="text-body">Total Distance</span>
            </div>
            <span className="text-white font-bold">{formatKilometers(car.totalKilometers)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fuel className="icon-info" size={16} />
              <span className="text-body">Fuel Type</span>
            </div>
            <span className="text-white font-bold">{car.fuelType}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-body">Transmission</span>
            <span className="text-white font-bold">{car.transmission}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="icon-success" size={16} />
              <span className="text-body">Last Service</span>
            </div>
            <span className="text-white font-bold">
              {new Date(car.lastMaintenance).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteCar(car.id)}
        className="btn btn-danger w-full mt-6 flex items-center justify-center space-x-2"
      >
        <Trash2 size={16} />
        <span>Remove Car</span>
      </button>
    </div>
  );

  const renderAddCarCard = () => (
    <div className="card border-2 border-dashed border-gray-600 hover:border-[#FFD43B] transition-colors">
      <div className="text-center h-full flex flex-col justify-center">
        <Plus className="icon-secondary mx-auto mb-4" size={48} />
        <p className="text-body text-lg font-medium">Add New Car</p>
        <p className="text-muted text-sm mt-2 mb-4">Expand your fleet with a new vehicle</p>
        <button
          onClick={addNewCar}
          className="btn btn-primary"
        >
          Add Car
        </button>
      </div>
    </div>
  );

  return (
    <div className="section-spacing">
      {/* Header Section */}
      <header className="flex-responsive">
        <div className="flex items-center space-x-3">
          <Car className="icon-primary" size={32} />
          <h1 className="text-heading">Cars Management</h1>
        </div>
        <button
          onClick={addNewCar}
          className="btn btn-primary mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Car</span>
        </button>
      </header>

      {/* Summary Stats */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {calculateSummaryStats().map(renderSummaryStat)}
        </div>
      </section>

      {/* Cars Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(renderCarCard)}
          {renderAddCarCard()}
        </div>
      </section>
    </div>
  );
};

export default CarsManagement;