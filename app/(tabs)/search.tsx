import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Mic, X, Trash2, Users, ArrowRight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

const SEARCH_HISTORY_KEY = '@reelflix_search_history';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      if (history) {
        const parsedHistory = JSON.parse(history);
        // Sort by timestamp (most recent first)
        const sortedHistory = parsedHistory.sort((a: SearchHistoryItem, b: SearchHistoryItem) => 
          b.timestamp - a.timestamp
        );
        setSearchHistory(sortedHistory.slice(0, 10)); // Keep only last 10 searches
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSearchToHistory = async (query: string) => {
    if (!query.trim()) return;

    try {
      const newSearchItem: SearchHistoryItem = {
        id: Date.now().toString(),
        query: query.trim(),
        timestamp: Date.now(),
      };

      // Remove duplicate if exists
      const filteredHistory = searchHistory.filter(item => 
        item.query.toLowerCase() !== query.toLowerCase()
      );

      const updatedHistory = [newSearchItem, ...filteredHistory].slice(0, 10);
      
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const deleteSearchItem = async (id: string) => {
    try {
      const updatedHistory = searchHistory.filter(item => item.id !== id);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Error deleting search item:', error);
    }
  };

  const clearAllHistory = async () => {
    Alert.alert(
      'Clear Search History',
      'Are you sure you want to clear all search history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
              setSearchHistory([]);
            } catch (error) {
              console.error('Error clearing search history:', error);
            }
          },
        },
      ]
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      saveSearchToHistory(searchQuery);
      // Here you would typically navigate to search results or perform the search
      console.log('Searching for:', searchQuery);
    }
  };

  const handleVoiceSearch = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Voice Search', 'Voice search is not available on web platform');
    } else {
      // In a real app, you would implement voice recognition here
      Alert.alert('Voice Search', 'Voice search feature coming soon!');
    }
  };

  const selectSearchItem = (query: string) => {
    setSearchQuery(query);
    saveSearchToHistory(query);
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const renderSearchHistoryItem = ({ item }: { item: SearchHistoryItem }) => (
    <TouchableOpacity 
      style={styles.historyItem}
      onPress={() => selectSearchItem(item.query)}
    >
      <View style={styles.historyItemContent}>
        <Search size={16} color="#666" />
        <View style={styles.historyTextContainer}>
          <Text style={styles.historyQuery}>{item.query}</Text>
          <Text style={styles.historyTime}>{formatTimeAgo(item.timestamp)}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteSearchItem(item.id)}
      >
        <X size={16} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for shortfilms..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <X size={18} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={styles.micButton}
          onPress={handleVoiceSearch}
        >
          <Mic size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Recent Searches Section */}
        {searchHistory.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearAllHistory}>
                <View style={styles.clearAllButton}>
                  <Trash2 size={16} color="#E50914" />
                  <Text style={styles.clearAllText}>Clear All</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={searchHistory}
              renderItem={renderSearchHistoryItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.historyList}
            />
          </View>
        )}

        {/* Subscriptions Navigation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discover Content</Text>
          <TouchableOpacity style={styles.subscriptionCard}>
            <View style={styles.subscriptionContent}>
              <View style={styles.subscriptionIcon}>
                <Users size={24} color="#E50914" />
              </View>
              <View style={styles.subscriptionText}>
                <Text style={styles.subscriptionTitle}>Browse Subscriptions</Text>
                <Text style={styles.subscriptionSubtitle}>
                  Discover channels and creators you might like
                </Text>
              </View>
              <ArrowRight size={20} color="#666" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Popular Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.popularSearches}>
            {['Drama', 'Comedy', 'Thriller', 'Romance', 'Action', 'Documentary'].map((tag) => (
              <TouchableOpacity 
                key={tag}
                style={styles.popularTag}
                onPress={() => selectSearchItem(tag)}
              >
                <Text style={styles.popularTagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Suggestions */}
        {searchHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Search size={48} color="#333" />
            <Text style={styles.emptyStateTitle}>Start Searching</Text>
            <Text style={styles.emptyStateSubtitle}>
              Search for your favorite short films, creators, or genres
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingVertical: 12,
  },
  clearButton: {
    padding: 5,
  },
  micButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#E50914',
    marginLeft: 5,
  },
  historyList: {
    maxHeight: 300,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 8,
  },
  historyItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  historyQuery: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  subscriptionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  subscriptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  subscriptionText: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 4,
  },
  subscriptionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  popularSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  popularTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#555',
  },
  popularTagText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});