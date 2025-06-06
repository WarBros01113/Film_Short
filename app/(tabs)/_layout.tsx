import { Tabs } from 'expo-router';
import { Chrome as Home, Search, Trophy, CreditCard, User } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#8C8C8C',
        tabBarShowLabel: false,
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Home size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Search size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contest"
        options={{
          title: 'Contest',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Trophy size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="subscribe"
        options={{
          title: 'Subscribe',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <CreditCard size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <User size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#141414',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabBarItem: {
    paddingVertical: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});