import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Play, Clock, Eye, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ShortFilm {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  uploadTime: string;
  channelName: string;
  channelAvatar: string;
}

// Mock data for different categories
const mockCategoryData: { [key: string]: ShortFilm[] } = {
  trending: [
    { id: '1', title: 'The Last Frame', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '8:45', views: 2500000, likes: 125000, uploadTime: '2 hours ago', channelName: 'FilmMaker Pro', channelAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '2', title: 'Silent Echo', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '12:30', views: 1800000, likes: 89000, uploadTime: '4 hours ago', channelName: 'Indie Stories', channelAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '3', title: 'Urban Dreams', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '9:15', views: 3200000, likes: 156000, uploadTime: '6 hours ago', channelName: 'City Films', channelAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '4', title: 'Midnight Coffee', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '7:22', views: 1500000, likes: 78000, uploadTime: '8 hours ago', channelName: 'Night Stories', channelAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '5', title: 'Digital Revolution', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '11:30', views: 2100000, likes: 98000, uploadTime: '12 hours ago', channelName: 'Tech Tales', channelAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '6', title: 'Ocean Waves', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '6:45', views: 1750000, likes: 87000, uploadTime: '1 day ago', channelName: 'Nature Films', channelAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ],
  newUploads: [
    { id: '7', title: 'Fresh Start', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '10:45', views: 45000, likes: 2300, uploadTime: '1 hour ago', channelName: 'New Creators', channelAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '8', title: 'Digital Love', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '6:30', views: 32000, likes: 1800, uploadTime: '3 hours ago', channelName: 'Romance Films', channelAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '9', title: 'The Algorithm', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '11:15', views: 67000, likes: 3400, uploadTime: '5 hours ago', channelName: 'Sci-Fi Central', channelAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '10', title: 'Lost Signal', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '8:55', views: 28000, likes: 1500, uploadTime: '7 hours ago', channelName: 'Mystery Box', channelAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '11', title: 'Morning Light', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '9:20', views: 41000, likes: 2100, uploadTime: '10 hours ago', channelName: 'Dawn Productions', channelAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '12', title: 'City Lights', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '7:30', views: 35000, likes: 1900, uploadTime: '14 hours ago', channelName: 'Urban Stories', channelAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ],
  mostViewed: [
    { id: '13', title: 'Viral Moment', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '5:30', views: 5000000, likes: 250000, uploadTime: '1 week ago', channelName: 'Viral Content', channelAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '14', title: 'Breaking Point', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '13:45', views: 4500000, likes: 220000, uploadTime: '2 weeks ago', channelName: 'Drama Kings', channelAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '15', title: 'Time Loop', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '9:20', views: 4000000, likes: 195000, uploadTime: '3 weeks ago', channelName: 'Time Stories', channelAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '16', title: 'Parallel Lives', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '11:10', views: 3800000, likes: 185000, uploadTime: '1 month ago', channelName: 'Parallel Films', channelAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '17', title: 'Epic Journey', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '14:25', views: 3600000, likes: 175000, uploadTime: '1 month ago', channelName: 'Adventure Co', channelAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '18', title: 'Mind Games', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '10:50', views: 3400000, likes: 165000, uploadTime: '6 weeks ago', channelName: 'Psychological', channelAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ],
  mostLiked: [
    { id: '19', title: 'Heart Strings', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '7:45', views: 1200000, likes: 150000, uploadTime: '2 days ago', channelName: 'Emotional Films', channelAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '20', title: 'Smile Factory', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '6:15', views: 980000, likes: 140000, uploadTime: '3 days ago', channelName: 'Happy Films', channelAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '21', title: 'Pure Joy', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '8:30', views: 1100000, likes: 135000, uploadTime: '4 days ago', channelName: 'Joy Productions', channelAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '22', title: 'Golden Hour', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '10:25', views: 1050000, likes: 130000, uploadTime: '5 days ago', channelName: 'Golden Films', channelAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '23', title: 'Love Letters', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '9:40', views: 890000, likes: 125000, uploadTime: '1 week ago', channelName: 'Romance Central', channelAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '24', title: 'Friendship Goals', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '11:15', views: 950000, likes: 120000, uploadTime: '1 week ago', channelName: 'Friend Zone', channelAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ],
  withSubtitles: [
    { id: '25', title: 'Global Story', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '12:45', views: 850000, likes: 42000, uploadTime: '2 days ago', channelName: 'World Cinema', channelAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '26', title: 'Universal Language', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '9:30', views: 720000, likes: 38000, uploadTime: '3 days ago', channelName: 'Universal Films', channelAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '27', title: 'Cross Borders', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '11:20', views: 680000, likes: 35000, uploadTime: '4 days ago', channelName: 'Border Films', channelAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '28', title: 'Cultural Bridge', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '8:40', views: 590000, likes: 31000, uploadTime: '5 days ago', channelName: 'Culture Co', channelAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '29', title: 'International Tales', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '13:15', views: 760000, likes: 40000, uploadTime: '1 week ago', channelName: 'International', channelAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: '30', title: 'World Stories', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '10:30', views: 640000, likes: 33000, uploadTime: '1 week ago', channelName: 'World Tales', channelAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ],
};

const categoryTitles: { [key: string]: string } = {
  trending: 'Trending Now',
  newUploads: 'New Uploads',
  mostViewed: 'Most Viewed Short Films',
  mostLiked: 'Most Liked Short Films',
  withSubtitles: 'Movies with English Subtitles',
};

export default function CategoryScreen() {
  const { type } = useLocalSearchParams();
  const [films, setFilms] = useState<ShortFilm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch films based on category type
    const categoryType = type as string;
    const categoryFilms = mockCategoryData[categoryType] || [];
    setFilms(categoryFilms);
    setLoading(false);
  }, [type]);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K views`;
    }
    return `${views} views`;
  };

  const formatLikes = (likes: number) => {
    if (likes >= 1000000) {
      return `${(likes / 1000000).toFixed(1)}M`;
    } else if (likes >= 1000) {
      return `${(likes / 1000).toFixed(0)}K`;
    }
    return likes.toString();
  };

  const handleFilmPress = (filmId: string) => {
    router.push(`/(tabs)/movie/${filmId}`);
  };

  const renderFilmCard = ({ item }: { item: ShortFilm }) => (
    <TouchableOpacity 
      style={styles.filmCard}
      onPress={() => handleFilmPress(item.id)}
    >
      <View style={styles.filmThumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.filmThumbnail} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.filmGradient}
        />
        <View style={styles.filmDuration}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Play size={16} color="#fff" fill="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filmInfo}>
        <View style={styles.filmHeader}>
          <Image source={{ uri: item.channelAvatar }} style={styles.channelAvatar} />
          <View style={styles.filmDetails}>
            <Text style={styles.filmTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.channelName}>{item.channelName}</Text>
          </View>
        </View>
        
        <View style={styles.filmMeta}>
          <View style={styles.metaItem}>
            <Eye size={12} color="#999" />
            <Text style={styles.metaText}>{formatViews(item.views)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Heart size={12} color="#E50914" />
            <Text style={styles.likeText}>{formatLikes(item.likes)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={12} color="#999" />
            <Text style={styles.metaText}>{item.uploadTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const categoryTitle = categoryTitles[type as string] || 'Short Films';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryTitle}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={films}
          renderItem={renderFilmCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.filmsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#000000',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 34,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  filmsList: {
    padding: 20,
  },
  filmCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  filmThumbnailContainer: {
    position: 'relative',
    height: 200,
  },
  filmThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  filmGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  filmDuration: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filmInfo: {
    padding: 15,
  },
  filmHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  filmDetails: {
    flex: 1,
  },
  filmTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 4,
    lineHeight: 22,
  },
  channelName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E50914',
  },
  filmMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginLeft: 4,
  },
  likeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E50914',
    marginLeft: 4,
  },
});