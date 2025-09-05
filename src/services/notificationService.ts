export interface NotificationData {
  type: 'NEW_VISITOR' | 'VISITOR_EXIT' | 'VISITOR_INACTIVE';
  data: any;
  website: string;
  timestamp: string;
}

class NotificationService {
  private emailService: string;
  private slackWebhook: string;
  private discordWebhook: string;

  constructor() {
    // Configure your notification services here
    this.emailService = 'https://api.emailjs.com/api/v1.0/email/send';
    this.slackWebhook = 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK';
    this.discordWebhook = 'https://discord.com/api/webhooks/YOUR/DISCORD/WEBHOOK';
  }

  async sendNotification(notification: NotificationData) {
    try {
      // Send only email notification to pixelpulse2905@gmail.com
      await this.sendEmailNotification(notification);
    } catch (error) {
      // Silent error handling
    }
  }

  private async sendEmailNotification(notification: NotificationData) {
    try {
      // Send notification directly to pixelpulse2905@gmail.com via FormSubmit
      await this.sendViaFormSubmit(notification);
      
    } catch (error) {
      // Silent error handling - no console logs
    }
  }

  private async sendViaFormSubmit(notification: NotificationData) {
    try {
      // Using FormSubmit.co (free email service) - sends directly to pixelpulse2905@gmail.com
      const formData = new FormData();
      formData.append('email', 'pixelpulse2905@gmail.com');
      formData.append('subject', `🚀 ${notification.type} - ${notification.website}`);
      formData.append('message', this.formatEmailMessage(notification));
      
      await fetch('https://formsubmit.co/pixelpulse2905@gmail.com', {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      // Silent fallback - no console logs
    }
  }

  private async sendSlackNotification(notification: NotificationData) {
    if (!this.slackWebhook.includes('YOUR')) {
      try {
        const slackMessage = {
          text: `🚀 *${notification.website}* - ${notification.type}`,
          attachments: [
            {
              color: this.getNotificationColor(notification.type),
              fields: this.formatSlackFields(notification.data),
              footer: `PixelPulse Visitor Tracker`,
              ts: Math.floor(Date.now() / 1000)
            }
          ]
        };

        await fetch(this.slackWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(slackMessage)
        });
      } catch (error) {
        console.error('Slack notification failed:', error);
      }
    }
  }

  private async sendDiscordNotification(notification: NotificationData) {
    if (!this.discordWebhook.includes('YOUR')) {
      try {
        const discordMessage = {
          embeds: [
            {
              title: `🚀 ${notification.website} - ${notification.type}`,
              description: this.formatDiscordDescription(notification.data),
              color: this.getNotificationColor(notification.type),
              fields: this.formatDiscordFields(notification.data),
              timestamp: notification.timestamp,
              footer: {
                text: 'PixelPulse Visitor Tracker'
              }
            }
          ]
        };

        await fetch(this.discordWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(discordMessage)
        });
      } catch (error) {
        console.error('Discord notification failed:', error);
      }
    }
  }

  private sendConsoleNotification(notification: NotificationData) {
    const emoji = this.getNotificationEmoji(notification.type);
    const color = this.getNotificationColor(notification.type);
    
    console.log(
      `%c${emoji} ${notification.type} - ${notification.website}`,
      `color: ${color}; font-size: 16px; font-weight: bold;`
    );
    
    console.log('Visitor Data:', notification.data);
    console.log('Timestamp:', new Date(notification.timestamp).toLocaleString());
  }

  private formatEmailMessage(notification: NotificationData): string {
    const data = notification.data;
    let message = `🚀 New Website Activity - ${notification.website}

Type: ${notification.type}
Time: ${new Date(notification.timestamp).toLocaleString()}

Visitor Details:
• Page: ${data.page || 'Unknown'}
• Device: ${data.device || 'Unknown'}
• Browser: ${data.browser || 'Unknown'}
• OS: ${data.os || 'Unknown'}
• Location: ${data.location || 'Unknown'}
• IP: ${data.ip || 'Unknown'}
• Screen: ${data.screenResolution || 'Unknown'}
• Referrer: ${data.referrer || 'Direct'}`;

    if (data.timeOnSite) {
      message += `\n• Time on Site: ${Math.floor(data.timeOnSite / 60)}m ${data.timeOnSite % 60}s`;
    }

    message += `\n\n---\nPixelPulse Visitor Tracker\n${new Date().toLocaleString()}`;

    return message;
  }

  private formatSlackFields(data: any): any[] {
    const fields = [
      { title: 'Page', value: data.page || 'Unknown', short: true },
      { title: 'Device', value: data.device || 'Unknown', short: true },
      { title: 'Browser', value: data.browser || 'Unknown', short: true },
      { title: 'OS', value: data.os || 'Unknown', short: true }
    ];

    if (data.location) {
      fields.push({ title: 'Location', value: data.location, short: true });
    }

    if (data.timeOnSite) {
      fields.push({ 
        title: 'Time on Site', 
        value: `${Math.floor(data.timeOnSite / 60)}m ${data.timeOnSite % 60}s`, 
        short: true 
      });
    }

    return fields;
  }

  private formatDiscordFields(data: any): any[] {
    return this.formatSlackFields(data);
  }

  private formatDiscordDescription(data: any): string {
    let description = `**Page:** ${data.page || 'Unknown'}\n`;
    description += `**Device:** ${data.device || 'Unknown'}\n`;
    description += `**Browser:** ${data.browser || 'Unknown'}\n`;
    description += `**OS:** ${data.os || 'Unknown'}\n`;
    
    if (data.location) {
      description += `**Location:** ${data.location}\n`;
    }
    
    if (data.timeOnSite) {
      description += `**Time on Site:** ${Math.floor(data.timeOnSite / 60)}m ${data.timeOnSite % 60}s\n`;
    }

    return description;
  }

  private getNotificationColor(type: string): string {
    switch (type) {
      case 'NEW_VISITOR':
        return '#00ff00'; // Green
      case 'VISITOR_EXIT':
        return '#ff0000'; // Red
      case 'VISITOR_INACTIVE':
        return '#ffa500'; // Orange
      default:
        return '#0000ff'; // Blue
    }
  }

  private getNotificationEmoji(type: string): string {
    switch (type) {
      case 'NEW_VISITOR':
        return '🚀';
      case 'VISITOR_EXIT':
        return '👋';
      case 'VISITOR_INACTIVE':
        return '😴';
      default:
        return '📊';
    }
  }

  // Setup methods for configuration
  public setupEmailService(serviceId: string, templateId: string, userId: string) {
    // This would be called from your configuration
    console.log('Email service configured:', { serviceId, templateId, userId });
  }

  public setupSlackWebhook(webhookUrl: string) {
    this.slackWebhook = webhookUrl;
    console.log('Slack webhook configured');
  }

  public setupDiscordWebhook(webhookUrl: string) {
    this.discordWebhook = webhookUrl;
    console.log('Discord webhook configured');
  }
}

export const notificationService = new NotificationService();
export default notificationService;
