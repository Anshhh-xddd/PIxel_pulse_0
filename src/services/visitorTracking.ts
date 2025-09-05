import notificationService from './notificationService';

export interface VisitorData {
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
  ip?: string;
  location?: string;
  device: 'mobile' | 'desktop' | 'tablet';
  browser: string;
  os: string;
  screenResolution: string;
  timeOnSite: number;
}

class VisitorTracker {
  private startTime: number;
  private currentPage: string;

  constructor() {
    this.startTime = Date.now();
    this.currentPage = window.location.pathname;
    this.initTracking();
  }

  private initTracking() {
    // Track page load
    this.trackPageVisit();
    
    // Track page changes
    this.trackPageChanges();
    
    // Track time on site
    this.trackTimeOnSite();
    
    // Track when user leaves
    this.trackUserExit();
  }

  private getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private getBrowserInfo(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Unknown';
  }

  private getOSInfo(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private async getVisitorLocation(): Promise<string> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return `${data.city}, ${data.country_name}`;
    } catch (error) {
      return 'Unknown';
    }
  }

  private async getIPAddress(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'Unknown';
    }
  }

  private async trackPageVisit() {
    const visitorData: VisitorData = {
      timestamp: new Date().toISOString(),
      page: this.currentPage,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      device: this.getDeviceType(),
      browser: this.getBrowserInfo(),
      os: this.getOSInfo(),
      screenResolution: `${screen.width}x${screen.height}`,
      timeOnSite: 0
    };

    try {
      // Get IP and location
      visitorData.ip = await this.getIPAddress();
      visitorData.location = await this.getVisitorLocation();
    } catch (error) {
      console.log('Could not fetch location data');
    }

    // Send notification
    this.sendVisitorNotification(visitorData);
    
    // Store in localStorage for analytics
    this.storeVisitorData(visitorData);
  }

  private trackPageChanges() {
    // Track navigation using History API
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      this.currentPage = window.location.pathname;
      this.trackPageVisit();
    }.bind(this);

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      this.currentPage = window.location.pathname;
      this.trackPageVisit();
    }.bind(this);

    // Track popstate (back/forward navigation)
    window.addEventListener('popstate', () => {
      this.currentPage = window.location.pathname;
      this.trackPageVisit();
    });
  }

  private trackTimeOnSite() {
    // Update time on site every 30 seconds
    setInterval(() => {
      const timeOnSite = Math.floor((Date.now() - this.startTime) / 1000);
      this.updateTimeOnSite(timeOnSite);
    }, 30000);
  }

  private trackUserExit() {
    // Track when user is about to leave
    window.addEventListener('beforeunload', () => {
      const timeOnSite = Math.floor((Date.now() - this.startTime) / 1000);
      this.sendExitNotification(timeOnSite);
    });

    // Track when user becomes inactive
    let inactivityTimer: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        const timeOnSite = Math.floor((Date.now() - this.startTime) / 1000);
        this.sendInactivityNotification(timeOnSite);
      }, 300000); // 5 minutes of inactivity
    };

    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true);
    });
  }

  private updateTimeOnSite(timeOnSite: number) {
    const storedData = localStorage.getItem('visitorData');
    if (storedData) {
      const data = JSON.parse(storedData);
      data.timeOnSite = timeOnSite;
      localStorage.setItem('visitorData', JSON.stringify(data));
    }
  }

  private storeVisitorData(data: VisitorData) {
    const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
    visitors.push(data);
    
    // Keep only last 100 visitors
    if (visitors.length > 100) {
      visitors.shift();
    }
    
    localStorage.setItem('visitors', JSON.stringify(visitors));
    localStorage.setItem('visitorData', JSON.stringify(data));
  }

  private async sendVisitorNotification(visitorData: VisitorData) {
    const notificationData = {
      type: 'NEW_VISITOR',
      data: visitorData,
      website: 'PixelPulse Design Studio',
      timestamp: new Date().toISOString()
    };

    try {
      // Send notification via notification service (silent - no console logs)
      await notificationService.sendNotification(notificationData);
    } catch (error) {
      // Silent error handling - no console logs
    }
  }

  private async sendExitNotification(timeOnSite: number) {
    const notificationData = {
      type: 'VISITOR_EXIT',
      data: {
        page: this.currentPage,
        timeOnSite,
        timestamp: new Date().toISOString()
      },
      website: 'PixelPulse Design Studio'
    };

    try {
      await this.sendToNotificationService(notificationData);
    } catch (error) {
      console.error('Failed to send exit notification:', error);
    }
  }

  private async sendInactivityNotification(timeOnSite: number) {
    const notificationData = {
      type: 'VISITOR_INACTIVE',
      data: {
        page: this.currentPage,
        timeOnSite,
        timestamp: new Date().toISOString()
      },
      website: 'PixelPulse Design Studio'
    };

    try {
      await this.sendToNotificationService(notificationData);
    } catch (error) {
      console.error('Failed to send inactivity notification:', error);
    }
  }

  private async sendToNotificationService(data: any) {
    // You can replace this with your preferred notification service
    // Examples: Email service, Slack webhook, Discord webhook, etc.
    
    // Option 1: Send to your own API endpoint
    try {
      await fetch('/api/visitor-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      // Fallback: Send to external service
      await this.sendToFallbackService(data);
    }
  }

  private async sendToFallbackService(data: any) {
    // Fallback notification service (you can customize this)
    const webhookUrl = 'https://webhook.site/your-unique-url'; // Replace with your webhook
    
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('All notification services failed:', error);
    }
  }

  // Public methods
  public getVisitorStats() {
    const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
    const currentVisitor = JSON.parse(localStorage.getItem('visitorData') || '{}');
    
    return {
      totalVisitors: visitors.length,
      currentVisitor,
      recentVisitors: visitors.slice(-10),
      deviceStats: this.getDeviceStats(visitors),
      pageStats: this.getPageStats(visitors)
    };
  }

  private getDeviceStats(visitors: VisitorData[]) {
    const stats = { mobile: 0, desktop: 0, tablet: 0 };
    visitors.forEach(visitor => {
      stats[visitor.device]++;
    });
    return stats;
  }

  private getPageStats(visitors: VisitorData[]) {
    const stats: { [key: string]: number } = {};
    visitors.forEach(visitor => {
      stats[visitor.page] = (stats[visitor.page] || 0) + 1;
    });
    return stats;
  }
}

// Initialize visitor tracking
export const visitorTracker = new VisitorTracker();

// Export for use in components
export default visitorTracker;
