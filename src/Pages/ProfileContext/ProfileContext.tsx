import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define Light and Dark Themes
const LightTheme = {
  dark: false,
  colors: {
    background: '#F8F9FA',
    backgroundGradient: ['#FFFFFF', '#F1F3F5'],
    headerBackground: '#4361EE',
    headerText: '#FFFFFF',
    headerSubtext: 'rgba(255, 255, 255, 0.9)',
    text: '#212529',
    subtext: '#495057',
    muted: '#868E96',
    searchBackground: 'rgba(67, 97, 238, 0.08)',
    searchText: '#212529',
    searchPlaceholder: '#ADB5BD',
    cardBackground: '#FFFFFF',
    cardBorder: '#E9ECEF',
    navBackground: '#FFFFFF',
    navBorder: '#DEE2E6',
    navText: '#495057',
    navTextActive: '#4361EE',
    navIcon: '#6C757D',
    navIconActive: '#4361EE',
    specialButton: '#F72585',
    specialButtonText: '#FFFFFF',
    buttonPrimary: '#06D6A0',
    buttonText: '#FFFFFF',
    profileButtonBg: 'rgba(255, 255, 255, 0.2)',
    notificationButtonBg: 'rgba(255, 255, 255, 0.2)',
    statusBar: 'dark-content',
    jobCard:'#121826'

  },
};

const DarkTheme = {
  dark: true,
  colors: {
    background: '#121826',
    backgroundGradient: ['#121826', '#1A2332'],
    headerBackground: '#2C3E50',
    headerText: '#FFFFFF',
    headerSubtext: 'rgba(255, 255, 255, 0.85)',
    text: '#F8F9FA',
    subtext: '#CED4DA',
    muted: '#868E96',
    searchBackground: 'rgba(67, 97, 238, 0.15)',
    searchText: '#F8F9FA',
    searchPlaceholder: 'rgba(255, 255, 255, 0.6)',
    cardBackground: '#1A2332',
    cardBorder: '#2C3E50',
    navBackground: '#1A2332',
    navBorder: '#2C3E50',
    navText: '#ADB5BD',
    navTextActive: '#7B9CFF',
    navIcon: '#ADB5BD',
    navIconActive: '#7B9CFF',
    specialButton: '#F72585',
    specialButtonText: '#FFFFFF',
    buttonPrimary: '#06D6A0',
    buttonText: '#FFFFFF',
    profileButtonBg: 'rgba(255, 255, 255, 0.12)',
    notificationButtonBg: 'rgba(255, 255, 255, 0.12)',
    statusBar: 'light-content',
    jobCardBackground: '#1A2332',
    jobCardBorder: '#2C3E50',
    jobCardText: '#F8F9FA',
    jobCardSubtext: '#CED4DA',
    searchBarBackground: 'rgba(28, 36, 54, 0.8)',
    searchBarBorder: '#2C3E50',
    optionsButtonBackground: '#2C3E50',
    tabIndicator: '#7B9CFF',
    tabActive: '#F8F9FA',
    tabInactive: 'rgba(255, 255, 255, 0.7)',
    jobCard:'#121826'
  },
};

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isDarkModee, setIsDarkModee] = useState(false); // toggle bool
  const [theme, setTheme] = useState(LightTheme);

  // Load saved theme and profile image from storage
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem('APP_THEME');
      const isDark = storedTheme === 'dark';
      setIsDarkModee(isDark);
      setTheme(isDark ? DarkTheme : LightTheme);

      const uri = await AsyncStorage.getItem('USER_AVATAR_URI');
      if (uri) setProfileImage(uri);
    })();
  }, []);

  const toggleTheme = async () => {
    setIsDarkModee((prev) => {
      const newIsDark = !prev;
      const newTheme = newIsDark ? DarkTheme : LightTheme;
      setTheme(newTheme);
      AsyncStorage.setItem('APP_THEME', newIsDark ? 'dark' : 'light');
      return newIsDark;
    });
  };

  const updateProfileImage = async (uri) => {
    setProfileImage(uri);
    await AsyncStorage.setItem('USER_AVATAR_URI', uri);
  };

  return (
    <ProfileContext.Provider value={{ theme, isDarkModee, toggleTheme, profileImage, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
