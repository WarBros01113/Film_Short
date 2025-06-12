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
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import {
  Trophy,
  Calendar,
  Users,
  Award,
  Menu,
  Bell,
  Filter,
  ChevronRight,
  Clock,
  Gift,
  Star,
  User,
  History,
  CreditCard,
  Settings,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

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
}

// Mock contest data - In real app, this would come from Firebase
const mockContests: Contest[] = [
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
  },
  {
    id: '3',
    title: 'Hindi Short Film Festival',
    description: 'Celebrate Hindi cinema with your creativity',
    language: 'Hindi',
    endDate: '2024-02-25',
    participants: 189,
    prize: '₹1,50,000',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true,
    category: 'Regional',
    daysLeft: 25,
  },
  {
    id: '4',
    title: 'International Drama Challenge',
    description: 'Drama films with English subtitles required',
    language: 'Pan',
    endDate: '2024-03-01',
    participants: 312,
    prize: '$10,000',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true,
    category: 'International',
    daysLeft: 30,
  },
  {
    id: '5',
    title: 'Comedy Short Film Contest',
    description: 'Make us laugh with your comedy masterpiece',
    language: 'English',
    endDate: '2024-03-05',
    participants: 98,
    prize: '$3000',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true,
    category: 'Genre',
    daysLeft: 35,
  },
];

const languages = ['All', 'English', 'Tamil', 'Hindi', 'Pan'];

const previousWinners = [
  {
    id: '1',
    title: 'Best Drama - "Silent Tears"',
    winner: 'John Doe',
    prize: 'Gold',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    title: 'Best Comedy - "Laugh Out Loud"',
    winner: 'Jane Smith',
    prize: 'Silver',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Best Tamil Film - "Kadhal"',
    winner: 'Raj Kumar',
    prize: 'Gold',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function ContestScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [filteredContests, setFilteredContests] = useState<Contest[]>(mockContests);

  useEffect(() => {
    filterContests();
  }, [selectedLanguage]);

  const filterContests = () => {
    if (selectedLanguage === 'All') {
      setFilteredContests(contests);
    } else {
      const filtered = contests.filter(contest => contest.language === selectedLanguage);
      setFilteredContests(filtered);
    }
  };

  const getActiveContests = () => {
    return filteredContests.filter(contest => contest.isActive);
  };

  const getContestsByLanguage = (language: string) => {
    if (language === 'Pan') {
      return contests.filter(contest => contest.language === 'Pan');
    }
    return contests.filter(contest => contest.language === language);
  };

  const handleContestPress = (contestId: string) => {
    router.push(`/(tabs)/contest/${contestId}`);
  };

  const handleParticipate = (contestId: string) => {
    Alert.alert(
      'Join Contest',
      'Are you ready to participate in this contest?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Join Now',
          onPress: () => {
            // In real app, this would call Firebase to register user for contest
            Alert.alert('Success', 'You have successfully joined the contest!');
          },
        },
      ]
    );
  };

  const renderActiveContest = ({ item }: { item: Contest }) => (
    <TouchableOpacity 
      style={styles.activeContestCard}
      onPress={() => handleContestPress(item.id)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.contestImage} />
      <View style={styles.contestOverlay}>
        <View style={styles.contestBadge}>
          <Trophy size={16} color="#fff" />
          <Text style={styles.badgeText}>ACTIVE</Text>
        </View>
      </View>
      <View style={styles.contestInfo}>
        <Text style={styles.contestTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.contestDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.contestMeta}>
          <View style={styles.metaItem}>
            <Calendar size={14} color="#E50914" />
            <Text style={styles.metaText}>{item.daysLeft} days left</Text>
          </View>
          <View style={styles.metaItem}>
            <Users size={14} color="#E50914" />
            <Text style={styles.metaText}>{item.participants} joined</Text>
          </View>
        </View>
        <View style={styles.prizeContainer}>
          <Gift size={16} color="#FFD700" />
          <Text style={styles.prizeText}>Prize: {item.prize}</Text>
        </View>
        <TouchableOpacity
          style={styles.participateButton}
          onPress={() => handleParticipate(item.id)}
        >
          <Text style={styles.participateText}>Join Contest</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderContestCard = ({ item }: { item: Contest }) => (
    <TouchableOpacity 
      style={styles.contestCard}
      onPress={() => handleContestPress(item.id)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.cardMeta}>
          <View style={styles.metaRow}>
            <Clock size={12} color="#999" />
            <Text style={styles.cardMetaText}>{item.daysLeft} days left</Text>
          </View>
          <View style={styles.metaRow}>
            <Users size={12} color="#999" />
            <Text style={styles.cardMetaText}>{item.participants}</Text>
          </View>
        </View>
        <Text style={styles.cardPrize}>{item.prize}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderWinnerCard = ({ item }: { item: any }) => (
    <View style={styles.winnerCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.winnerImage} />
      <View style={styles.winnerContent}>
        <Award size={20} color={item.prize === 'Gold' ? '#FFD700' : '#C0C0C0'} />
        <View style={styles.winnerInfo}>
          <Text style={styles.winnerTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.winnerName}>by {item.winner}</Text>
        </View>
      </View>
    </View>
  );

  const renderLanguageFilter = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.languageChip,
        selectedLanguage === item && styles.selectedLanguageChip,
      ]}
      onPress={() => setSelectedLanguage(item)}
    >
      <Text
        style={[
          styles.languageText,
          selectedLanguage === item && styles.selectedLanguageText,
        ]}
      >
        {item}
      </Text>
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
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Page Title */}
        <View style={styles.pageHeader}>
          <Trophy size={28} color="#E50914" />
          <Text style={styles.pageTitle}>Contests</Text>
        </View>

        {/* Language Filter */}
        <View style={styles.filterSection}>
          <View style={styles.filterHeader}>
            <Filter size={20} color="#fff" />
            <Text style={styles.filterTitle}>Filter by Language</Text>
          </View>
          <FlatList
            data={languages}
            renderItem={renderLanguageFilter}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          />
        </View>

        {/* Active Contests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Contests</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View More</Text>
              <ChevronRight size={16} color="#E50914" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={getActiveContests().slice(0, 3)}
            renderItem={renderActiveContest}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Pan Shortfilms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pan Shortfilms (English subtitles required)</Text>
          <FlatList
            data={getContestsByLanguage('Pan')}
            renderItem={renderContestCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Tamil Contest Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tamil Shortfilm Contest</Text>
          <FlatList
            data={getContestsByLanguage('Tamil')}
            renderItem={renderContestCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Hindi Contest Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hindi Shortfilm Contest</Text>
          <FlatList
            data={getContestsByLanguage('Hindi')}
            renderItem={renderContestCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Previous Winners */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Previous Winners</Text>
          {previousWinners.map((winner) => (
            <View key={winner.id} style={styles.winnerCard}>
              <Image source={{ uri: winner.thumbnail }} style={styles.winnerImage} />
              <View style={styles.winnerContent}>
                <Award size={20} color={winner.prize === 'Gold' ? '#FFD700' : '#C0C0C0'} />
                <View style={styles.winnerInfo}>
                  <Text style={styles.winnerTitle}>{winner.title}</Text>
                  <Text style={styles.winnerName}>by {winner.winner}</Text>
                </View>
              </View>
            </View>
          ))}
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
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E50914',
  },
  content: {
    flex: 1,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginLeft: 12,
  },
  filterSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginLeft: 8,
  },
  filterList: {
    paddingRight: 20,
  },
  languageChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  selectedLanguageChip: {
    backgroundColor: '#E50914',
    borderColor: '#E50914',
  },
  languageText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  selectedLanguageText: {
    color: '#fff',
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
  horizontalList: {
    paddingLeft: 20,
  },
  activeContestCard: {
    width: width * 0.85,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E50914',
  },
  contestImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  contestOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  contestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginLeft: 4,
  },
  contestInfo: {
    padding: 15,
  },
  contestTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  contestDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    marginBottom: 12,
  },
  contestMeta: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginLeft: 5,
  },
  prizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  prizeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFD700',
    marginLeft: 6,
  },
  participateButton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  participateText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  contestCard: {
    width: 160,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 90,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 8,
  },
  cardMeta: {
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardMetaText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginLeft: 4,
  },
  cardPrize: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#E50914',
  },
  winnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  winnerImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  winnerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  winnerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  winnerTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 2,
  },
  winnerName: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
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