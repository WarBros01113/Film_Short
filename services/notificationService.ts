// Notification Service for Firebase Cloud Messaging (FCM)
// This service handles push notifications for contest updates

interface NotificationPayload {
  title: string;
  body: string;
  data?: { [key: string]: string };
  imageUrl?: string;
}

interface ContestNotification {
  type: 'new_contest' | 'contest_ending' | 'contest_winner' | 'contest_reminder';
  contestId: string;
  title: string;
  message: string;
  scheduledFor?: string;
}

// Mock FCM service for contest notifications
export class NotificationService {
  private static instance: NotificationService;
  private fcmToken: string | null = null;
  private notificationPermission: boolean = false;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Initialize FCM and request permissions
  async initialize(): Promise<boolean> {
    try {
      // In a real app, this would initialize Firebase messaging
      // Example: 
      // import messaging from '@react-native-firebase/messaging';
      // const authStatus = await messaging().requestPermission();
      
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          this.notificationPermission = true;
          this.fcmToken = `mock_fcm_token_${Date.now()}`;
          console.log('FCM initialized with token:', this.fcmToken);
          resolve(true);
        }, 1000);
      });
    } catch (error) {
      console.error('Failed to initialize FCM:', error);
      return false;
    }
  }

  // Get FCM token for the device
  async getFCMToken(): Promise<string | null> {
    if (!this.fcmToken) {
      await this.initialize();
    }
    return this.fcmToken;
  }

  // Subscribe to contest notifications
  async subscribeToContestNotifications(userId: string): Promise<boolean> {
    try {
      const token = await this.getFCMToken();
      if (!token) {
        throw new Error('No FCM token available');
      }

      // In a real app, this would subscribe to FCM topics
      // Example: messaging().subscribeToTopic('contest_notifications');
      
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`User ${userId} subscribed to contest notifications`);
          resolve(true);
        }, 500);
      });
    } catch (error) {
      console.error('Failed to subscribe to notifications:', error);
      return false;
    }
  }

  // Unsubscribe from contest notifications
  async unsubscribeFromContestNotifications(userId: string): Promise<boolean> {
    try {
      // In a real app: messaging().unsubscribeFromTopic('contest_notifications');
      
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`User ${userId} unsubscribed from contest notifications`);
          resolve(true);
        }, 500);
      });
    } catch (error) {
      console.error('Failed to unsubscribe from notifications:', error);
      return false;
    }
  }

  // Send notification for new contest
  async sendNewContestNotification(contestTitle: string, contestId: string): Promise<boolean> {
    const notification: ContestNotification = {
      type: 'new_contest',
      contestId,
      title: '🏆 New Contest Alert!',
      message: `"${contestTitle}" is now live! Join now and showcase your talent.`,
    };

    return this.sendNotification(notification);
  }

  // Send notification for contest ending soon
  async sendContestEndingNotification(contestTitle: string, contestId: string, daysLeft: number): Promise<boolean> {
    const notification: ContestNotification = {
      type: 'contest_ending',
      contestId,
      title: '⏰ Contest Ending Soon!',
      message: `"${contestTitle}" ends in ${daysLeft} days. Submit your entry now!`,
    };

    return this.sendNotification(notification);
  }

  // Send notification for contest winner announcement
  async sendWinnerAnnouncementNotification(contestTitle: string, contestId: string): Promise<boolean> {
    const notification: ContestNotification = {
      type: 'contest_winner',
      contestId,
      title: '🎉 Winners Announced!',
      message: `The winners of "${contestTitle}" have been announced. Check if you won!`,
    };

    return this.sendNotification(notification);
  }

  // Send reminder notification for contest participation
  async sendContestReminderNotification(contestTitle: string, contestId: string): Promise<boolean> {
    const notification: ContestNotification = {
      type: 'contest_reminder',
      contestId,
      title: '📽️ Don\'t Miss Out!',
      message: `You haven't submitted your entry for "${contestTitle}" yet. Time is running out!`,
    };

    return this.sendNotification(notification);
  }

  // Generic method to send notifications
  private async sendNotification(notification: ContestNotification): Promise<boolean> {
    try {
      if (!this.notificationPermission) {
        console.warn('Notification permission not granted');
        return false;
      }

      // In a real app, this would send via FCM
      // Example:
      // const message = {
      //   notification: {
      //     title: notification.title,
      //     body: notification.message,
      //   },
      //   data: {
      //     type: notification.type,
      //     contestId: notification.contestId,
      //   },
      //   topic: 'contest_notifications'
      // };
      // await admin.messaging().send(message);

      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Notification sent:', notification);
          
          // Simulate showing local notification
          if (typeof window !== 'undefined' && 'Notification' in window) {
            new Notification(notification.title, {
              body: notification.message,
              icon: '/assets/images/icon.png',
              badge: '/assets/images/icon.png',
            });
          }
          
          resolve(true);
        }, 300);
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }

  // Schedule notification for later
  async scheduleNotification(notification: ContestNotification, scheduledTime: Date): Promise<boolean> {
    try {
      // In a real app, this would use FCM scheduled messages or local notifications
      
      const delay = scheduledTime.getTime() - Date.now();
      if (delay <= 0) {
        return this.sendNotification(notification);
      }

      // Mock scheduling
      setTimeout(() => {
        this.sendNotification(notification);
      }, Math.min(delay, 2147483647)); // Max setTimeout value

      console.log(`Notification scheduled for ${scheduledTime.toISOString()}`);
      return true;
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      return false;
    }
  }

  // Get notification history for user
  async getNotificationHistory(userId: string): Promise<ContestNotification[]> {
    // In a real app, this would fetch from Firestore
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            type: 'new_contest',
            contestId: 'contest_1',
            title: '🏆 New Contest Alert!',
            message: 'Monthly Short Film Contest is now live!',
          },
          {
            type: 'contest_ending',
            contestId: 'contest_2',
            title: '⏰ Contest Ending Soon!',
            message: 'Tamil Cinema Excellence ends in 3 days.',
          },
        ]);
      }, 500);
    });
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId: string, userId: string): Promise<boolean> {
    // In a real app, this would update Firestore
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Notification ${notificationId} marked as read for user ${userId}`);
        resolve(true);
      }, 200);
    });
  }

  // Get unread notification count
  async getUnreadNotificationCount(userId: string): Promise<number> {
    // In a real app, this would query Firestore for unread notifications
    return new Promise((resolve) => {
      setTimeout(() => {
        const count = Math.floor(Math.random() * 5) + 1; // Mock 1-5 unread notifications
        resolve(count);
      }, 300);
    });
  }

  // Handle notification tap/click
  handleNotificationTap(notification: ContestNotification): void {
    // In a real app, this would navigate to the appropriate screen
    console.log('Notification tapped:', notification);
    
    switch (notification.type) {
      case 'new_contest':
      case 'contest_ending':
      case 'contest_reminder':
        // Navigate to contest details
        console.log(`Navigate to contest: ${notification.contestId}`);
        break;
      case 'contest_winner':
        // Navigate to winners page
        console.log(`Navigate to winners for contest: ${notification.contestId}`);
        break;
      default:
        console.log('Unknown notification type');
    }
  }

  // Request notification permissions (for web/mobile)
  async requestPermissions(): Promise<boolean> {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        const permission = await Notification.requestPermission();
        this.notificationPermission = permission === 'granted';
        return this.notificationPermission;
      }
      
      // For React Native, this would use react-native-permissions
      // Example: request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
      
      return true; // Mock granted for demo
    } catch (error) {
      console.error('Failed to request notification permissions:', error);
      return false;
    }
  }
}

export default NotificationService.getInstance();