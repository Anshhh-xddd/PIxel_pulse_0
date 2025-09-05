import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Edit3, Trash2, FileText, Image, Settings, Globe } from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'service' | 'about' | 'contact' | 'general';
  title: string;
  content: string;
  image?: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface ContentManagerProps {
  isOpen: boolean;
  onClose: () => void;
  item?: ContentItem | null;
  onSave: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  mode: 'add' | 'edit';
  contentType: 'service' | 'about' | 'contact' | 'general';
}

const ContentManager: React.FC<ContentManagerProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  mode,
  contentType
}) => {
  const [formData, setFormData] = useState({
    type: contentType,
    title: item?.title || '',
    content: item?.content || '',
    image: item?.image || '',
    status: item?.status || 'draft' as const
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

  const getContentTypeLabel = () => {
    switch (contentType) {
      case 'service': return 'Service';
      case 'about': return 'About Section';
      case 'contact': return 'Contact Information';
      case 'general': return 'General Content';
      default: return 'Content';
    }
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
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {mode === 'add' ? `Add New ${getContentTypeLabel()}` : `Edit ${getContentTypeLabel()}`}
                </h2>
                <p className="text-gray-300 text-sm mt-1">
                  {mode === 'add' ? 'Create new content for your website' : 'Update existing content'}
                </p>
              </div>
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
                  placeholder={`Enter ${getContentTypeLabel().toLowerCase()} title`}
                />
              </div>

              {/* Content Type and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-gray-300 text-sm font-medium mb-2">
                    Content Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    aria-label="Select content type"
                  >
                    <option value="service">Service</option>
                    <option value="about">About Section</option>
                    <option value="contact">Contact Information</option>
                    <option value="general">General Content</option>
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    aria-label="Select status"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-gray-300 text-sm font-medium mb-2">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
                  placeholder={`Enter ${getContentTypeLabel().toLowerCase()} content...`}
                />
                <p className="text-gray-400 text-xs mt-1">
                  You can use HTML tags for formatting: &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;, etc.
                </p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Image (Optional)
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
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
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
                      {mode === 'add' ? 'Add Content' : 'Save Changes'}
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

export default ContentManager;
