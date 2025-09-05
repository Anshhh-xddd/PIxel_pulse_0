import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Monitor, Smartphone, Tablet, Clock, MapPin, Eye, TrendingUp } from 'lucide-react';
import visitorTracker from '../services/visitorTracking';

interface VisitorStats {
  totalVisitors: number;
  currentVisitor: any;
  recentVisitors: any[];
  deviceStats: { mobile: number; desktop: number; tablet: number };
  pageStats: { [key: string]: number };
}

const VisitorDashboard: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get initial stats
    updateStats();
    
    // Update stats every 30 seconds
    const interval = setInterval(updateStats, 30000);
    
    // Show dashboard after 2 seconds
    const showTimer = setTimeout(() => setIsVisible(true), 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(showTimer);
    };
  }, []);

  const updateStats = () => {
    const newStats = visitorTracker.getVisitorStats();
    setStats(newStats);
  };

  if (!isVisible || !stats) return null;

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50 max-w-sm w-full"
      initial={{ opacity: 0, x: -100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-orange-500/30 rounded-2xl shadow-2xl shadow-orange-500/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Eye size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Live Visitors</h3>
              <p className="text-sm opacity-90">Real-time tracking</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-4 space-y-4">
          {/* Total Visitors */}
          <motion.div
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Users size={20} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Visitors</p>
                  <p className="text-2xl font-bold text-white">{stats.totalVisitors}</p>
                </div>
              </div>
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Device Stats */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-3 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 bg-blue-500/20 rounded-lg mx-auto mb-2 w-fit">
                <Monitor size={16} className="text-blue-400" />
              </div>
              <p className="text-white font-bold text-lg">{stats.deviceStats.desktop}</p>
              <p className="text-blue-400 text-xs">Desktop</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-3 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 bg-green-500/20 rounded-lg mx-auto mb-2 w-fit">
                <Smartphone size={16} className="text-green-400" />
              </div>
              <p className="text-white font-bold text-lg">{stats.deviceStats.mobile}</p>
              <p className="text-green-400 text-xs">Mobile</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-3 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 bg-purple-500/20 rounded-lg mx-auto mb-2 w-fit">
                <Tablet size={16} className="text-purple-400" />
              </div>
              <p className="text-white font-bold text-lg">{stats.deviceStats.tablet}</p>
              <p className="text-purple-400 text-xs">Tablet</p>
            </motion.div>
          </div>

          {/* Current Visitor */}
          {stats.currentVisitor && Object.keys(stats.currentVisitor).length > 0 && (
            <motion.div
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp size={16} className="text-green-400" />
                </div>
                <h4 className="text-white font-semibold">Current Visitor</h4>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Globe size={14} className="text-orange-400" />
                  <span>{stats.currentVisitor.page || 'Unknown'}</span>
                </div>
                
                {stats.currentVisitor.location && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={14} className="text-red-400" />
                    <span>{stats.currentVisitor.location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Monitor size={14} className="text-blue-400" />
                  <span>{stats.currentVisitor.device || 'Unknown'}</span>
                </div>
                
                {stats.currentVisitor.timeOnSite && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock size={14} className="text-green-400" />
                    <span>{Math.floor(stats.currentVisitor.timeOnSite / 60)}m {stats.currentVisitor.timeOnSite % 60}s</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Recent Activity */}
          <motion.div
            className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-3">Recent Activity</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {stats.recentVisitors.slice(-5).reverse().map((visitor, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-2 bg-gray-800/30 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    visitor.device === 'desktop' ? 'bg-blue-500' :
                    visitor.device === 'mobile' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{visitor.page}</p>
                    <p className="text-gray-400 text-xs">{visitor.device} • {visitor.browser}</p>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {new Date(visitor.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800/50 p-3 text-center">
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Hide Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorDashboard;
