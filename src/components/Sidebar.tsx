import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Car, 
  BookOpen, 
  User,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings', label: 'Future Bookings', icon: Calendar },
  { id: 'drivers', label: 'Add/Delete Drivers', icon: Users },
  { id: 'cars', label: 'Add/Delete Cars', icon: Car },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'profile', label: 'Profile', icon: User },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const handleMenuClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const renderMenuItem = (item: MenuItem) => {
    const IconComponent = item.icon;
    const isActive = activeSection === item.id;
    
    return (
      <button
        key={item.id}
        onClick={() => handleMenuClick(item.id)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
          isActive
            ? 'bg-[#FFD43B] text-black font-medium'
            : 'text-white hover:bg-[#434546] hover:text-[#FFD43B]'
        }`}
      >
        <IconComponent size={20} />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#8B8E8F] text-white hover:bg-[#FFD43B] hover:text-black transition-colors"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#8B8E8F] transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#FFD43B] mb-8">
            Driving School
          </h1>
          
          <nav className="space-y-2">
            {menuItems.map(renderMenuItem)}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;