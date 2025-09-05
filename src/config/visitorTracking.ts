// Visitor Tracking Configuration
// Configure your notification services here

export const visitorTrackingConfig = {
  // Email Notifications (using FormSubmit - FREE service)
  email: {
    enabled: true,
    service: 'FormSubmit.co', // Free email service
    recipientEmail: 'pixelpulse2905@gmail.com',
    // No setup required - works immediately
  },

  // Slack Notifications
  slack: {
    enabled: false,
    webhookUrl: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
  },

  // Discord Notifications
  discord: {
    enabled: false,
    webhookUrl: 'https://discord.com/api/webhooks/YOUR/DISCORD/WEBHOOK'
  },

  // Webhook Notifications (for custom integrations)
  webhook: {
    enabled: false,
    url: 'https://webhook.site/your-unique-url',
    headers: {
      'Content-Type': 'application/json'
    }
  },

  // Tracking Settings
  tracking: {
    trackIP: true,
    trackLocation: true,
    trackDevice: true,
    trackBrowser: true,
    trackOS: true,
    trackScreenResolution: true,
    trackReferrer: true,
    trackTimeOnSite: true,
    trackInactivity: true,
    inactivityTimeout: 300000, // 5 minutes in milliseconds
    updateInterval: 30000, // 30 seconds
    maxStoredVisitors: 100
  },

  // Privacy Settings
  privacy: {
    anonymizeIP: false, // Set to true to only store partial IP
    respectDoNotTrack: true,
    cookieConsent: true
  }
};

// Setup Instructions:
/*
1. EMAIL NOTIFICATIONS (EmailJS):
   - Go to https://www.emailjs.com/
   - Create an account and verify your email
   - Create a new Email Service (Gmail, Outlook, etc.)
   - Create an email template
   - Get your Service ID, Template ID, and User ID
   - Update the email configuration above

2. SLACK NOTIFICATIONS:
   - Go to your Slack workspace
   - Create a new app or use existing one
   - Enable Incoming Webhooks
   - Create a webhook for your channel
   - Copy the webhook URL and update the slack configuration

3. DISCORD NOTIFICATIONS:
   - Go to your Discord server
   - Edit a channel
   - Go to Integrations > Webhooks
   - Create a new webhook
   - Copy the webhook URL and update the discord configuration

4. CUSTOM WEBHOOK:
   - Use services like webhook.site for testing
   - Or create your own API endpoint
   - Update the webhook configuration above

5. TRACKING CUSTOMIZATION:
   - Modify the tracking settings based on your needs
   - Adjust privacy settings for compliance
   - Change timeouts and intervals as needed
*/

export default visitorTrackingConfig;
