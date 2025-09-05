import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const now = new Date();
      const submissionTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });

      const detailedMessage = `
🤖 NEW CONTACT FORM SUBMISSION - PIXEL PULSE

📅 Submission Time: ${submissionTime}
🌐 Website: Pixel Pulse Design Studio

👤 CONTACT DETAILS:
• Name: ${formData.name}
• Email: ${formData.email}
• Company: ${formData.company || 'Not provided'}

💬 MESSAGE:
${formData.message}

---
This message was sent from the Pixel Pulse contact form.
Reply directly to this email to respond to ${formData.name}.
      `.trim();

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('detailed_message', detailedMessage);
      formDataToSend.append('_replyto', formData.email);
      formDataToSend.append('_subject', `🤖 New Contact Form Submission from ${formData.name} - Pixel Pulse`);
      formDataToSend.append('submission_time', submissionTime);

      const response = await fetch('https://formspree.io/f/manbokbo', {
        method: 'POST',
        body: formDataToSend,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Submission failed');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const openGmailCompose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = 'pixelpulse2905@gmail.com';
    const subject = '🤖 New Project Inquiry - Pixel Pulse';
    const body = `Hello Pixel Pulse Team,

I'm interested in your design services and would like to discuss a potential project.

Project Details:
- Project Type: 
- Timeline: 
- Budget Range: 
- Additional Requirements: 

Please let me know the next steps.

Best regards,
[Your Name]`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: "Email Protocol",
      value: "pixelpulse2905@gmail.com",
      action: openGmailCompose,
      delay: 0.1
    },
    {
      icon: <Phone size={20} />,
      title: "Voice Channel",
      value: "+91 95122 94700",
      action: null,
      delay: 0.2
    },
    {
      icon: <MapPin size={20} />,
      title: "Physical Location",
      value: "Mavdi, Rajkot, Gujarat, India",
      action: null,
      delay: 0.3
    }
  ];

  return (
    <section id="contact" className="py-10 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/7 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/4 via-transparent to-orange-500/4"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/14 via-transparent to-orange-500/7 animate-pulse-slow"></div>
      
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/4 via-transparent to-transparent"></div>
      
      {/* Top fade for seamless transition from Portfolio */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent"></div>
      
      {/* Bottom fade for seamless transition to Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Initialize New <br />
            <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Project
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to build the future? Let's engineer your vision and bring intelligent design to reality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">Connect to System</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: info.delay }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-black p-3 rounded-full group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {info.icon}
                  </motion.div>
                  <div>
                    <p className="font-medium text-white">{info.title}</p>
                    {info.action ? (
                      <a 
                        href="mailto:pixelpulse2905@gmail.com" 
                        onClick={info.action}
                        className="text-gray-300 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-300">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-4">System Availability</h4>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Monday - Friday: 24/7 Online
                </p>
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  Weekend: Automated Response
                </p>
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Emergency: Always Active
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm p-8 border border-gray-800 rounded-xl shadow-md relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <form 
                action="https://formspree.io/f/manbokbo" 
                method="POST" 
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-white block mb-2 text-sm font-medium">
                      User ID *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Your name"
                      className={`w-full bg-black/50 backdrop-blur-sm border text-white px-4 py-3 rounded-md focus:outline-none transition-all duration-300 ${
                        errors.name ? 'border-red-500' : 'border-gray-700 focus:border-orange-500'
                      }`}
                    />
                    {errors.name && (
                      <motion.p 
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle size={12} />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="you@example.com"
                      className={`w-full bg-black/50 backdrop-blur-sm border text-white px-4 py-3 rounded-md focus:outline-none transition-all duration-300 ${
                        errors.email ? 'border-red-500' : 'border-gray-700 focus:border-orange-500'
                      }`}
                    />
                    {errors.email && (
                      <motion.p 
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle size={12} />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="text-white block mb-2 text-sm font-medium">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Company (optional)"
                    className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white px-4 py-3 rounded-md focus:border-orange-500 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-white block mb-2 text-sm font-medium">
                    System Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Describe your design requirements..."
                    className={`w-full bg-black/50 backdrop-blur-sm border text-white px-4 py-3 rounded-md focus:outline-none resize-none transition-all duration-300 ${
                      errors.message ? 'border-red-500' : 'border-gray-700 focus:border-orange-500'
                    }`}
                  />
                  {errors.message && (
                    <motion.p 
                      className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={12} />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Hidden fields */}
                <input type="hidden" name="_replyto" value={formData.email} aria-hidden="true" />
                <input type="hidden" name="_subject" value={`🤖 New Contact Form Submission from ${formData.name} - Pixel Pulse`} aria-hidden="true" />
                <input type="text" name="_gotcha" style={{ display: 'none' }} aria-hidden="true" />

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <motion.div 
                    className="text-green-400 bg-green-500/20 border border-green-500/50 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle size={16} />
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div 
                    className="text-red-400 bg-red-500/20 border border-red-500/50 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Please try again later.
                  </motion.div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-black font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:from-orange-400 hover:to-red-400 transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-b-2 border-black rounded-full" />
                        Sending Email...
                      </>
                    ) : (
                      <div className='flex items-center gap-2'><Send size={20} />Send Message </div> 
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Social Media Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Connect With Us
          </motion.h3>
          <motion.p 
            className="text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Follow us on social media for the latest updates and design inspiration
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/_pixel_pulse._?igsh=bWdzcm8wZjhidWps"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 hover:from-pink-500/20 hover:to-purple-500/20 border border-gray-700/50 hover:border-pink-500/50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
              whileHover={{ scale: 1.1, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              title="Follow us on Instagram"
            >
              <div className="text-gray-300 group-hover:text-pink-400 transition-colors duration-300">
                <Instagram size={24} />
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/pixel-pulse-9a27aa380"
              className="group p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 hover:from-blue-500/20 hover:to-blue-600/20 border border-gray-700/50 hover:border-blue-500/50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              whileHover={{ scale: 1.1, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              title="Connect on LinkedIn"
            >
              <div className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                <Linkedin size={24} />
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:pixelpulse2905@gmail.com"
              className="group p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 hover:from-orange-500/20 hover:to-red-500/20 border border-gray-700/50 hover:border-orange-500/50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25"
              whileHover={{ scale: 1.1, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              title="Send us an email"
            >
              <div className="text-gray-300 group-hover:text-orange-400 transition-colors duration-300">
                <Mail size={24} />
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
