import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin } from 'lucide-react';

interface Booking {
  id: string;
  studentName: string;
  phone: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  driverName: string;
  lessonType: string;
}

const FutureBookings: React.FC = () => {
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      studentName: 'Emily Johnson',
      phone: '+1 (555) 123-4567',
      date: '2025-01-20',
      time: '10:00 AM',
      duration: '2 hours',
      location: 'Downtown Practice Area',
      driverName: 'John Smith',
      lessonType: 'Highway Driving',
    },
    {
      id: '2',
      studentName: 'Michael Chen',
      phone: '+1 (555) 987-6543',
      date: '2025-01-20',
      time: '2:00 PM',
      duration: '1.5 hours',
      location: 'City Center',
      driverName: 'Sarah Wilson',
      lessonType: 'Parking Practice',
    },
    {
      id: '3',
      studentName: 'Lisa Rodriguez',
      phone: '+1 (555) 456-7890',
      date: '2025-01-21',
      time: '9:00 AM',
      duration: '2 hours',
      location: 'Suburb Route',
      driverName: 'Mike Davis',
      lessonType: 'Road Test Prep',
    },
  ]);

  if (bookings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Calendar className="text-gray-500 mx-auto mb-6" size={80} />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Your calendar looks free.
          </h2>
          <p className="text-gray-400">No upcoming bookings at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#FFD43B]">Future Bookings</h1>
        <div className="bg-[#8B8E8F] px-4 py-2 rounded-lg">
          <span className="text-white font-medium">{bookings.length} Upcoming</span>
        </div>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-[#8B8E8F] rounded-xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Student Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="text-[#FFD43B]" size={20} />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {booking.studentName}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Phone size={16} />
                      <span className="text-sm">{booking.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#434546] px-3 py-2 rounded-lg">
                  <span className="text-[#FFD43B] text-sm font-medium">
                    {booking.lessonType}
                  </span>
                </div>
              </div>

              {/* DateTime & Duration */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white">
                  <Calendar className="text-blue-400" size={20} />
                  <div>
                    <p className="font-medium">
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <Clock className="text-green-400" size={20} />
                  <div>
                    <p className="font-medium">{booking.time}</p>
                    <p className="text-gray-300 text-sm">
                      Duration: {booking.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location & Driver */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white">
                  <MapPin className="text-red-400" size={20} />
                  <p className="font-medium">{booking.location}</p>
                </div>
                <div className="bg-[#434546] px-3 py-2 rounded-lg">
                  <p className="text-white text-sm">
                    <span className="text-gray-300">Driver:</span>{' '}
                    <span className="font-medium">{booking.driverName}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-600">
              <button className="px-4 py-2 bg-[#FFD43B] text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors">
                Edit Booking
              </button>
              <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FutureBookings;