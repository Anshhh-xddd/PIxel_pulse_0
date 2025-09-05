# 🚀 Silent Visitor Tracking System Setup Guide

## Overview
This system silently tracks website visitors and sends you email notifications when someone visits your website. It includes:

- **Silent visitor tracking** with no visible interface
- **Email notifications** sent directly to pixelpulse2905@gmail.com
- **Hidden admin panel** for viewing statistics when needed
- **Privacy-compliant** tracking with no console logs

## ✨ Features

### What Gets Tracked:
- 📍 **Page visits** and navigation
- 🌍 **Geographic location** (city, country)
- 💻 **Device information** (desktop, mobile, tablet)
- 🌐 **Browser and OS** details
- 📱 **Screen resolution**
- ⏱️ **Time spent on site**
- 🔗 **Referrer information** (where visitors came from)
- 📊 **User behavior** (inactivity, exit patterns)

### Notification Types:
- 🚀 **NEW_VISITOR** - When someone visits your site
- 👋 **VISITOR_EXIT** - When someone leaves
- 😴 **VISITOR_INACTIVE** - When someone becomes inactive

## 🛠️ Setup Instructions

### 1. Email Notifications (Recommended)

#### Using EmailJS:
1. Go to [EmailJS](https://www.emailjs.com/) and create an account
2. Verify your email address
3. Create a new **Email Service**:
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
4. Create an **Email Template**:
   - Click "Email Templates" → "Create New Template"
   - Use this template content:

```html
<h2>🚀 New Website Visitor - {{website}}</h2>
<p><strong>Type:</strong> {{type}}</p>
<p><strong>Time:</strong> {{timestamp}}</p>
<hr>
<h3>Visitor Details:</h3>
{{message}}
<hr>
<pre>{{visitor_data}}</pre>
```

5. Get your credentials and update `src/config/visitorTracking.ts`:
```typescript
email: {
  enabled: true,
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  userId: 'YOUR_USER_ID',
  recipientEmail: 'pixelpulse2905@gmail.com'
}
```

### 2. Slack Notifications

1. Go to your Slack workspace
2. Create a new app or use existing one
3. Enable **Incoming Webhooks**:
   - Go to "OAuth & Permissions"
   - Add `incoming-webhook` scope
4. Create a webhook:
   - Go to "Incoming Webhooks"
   - Click "Add New Webhook to Workspace"
   - Choose a channel
   - Copy the webhook URL
5. Update the configuration:
```typescript
slack: {
  enabled: true,
  webhookUrl: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'
}
```

### 3. Discord Notifications

1. Go to your Discord server
2. Edit a channel → **Integrations** → **Webhooks**
3. Create a new webhook
4. Copy the webhook URL
5. Update the configuration:
```typescript
discord: {
  enabled: true,
  webhookUrl: 'https://discord.com/api/webhooks/YOUR/WEBHOOK/URL'
}
```

### 4. Custom Webhook (Testing)

1. Go to [webhook.site](https://webhook.site/)
2. Copy your unique webhook URL
3. Update the configuration:
```typescript
webhook: {
  enabled: true,
  url: 'https://webhook.site/your-unique-url'
}
```

## 🔧 Configuration Options

### Tracking Settings
```typescript
tracking: {
  trackIP: true,              // Track visitor IP addresses
  trackLocation: true,         // Track geographic location
  trackDevice: true,           // Track device type
  trackBrowser: true,          // Track browser information
  trackOS: true,               // Track operating system
  trackScreenResolution: true, // Track screen size
  trackReferrer: true,         // Track where visitors came from
  trackTimeOnSite: true,       // Track time spent on site
  trackInactivity: true,       // Track user inactivity
  inactivityTimeout: 300000,   // 5 minutes timeout
  updateInterval: 30000,       // 30 seconds update interval
  maxStoredVisitors: 100      // Maximum stored visitors
}
```

### Privacy Settings
```typescript
privacy: {
  anonymizeIP: false,         // Only store partial IP
  respectDoNotTrack: true,    // Respect DNT headers
  cookieConsent: true         // Require cookie consent
}
```

## 📱 Visitor Dashboard

The system includes a live dashboard that shows:
- **Total visitor count**
- **Device statistics** (desktop, mobile, tablet)
- **Current visitor details**
- **Recent activity**
- **Real-time updates**

The dashboard appears automatically after 2 seconds and can be hidden by the user.

## 🚨 Troubleshooting

### Notifications Not Working?
1. Check browser console for errors
2. Verify your API keys and webhook URLs
3. Ensure your notification services are properly configured
4. Check if your email service requires authentication

### Location Not Showing?
1. The system uses external APIs (ipapi.co, ipify.org)
2. Some networks may block these requests
3. Check if your hosting provider allows external API calls

### Dashboard Not Visible?
1. Check if the component is properly imported
2. Verify that visitor tracking is initialized
3. Check browser console for errors

## 🔒 Privacy & Compliance

### GDPR Compliance:
- Set `anonymizeIP: true` to only store partial IPs
- Enable `cookieConsent: true` for cookie consent
- Set `respectDoNotTrack: true` to respect DNT headers

### Data Storage:
- Visitor data is stored in browser localStorage
- Maximum 100 visitors are stored locally
- No data is sent to external servers without your configuration

## 📊 Analytics & Insights

### What You'll Learn:
- **Peak visiting hours** and patterns
- **Most popular pages** on your site
- **Device preferences** of your visitors
- **Geographic distribution** of your audience
- **User engagement** metrics

### Sample Notification:
```
🚀 NEW_VISITOR - PixelPulse Design Studio

Page: /portfolio/logo
Device: Desktop
Browser: Chrome
OS: Windows
Location: Mumbai, India
IP: 192.168.1.1
Screen: 1920x1080
Referrer: Google Search
Time: 2:30 PM
```

## 🎯 Customization

### Adding New Notification Channels:
1. Create a new method in `NotificationService`
2. Add configuration options
3. Update the main notification method
4. Test with your new service

### Modifying Tracking Behavior:
1. Edit the `VisitorTracker` class
2. Modify tracking methods as needed
3. Update configuration options
4. Test changes thoroughly

## 🚀 Getting Started

1. **Configure your notification services** (start with EmailJS)
2. **Update the configuration file** with your credentials
3. **Test the system** by visiting your website
4. **Check your notifications** (email, Slack, Discord, etc.)
5. **Monitor the dashboard** for real-time insights
6. **Customize settings** based on your needs

## 📞 Support

If you need help setting up the visitor tracking system:
1. Check the browser console for error messages
2. Verify all configuration settings
3. Test with a simple webhook first
4. Ensure your notification services are working

---

**Happy Tracking! 🎉**

Your website visitors will now be tracked in real-time, and you'll receive instant notifications whenever someone visits your PixelPulse Design Studio website!
