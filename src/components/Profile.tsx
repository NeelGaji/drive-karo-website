import React from 'react';
import { Star, Award, TrendingUp, MapPin, Phone, Mail, Users } from 'lucide-react';

const Profile: React.FC = () => {
  const schoolInfo = {
    name: 'Elite Driving Academy',
    rating: 4.8,
    totalReviews: 523,
    yearsInBusiness: 12,
    totalStudents: 2847,
    passRate: 94,
    location: '123 Main Street, Downtown City',
    phone: '+1 (555) 123-4567',
    email: 'info@elitedrivingacademy.com',
  };

  const reviews = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      rating: 5,
      comment: 'Excellent instructors and very professional service. I passed my test on the first try!',
      date: '2024-12-15',
    },
    {
      id: 2,
      name: 'David Thompson',
      rating: 5,
      comment: 'Great experience! The instructors are patient and knowledgeable. Highly recommend!',
      date: '2024-12-10',
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      rating: 4,
      comment: 'Very good driving school. Clean cars and flexible scheduling. Worth the money.',
      date: '2024-12-05',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Elite Driving Academy', rating: 4.8, location: 'Downtown City' },
    { rank: 2, name: 'City Drive Masters', rating: 4.7, location: 'North District' },
    { rank: 3, name: 'Pro Driving School', rating: 4.6, location: 'West Side' },
    { rank: 4, name: 'Quick Learn Driving', rating: 4.5, location: 'East Zone' },
    { rank: 5, name: 'Safe Drive Academy', rating: 4.4, location: 'South Area' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Award className="text-[#FFD43B]" size={32} />
        <h1 className="text-3xl font-bold text-[#FFD43B]">School Profile</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* School Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-[#8B8E8F] rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{schoolInfo.name}</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400 fill-current" size={20} />
                    <span className="text-white font-semibold">{schoolInfo.rating}</span>
                    <span className="text-gray-300">({schoolInfo.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="text-[#FFD43B]" size={20} />
                    <span className="text-white">{schoolInfo.yearsInBusiness} years in business</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="text-red-400" size={20} />
                <span className="text-gray-300">{schoolInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-green-400" size={20} />
                <span className="text-gray-300">{schoolInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400" size={20} />
                <span className="text-gray-300">{schoolInfo.email}</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#434546] rounded-lg">
                <Users className="text-[#FFD43B] mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{schoolInfo.totalStudents.toLocaleString()}</p>
                <p className="text-gray-300 text-sm">Students Trained</p>
              </div>
              <div className="text-center p-4 bg-[#434546] rounded-lg">
                <TrendingUp className="text-green-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{schoolInfo.passRate}%</p>
                <p className="text-gray-300 text-sm">Pass Rate</p>
              </div>
              <div className="text-center p-4 bg-[#434546] rounded-lg">
                <Star className="text-yellow-400 mx-auto mb-2 fill-current" size={24} />
                <p className="text-2xl font-bold text-white">{schoolInfo.rating}</p>
                <p className="text-gray-300 text-sm">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-[#8B8E8F] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Customer Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#434546] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-white">{review.name}</h4>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-[#8B8E8F] rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Nationwide Leaderboard</h3>
          <div className="space-y-3">
            {leaderboard.map((school) => (
              <div
                key={school.rank}
                className={`p-4 rounded-lg ${
                  school.rank === 1
                    ? 'bg-[#FFD43B] text-black'
                    : 'bg-[#434546] text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        school.rank === 1
                          ? 'bg-black text-[#FFD43B]'
                          : school.rank <= 3
                          ? 'bg-[#FFD43B] text-black'
                          : 'bg-gray-600 text-white'
                      }`}
                    >
                      {school.rank}
                    </div>
                    <div>
                      <p className={`font-medium ${school.rank === 1 ? 'text-black' : 'text-white'}`}>
                        {school.name}
                      </p>
                      <p className={`text-sm ${school.rank === 1 ? 'text-gray-700' : 'text-gray-400'}`}>
                        {school.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star
                      className={`${
                        school.rank === 1 ? 'text-black fill-current' : 'text-yellow-400 fill-current'
                      }`}
                      size={16}
                    />
                    <span className={`font-bold ${school.rank === 1 ? 'text-black' : 'text-white'}`}>
                      {school.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#434546] rounded-lg text-center">
            <p className="text-[#FFD43B] font-semibold">🏆 #1 Ranked School!</p>
            <p className="text-gray-300 text-sm mt-1">
              You're leading the competition in your area!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;