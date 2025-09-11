import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FutureBookings from './components/FutureBookings';
import DriversManagement from './components/DriversManagement';
import CarsManagement from './components/CarsManagement';
import Courses from './components/Courses';
import Profile from './components/Profile';

type SectionType = 'dashboard' | 'bookings' | 'drivers' | 'cars' | 'courses' | 'profile';

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = (): React.ReactNode => {
    const sectionComponents: Record<SectionType, React.ReactNode> = {
      dashboard: <Dashboard />,
      bookings: <FutureBookings />,
      drivers: <DriversManagement />,
      cars: <CarsManagement />,
      courses: <Courses />,
      profile: <Profile />,
    };

    return sectionComponents[activeSection] || <Dashboard />;
  };

  return (
    <div className="min-h-screen bg-[#434546] text-white font-sans">
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="container-padding">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;