import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import * as turf from '@turf/turf';
import { MapPin, Maximize2, X, Navigation, Clock, Route } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GPSPoint {
  lat: number;
  lng: number;
  timestamp: number;
}

interface ActiveSession {
  id: string;
  driverName: string;
  carName: string;
  studentName: string;
  startTime: string;
  currentPosition: GPSPoint;
  routePath: GPSPoint[];
  distanceTraveled: number;
  sessionStatus: 'active' | 'paused' | 'completed';
  lessonType: string;
}

const LiveTracking: React.FC = () => {
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ActiveSession | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock data for active sessions
  useEffect(() => {
    const mockSessions: ActiveSession[] = [
      {
        id: '1',
        driverName: 'John Smith',
        carName: 'Toyota Corolla',
        studentName: 'Emily Johnson',
        startTime: '10:00 AM',
        currentPosition: { lat: 40.7128, lng: -74.0060, timestamp: Date.now() },
        routePath: [
          { lat: 40.7128, lng: -74.0060, timestamp: Date.now() - 1800000 },
          { lat: 40.7138, lng: -74.0050, timestamp: Date.now() - 1500000 },
          { lat: 40.7148, lng: -74.0040, timestamp: Date.now() - 1200000 },
          { lat: 40.7158, lng: -74.0030, timestamp: Date.now() - 900000 },
          { lat: 40.7168, lng: -74.0020, timestamp: Date.now() - 600000 },
          { lat: 40.7178, lng: -74.0010, timestamp: Date.now() - 300000 },
          { lat: 40.7128, lng: -74.0060, timestamp: Date.now() },
        ],
        distanceTraveled: 0,
        sessionStatus: 'active',
        lessonType: 'Highway Driving',
      },
      {
        id: '2',
        driverName: 'Sarah Wilson',
        carName: 'Honda Civic',
        studentName: 'Michael Chen',
        startTime: '2:00 PM',
        currentPosition: { lat: 40.7589, lng: -73.9851, timestamp: Date.now() },
        routePath: [
          { lat: 40.7589, lng: -73.9851, timestamp: Date.now() - 1200000 },
          { lat: 40.7599, lng: -73.9841, timestamp: Date.now() - 900000 },
          { lat: 40.7609, lng: -73.9831, timestamp: Date.now() - 600000 },
          { lat: 40.7619, lng: -73.9821, timestamp: Date.now() - 300000 },
          { lat: 40.7589, lng: -73.9851, timestamp: Date.now() },
        ],
        distanceTraveled: 0,
        sessionStatus: 'active',
        lessonType: 'City Driving',
      },
    ];

    // Calculate distances for each session
    const sessionsWithDistance = mockSessions.map(session => {
      const distance = calculateRouteDistance(session.routePath);
      return { ...session, distanceTraveled: distance };
    });

    setActiveSessions(sessionsWithDistance);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveSessions(prev => prev.map(session => {
        // Simulate small GPS movements
        const newLat = session.currentPosition.lat + (Math.random() - 0.5) * 0.001;
        const newLng = session.currentPosition.lng + (Math.random() - 0.5) * 0.001;
        const newPosition = { lat: newLat, lng: newLng, timestamp: Date.now() };
        
        const updatedPath = [...session.routePath, newPosition];
        const updatedDistance = calculateRouteDistance(updatedPath);
        
        return {
          ...session,
          currentPosition: newPosition,
          routePath: updatedPath,
          distanceTraveled: updatedDistance,
        };
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const calculateRouteDistance = (path: GPSPoint[]): number => {
    if (path.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < path.length; i++) {
      const from = turf.point([path[i - 1].lng, path[i - 1].lat]);
      const to = turf.point([path[i].lng, path[i].lat]);
      const distance = turf.distance(from, to, { units: 'kilometers' });
      totalDistance += distance;
    }
    
    return Math.round(totalDistance * 100) / 100; // Round to 2 decimal places
  };

  const formatDuration = (startTime: string): string => {
    const start = new Date();
    start.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1].split(' ')[0]));
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const openFullscreen = (session: ActiveSession) => {
    setSelectedSession(session);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedSession(null);
  };

  if (activeSessions.length === 0) {
    return (
      <div className="bg-[#8B8E8F] rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="text-[#FFD43B]" size={24} />
          <h2 className="text-xl font-semibold text-white">Live Tracking</h2>
        </div>
        
        <div className="bg-[#434546] rounded-lg p-8 flex items-center justify-center min-h-[300px] border-2 border-dashed border-gray-600">
          <div className="text-center">
            <Navigation className="text-gray-500 mx-auto mb-4" size={48} />
            <p className="text-gray-400 text-lg">No Active Sessions</p>
            <p className="text-gray-500 text-sm mt-2">
              Live tracking will appear here when lessons are in progress
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#8B8E8F] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <MapPin className="text-[#FFD43B]" size={24} />
            <h2 className="text-xl font-semibold text-white">Live Tracking</h2>
          </div>
          <div className="bg-[#434546] px-3 py-1 rounded-lg">
            <span className="text-[#FFD43B] font-medium">{activeSessions.length} Active</span>
          </div>
        </div>

        <div className={`grid gap-6 ${activeSessions.length === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {activeSessions.map((session) => (
            <div key={session.id} className="bg-[#434546] rounded-lg overflow-hidden">
              {/* Session Info Header */}
              <div className="p-4 border-b border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{session.studentName}</h3>
                  <button
                    onClick={() => openFullscreen(session)}
                    className="p-2 text-gray-400 hover:text-[#FFD43B] transition-colors"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Driver</p>
                    <p className="text-white">{session.driverName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Vehicle</p>
                    <p className="text-white">{session.carName}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="px-2 py-1 bg-[#FFD43B] text-black text-xs font-medium rounded">
                    {session.lessonType}
                  </span>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{formatDuration(session.startTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Route size={12} />
                      <span>{session.distanceTraveled} km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Map */}
              <div className="h-48 relative cursor-pointer" onClick={() => openFullscreen(session)}>
                <MapContainer
                  center={[session.currentPosition.lat, session.currentPosition.lng]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  touchZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Route Path */}
                  <Polyline
                    positions={session.routePath.map(point => [point.lat, point.lng] as LatLng)}
                    color="#FFD43B"
                    weight={3}
                    opacity={0.8}
                  />
                  
                  {/* Current Position Marker */}
                  <Marker position={[session.currentPosition.lat, session.currentPosition.lng]}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">{session.driverName}</p>
                        <p>{session.carName}</p>
                        <p className="text-gray-600">Student: {session.studentName}</p>
                        <p className="text-gray-600">Distance: {session.distanceTraveled} km</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
                
                {/* Overlay for click indication */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <Maximize2 className="text-white" size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4" onClick={closeFullscreen}>
          <div className="bg-[#8B8E8F] rounded-xl w-full h-full max-w-6xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-600 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedSession.studentName} - Live Session</h2>
                <div className="flex items-center space-x-6 mt-2 text-sm text-gray-300">
                  <span>Driver: {selectedSession.driverName}</span>
                  <span>Vehicle: {selectedSession.carName}</span>
                  <span>Lesson: {selectedSession.lessonType}</span>
                  <span>Duration: {formatDuration(selectedSession.startTime)}</span>
                  <span>Distance: {selectedSession.distanceTraveled} km</span>
                </div>
              </div>
              <button
                onClick={closeFullscreen}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Fullscreen Map */}
            <div className="flex-1 relative z-0">
              <MapContainer
                center={[selectedSession.currentPosition.lat, selectedSession.currentPosition.lng]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                key={`fullscreen-${selectedSession.id}-${Date.now()}`}
                zoomControl={true}
                scrollWheelZoom={true}
                doubleClickZoom={true}
                dragging={true}
                touchZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Route Path */}
                <Polyline
                  positions={selectedSession.routePath.map(point => [point.lat, point.lng] as LatLng)}
                  color="#FFD43B"
                  weight={4}
                  opacity={0.8}
                />
                
                {/* Start Point */}
                {selectedSession.routePath.length > 0 && (
                  <Marker position={[selectedSession.routePath[0].lat, selectedSession.routePath[0].lng]}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">Session Start</p>
                        <p>Time: {selectedSession.startTime}</p>
                      </div>
                    </Popup>
                  </Marker>
                )}
                
                {/* Current Position Marker */}
                <Marker position={[selectedSession.currentPosition.lat, selectedSession.currentPosition.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{selectedSession.driverName}</p>
                      <p>{selectedSession.carName}</p>
                      <p className="text-gray-600">Student: {selectedSession.studentName}</p>
                      <p className="text-gray-600">Distance: {selectedSession.distanceTraveled} km</p>
                      <p className="text-gray-600">Status: {selectedSession.sessionStatus}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveTracking;