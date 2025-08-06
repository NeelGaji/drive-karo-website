import React from 'react';
import { BookOpen, Plus, GraduationCap } from 'lucide-react';

const Courses: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <BookOpen className="text-[#FFD43B]" size={32} />
        <h1 className="text-3xl font-bold text-[#FFD43B]">Courses</h1>
      </div>

      {/* Coming Soon Section */}
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-[#8B8E8F] rounded-xl p-12 text-center max-w-2xl">
          <GraduationCap className="text-[#FFD43B] mx-auto mb-6" size={80} />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Course Management Coming Soon
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Courses will be shown here. This section will allow you to manage different types of driving courses, track student progress, and organize curriculum.
          </p>
          
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-medium text-[#FFD43B]">Planned Features:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FFD43B] rounded-full"></div>
                <span>Create and manage different course types</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FFD43B] rounded-full"></div>
                <span>Track student enrollment and progress</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FFD43B] rounded-full"></div>
                <span>Manage course schedules and materials</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FFD43B] rounded-full"></div>
                <span>Generate completion certificates</span>
              </li>
            </ul>
          </div>

          <button className="mt-8 flex items-center space-x-2 px-6 py-3 bg-[#FFD43B] text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors mx-auto">
            <Plus size={20} />
            <span>Create First Course</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;