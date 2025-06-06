import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Modal,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Menu, Bell, Plus, Play, Clock, Eye, Heart, MoveVertical as MoreVertical, User, History, CreditCard, Settings, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
  isVerified: boolean;
  category: string;
}

interface ShortFilm {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  uploadTime: string;
  channelId: string;
  channelName: string;
  channelAvatar: string;
  description: string;
}

// Mock data for subscribed channels
const mockSubscribedChannels: Channel[] = [
  {
    id: '1',
    name: 'FilmMaker Pro',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    subscribers: 125000,
    isVerified: true,
    category: 'Drama',
  },
  {
    id: '2',
    name: 'Comedy Central',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    subscribers: 89000,
    isVerified: true,
    category: 'Comedy',
  },
  {
    id: '3',
    name: 'Indie Stories',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
    subscribers: 67000,
    isVerified: false,
    category: 'Indie',
  },
  {
    id: '4',
    name: 'Tamil Cinema Hub',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    subscribers: 156000,
    isVerified: true,
    category: 'Regional',
  },
  {
    id: '5',
    name: 'Action Shorts',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    subscribers: 98000,
    isVerified: true,
    category: 'Action',
  },
  {
    id: '6',
    name: 'Documentary Plus',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
    subscribers: 45000,
    isVerified: false,
    category: 'Documentary',
  },
];

// Mock data for recent uploads
const mockRecentUploads: ShortFilm[] = [
  {
    id: '1',
    title: 'The Last Frame',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '8:45',
    views: 25000,
    likes: 1200,
    uploadTime: '2 hours ago',
    channelId: '1',
    channelName: 'FilmMaker Pro',
    channelAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'A touching story about memories and letting go...',
  },
  {
    id: '2',
    title: 'Comedy Gold',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '5:30',
    views: 18000,
    likes: 890,
    uploadTime: '4 hours ago',
    channelId: '2',
    channelName: 'Comedy Central',
    channelAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'Hilarious situations that will make you laugh out loud!',
  },
  {
    id: '3',
    title: 'Urban Dreams',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '12:15',
    views: 32000,
    likes: 1500,
    uploadTime: '6 hours ago',
    channelId: '3',
    channelName: 'Indie Stories',
    channelAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'An indie film exploring life in the modern city...',
  },
  {
    id: '4',
    title: 'காதல் கதை (Love Story)',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '15:20',
    views: 45000,
    likes: 2100,
    uploadTime: '8 hours ago',
    channelId: '4',
    channelName: 'Tamil Cinema Hub',
    channelAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'A beautiful Tamil love story with traditional values...',
  },
  {
    id: '5',
    title: 'Chase Scene',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '7:45',
    views: 28000,
    likes: 1350,
    uploadTime: '12 hours ago',
    channelId: '5',
    channelName: 'Action Shorts',
    channelAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'High-octane action sequence with stunning cinematography...',
  },
  {
    id: '6',
    title: 'Climate Change Reality',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '18:30',
    views: 15000,
    likes: 780,
    uploadTime: '1 day ago',
    channelId: '6',
    channelName: 'Documentary Plus',
    channelAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'An eye-opening documentary about environmental issues...',
  },
];

export default function SubscribeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [subscribedChannels, setSubscribedChannels] = useState<Channel[]>(mockSubscribedChannels);
  const [recentUploads, setRecentUploads] = useState<ShortFilm[]>(mockRecentUploads);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K views`;
    }
    return `${views} views`;
  };

  const formatSubscribers = (subscribers: number) => {
    if (subscribers >= 1000000) {
      return `${(subscribers / 1000000).toFixed(1)}M`;
    } else if (subscribers >= 1000) {
      return `${(subscribers / 1000).toFixed(0)}K`;
    }
    return subscribers.toString();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // In real app, this would fetch latest data from Firebase
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleChannelPress = (channelId: string) => {
    // Navigate to channel page
    console.log('Navigate to channel:', channelId);
  };

  const handleVideoPress = (videoId: string) => {
    // Navigate to video player
    console.log('Play video:', videoId);
  };

  const handleLikeVideo = (videoId: string) => {
    setRecentUploads(prev => 
      prev.map(video => 
        video.id === videoId 
          ? { ...video, likes: video.likes + 1 }
          : video
      )
    );
  };

  const renderChannelAvatar = ({ item, index }: { item: Channel; index: number }) => (
    <TouchableOpacity 
      style={[styles.channelAvatar, index === 0 && styles.firstChannelAvatar]}
      onPress={() => handleChannelPress(item.id)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
      {item.isVerified && (
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>✓</Text>
        </View>
      )}
      <Text style={styles.channelName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.subscriberCount}>
        {formatSubscribers(item.subscribers)}
      </Text>
    </TouchableOpacity>
  );

  const renderVideoCard = ({ item }: { item: ShortFilm }) => (
    <TouchableOpacity 
      style={styles.videoCard}
      onPress={() => handleVideoPress(item.id)}
    >
      <View style={styles.videoThumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
        <View style={styles.videoDuration}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Play size={20} color="#fff" fill="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.videoInfo}>
        <View style={styles.videoHeader}>
          <TouchableOpacity 
            style={styles.channelInfo}
            onPress={() => handleChannelPress(item.channelId)}
          >
            <Image source={{ uri: item.channelAvatar }} style={styles.smallAvatar} />
            <View style={styles.channelDetails}>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.channelNameSmall}>{item.channelName}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.videoDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.videoMeta}>
          <View style={styles.metaItem}>
            <Eye size={14} color="#999" />
            <Text style={styles.metaText}>{formatViews(item.views)}</Text>
          </View>
          <View style={styles.metaItem}>
            <TouchableOpacity 
              style={styles.likeButton}
              onPress={() => handleLikeVideo(item.id)}
            >
              <Heart size={14} color="#E50914" />
              <Text style={styles.likeText}>{item.likes}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color="#999" />
            <Text style={styles.metaText}>{item.uploadTime}</Text>
          </View>
        </View>
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
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#E50914"
            colors={['#E50914']}
          />
        }
      >
        {/* Page Title */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Subscriptions</Text>
          <Text style={styles.pageSubtitle}>
            Latest from your subscribed channels
          </Text>
        </View>

        {/* Subscribed Channels Row */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Channels</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View All</Text>
              <ChevronRight size={16} color="#E50914" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={subscribedChannels}
            renderItem={renderChannelAvatar}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.channelsList}
            ListFooterComponent={
              <TouchableOpacity style={styles.addChannelButton}>
                <View style={styles.addChannelIcon}>
                  <Plus size={24} color="#E50914" />
                </View>
                <Text style={styles.addChannelText}>Browse</Text>
              </TouchableOpacity>
            }
          />
        </View>

        {/* Recent Uploads Feed */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Recent Uploads</Text>
          <Text style={styles.sectionSubtitle}>
            New videos from channels you follow
          </Text>
          
          <View style={styles.videoFeed}>
            {recentUploads.map((video) => (
              <View key={video.id}>
                {renderVideoCard({ item: video })}
              </View>
            ))}
          </View>
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
            <TouchableOpacity style={styles.slideUpMenu} activeOpacity={1}>
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
  notificationButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#999',
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
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#E50914',
    marginRight: 4,
  },
  channelsList: {
    paddingLeft: 20,
  },
  channelAvatar: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  firstChannelAvatar: {
    marginLeft: 0,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E50914',
    marginBottom: 8,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 45,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  channelName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
  },
  subscriberCount: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#999',
    textAlign: 'center',
  },
  addChannelButton: {
    alignItems: 'center',
    marginLeft: 10,
    width: 80,
  },
  addChannelIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  addChannelText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#E50914',
    textAlign: 'center',
  },
  videoFeed: {
    paddingHorizontal: 20,
  },
  videoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  videoThumbnailContainer: {
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  videoDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
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
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    padding: 15,
  },
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  channelInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  channelDetails: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 4,
    lineHeight: 22,
  },
  channelNameSmall: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E50914',
  },
  moreButton: {
    padding: 5,
  },
  videoDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginLeft: 5,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E50914',
    marginLeft: 5,
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