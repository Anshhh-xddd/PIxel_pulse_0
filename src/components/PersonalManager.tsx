import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Edit3, Trash2, Save, Plus, Users, Target, Activity, Calendar, Award } from 'lucide-react';

interface PersonalItem {
  id: string;
  title: string;
  category: 'project' | 'achievement' | 'experience' | 'education' | 'skill';
  image?: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  views: number;
  duration?: string;
  location?: string;
  skills?: string[];
  link?: string;
}

interface PersonalManagerProps {
  isOpen: boolean;
  onClose: () => void;
  item?: PersonalItem | null;
  onSave: (item: Omit<PersonalItem, 'id' | 'createdAt' | 'views'>) => void;
  mode: 'add' | 'edit';
}

const PersonalManager: React.FC<PersonalManagerProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    category: item?.category || 'project' as const,
    description: item?.description || '',
    status: item?.status || 'draft' as const,
    image: item?.image || '',
    duration: item?.duration || '',
    location: item?.location || '',
    skills: item?.skills || [],
    link: item?.link || ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(item?.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const [skillInput, setSkillInput] = useState('');

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

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'project': return <Users className="w-4 h-4" />;
      case 'achievement': return <Award className="w-4 h-4" />;
      case 'experience': return <Activity className="w-4 h-4" />;
      case 'education': return <Calendar className="w-4 h-4" />;
      case 'skill': return <Target className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'project': return 'Project';
      case 'achievement': return 'Achievement';
      case 'experience': return 'Experience';
      case 'education': return 'Education';
      case 'skill': return 'Skill';
      default: return 'Personal Item';
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
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {mode === 'add' ? 'Add New Personal Item' : 'Edit Personal Item'}
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
                    <option value="project">Project</option>
                    <option value="achievement">Achievement</option>
                    <option value="experience">Experience</option>
                    <option value="education">Education</option>
                    <option value="skill">Skill</option>
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

              {/* Duration and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-gray-300 text-sm font-medium mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    placeholder="e.g., 2020-2023, 6 months"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-gray-300 text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    placeholder="e.g., New York, Remote"
                  />
                </div>
              </div>

              {/* Link */}
              <div>
                <label htmlFor="link" className="block text-gray-300 text-sm font-medium mb-2">
                  Link (Optional)
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  placeholder="https://example.com"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-blue-400 hover:text-blue-300"
                        aria-label={`Remove skill ${skill}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    placeholder="Add a skill"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Add
                  </button>
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
                  placeholder="Describe your personal item..."
                />
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
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center"
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

export default PersonalManager;
