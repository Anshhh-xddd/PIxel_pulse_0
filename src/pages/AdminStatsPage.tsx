import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Monitor, Smartphone, Tablet, Clock, MapPin, Eye, TrendingUp, Lock } from 'lucide-react';
import visitorTracker from '../services/visitorTracking';

interface VisitorStats {
  totalVisitors: number;
  currentVisitor: any;
  recentVisitors: any[];
  deviceStats: { mobile: number; desktop: number; tablet: number };
  pageStats: { [key: string]: number };
}

const AdminStatsPage: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple password protection - you can change this password
  const ADMIN_PASSWORD = 'pixelpulse2024';

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      updateStats();
      const interval = setInterval(updateStats, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const updateStats = () => {
    const visitorStats = visitorTracker.getVisitorStats();
    setStats(visitorStats);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-300">Enter password to view visitor statistics</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Access Stats
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Visitor Statistics</h1>
          <p className="text-gray-300">PixelPulse Design Studio - Hidden Admin Panel</p>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="mt-4 text-orange-400 hover:text-orange-300 text-sm"
          >
            Logout
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Visitors</p>
                <p className="text-3xl font-bold text-white">{stats.totalVisitors}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Visitor</p>
                <p className="text-3xl font-bold text-white">
                  {stats.currentVisitor?.device || 'N/A'}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Device Stats</p>
                <p className="text-lg font-semibold text-white">
                  D: {stats.deviceStats.desktop} | M: {stats.deviceStats.mobile}
                </p>
              </div>
              <Monitor className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Last Updated</p>
                <p className="text-lg font-semibold text-white">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Recent Visitors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Recent Visitors</h3>
          <div className="space-y-3">
            {stats.recentVisitors.slice(-5).reverse().map((visitor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-white text-sm">{visitor.page}</span>
                  <span className="text-gray-400 text-xs">({visitor.device})</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-300 text-xs">
                    {new Date(visitor.timestamp).toLocaleDateString()}
                  </span>
                  <br />
                  <span className="text-gray-400 text-xs">{visitor.browser}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminStatsPage;
