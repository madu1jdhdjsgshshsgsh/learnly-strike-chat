
import { useState, useEffect } from 'react';

// Types
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  teacher: {
    id: string;
    name: string;
    avatar: string;
  };
  duration: number;
  views: number;
  uploadDate: Date;
  topics: string[];
  isShort?: boolean;
  examRelated?: boolean;
}

export interface UserBehavior {
  watchHistory: {
    videoId: string;
    watchedDuration: number;
    timestamp: Date;
    topics: string[];
  }[];
  searchHistory: {
    query: string;
    timestamp: Date;
  }[];
  topicRequests: string[];
  likedVideos: string[];
  followedTeachers: string[];
  syllabusPDFs?: {
    id: string;
    topics: string[];
  }[];
  examDate?: Date;
}

// Mock data - in a real app this would come from API/database
const MOCK_USER_BEHAVIOR: UserBehavior = {
  watchHistory: [
    { videoId: '1', watchedDuration: 240, timestamp: new Date('2023-06-15'), topics: ['algebra', 'equations'] },
    { videoId: '3', watchedDuration: 180, timestamp: new Date('2023-06-16'), topics: ['python', 'loops'] },
    { videoId: '5', watchedDuration: 300, timestamp: new Date('2023-06-17'), topics: ['chemistry', 'atoms'] }
  ],
  searchHistory: [
    { query: 'algebra equations', timestamp: new Date('2023-06-14') },
    { query: 'python for beginners', timestamp: new Date('2023-06-15') }
  ],
  topicRequests: ['quantum physics', 'machine learning'],
  likedVideos: ['2', '4', '6'],
  followedTeachers: ['teacher1', 'teacher3'],
  syllabusPDFs: [
    { id: 'syllabus1', topics: ['calculus', 'statistics', 'algebra'] }
  ],
  examDate: new Date('2023-08-15')
};

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Algebra Fundamentals',
    thumbnail: '/placeholder.svg',
    teacher: { id: 'teacher1', name: 'Dr. Smith', avatar: '/placeholder.svg' },
    duration: 1800,
    views: 15000,
    uploadDate: new Date('2023-05-10'),
    topics: ['algebra', 'equations'],
    examRelated: true
  },
  {
    id: '2',
    title: 'Introduction to Python',
    thumbnail: '/placeholder.svg',
    teacher: { id: 'teacher2', name: 'Prof. Johnson', avatar: '/placeholder.svg' },
    duration: 2400,
    views: 25000,
    uploadDate: new Date('2023-05-15'),
    topics: ['programming', 'python']
  },
  {
    id: '3',
    title: 'Chemistry Basics',
    thumbnail: '/placeholder.svg',
    teacher: { id: 'teacher3', name: 'Ms. Williams', avatar: '/placeholder.svg' },
    duration: 1500,
    views: 10000,
    uploadDate: new Date('2023-05-20'),
    topics: ['chemistry', 'atoms'],
    examRelated: true
  },
  {
    id: '4',
    title: 'Quick Python Loops',
    thumbnail: '/placeholder.svg',
    teacher: { id: 'teacher2', name: 'Prof. Johnson', avatar: '/placeholder.svg' },
    duration: 180,
    views: 35000,
    uploadDate: new Date('2023-06-01'),
    topics: ['programming', 'python', 'loops'],
    isShort: true
  },
  {
    id: '5',
    title: 'Algebra Quick Tips',
    thumbnail: '/placeholder.svg',
    teacher: { id: 'teacher1', name: 'Dr. Smith', avatar: '/placeholder.svg' },
    duration: 210,
    views: 40000,
    uploadDate: new Date('2023-06-05'),
    topics: ['algebra', 'study tips'],
    isShort: true,
    examRelated: true
  },
  {
    id: '6',
    title: 'Understanding DNA',
    thumbnail: '/placeholder.svg',
    teacher: { id: 'teacher3', name: 'Ms. Williams', avatar: '/placeholder.svg' },
    duration: 1200,
    views: 18000,
    uploadDate: new Date('2023-06-10'),
    topics: ['biology', 'dna'],
    examRelated: false
  }
];

// Helper function to extract topics from user behavior
const extractTopicsFromBehavior = (behavior: UserBehavior): Record<string, number> => {
  const topicScores: Record<string, number> = {};
  
  // Add from watch history (weighted higher)
  behavior.watchHistory.forEach(watched => {
    watched.topics.forEach(topic => {
      topicScores[topic] = (topicScores[topic] || 0) + 2;
    });
  });
  
  // Add from search history
  behavior.searchHistory.forEach(search => {
    const words = search.query.toLowerCase().split(' ');
    words.forEach(word => {
      if (word.length > 3) { // Skip short words
        topicScores[word] = (topicScores[word] || 0) + 1;
      }
    });
  });
  
  // Add from topic requests (weighted higher)
  behavior.topicRequests.forEach(topic => {
    topicScores[topic] = (topicScores[topic] || 0) + 3;
  });
  
  // Add from syllabus (if available)
  behavior.syllabusPDFs?.forEach(syllabus => {
    syllabus.topics.forEach(topic => {
      topicScores[topic] = (topicScores[topic] || 0) + 1.5;
    });
  });
  
  return topicScores;
};

// Get recommended videos
export const getRecommendedVideos = async (isShort: boolean = false): Promise<Video[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const userBehavior = MOCK_USER_BEHAVIOR;
      const allVideos = MOCK_VIDEOS;
      
      // Filter by video type (short or regular)
      const typeFilteredVideos = allVideos.filter(v => !!v.isShort === isShort);
      
      // Extract topic preferences
      const topicScores = extractTopicsFromBehavior(userBehavior);
      
      // Score each video
      const scoredVideos = typeFilteredVideos.map(video => {
        let score = 0;
        
        // Topic match score
        video.topics.forEach(topic => {
          if (topicScores[topic]) {
            score += topicScores[topic];
          }
        });
        
        // Followed teacher bonus
        if (userBehavior.followedTeachers.includes(video.teacher.id)) {
          score += 5;
        }
        
        // Exam related bonus (if user has upcoming exam)
        if (video.examRelated && userBehavior.examDate) {
          const now = new Date();
          const examDate = new Date(userBehavior.examDate);
          const daysToExam = Math.floor((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysToExam < 30) {
            score += 10 - (daysToExam / 3); // Higher score as exam approaches
          }
        }
        
        // Recency bonus
        const daysSinceUpload = Math.floor((new Date().getTime() - video.uploadDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceUpload < 14) {
          score += (14 - daysSinceUpload) / 2; // Newer videos get boost
        }
        
        // Views popularity bonus (logarithmic to prevent domination)
        score += Math.log10(video.views) / 2;
        
        return { video, score };
      });
      
      // Sort by score and return videos
      const recommendedVideos = scoredVideos
        .sort((a, b) => b.score - a.score)
        .map(item => item.video);
        
      resolve(recommendedVideos);
    }, 500); // Simulate API delay
  });
};

// Get "What's Next" recommendation based on most recent watch
export const getWhatsNextRecommendation = async (): Promise<Video | null> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const userBehavior = MOCK_USER_BEHAVIOR;
      const allVideos = MOCK_VIDEOS;
      
      // If no watch history, return null
      if (!userBehavior.watchHistory.length) {
        resolve(null);
        return;
      }
      
      // Get most recent watched video
      const sortedWatchHistory = [...userBehavior.watchHistory]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      const mostRecentWatch = sortedWatchHistory[0];
      
      // Find videos with similar topics
      const relatedVideos = allVideos.filter(video => {
        // Exclude already watched videos
        if (userBehavior.watchHistory.some(w => w.videoId === video.id)) {
          return false;
        }
        
        // Find topic overlap
        return video.topics.some(topic => 
          mostRecentWatch.topics.includes(topic)
        );
      });
      
      if (relatedVideos.length === 0) {
        resolve(null);
        return;
      }
      
      // Pick the most relevant video
      const mostRelevantVideo = relatedVideos.reduce((best, current) => {
        const bestTopicOverlap = best.topics.filter(t => mostRecentWatch.topics.includes(t)).length;
        const currentTopicOverlap = current.topics.filter(t => mostRecentWatch.topics.includes(t)).length;
        
        if (currentTopicOverlap > bestTopicOverlap) {
          return current;
        }
        
        // If same topic overlap, prefer followed teachers
        if (currentTopicOverlap === bestTopicOverlap) {
          const bestIsFollowed = userBehavior.followedTeachers.includes(best.teacher.id);
          const currentIsFollowed = userBehavior.followedTeachers.includes(current.teacher.id);
          
          if (currentIsFollowed && !bestIsFollowed) {
            return current;
          }
        }
        
        return best;
      }, relatedVideos[0]);
      
      resolve(mostRelevantVideo);
    }, 500);
  });
};

// Custom hook to get recommended videos
export const useRecommendedVideos = (isShort: boolean = false) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const recommended = await getRecommendedVideos(isShort);
        setVideos(recommended);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [isShort]);

  return { videos, loading };
};

// Custom hook to get "What's Next" recommendation
export const useWhatsNextRecommendation = () => {
  const [nextVideo, setNextVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextRecommendation = async () => {
      setLoading(true);
      try {
        const recommendation = await getWhatsNextRecommendation();
        setNextVideo(recommendation);
      } catch (error) {
        console.error('Error fetching next recommendation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextRecommendation();
  }, []);

  return { nextVideo, loading };
};
