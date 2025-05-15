// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Theme color configuration
export const COLORS = {
  light: {
    background: '#F3F4F6',
    backgroundGradient: ['#FFFFFF', '#F3F4F6'],
    headerBackground: '#3B82F6',
    headerText: '#FFFFFF',
    headerSubtext: 'rgba(255, 255, 255, 0.9)',
    text: '#111827',
    subtext: '#6B7280',
    muted: '#9CA3AF',
    searchBackground: 'rgba(59, 130, 246, 0.1)',
    searchText: '#111827',
    searchPlaceholder: '#9CA3AF',
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E7EB',
    navBackground: '#FFFFFF',
    navBorder: '#E5E7EB',
    navText: '#6B7280',
    navTextActive: '#3B82F6',
    navIcon: '#6B7280',
    navIconActive: '#3B82F6',
    specialButton: '#F97316',
    specialButtonText: '#FFFFFF',
    buttonPrimary: '#10B981',
    buttonText: '#FFFFFF',
    profileButtonBg: 'rgba(255, 255, 255, 0.2)',
    notificationButtonBg: 'rgba(255, 255, 255, 0.2)',
    statusBar: 'dark-content',
    jobCardBackground: '#FFFFFF',
    jobCardBorder: '#E5E7EB',
    jobCardText: '#1F2937',
    jobCardSubtext: '#4B5563',
    searchBarBackground: '#FFFFFF',
    searchBarBorder: '#E5E7EB',
    optionsButtonBackground: '#F3F4F6',
    tabIndicator: '#3B82F6',
    tabActive: '#FFFFFF',
    tabInactive: '#FFFFFF',
  },
  dark: {
    background: '#0F172A',
    backgroundGradient: ['#0F172A', '#1E293B'],
    headerBackground: '#1E293B',
    headerText: '#FFFFFF',
    headerSubtext: 'rgba(255, 255, 255, 0.8)',
    text: '#FFFFFF',
    subtext: '#94A3B8',
    muted: '#64748B',
    searchBackground: 'rgba(30, 41, 59, 0.8)',
    searchText: '#FFFFFF',
    searchPlaceholder: 'rgba(255, 255, 255, 0.5)',
    cardBackground: '#1E293B',
    cardBorder: '#334155',
    navBackground: '#1E293B',
    navBorder: '#334155',
    navText: '#94A3B8',
    navTextActive: '#FFFFFF',
    navIcon: '#94A3B8',
    navIconActive: '#FFFFFF',
    specialButton: '#F97316',
    specialButtonText: '#FFFFFF',
    buttonPrimary: '#10B981',
    buttonText: '#FFFFFF',
    profileButtonBg: 'rgba(255, 255, 255, 0.1)',
    notificationButtonBg: 'rgba(255, 255, 255, 0.1)',
    statusBar: 'light-content',
    jobCardBackground: '#1E293B',
    jobCardBorder: '#334155',
    jobCardText: '#FFFFFF',
    jobCardSubtext: '#94A3B8',
    searchBarBackground: 'rgba(30, 41, 59, 0.8)',
    searchBarBorder: '#334155',
    optionsButtonBackground: '#334155',
    tabIndicator: '#FFFFFF',
    tabActive: '#FFFFFF',
    tabInactive: 'rgba(255, 255, 255, 0.7)',
  },
};

// Create the context
const ThemeContext = createContext();

// Storage key for theme preference
const THEME_STORAGE_KEY = '@app_theme_mode';

export const ThemeProvider = ({ children }) => {
  // Get device color scheme
  const deviceColorScheme = useColorScheme();
  
  // State to track theme
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the colors based on the current theme
  const colors = COLORS[theme];
  const isDark = theme === 'dark';

  // Load saved theme preference from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setTheme(savedTheme);
        } else {
          // If no saved preference, use device default
          setTheme(deviceColorScheme || 'light');
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [deviceColorScheme]);

  // Toggle theme function
  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Set a specific theme
  const setThemeMode = async (mode) => {
    if (mode !== 'dark' && mode !== 'light') return;
    
    setTheme(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme,
        isDark,
        colors,
        toggleTheme,
        setTheme: setThemeMode,
        isLoading
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};