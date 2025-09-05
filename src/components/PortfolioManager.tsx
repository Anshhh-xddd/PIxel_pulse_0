import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Edit3, Trash2, Save, Plus } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  views: number;
}

interface PortfolioManagerProps {
  isOpen: boolean;
  onClose: () => void;
  item?: PortfolioItem | null;
  onSave: (item: Omit<PortfolioItem, 'id' | 'createdAt' | 'views'>) => void;
  mode: 'add' | 'edit';
}

const PortfolioManager: React.FC<PortfolioManagerProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    category: item?.category || 'logo',
    description: item?.description || '',
    status: item?.status || 'draft' as const,
    image: item?.image || ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(item?.image || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate file upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImagePreview(result);
          setFormData(prev => ({
            ...prev,
            image: result
          }));
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {mode === 'add' ? 'Add New Portfolio Item' : 'Edit Portfolio Item'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  placeholder="Enter item title"
                />
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-orange-500/30 rounded-lg text-orange-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 shadow-lg"
                    aria-label="Select category"
                  >
                    <option value="logo">Logo</option>
                    <option value="packaging">Packaging</option>
                    <option value="visiting-card">Visiting Cards</option>
                    <option value="brochure">Brochure</option>
                    <option value="holding">Holding</option>
                    <option value="web">Web Design</option>
                    <option value="print">Print Design</option>
                    <option value="branding">Branding</option>
                    <option value="social-media">Social Media</option>
                    <option value="illustration">Illustration</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="typography">Typography</option>
                    <option value="photography">Photography</option>
                    <option value="3d-design">3D Design</option>
                    <option value="animation">Animation</option>
                    <option value="video">Video Production</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-gray-300 text-sm font-medium mb-2">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-orange-500/30 rounded-lg text-orange-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 shadow-lg"
                    aria-label="Select status"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
                  placeholder="Describe your portfolio item..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Image *
                </label>
                
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-white/20"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg cursor-pointer hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                    >
                      {isUploading ? 'Uploading...' : 'Choose Image'}
                    </label>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      {mode === 'add' ? <Plus className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                      {mode === 'add' ? 'Add Item' : 'Save Changes'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioManager;
