import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Play, Heart, Share, Clock, Eye, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface MovieDetails {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  rating: number;
  releaseDate: string;
  language: string;
  genre: string[];
  cast: { name: string; role: string; avatar: string }[];
  crew: { name: string; role: string; avatar: string }[];
}

interface SimilarMovie {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
}

// Mock movie details data
const mockMovieDetails: MovieDetails = {
  id: '1',
  title: 'The Last Frame',
  description: 'A touching story about memories and letting go. This film explores the delicate nature of human relationships and the importance of cherishing every moment. When a photographer discovers an old camera with undeveloped film, he embarks on a journey to find the stories behind each photograph, ultimately discovering the power of human connection and the beauty in life\'s fleeting moments.',
  thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
  duration: '8:45',
  views: 2500000,
  likes: 125000,
  rating: 4.8,
  releaseDate: '2024-01-15',
  language: 'English',
  genre: ['Drama', 'Romance', 'Indie'],
  cast: [
    { name: 'Emma Johnson', role: 'Lead Actress', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Michael Chen', role: 'Lead Actor', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Sarah Williams', role: 'Supporting Actress', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ],
  crew: [
    { name: 'David Rodriguez', role: 'Director', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Lisa Thompson', role: 'Producer', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'James Park', role: 'Cinematographer', avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ],
};

// Mock similar movies data
const mockSimilarMovies: SimilarMovie[] = [
  { id: '2', title: 'Silent Echo', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '12:30', views: 1800000 },
  { id: '3', title: 'Urban Dreams', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '9:15', views: 3200000 },
  { id: '4', title: 'Midnight Coffee', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '7:22', views: 1500000 },
  { id: '5', title: 'Fresh Start', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '10:45', views: 2100000 },
  { id: '6', title: 'Digital Love', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '6:30', views: 890000 },
  { id: '7', title: 'The Algorithm', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '11:15', views: 1650000 },
  { id: '8', title: 'Lost Signal', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '8:55', views: 1200000 },
  { id: '9', title: 'Time Loop', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '9:20', views: 4000000 },
  { id: '10', title: 'Golden Hour', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800', duration: '10:25', views: 2800000 },
];

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // In a real app, fetch movie details based on ID
    setMovie(mockMovieDetails);
    setSimilarMovies(mockSimilarMovies);
  }, [id]);

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

  const handlePlayMovie = () => {
    // Navigate to video player
    console.log('Play movie:', id);
  };

  const handleLikeMovie = () => {
    setIsLiked(!isLiked);
  };

  const handleShareMovie = () => {
    console.log('Share movie:', id);
  };

  const handleSimilarMoviePress = (movieId: string) => {
    router.push(`/(tabs)/movie/${movieId}`);
  };

  const renderCastMember = ({ item }: { item: { name: string; role: string; avatar: string } }) => (
    <View style={styles.castMember}>
      <Image source={{ uri: item.avatar }} style={styles.castAvatar} />
      <Text style={styles.castName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.castRole} numberOfLines={1}>{item.role}</Text>
    </View>
  );

  const renderSimilarMovie = ({ item, index }: { item: SimilarMovie; index: number }) => {
    const isThirdColumn = (index + 1) % 3 === 0;
    return (
      <TouchableOpacity 
        style={[styles.similarMovieCard, isThirdColumn && styles.lastColumnCard]}
        onPress={() => handleSimilarMoviePress(item.id)}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.similarMovieImage} />
        <View style={styles.similarMovieOverlay}>
          <Text style={styles.similarMovieDuration}>{item.duration}</Text>
        </View>
        <Text style={styles.similarMovieTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.similarMovieViews}>{formatViews(item.views)}</Text>
      </TouchableOpacity>
    );
  };

  if (!movie) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header with Thumbnail */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: movie.thumbnail }} style={styles.headerImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.headerGradient}
          />
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>

          {/* Play Button */}
          <TouchableOpacity style={styles.playButton} onPress={handlePlayMovie}>
            <Play size={32} color="#fff" fill="#fff" />
          </TouchableOpacity>
        </View>

        {/* Movie Info */}
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          
          <View style={styles.movieMeta}>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Clock size={16} color="#E50914" />
                <Text style={styles.metaText}>{movie.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Eye size={16} color="#E50914" />
                <Text style={styles.metaText}>{formatViews(movie.views)}</Text>
              </View>
              <View style={styles.metaItem}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>{movie.rating}</Text>
              </View>
            </View>
            
            <View style={styles.genreContainer}>
              {movie.genre.map((genre, index) => (
                <View key={index} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, isLiked && styles.likedButton]}
              onPress={handleLikeMovie}
            >
              <Heart size={20} color={isLiked ? "#fff" : "#E50914"} fill={isLiked ? "#fff" : "transparent"} />
              <Text style={[styles.actionButtonText, isLiked && styles.likedButtonText]}>
                {formatLikes(movie.likes + (isLiked ? 1 : 0))}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleShareMovie}>
              <Share size={20} color="#E50914" />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{movie.description}</Text>
          </View>

          {/* Cast & Crew */}
          <View style={styles.castCrewContainer}>
            <Text style={styles.sectionTitle}>Cast & Crew</Text>
            
            <Text style={styles.subsectionTitle}>Cast</Text>
            <FlatList
              data={movie.cast}
              renderItem={renderCastMember}
              keyExtractor={(item, index) => `cast-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castList}
            />
            
            <Text style={styles.subsectionTitle}>Crew</Text>
            <FlatList
              data={movie.crew}
              renderItem={renderCastMember}
              keyExtractor={(item, index) => `crew-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castList}
            />
          </View>

          {/* Similar Movies */}
          <View style={styles.similarMoviesContainer}>
            <Text style={styles.sectionTitle}>You May Also Like</Text>
            <FlatList
              data={similarMovies}
              renderItem={renderSimilarMovie}
              keyExtractor={(item) => item.id}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.similarMoviesGrid}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
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
  headerContainer: {
    position: 'relative',
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieInfo: {
    padding: 20,
  },
  movieTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 15,
  },
  movieMeta: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    marginLeft: 5,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFD700',
    marginLeft: 5,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E50914',
  },
  likedButton: {
    backgroundColor: '#E50914',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#E50914',
    marginLeft: 8,
  },
  likedButtonText: {
    color: '#fff',
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    lineHeight: 24,
  },
  castCrewContainer: {
    marginBottom: 30,
  },
  subsectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
  },
  castList: {
    paddingBottom: 10,
  },
  castMember: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  castAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  castName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
  },
  castRole: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#999',
    textAlign: 'center',
  },
  similarMoviesContainer: {
    marginBottom: 50,
  },
  similarMoviesGrid: {
    paddingTop: 10,
  },
  similarMovieCard: {
    flex: 1,
    marginRight: 10,
    marginBottom: 15,
  },
  lastColumnCard: {
    marginRight: 0,
  },
  similarMovieImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarMovieOverlay: {
    position: 'absolute',
    bottom: 35,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  similarMovieDuration: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  similarMovieTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 2,
  },
  similarMovieViews: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
});