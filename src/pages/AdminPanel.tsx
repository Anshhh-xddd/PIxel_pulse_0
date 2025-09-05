import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Globe, Monitor, Smartphone, Tablet, Clock, MapPin, Eye, 
  TrendingUp, Lock, Settings, BarChart3, Palette, FileText, 
  Mail, Shield, Database, Download, Upload, Trash2, Edit3,
  Plus, Search, Filter, Calendar, Activity, Target, Zap, AlertCircle
} from 'lucide-react';
import visitorTracker from '../services/visitorTracking';
import contentManagementService, { PortfolioItem } from '../services/contentManagement';
import { sectionByCategory as staticPortfolio } from '../data/portfolio';
import PortfolioManager from '../components/PortfolioManager';
import ContentManager from '../components/ContentManager';
import PersonalManager from '../components/PersonalManager';
import UploadAssetsModal from '../components/UploadAssetsModal';

interface VisitorStats {
  totalVisitors: number;
  currentVisitor: any;
  recentVisitors: any[];
  deviceStats: { mobile: number; desktop: number; tablet: number };
  pageStats: { [key: string]: number };
}



const AdminPanel: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPortfolioManager, setShowPortfolioManager] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [managerMode, setManagerMode] = useState<'add' | 'edit'>('add');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Content management states
  const [showContentManager, setShowContentManager] = useState(false);
  const [contentType, setContentType] = useState<'service' | 'about' | 'contact' | 'general'>('service');
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [contentManagerMode, setContentManagerMode] = useState<'add' | 'edit'>('add');
  const CONTENT_STORAGE_KEY = 'pixel_pulse_content_items';
  // Old content removal threshold (days)
  const [oldContentDays, setOldContentDays] = useState<number>(180);

  // Personal section states
  const [personalItems, setPersonalItems] = useState<any[]>([]);
  const [showPersonalManager, setShowPersonalManager] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState<any>(null);
  const [personalManagerMode, setPersonalManagerMode] = useState<'add' | 'edit'>('add');
  const [personalSearchTerm, setPersonalSearchTerm] = useState('');
  const [selectedPersonalCategory, setSelectedPersonalCategory] = useState('all');

  // Asset management states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploadingAssets, setIsUploadingAssets] = useState(false);

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
      loadPortfolioItems();
      syncStaticLogosToStorage();
      // Load content items from storage
      try {
        const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
        setContentItems(raw ? JSON.parse(raw) : []);
      } catch {
        setContentItems([]);
      }
      const interval = setInterval(updateStats, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const updateStats = () => {
    const visitorStats = visitorTracker.getVisitorStats();
    setStats(visitorStats);
  };

  const loadPortfolioItems = () => {
    const items = contentManagementService.getPortfolioItems();
    setPortfolioItems(items);
  };

  // Ensure existing website logos appear in admin panel on first load
  const syncStaticLogosToStorage = () => {
    try {
      const current = contentManagementService.getPortfolioItems();
      const hasLogos = current.some(i => String(i.category).toLowerCase() === 'logo');
      const staticLogos: any[] = (staticPortfolio as any).logo || [];
      if (!hasLogos && Array.isArray(staticLogos) && staticLogos.length > 0) {
        staticLogos.forEach((s) => {
          try {
            contentManagementService.addPortfolioItem({
              title: s.title || 'Logo',
              category: 'logo',
              image: s.image,
              description: s.subtitle || '',
              status: 'active'
            });
          } catch {}
        });
        setPortfolioItems(contentManagementService.getPortfolioItems());
      }
    } catch {}
  };

  const handleAddItem = () => {
    setManagerMode('add');
    setEditingItem(null);
    setShowPortfolioManager(true);
  };

  const handleEditItem = (item: PortfolioItem) => {
    setManagerMode('edit');
    setEditingItem(item);
    setShowPortfolioManager(true);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const success = contentManagementService.deletePortfolioItem(id);
      if (success) {
        loadPortfolioItems();
        showNotification('success', 'Item deleted successfully');
      } else {
        showNotification('error', 'Failed to delete item');
      }
    }
  };

  const handleSaveItem = (itemData: Omit<PortfolioItem, 'id' | 'createdAt' | 'views'>) => {
    try {
      if (managerMode === 'add') {
        contentManagementService.addPortfolioItem(itemData);
        showNotification('success', 'Item added successfully');
      } else if (editingItem) {
        contentManagementService.updatePortfolioItem(editingItem.id, itemData);
        showNotification('success', 'Item updated successfully');
      }
      loadPortfolioItems();
      setShowPortfolioManager(false);
    } catch (error) {
      showNotification('error', 'Failed to save item');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Content management functions
  const handleAddContent = (type: 'service' | 'about' | 'contact' | 'general') => {
    setContentType(type);
    setContentManagerMode('add');
    setEditingContent(null);
    setShowContentManager(true);
  };

  const handleEditContent = (content: any) => {
    setContentType(content.type);
    setContentManagerMode('edit');
    setEditingContent(content);
    setShowContentManager(true);
  };

  const handleSaveContent = (contentData: any) => {
    try {
      // Simulate saving content
      if (contentManagerMode === 'add') {
        const newContent = {
          id: Date.now().toString(),
          ...contentData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setContentItems(prev => {
          const next = [...prev, newContent];
          try { localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(next)); } catch {}
          return next;
        });
        showNotification('success', 'Content added successfully');
      } else {
        setContentItems(prev => {
          const next = prev.map(item => 
            item.id === editingContent.id 
              ? { ...item, ...contentData, updatedAt: new Date().toISOString() }
              : item
          );
          try { localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(next)); } catch {}
          return next;
        });
        showNotification('success', 'Content updated successfully');
      }
      setShowContentManager(false);
    } catch (error) {
      showNotification('error', 'Failed to save content');
    }
  };

  // Delete a single content item
  const handleDeleteContent = (id: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this content item?')) {
      setContentItems(prev => {
        const next = prev.filter(item => item.id !== id);
        try { localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(next)); } catch {}
        return next;
      });
      showNotification('success', 'Content item deleted');
    }
  };

  // Remove content items older than a given number of days (default 180)
  const handleRemoveOldContent = (days: number = 180) => {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    setContentItems(prev => {
      const beforeCount = prev.length;
      const kept = prev.filter(item => {
        const refDate = new Date(item.updatedAt || item.createdAt || Date.now()).getTime();
        return refDate >= cutoff;
      });
      const removed = beforeCount - kept.length;
      if (removed > 0) {
        showNotification('success', `Removed ${removed} old content item${removed === 1 ? '' : 's'}`);
      } else {
        showNotification('success', 'No old content to remove');
      }
      try { localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(kept)); } catch {}
      return kept;
    });
  };

  // Personal management functions
  const handleAddPersonal = () => {
    setPersonalManagerMode('add');
    setEditingPersonal(null);
    setShowPersonalManager(true);
  };

  const handleEditPersonal = (item: any) => {
    setPersonalManagerMode('edit');
    setEditingPersonal(item);
    setShowPersonalManager(true);
  };

  const handleDeletePersonal = (id: string) => {
    if (window.confirm('Are you sure you want to delete this personal item?')) {
      setPersonalItems(prev => prev.filter(item => item.id !== id));
      showNotification('success', 'Personal item deleted successfully');
    }
  };

  const handleSavePersonal = (itemData: any) => {
    try {
      if (personalManagerMode === 'add') {
        const newPersonal = {
          id: Date.now().toString(),
          ...itemData,
          createdAt: new Date().toISOString(),
          views: 0
        };
        setPersonalItems(prev => [...prev, newPersonal]);
        showNotification('success', 'Personal item added successfully');
      } else if (editingPersonal) {
        setPersonalItems(prev => prev.map(item => 
          item.id === editingPersonal.id 
            ? { ...item, ...itemData }
            : item
        ));
        showNotification('success', 'Personal item updated successfully');
      }
      setShowPersonalManager(false);
    } catch (error) {
      showNotification('error', 'Failed to save personal item');
    }
  };

  // Asset management functions
  const handleUploadAssets = () => {
    setShowUploadModal(true);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prev => [...prev, ...fileArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcessUpload = async () => {
    if (uploadedFiles.length === 0) {
      showNotification('error', 'Please select files to upload');
      return;
    }

    setIsUploadingAssets(true);
    
    try {
      // Simulate file upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process each file
      const processedFiles = uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      }));

      // Store in localStorage (in a real app, this would be sent to server)
      const existingAssets = JSON.parse(localStorage.getItem('uploadedAssets') || '[]');
      const updatedAssets = [...existingAssets, ...processedFiles];
      localStorage.setItem('uploadedAssets', JSON.stringify(updatedAssets));

      showNotification('success', `${uploadedFiles.length} files uploaded successfully`);
      setUploadedFiles([]);
      setShowUploadModal(false);
    } catch (error) {
      showNotification('error', 'Failed to upload files');
    } finally {
      setIsUploadingAssets(false);
    }
  };

  const handleExportData = () => {
    try {
      // Prepare data for export
      const exportData = {
        portfolioItems,
        personalItems,
        contentItems,
        stats,
        exportedAt: new Date().toISOString()
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `pixelpulse-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showNotification('success', 'Data exported successfully');
    } catch (error) {
      showNotification('error', 'Failed to export data');
    }
  };

  const filteredPortfolioItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPersonalItems = personalItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(personalSearchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(personalSearchTerm.toLowerCase());
    const matchesCategory = selectedPersonalCategory === 'all' || item.category === selectedPersonalCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md w-full shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Admin Panel</h2>
            <p className="text-gray-300 text-lg">PixelPulse Design Studio</p>
            <p className="text-gray-400 text-sm mt-2">Enter your credentials to access the admin panel</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="admin-password" className="block text-gray-300 text-sm font-medium mb-2">
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Lock className="w-5 h-5 inline mr-2" />
              Access Admin Panel
            </button>
            
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                Default password: pixelpulse2024
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: Palette },
    { id: 'personal', label: 'Personal', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-orange-500/20"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome to Admin Panel</h2>
            <p className="text-gray-300">Manage your PixelPulse Design Studio website content and portfolio</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Visitors</p>
              <p className="text-3xl font-bold text-white">{stats?.totalVisitors || 0}</p>
              <p className="text-green-400 text-xs">+12% from last week</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Portfolio Items</p>
              <p className="text-3xl font-bold text-white">{portfolioItems.length}</p>
              <p className="text-blue-400 text-xs">+3 new this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Content Items</p>
              <p className="text-3xl font-bold text-white">{contentItems.length}</p>
              <p className="text-green-400 text-xs">Manage website content</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Personal Items</p>
              <p className="text-3xl font-bold text-white">{personalItems.length}</p>
              <p className="text-purple-400 text-xs">Personal portfolio</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Projects</p>
              <p className="text-3xl font-bold text-white">8</p>
              <p className="text-orange-400 text-xs">2 pending review</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Performance</p>
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-green-400 text-xs">+2% from last month</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-orange-400" />
            Recent Visitors
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {stats?.recentVisitors.slice(-5).reverse().map((visitor, index) => (
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Quick Actions
          </h3>
          <div className="space-y-3">
                         <button 
               onClick={handleAddItem}
               className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
             >
               <Plus className="w-4 h-4 mr-2" />
               Add New Portfolio Item
             </button>
                         <button 
               onClick={handleUploadAssets}
               className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center"
             >
               <Upload className="w-4 h-4 mr-2" />
               Upload Assets
             </button>
             <button 
               onClick={handleExportData}
               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center"
             >
               <Download className="w-4 h-4 mr-2" />
               Export Data
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search portfolio items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
                                                                                                                                                                                                                                                                                                                                                               <select
                 value={selectedCategory}
                 onChange={(e) => setSelectedCategory(e.target.value)}
                 className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 shadow-lg ${
                   selectedCategory !== 'all' 
                     ? 'bg-black border-orange-500 text-orange-500 font-bold' 
                     : 'bg-black border-gray-600 text-orange-500'
                 }`}
                 aria-label="Filter by category"
               >
                <option value="all" className="bg-black text-orange-500">All Categories</option>
                <option value="logo" className="bg-black text-orange-500">Logo</option>
                <option value="packaging" className="bg-black text-orange-500">Packaging</option>
                <option value="visiting-card" className="bg-black text-orange-500">Visiting Cards</option>
                <option value="brochure" className="bg-black text-orange-500">Brochure</option>
                <option value="holding" className="bg-black text-orange-500">Holding</option>
                <option value="web" className="bg-black text-orange-500">Web Design</option>
                <option value="print" className="bg-black text-orange-500">Print Design</option>
                <option value="branding" className="bg-black text-orange-500">Branding</option>
                <option value="social-media" className="bg-black text-orange-500">Social Media</option>
                <option value="illustration" className="bg-black text-orange-500">Illustration</option>
                <option value="ui-ux" className="bg-black text-orange-500">UI/UX Design</option>
                <option value="typography" className="bg-black text-orange-500">Typography</option>
                <option value="photography" className="bg-black text-orange-500">Photography</option>
                <option value="3d-design" className="bg-black text-orange-500">3D Design</option>
                <option value="animation" className="bg-black text-orange-500">Animation</option>
                <option value="video" className="bg-black text-orange-500">Video Production</option>
              </select>
        </div>
                 <button 
           onClick={handleAddItem}
           className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center"
         >
           <Plus className="w-4 h-4 mr-2" />
           Add Item
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolioItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300"
          >
            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik02MCAxMDBMMTAwIDYwTDE0MCAxMDBMMTAwIDE0MEw2MCAxMDBaIiBmaWxsPSIjNjY3M0E2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5JbWFnZTwvdGV4dD4KPC9zdmc+';
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'inactive' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {item.status}
                </span>
                <span className="text-gray-400 text-xs">{item.views} views</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs capitalize">{item.category}</span>
                                 <div className="flex space-x-2">
                   <button 
                     onClick={() => handleEditItem(item)}
                     className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                     aria-label="Edit item"
                   >
                     <Edit3 className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => handleDeleteItem(item.id)}
                     className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                     aria-label="Delete item"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPersonal = () => (
    <div className="space-y-6">
      {/* Personal Section Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Personal Portfolio</h2>
          <p className="text-gray-300">Manage your personal projects, achievements, and experiences</p>
        </div>
        <button 
          onClick={handleAddPersonal}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Personal Item
        </button>
      </div>

      {/* Personal Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Projects</h3>
            <p className="text-gray-400 text-sm mb-4">Personal projects and work</p>
            <span className="text-purple-400 text-2xl font-bold">
              {personalItems.filter(item => item.category === 'project').length}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
            <p className="text-gray-400 text-sm mb-4">Awards and accomplishments</p>
            <span className="text-blue-400 text-2xl font-bold">
              {personalItems.filter(item => item.category === 'achievement').length}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Experience</h3>
            <p className="text-gray-400 text-sm mb-4">Work and life experiences</p>
            <span className="text-green-400 text-2xl font-bold">
              {personalItems.filter(item => item.category === 'experience').length}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Education</h3>
            <p className="text-gray-400 text-sm mb-4">Academic background</p>
            <span className="text-orange-400 text-2xl font-bold">
              {personalItems.filter(item => item.category === 'education').length}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search personal items..."
              value={personalSearchTerm}
              onChange={(e) => setPersonalSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
                                                                                       <select
               value={selectedPersonalCategory}
               onChange={(e) => setSelectedPersonalCategory(e.target.value)}
               className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 shadow-lg ${
                 selectedPersonalCategory !== 'all' 
                   ? 'bg-black border-orange-500 text-orange-500 font-bold' 
                   : 'bg-black border-gray-600 text-orange-500'
               }`}
               aria-label="Filter by personal category"
             >
               <option value="all" className="bg-black text-orange-500">All Categories</option>
               <option value="project" className="bg-black text-orange-500">Projects</option>
               <option value="achievement" className="bg-black text-orange-500">Achievements</option>
               <option value="experience" className="bg-black text-orange-500">Experience</option>
               <option value="education" className="bg-black text-orange-500">Education</option>
               <option value="skill" className="bg-black text-orange-500">Skills</option>
             </select>
        </div>
        <button 
          onClick={handleAddPersonal}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </button>
      </div>

      {/* Personal Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonalItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300"
          >
            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik02MCAxMDBMMTAwIDYwTDE0MCAxMDBMMTAwIDE0MEw2MCAxMDBaIiBmaWxsPSIjNjY3M0E2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5JbWFnZTwvdGV4dD4KPC9zdmc+';
                  }}
                />
              ) : (
                <div className="text-center text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">No Image</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.category === 'project' ? 'bg-purple-500/20 text-purple-400' :
                  item.category === 'achievement' ? 'bg-blue-500/20 text-blue-400' :
                  item.category === 'experience' ? 'bg-green-500/20 text-green-400' :
                  item.category === 'education' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {item.category}
                </span>
                <span className="text-gray-400 text-xs">{item.views || 0} views</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditPersonal(item)}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    aria-label="Edit personal item"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeletePersonal(item.id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    aria-label="Delete personal item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPersonalItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Personal Items Found</h3>
          <p className="text-gray-400 mb-6">Start building your personal portfolio by adding your first item</p>
          <button
            onClick={handleAddPersonal}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Your First Item
          </button>
        </motion.div>
      )}
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {/* Content Management Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Content Management</h2>
          <p className="text-gray-300">Manage website content, services, and information</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleAddContent('service')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </button>
          <button
            onClick={() => handleAddContent('about')}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add About
          </button>
          <button
            onClick={() => handleAddContent('contact')}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <span className="text-gray-300 text-sm">Days:</span>
              <input
                type="number"
                min={1}
                value={oldContentDays}
                onChange={(e) => setOldContentDays(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 px-2 py-1 bg-transparent text-white focus:outline-none"
                aria-label="Old content threshold in days"
              />
            </div>
            <button
              onClick={() => handleRemoveOldContent(oldContentDays)}
              className="bg-gradient-to-r from-gray-700 to-black text-white py-2 px-4 rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 flex items-center"
            >
              {(() => {
                const cutoff = Date.now() - oldContentDays * 24 * 60 * 60 * 1000;
                const count = contentItems.filter(ci => {
                  const t = new Date(ci.updatedAt || ci.createdAt || Date.now()).getTime();
                  return t < cutoff;
                }).length;
                return `Remove Old Content (${oldContentDays}+ days, ${count} found)`;
              })()}
            </button>
          </div>
        </div>
      </div>

      {/* Content Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Services</h3>
            <p className="text-gray-400 text-sm mb-4">Manage your service offerings</p>
            <button
              onClick={() => handleAddContent('service')}
              className="w-full bg-blue-500/20 text-blue-400 py-2 px-4 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              Manage Services
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">About</h3>
            <p className="text-gray-400 text-sm mb-4">Update company information</p>
            <button
              onClick={() => handleAddContent('about')}
              className="w-full bg-green-500/20 text-green-400 py-2 px-4 rounded-lg hover:bg-green-500/30 transition-colors"
            >
              Manage About
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
            <p className="text-gray-400 text-sm mb-4">Update contact details</p>
            <button
              onClick={() => handleAddContent('contact')}
              className="w-full bg-orange-500/20 text-orange-400 py-2 px-4 rounded-lg hover:bg-orange-500/30 transition-colors"
            >
              Manage Contact
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">General</h3>
            <p className="text-gray-400 text-sm mb-4">Other website content</p>
            <button
              onClick={() => handleAddContent('general')}
              className="w-full bg-purple-500/20 text-purple-400 py-2 px-4 rounded-lg hover:bg-purple-500/30 transition-colors"
            >
              Manage Content
            </button>
          </div>
        </motion.div>
      </div>

      {/* Content List */}
      {contentItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Recent Content</h3>
          <div className="space-y-3">
            {contentItems.slice().reverse().map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.type === 'service' ? 'bg-blue-500/20 text-blue-400' :
                    item.type === 'about' ? 'bg-green-500/20 text-green-400' :
                    item.type === 'contact' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-white text-sm">{item.title}</span>
                  <span className="text-gray-400 text-xs">{new Date(item.updatedAt || item.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditContent(item)}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    aria-label="Edit content"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteContent(item.id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    aria-label="Delete content"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Device Statistics</h3>
          <div className="space-y-4">
            {stats?.deviceStats && Object.entries(stats.deviceStats).map(([device, count]) => (
              <div key={device} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize">{device}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${(count / (stats.totalVisitors || 1)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Page Statistics</h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {stats?.pageStats && Object.entries(stats.pageStats)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 10)
              .map(([page, count]) => (
                <div key={page} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{page}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${(count / (stats.totalVisitors || 1)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-12 text-right">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Admin Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Admin Password</label>
            <input
              type="password"
              placeholder="Change admin password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Notification Email</label>
            <input
              type="email"
              placeholder="admin@pixelpulse.com"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300">
            Save Settings
          </button>
        </div>
      </motion.div>
    </div>
  );

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-red-500/90 text-white'
          }`}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{notification.message}</span>
          </div>
        </motion.div>
      )}

      {/* Portfolio Manager Modal */}
      <PortfolioManager
        isOpen={showPortfolioManager}
        onClose={() => setShowPortfolioManager(false)}
        item={editingItem}
        onSave={handleSaveItem}
        mode={managerMode}
      />

      {/* Content Manager Modal */}
      <ContentManager
        isOpen={showContentManager}
        onClose={() => setShowContentManager(false)}
        item={editingContent}
        onSave={handleSaveContent}
        mode={contentManagerMode}
        contentType={contentType}
      />

      {/* Personal Manager Modal */}
      <PersonalManager
        isOpen={showPersonalManager}
        onClose={() => setShowPersonalManager(false)}
        item={editingPersonal}
        onSave={handleSavePersonal}
        mode={personalManagerMode}
      />

      {/* Upload Assets Modal */}
      <UploadAssetsModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleFileUpload}
        onProcess={handleProcessUpload}
        uploadedFiles={uploadedFiles}
        onRemoveFile={handleRemoveFile}
        isUploading={isUploadingAssets}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-300">PixelPulse Design Studio Management</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-orange-400 hover:text-orange-300 text-sm flex items-center"
            >
              <Lock className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'portfolio' && renderPortfolio()}
            {activeTab === 'personal' && renderPersonal()}
            {activeTab === 'content' && renderContent()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && renderSettings()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;
