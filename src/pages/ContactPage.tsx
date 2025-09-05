import React, { useState } from 'react';
import { Mail, Phone, MapPin, Zap, Clock, Globe, MessageSquare, Send, CheckCircle, AlertCircle, Map, Users, Award, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [serverMessage, setServerMessage] = useState<string>('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validate = (partial?: Partial<typeof formData>) => {
    const data = { ...formData, ...partial };
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (!data.name || data.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!data.email || !emailRegex.test(data.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!data.message || data.message.trim().length < 10) {
      nextErrors.message = 'Please provide at least 10 characters about your project.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    validate({ [e.target.name]: e.target.value } as Partial<typeof formData>);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validate({ [e.target.name]: (e.target as HTMLInputElement | HTMLTextAreaElement).value } as Partial<typeof formData>);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setServerMessage('');

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 15000);

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
🤖 NEW CONTACT FORM SUBMISSION - PIXELPULSE

📅 Submission Time: ${submissionTime}
🌐 Website: PixelPulse Design Studio

👤 CONTACT DETAILS:
• Name: ${formData.name}
• Email: ${formData.email}
• Company: ${formData.company || 'Not provided'}

💬 MESSAGE:
${formData.message}

---
This message was sent from the PixelPulse contact form.
Reply directly to this email to respond to ${formData.name}.
      `.trim();

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('detailed_message', detailedMessage);
      formDataToSend.append('_replyto', formData.email);
      formDataToSend.append('_subject', `🤖 New Contact Form Submission from ${formData.name} - PixelPulse`);
      formDataToSend.append('submission_time', submissionTime);

      const response = await fetch('https://formspree.io/f/manbokbo', {
        method: 'POST',
        body: formDataToSend,
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      window.clearTimeout(timeoutId);

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        const data = await response.json().catch(() => null);
        const msg = data?.error || 'Submission failed. Please try again later.';
        setServerMessage(msg);
        throw new Error(msg);
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      if (!serverMessage) setServerMessage('Network error or timeout. Please check your connection and try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openGmailCompose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = 'pixelpulse2905@gmail.com';
    const subject = '🤖 New Project Inquiry - PixelPulse';
    const body = `Hello PixelPulse Team,

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
      icon: <Mail size={24} />,
      title: "Email Us",
      value: "pixelpulse2905@gmail.com",
      subtitle: "We'll respond within 24 hours",
      action: openGmailCompose,
      delay: 0.1
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      value: "+91 95122 94700",
      subtitle: "Available Mon-Fri, 9AM-6PM IST",
      action: null,
      delay: 0.2
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      value: "Mavdi, Rajkot, Gujarat, India",
      subtitle: "By appointment only",
      action: null,
      delay: 0.3
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      value: "Monday - Friday: 9:00 AM - 6:00 PM",
      subtitle: "Saturday: 10:00 AM - 4:00 PM",
      action: null,
      delay: 0.4
    }
  ];

  const features = [
    { icon: <Zap size={20} />, text: "Fast response time" },
    { icon: <Users size={20} />, text: "Professional consultation" },
    { icon: <Award size={20} />, text: "Transparent pricing" },
    { icon: <MessageSquare size={20} />, text: "Ongoing support" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/7 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/4 via-transparent to-orange-500/4"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/14 via-transparent to-orange-500/7 animate-pulse-slow"></div>

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/4 via-transparent to-transparent"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 md:pb-16">
        {/* Hero Section */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="mr-2 sm:mr-4">Get In</span>
              <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to transform your brand with cutting-edge design? Let's create something extraordinary together.
            </motion.p>
          </div>
        </motion.div>

        {/* Contact Content */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div 
              className="lg:col-span-1 order-2 lg:order-1"
              variants={itemVariants}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Connect With Us
              </motion.h2>
              
              <div className="space-y-6 sm:space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    className="group"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: info.delay }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <motion.div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-black p-3 rounded-full group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {info.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{info.title}</h3>
                        {info.action ? (
                          <a
                            href="mailto:pixelpulse2905@gmail.com"
                            onClick={info.action}
                            className="text-gray-300 hover:text-orange-500 transition-colors duration-200 cursor-pointer text-base sm:text-lg block"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-300 text-base sm:text-lg">{info.value}</p>
                        )}
                        <p className="text-gray-400 text-sm mt-1">{info.subtitle}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div 
                className="mt-8 sm:mt-12 p-6 sm:p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">Why Choose PixelPulse?</h3>
                <div className="space-y-3 sm:space-y-4">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm sm:text-base">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2 order-1 lg:order-2"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-800 rounded-xl shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Start Your Project</h2>
                    <p className="text-gray-300 text-base sm:text-lg lg:text-xl">
                      Tell us about your vision and we'll help bring it to life with our expertise in design and technology.
                    </p>
                  </motion.div>

                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-4 sm:space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        <label htmlFor="name" className="text-white block mb-2 text-sm font-medium">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          placeholder="Your full name"
                          autoComplete="name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby="name-error"
                          className={`w-full bg-black/50 backdrop-blur-sm border text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.name ? 'border-red-500 focus:ring-red-500/30' : 'border-gray-700 focus:border-orange-500 focus:ring-orange-500/20'
                          }`}
                        />
                        {errors.name && (
                          <motion.p 
                            id="name-error" 
                            className="mt-1 text-sm text-red-400 flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle size={12} />
                            {errors.name}
                          </motion.p>
                        )}
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                      >
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
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          placeholder="you@example.com"
                          autoComplete="email"
                          inputMode="email"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby="email-error"
                          className={`w-full bg-black/50 backdrop-blur-sm border text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.email ? 'border-red-500 focus:ring-red-500/30' : 'border-gray-700 focus:border-orange-500 focus:ring-orange-500/20'
                          }`}
                        />
                        {errors.email && (
                          <motion.p 
                            id="email-error" 
                            className="mt-1 text-sm text-red-400 flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle size={12} />
                            {errors.email}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <label htmlFor="company" className="text-white block mb-2 text-sm font-medium">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        placeholder="Your company name (optional)"
                        autoComplete="organization"
                        className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white px-4 py-3 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <label htmlFor="message" className="text-white block mb-2 text-sm font-medium">
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby="message-error"
                        className={`w-full bg-black/50 backdrop-blur-sm border text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                          errors.message ? 'border-red-500 focus:ring-red-500/30' : 'border-gray-700 focus:border-orange-500 focus:ring-orange-500/20'
                        }`}
                      />
                      {errors.message && (
                        <motion.p 
                          id="message-error" 
                          className="mt-1 text-sm text-red-400 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle size={12} />
                          {errors.message}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Hidden fields */}
                    <input type="hidden" name="_replyto" value={formData.email} />
                    <input type="hidden" name="_subject" value={`🤖 New Contact Form Submission from ${formData.name} - PixelPulse`} />
                    <input type="text" name="_gotcha" style={{ display: 'none' }} />

                    {/* Status messages */}
                    {submitStatus === 'success' && (
                      <motion.div 
                        className="text-green-400 bg-green-500/20 border border-green-500/50 px-4 sm:px-6 py-4 rounded-lg text-sm flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <CheckCircle size={16} />
                        Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div 
                        className="text-red-400 bg-red-500/20 border border-red-500/50 px-4 sm:px-6 py-4 rounded-lg text-sm flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        aria-live="polite"
                      >
                        <AlertCircle size={16} />
                        {serverMessage || 'Something went wrong. Please try again later or contact us directly via email.'}
                      </motion.div>
                    )}

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-black font-bold py-3 sm:py-4 rounded-xl flex justify-center items-center gap-2 sm:gap-3 hover:from-orange-400 hover:to-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
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
                            <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black rounded-full" />
                            Sending Message...
                          </>
                        ) : (
                          <div className="flex items-center space-x-2 text-2xl gap-3" > <Send size={22} /> Send Message {/* <Zap size={16} /> */} </div> 
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Connect With Us
          </motion.h3>
          <motion.p 
            className="text-gray-300 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Follow us on social media for the latest updates and design inspiration
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
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
                <Instagram size={28} />
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
                <Linkedin size={28} />
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
                <Mail size={28} />
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
