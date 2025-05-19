import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define Light and Dark Themes
const LightTheme = {
  dark: false,
  colors: {
    background: '#F2F0EF',
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
    jobCard:'#F2F2F2',
    jobViewBackground:'#4361EE',
       jobCardBackground: '#1A2332',
    jobCardBorder: '#FFA900',
    jobCardText: 'black',
    jobCardSubtext: '#CED4DA',
  modalBackground: 'rgba(0, 0, 0, 0.5)',
    modalContent: '#FFFFFF',
      surface: '#F8F9FA',
    card: '#FFFFFF',
    
    // Text colors
    textJob: '#212529',
    textSecondary: '#6C757D',
    textMuted: '#ADB5BD',
    
    // Input colors
    inputBackground: '#FFFFFF',
    inputBorder: '#E0E4E7',
    inputBorderFocused: '#FDB462',
    inputPlaceholder: '#ADB5BD',
    
    // Primary colors
    primary: '#FDB462', // Your existing orange color
    primaryDark: '#FFA726',
    primaryLight: '#FFCC80',
    
    // Secondary colors
    secondary: '#4A90E2',
    secondaryLight: '#E3F2FD',
    
    // Status colors
    success: '#28A745',
    successLight: '#D4EDDA',
    error: '#DC3545',
    errorLight: '#F8D7DA',
    warning: '#FFC107',
    warningLight: '#FFF3CD',
    info: '#17A2B8',
    infoLight: '#D1ECF1',
    
    // Border colors
    border: '#E0E4E7',
    borderLight: '#F1F3F4',
    divider: '#E9ECEF',
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowLight: 'rgba(0, 0, 0, 0.05)',
    
    // Interactive colors
    interactive: '#FDB462',
    interactivePressed: '#FFA726',
    interactiveDisabled: '#F1F3F4',
    
    // Table colors
    tableHeader: '#F8F9FA',
    tableRowEven: '#FFFFFF',
    tableRowOdd: '#FAFAFA',
    tableBorder: '#E0E4E7',
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
    specialButton: 'green',
    specialButtonText: '#FFFFFF',
    buttonPrimary: '#06D6A0',
    buttonText: '#FFFFFF',
    profileButtonBg: 'rgba(255, 255, 255, 0.12)',
    notificationButtonBg: 'rgba(255, 255, 255, 0.12)',
    statusBar: 'light-content',
    searchBarBackground: 'rgba(28, 36, 54, 0.8)',
    searchBarBorder: '#2C3E50',
    optionsButtonBackground: '#2C3E50',
    tabIndicator: '#7B9CFF',
    tabActive: '#F8F9FA',
    tabInactive: 'rgba(255, 255, 255, 0.7)',
    jobCard:'#245F73',
    jobViewBackground:'#121826',
    jobCardBackground: '#1A2332',
    jobCardBorder: '#FFA900',
    jobCardText: '#F8F9FA',
    jobCardSubtext: '#CED4DA',
       surface: '#1E1E1E',
    card: '#252525',
    
    // Text colors
    textJob: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textMuted: '#757575',
    
    // Input colors
    inputBackground: '#2C2C2C',
    inputBorder: '#404040',
    inputBorderFocused: '#FDB462',
    inputPlaceholder: '#757575',
    
    // Primary colors
    primary: '#FDB462', // Keeping the same orange for brand consistency
    primaryDark: '#E09A47',
    primaryLight: '#FFCC80',
    
    // Secondary colors
    secondary: '#64B5F6',
    secondaryLight: '#1A237E',
    
    // Status colors
    success: '#4CAF50',
    successLight: '#1B5E20',
    error: '#F44336',
    errorLight: '#B71C1C',
    warning: '#FF9800',
    warningLight: '#E65100',
    info: '#2196F3',
    infoLight: '#0D47A1',
    
    // Border colors
    border: '#404040',
    borderLight: '#2C2C2C',
    divider: '#333333',
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.5)',
    shadowLight: 'rgba(0, 0, 0, 0.3)',
    
    // Interactive colors
    interactive: '#FDB462',
    interactivePressed: '#E09A47',
    interactiveDisabled: '#1C1C1C',
    
    // Table colors
    tableHeader: '#2A2A2A',
    tableRowEven: '#252525',
    tableRowOdd: '#2C2C2C',
    tableBorder: '#404040',
    
    // Modal colors
    modalBackground: 'rgba(0, 0, 0, 0.8)',
    modalContent: '#2C2C2C',
    
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
