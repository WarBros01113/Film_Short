import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Heart, Download, History, CreditCard as Edit3, Bell, CircleHelp as HelpCircle } from 'lucide-react-native';

const userStats = [
  { label: 'Films Watched', value: '47' },
  { label: 'Hours Watched', value: '12.5' },
  { label: 'Favorites', value: '23' },
];

export default function ProfileScreen() {
  const renderStat = (stat: any, index: number) => (
    <View key={index} style={styles.statItem}>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  const renderMenuItem = (icon: any, title: string, subtitle?: string) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuIcon}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {userStats.map(renderStat)}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {renderMenuItem(
            <Heart size={24} color="#E50914" />,
            'My Favorites',
            'Films you love'
          )}
          
          {renderMenuItem(
            <Download size={24} color="#fff" />,
            'Downloads',
            'Offline viewing'
          )}
          
          {renderMenuItem(
            <History size={24} color="#fff" />,
            'Watch History',
            'Recently watched'
          )}
          
          {renderMenuItem(
            <Bell size={24} color="#fff" />,
            'Notifications',
            'Manage alerts'
          )}
          
          {renderMenuItem(
            <Settings size={24} color="#fff" />,
            'Settings',
            'App preferences'
          )}
          
          {renderMenuItem(
            <HelpCircle size={24} color="#fff" />,
            'Help & Support',
            'Get assistance'
          )}
        </View>

        {/* Subscription Status */}
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionTitle}>Premium Member</Text>
          <Text style={styles.subscriptionSubtitle}>Your subscription expires on Jan 30, 2024</Text>
          <TouchableOpacity style={styles.manageButton}>
            <Text style={styles.manageButtonText}>Manage Subscription</Text>
          </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#E50914',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#E50914',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuIcon: {
    width: 24,
    alignItems: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  subscriptionCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E50914',
  },
  subscriptionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#E50914',
    marginBottom: 5,
  },
  subscriptionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    marginBottom: 15,
  },
  manageButton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  manageButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});