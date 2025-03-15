
import { formatDistanceToNow } from "date-fns";

// Types for our recommendation system
export interface Video {
  id: string;
  title: string;
  channelName: string;
  channelAvatar?: string;
  thumbnail: string;
  views: number;
  publishedAt: Date;
  duration: string;
  category: string;
  tags: string[];
  engagement: {
    likes: number;
    comments: number;
    watchPercentage: number;
  };
  isShort: boolean;
}

export interface UserBehavior {
  watchHistory: string[]; // Array of video IDs
  searchHistory: string[]; // Array of search terms
  topicRequests: string[]; // Array of requested topics
  likedVideos: string[]; // Array of liked video IDs
  followedTeachers: string[]; // Array of teacher IDs
  completedTopics: string[]; // Array of completed topic IDs
}

// Mock user behavior - in a real app, this would come from a database
const mockUserBehavior: UserBehavior = {
  watchHistory: ["video-1", "video-2", "video-5", "video-7"],
  searchHistory: ["calculus", "derivatives", "javascript async"],
  topicRequests: ["machine learning", "differential equations"],
  likedVideos: ["video-2", "video-5"],
  followedTeachers: ["Math Masters", "Code Mastery"],
  completedTopics: ["basic algebra", "javascript basics"],
};

// Demo videos (would be fetched from a database in a real app)
// Using the mockVideos from RecommendedVideos.tsx but with additional properties
export const allVideos: Video[] = [
  {
    id: "video-1",
    title: "Introduction to Calculus: Limits and Derivatives",
    channelName: "Math Masters",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=1000",
    views: 245000,
    publishedAt: new Date(2023, 8, 15),
    duration: "18:42",
    category: "math",
    tags: ["calculus", "mathematics", "derivatives", "limits"],
    engagement: {
      likes: 15000,
      comments: 800,
      watchPercentage: 78,
    },
    isShort: false,
  },
  {
    id: "video-2",
    title: "Learn Python Programming: Complete Course for Beginners",
    channelName: "Code Mastery",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
    views: 578000,
    publishedAt: new Date(2023, 9, 3),
    duration: "1:24:36",
    category: "programming",
    tags: ["python", "programming", "coding", "computer science"],
    engagement: {
      likes: 35000,
      comments: 2200,
      watchPercentage: 65,
    },
    isShort: false,
  },
  {
    id: "video-3",
    title: "Chemistry Basics: Atomic Structure and Periodic Table",
    channelName: "Science Simplified",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=1000",
    views: 189000,
    publishedAt: new Date(2023, 7, 22),
    duration: "15:18",
    category: "science",
    tags: ["chemistry", "atomic structure", "periodic table", "science"],
    engagement: {
      likes: 12000,
      comments: 650,
      watchPercentage: 85,
    },
    isShort: false,
  },
  {
    id: "video-4",
    title: "World War II: Major Events and Timeline",
    channelName: "History Horizon",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&q=80&w=1000",
    views: 392000,
    publishedAt: new Date(2023, 6, 12),
    duration: "22:45",
    category: "history",
    tags: ["history", "world war 2", "WWII", "20th century"],
    engagement: {
      likes: 22000,
      comments: 1800,
      watchPercentage: 72,
    },
    isShort: false,
  },
  {
    id: "video-5",
    title: "Advanced JavaScript: Promises and Async/Await",
    channelName: "Web Dev Warriors",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    views: 215000,
    publishedAt: new Date(2023, 8, 28),
    duration: "27:14",
    category: "programming",
    tags: ["javascript", "async", "promises", "web development"],
    engagement: {
      likes: 18000,
      comments: 920,
      watchPercentage: 81,
    },
    isShort: false,
  },
  {
    id: "video-6",
    title: "Digital Art Fundamentals: From Sketch to Final Piece",
    channelName: "Creative Canvas",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=1000",
    views: 167000,
    publishedAt: new Date(2023, 9, 10),
    duration: "41:09",
    category: "art",
    tags: ["digital art", "painting", "creative", "design"],
    engagement: {
      likes: 14500,
      comments: 780,
      watchPercentage: 68,
    },
    isShort: false,
  },
  {
    id: "video-7",
    title: "Biology: The Cell Structure and Functions",
    channelName: "Science Simplified",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000",
    views: 231000,
    publishedAt: new Date(2023, 8, 5),
    duration: "19:52",
    category: "science",
    tags: ["biology", "cell structure", "science", "microbiology"],
    engagement: {
      likes: 16800,
      comments: 720,
      watchPercentage: 79,
    },
    isShort: false,
  },
  {
    id: "video-8",
    title: "Marketing Strategies for Small Businesses",
    channelName: "Business Boost",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
    views: 128000,
    publishedAt: new Date(2023, 9, 1),
    duration: "32:18",
    category: "business",
    tags: ["marketing", "business", "entrepreneurship", "strategy"],
    engagement: {
      likes: 9500,
      comments: 620,
      watchPercentage: 62,
    },
    isShort: false,
  },
  // Short videos
  {
    id: "short-1",
    title: "Quick Calculus Tip: Power Rule",
    channelName: "Math Masters",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    views: 125000,
    publishedAt: new Date(2023, 8, 20),
    duration: "0:59",
    category: "math",
    tags: ["calculus", "quick tip", "derivatives"],
    engagement: {
      likes: 18000,
      comments: 320,
      watchPercentage: 94,
    },
    isShort: true,
  },
  {
    id: "short-2",
    title: "JavaScript Array Methods in 60 Seconds",
    channelName: "Code Mastery",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
    views: 182000,
    publishedAt: new Date(2023, 9, 5),
    duration: "1:00",
    category: "programming",
    tags: ["javascript", "arrays", "coding", "quick tip"],
    engagement: {
      likes: 22000,
      comments: 450,
      watchPercentage: 91,
    },
    isShort: true,
  },
];

// AI recommendation algorithm (simplified for demo)
export const getRecommendedVideos = (
  userBehavior: UserBehavior = mockUserBehavior,
  limit: number = 10,
  isShorts: boolean = false
): Video[] => {
  // Clone the videos to avoid modifying the original data
  const videosToScore = allVideos.filter(video => video.isShort === isShorts);
  
  // Score each video based on user behavior
  const scoredVideos = videosToScore.map(video => {
    let score = 0;
    
    // Boost score for videos from followed teachers
    if (userBehavior.followedTeachers.includes(video.channelName)) {
      score += 30;
    }
    
    // Boost score for videos in categories the user has watched
    const watchedVideos = userBehavior.watchHistory
      .map(id => allVideos.find(v => v.id === id))
      .filter(Boolean) as Video[];
    
    const watchedCategories = new Set(watchedVideos.map(v => v.category));
    if (watchedCategories.has(video.category)) {
      score += 20;
    }
    
    // Boost score for videos with tags matching user's search history
    userBehavior.searchHistory.forEach(searchTerm => {
      if (video.tags.some(tag => tag.includes(searchTerm) || searchTerm.includes(tag))) {
        score += 15;
      }
    });
    
    // Boost score for requested topics
    userBehavior.topicRequests.forEach(topic => {
      if (video.tags.some(tag => tag.includes(topic) || topic.includes(tag))) {
        score += 25;
      }
    });
    
    // Boost score for engaging videos
    score += (video.engagement.likes / 1000) * 2;
    score += (video.engagement.comments / 100) * 3;
    score += video.engagement.watchPercentage / 2;
    
    // Recency boost (newer videos get higher scores)
    const daysAgo = Math.floor((Date.now() - video.publishedAt.getTime()) / (1000 * 60 * 60 * 24));
    score += Math.max(0, 100 - daysAgo) / 5;
    
    return { ...video, score };
  });
  
  // Sort videos by score (descending)
  scoredVideos.sort((a, b) => (b.score as number) - (a.score as number));
  
  // Return top N videos
  return scoredVideos.slice(0, limit);
};

// What's Next feature - recommend a video based on what the user just watched
export const getNextVideo = (currentVideoId: string): Video | null => {
  const currentVideo = allVideos.find(video => video.id === currentVideoId);
  if (!currentVideo) return null;
  
  // Find videos in the same category or with similar tags
  const relatedVideos = allVideos
    .filter(video => 
      video.id !== currentVideoId && 
      (video.category === currentVideo.category || 
       video.tags.some(tag => currentVideo.tags.includes(tag)))
    )
    .map(video => {
      // Calculate a similarity score
      let similarityScore = 0;
      
      // Same category
      if (video.category === currentVideo.category) {
        similarityScore += 20;
      }
      
      // Count matching tags
      const matchingTags = video.tags.filter(tag => currentVideo.tags.includes(tag));
      similarityScore += matchingTags.length * 10;
      
      // Engagement metrics impact
      similarityScore += (video.engagement.watchPercentage / 10);
      
      return { ...video, similarityScore };
    });
    
  // Sort by similarity score
  relatedVideos.sort((a, b) => (b.similarityScore as number) - (a.similarityScore as number));
  
  // Return the most similar video
  return relatedVideos.length ? relatedVideos[0] : null;
};

// Generate trending videos for exam preparation
export const getTrendingExamContent = (examType: string, limit: number = 5): Video[] => {
  // In a real app, you would fetch this data from a database
  // For the demo, we'll filter existing videos and pretend they're trending for exams
  const examVideos = allVideos
    .filter(video => !video.isShort) // Only full-length videos for exam prep
    .map(video => {
      // Generate a "trending" score (this would be calculated from real metrics in production)
      const trendingScore = 
        (video.engagement.likes / 1000) * 3 + 
        (video.engagement.comments / 100) * 2 + 
        (video.views / 10000);
      
      return { ...video, trendingScore };
    });
  
  // Sort by trending score
  examVideos.sort((a, b) => (b.trendingScore as number) - (a.trendingScore as number));
  
  return examVideos.slice(0, limit);
};
