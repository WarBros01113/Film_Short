import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Menu, Play, Clock, Heart, User, FileText, Settings, History, CreditCard, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data for short films
const mockData = {
  trending: [
    { id: '1', title: 'The Last Frame', duration: '8:45', views: 2500000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '2', title: 'Silent Echo', duration: '12:30', views: 1800000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '3', title: 'Urban Dreams', duration: '9:15', views: 3200000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '4', title: 'Midnight Coffee', duration: '7:22', views: 1500000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ],
  newUploads: [
    { id: '5', title: 'Fresh Start', duration: '10:45', uploadDate: '2024-01-15', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '6', title: 'Digital Love', duration: '6:30', uploadDate: '2024-01-14', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '7', title: 'The Algorithm', duration: '11:15', uploadDate: '2024-01-13', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '8', title: 'Lost Signal', duration: '8:55', uploadDate: '2024-01-12', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ],
  mostViewed: [
    { id: '9', title: 'Viral Moment', duration: '5:30', views: 5000000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '10', title: 'Breaking Point', duration: '13:45', views: 4500000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '11', title: 'Time Loop', duration: '9:20', views: 4000000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '12', title: 'Parallel Lives', duration: '11:10', views: 3800000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ],
  mostLiked: [
    { id: '13', title: 'Heart Strings', duration: '7:45', likes: 150000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '14', title: 'Smile Factory', duration: '6:15', likes: 140000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '15', title: 'Pure Joy', duration: '8:30', likes: 135000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '16', title: 'Golden Hour', duration: '10:25', likes: 130000, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ],
  withSubtitles: [
    { id: '17', title: 'Global Story', duration: '12:45', hasSubtitles: true, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '18', title: 'Universal Language', duration: '9:30', hasSubtitles: true, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '19', title: 'Cross Borders', duration: '11:20', hasSubtitles: true, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '20', title: 'Cultural Bridge', duration: '8:40', hasSubtitles: true, thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ],
};

const languages = ['English', 'Tamil', 'Hindi', 'View More...'];

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    }
    return `${(views / 1000).toFixed(0)}K views`;
  };

  const formatLikes = (likes: number) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(0)}K likes`;
    }
    return `${likes} likes`;
  };

  const handleMoviePress = (movieId: string) => {
    router.push(`/(tabs)/movie/${movieId}`);
  };

  const handleViewMore = (category: string) => {
    router.push(`/(tabs)/category/${category}`);
  };

  const renderFilmCard = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity 
      style={[styles.filmCard, index === 0 && styles.firstCard]}
      onPress={() => handleMoviePress(item.id)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.filmImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.filmGradient}
      />
      <View style={styles.filmInfo}>
        <Text style={styles.filmTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.filmMeta}>
          <Clock size={12} color="#fff" />
          <Text style={styles.filmDuration}>{item.duration}</Text>
        </View>
        {item.views && (
          <Text style={styles.filmViews}>{formatViews(item.views)}</Text>
        )}
        {item.likes && (
          <Text style={styles.filmLikes}>{formatLikes(item.likes)}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Play size={16} color="#fff" fill="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTrendingCard = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity 
      style={[styles.trendingCard, index === 0 && styles.firstCard]}
      onPress={() => handleMoviePress(item.id)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.trendingImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.trendingGradient}
      />
      <View style={styles.trendingInfo}>
        <Text style={styles.trendingTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.trendingViews}>{formatViews(item.views)}</Text>
      </View>
      <TouchableOpacity style={styles.trendingPlayButton}>
        <Play size={20} color="#fff" fill="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderLanguageButton = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.languageButton}>
      <Text style={styles.languageText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderViewMoreCard = (category: string) => (
    <TouchableOpacity 
      style={styles.viewMoreCard}
      onPress={() => handleViewMore(category)}
    >
      <View style={styles.viewMoreContent}>
        <ChevronRight size={24} color="#E50914" />
        <Text style={styles.viewMoreText}>View More</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Menu size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ReelFlix</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Trending Now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity 
              style={styles.viewMoreButton}
              onPress={() => handleViewMore('trending')}
            >
              <Text style={styles.viewMoreButtonText}>View More</Text>
              <ChevronRight size={16} color="#E50914" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.trending}
            renderItem={renderTrendingCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ListFooterComponent={() => renderViewMoreCard('trending')}
          />
        </View>

        {/* New Uploads */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Uploads</Text>
            <TouchableOpacity 
              style={styles.viewMoreButton}
              onPress={() => handleViewMore('newUploads')}
            >
              <Text style={styles.viewMoreButtonText}>View More</Text>
              <ChevronRight size={16} color="#E50914" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.newUploads}
            renderItem={renderFilmCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ListFooterComponent={() => renderViewMoreCard('newUploads')}
          />
        </View>

        {/* Most Viewed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Viewed Short Films</Text>
            <TouchableOpacity 
              style={styles.viewMoreButton}
              onPress={() => handleViewMore('mostViewed')}
            >
              <Text style={styles.viewMoreButtonText}>View More</Text>
              <ChevronRight size={16} color="#E50914" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.mostViewed}
            renderItem={renderFilmCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ListFooterComponent={() => renderViewMoreCard('mostViewed')}
          />
        </View>

        {/* Most Liked */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Liked Short Films</Text>
            <TouchableOpacity 
              style={styles.viewMoreButton}
              onPress={() => handleViewMore('mostLiked')}
            >
              <Text style={styles.viewMoreButtonText}>View More</Text>
              <ChevronRight size={16} color="#E50914" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.mostLiked}
            renderItem={renderFilmCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ListFooterComponent={() => renderViewMoreCard('mostLiked')}
          />
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <FlatList
            data={languages}
            renderItem={renderLanguageButton}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.languageList}
          />
        </View>

        {/* With Subtitles */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Movies with English Subtitles</Text>
            <TouchableOpacity 
              style={styles.viewMoreButton}
              onPress={() => handleViewMore('withSubtitles')}
            >
              <Text style={styles.viewMoreButtonText}>View More</Text>
              <ChevronRight size={16} color="#E50914" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData.withSubtitles}
            renderItem={renderFilmCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ListFooterComponent={() => renderViewMoreCard('withSubtitles')}
          />
        </View>
      </ScrollView>

      {/* Slide-up Menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <BlurView intensity={20} style={styles.blurView}>
            <TouchableOpacity 
              style={styles.slideUpMenu}
              activeOpacity={1}
            >
              <View style={styles.menuHandle} />
              <Text style={styles.menuTitle}>Menu</Text>
              
              <TouchableOpacity style={styles.menuItem}>
                <CreditCard size={24} color="#fff" />
                <Text style={styles.menuItemText}>Subscriptions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <History size={24} color="#fff" />
                <Text style={styles.menuItemText}>History</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <User size={24} color="#fff" />
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <Settings size={24} color="#fff" />
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </BlurView>
        </TouchableOpacity>
      </Modal>
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
  menuButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#E50914',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
  },
  lastSection: {
    marginBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#E50914',
    marginRight: 4,
  },
  horizontalList: {
    paddingLeft: 20,
  },
  languageList: {
    paddingHorizontal: 20,
  },
  trendingCard: {
    width: width * 0.85,
    height: 200,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  trendingGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  trendingInfo: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 60,
  },
  trendingTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  trendingViews: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
  },
  trendingPlayButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filmCard: {
    width: 140,
    height: 180,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  firstCard: {
    marginLeft: 0,
  },
  filmImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  filmGradient: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    height: '60%',
  },
  filmInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 35,
  },
  filmTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 3,
  },
  filmMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  filmDuration: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    marginLeft: 4,
  },
  filmViews: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  filmLikes: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  playButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMoreCard: {
    width: 140,
    height: 180,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#E50914',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMoreContent: {
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#E50914',
    marginTop: 8,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#333',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  languageText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  slideUpMenu: {
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
    maxHeight: '50%',
  },
  menuHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#666',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginLeft: 15,
  },
});