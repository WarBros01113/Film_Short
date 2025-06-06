// Contest Service for Firebase integration
// This service handles all contest-related operations

interface Contest {
  id: string;
  title: string;
  description: string;
  language: string;
  endDate: string;
  participants: number;
  prize: string;
  thumbnail: string;
  isActive: boolean;
  category: string;
  daysLeft: number;
  createdAt: string;
  updatedAt: string;
  rules: string[];
  eligibility: string[];
  submissionDeadline: string;
  judgingCriteria: string[];
  organizerId: string;
}

interface ContestParticipant {
  id: string;
  contestId: string;
  userId: string;
  submissionUrl?: string;
  submittedAt?: string;
  status: 'registered' | 'submitted' | 'disqualified';
}

interface ContestWinner {
  id: string;
  contestId: string;
  userId: string;
  position: number;
  prize: string;
  announcedAt: string;
}

// Mock Firebase service for contest management
export class ContestService {
  private static instance: ContestService;
  
  static getInstance(): ContestService {
    if (!ContestService.instance) {
      ContestService.instance = new ContestService();
    }
    return ContestService.instance;
  }

  // Get all active contests
  async getActiveContests(): Promise<Contest[]> {
    // In a real app, this would query Firestore
    // Example: collection('contests').where('isActive', '==', true).orderBy('endDate', 'asc')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Monthly Short Film Contest',
            description: 'Submit your best short film and win amazing prizes!',
            language: 'English',
            endDate: '2024-02-15',
            participants: 234,
            prize: '$5000',
            thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
            isActive: true,
            category: 'General',
            daysLeft: 15,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-31',
            rules: ['Maximum duration: 15 minutes', 'Original content only', 'HD quality required'],
            eligibility: ['18+ years', 'Any nationality', 'Amateur or professional'],
            submissionDeadline: '2024-02-15T23:59:59Z',
            judgingCriteria: ['Storytelling', 'Technical quality', 'Originality', 'Impact'],
            organizerId: 'reelflix_official',
          },
          {
            id: '2',
            title: 'Tamil Cinema Excellence',
            description: 'Showcase Tamil storytelling at its finest',
            language: 'Tamil',
            endDate: '2024-02-20',
            participants: 156,
            prize: '₹2,00,000',
            thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
            isActive: true,
            category: 'Regional',
            daysLeft: 20,
            createdAt: '2024-01-05',
            updatedAt: '2024-01-30',
            rules: ['Tamil language mandatory', 'Cultural themes preferred', 'Maximum 20 minutes'],
            eligibility: ['Tamil speakers', '16+ years', 'Residents of Tamil Nadu or Tamil diaspora'],
            submissionDeadline: '2024-02-20T23:59:59Z',
            judgingCriteria: ['Cultural authenticity', 'Language usage', 'Storytelling', 'Production value'],
            organizerId: 'tamil_cinema_board',
          },
        ]);
      }, 1000);
    });
  }

  // Get contests by language
  async getContestsByLanguage(language: string): Promise<Contest[]> {
    // Example: collection('contests').where('language', '==', language).where('isActive', '==', true)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: `${language}_1`,
            title: `${language} Short Film Challenge`,
            description: `Create amazing content in ${language}`,
            language: language,
            endDate: '2024-03-01',
            participants: Math.floor(Math.random() * 300) + 50,
            prize: language === 'English' ? '$3000' : '₹1,50,000',
            thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
            isActive: true,
            category: 'Language',
            daysLeft: Math.floor(Math.random() * 30) + 10,
            createdAt: '2024-01-10',
            updatedAt: '2024-01-30',
            rules: [`${language} language required`, 'Original content only', 'Maximum 15 minutes'],
            eligibility: [`${language} speakers`, '18+ years', 'Any nationality'],
            submissionDeadline: '2024-03-01T23:59:59Z',
            judgingCriteria: ['Language proficiency', 'Storytelling', 'Technical quality', 'Creativity'],
            organizerId: `${language.toLowerCase()}_film_society`,
          },
        ]);
      }, 800);
    });
  }

  // Get contest details by ID
  async getContestById(contestId: string): Promise<Contest | null> {
    // Example: doc('contests', contestId).get()
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: contestId,
          title: 'Sample Contest',
          description: 'This is a sample contest description',
          language: 'English',
          endDate: '2024-02-15',
          participants: 234,
          prize: '$5000',
          thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
          isActive: true,
          category: 'General',
          daysLeft: 15,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-31',
          rules: ['Maximum duration: 15 minutes', 'Original content only', 'HD quality required'],
          eligibility: ['18+ years', 'Any nationality', 'Amateur or professional'],
          submissionDeadline: '2024-02-15T23:59:59Z',
          judgingCriteria: ['Storytelling', 'Technical quality', 'Originality', 'Impact'],
          organizerId: 'reelflix_official',
        });
      }, 500);
    });
  }

  // Register user for a contest
  async registerForContest(contestId: string, userId: string): Promise<boolean> {
    // Example: collection('contestParticipants').add({ contestId, userId, status: 'registered' })
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful registration
        resolve(true);
      }, 1000);
    });
  }

  // Submit entry for a contest
  async submitContestEntry(contestId: string, userId: string, submissionUrl: string): Promise<boolean> {
    // Example: Update participant document with submission details
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  }

  // Get user's contest participations
  async getUserContestParticipations(userId: string): Promise<ContestParticipant[]> {
    // Example: collection('contestParticipants').where('userId', '==', userId)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            contestId: 'contest_1',
            userId: userId,
            status: 'registered',
          },
          {
            id: '2',
            contestId: 'contest_2',
            userId: userId,
            submissionUrl: 'https://example.com/submission.mp4',
            submittedAt: '2024-01-30T10:00:00Z',
            status: 'submitted',
          },
        ]);
      }, 800);
    });
  }

  // Get contest winners
  async getContestWinners(contestId?: string): Promise<ContestWinner[]> {
    // Example: collection('contestWinners').where('contestId', '==', contestId) or get all winners
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            contestId: 'contest_past_1',
            userId: 'user_john',
            position: 1,
            prize: 'Gold Medal + $5000',
            announcedAt: '2024-01-15T12:00:00Z',
          },
          {
            id: '2',
            contestId: 'contest_past_1',
            userId: 'user_jane',
            position: 2,
            prize: 'Silver Medal + $3000',
            announcedAt: '2024-01-15T12:00:00Z',
          },
        ]);
      }, 600);
    });
  }

  // Search contests
  async searchContests(query: string, filters?: { language?: string; category?: string }): Promise<Contest[]> {
    // Example: Complex Firestore query with text search and filters
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'search_1',
            title: `Contest matching "${query}"`,
            description: 'This contest matches your search criteria',
            language: filters?.language || 'English',
            endDate: '2024-03-01',
            participants: 89,
            prize: '$2000',
            thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
            isActive: true,
            category: filters?.category || 'General',
            daysLeft: 25,
            createdAt: '2024-01-20',
            updatedAt: '2024-01-30',
            rules: ['Search result contest rules'],
            eligibility: ['Search result eligibility'],
            submissionDeadline: '2024-03-01T23:59:59Z',
            judgingCriteria: ['Search result criteria'],
            organizerId: 'search_organizer',
          },
        ]);
      }, 1200);
    });
  }

  // Get trending contests (most participants)
  async getTrendingContests(): Promise<Contest[]> {
    // Example: collection('contests').orderBy('participants', 'desc').limit(10)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'trending_1',
            title: 'Viral Video Challenge',
            description: 'Create the next viral short film',
            language: 'English',
            endDate: '2024-02-28',
            participants: 1250,
            prize: '$10,000',
            thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
            isActive: true,
            category: 'Trending',
            daysLeft: 28,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-31',
            rules: ['Viral potential required', 'Social media friendly', 'Maximum 10 minutes'],
            eligibility: ['All ages', 'Global participation', 'Any skill level'],
            submissionDeadline: '2024-02-28T23:59:59Z',
            judgingCriteria: ['Viral potential', 'Engagement', 'Creativity', 'Technical quality'],
            organizerId: 'viral_content_creators',
          },
        ]);
      }, 900);
    });
  }

  // Create new contest (admin function)
  async createContest(contestData: Omit<Contest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // Example: collection('contests').add(contestData)
    return new Promise((resolve) => {
      setTimeout(() => {
        const newContestId = `contest_${Date.now()}`;
        resolve(newContestId);
      }, 1500);
    });
  }

  // Update contest (admin function)
  async updateContest(contestId: string, updates: Partial<Contest>): Promise<boolean> {
    // Example: doc('contests', contestId).update(updates)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  // Delete contest (admin function)
  async deleteContest(contestId: string): Promise<boolean> {
    // Example: doc('contests', contestId).delete()
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 800);
    });
  }
}

export default ContestService.getInstance();