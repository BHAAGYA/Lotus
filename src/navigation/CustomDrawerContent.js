import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
  Easing,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GETNETWORK } from '../utils/Network';
import { BASE_URL } from '../constants/url';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../Pages/ProfileContext/ProfileContext';

const { width } = Dimensions.get('window');
const ANIMATION_DURATION = 400;

const CustomDrawerContent = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const[user,setUser]=useState('')
  const { profileImage,theme } = useContext(ProfileContext);
  

  const navigation=useNavigation()
  
  // Animation values
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const itemsAnimation = useRef(new Animated.Value(0)).current;
  const footerAnimation = useRef(new Animated.Value(0)).current;
  const profileImageScale = useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    // Sequence of animations when drawer opens with easing
    Animated.sequence([
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(profileImageScale, {
        toValue: 1,
        duration: ANIMATION_DURATION * 0.7,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(itemsAnimation, {
          toValue: 1,
          duration: ANIMATION_DURATION * 0.5,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(footerAnimation, {
          toValue: 1,
          duration: ANIMATION_DURATION * 0.7,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const headerTranslateY = headerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const itemsTranslateX = itemsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.2, 0],
  });

  const footerTranslateY = footerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  // Enhanced Custom Drawer Item with press effect
  const CustomDrawerItem = ({ icon, label, onPress, isActive, index }) => {
    const itemScale = useRef(new Animated.Value(1)).current;
    const itemOpacity = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      Animated.timing(itemOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100 + (index * 100),
        useNativeDriver: true,
      }).start();
    }, []);
    
    const handlePress = () => {
      Animated.sequence([
        Animated.timing(itemScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(itemScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      setActiveIndex(index);
      if (onPress) onPress();
    };
    
    return (
      <Animated.View
        style={[styles.customDrawerItem, { opacity: itemOpacity, transform: [{ scale: itemScale }, { translateX: itemsTranslateX }] }]}
      >
        <TouchableOpacity style={styles.drawerItemButton} onPress={handlePress}>
          <View style={styles.drawerItemContent}>
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              {icon}
            </View>
            <Text style={[styles.drawerItemLabel, isActive && styles.activeDrawerItemLabel]}>
              {label}
            </Text>
          </View>
          
          {isActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Modified drawer items with custom component
  const renderDrawerItems = () => {
    const routes = props.state.routes;
    const activeRoute = props.state.index;
    
    return routes.map((route, index) => {
      const { options } = props.descriptors[route.key];
      const label = options.drawerLabel || options.title || route.name;
      
      // Define icons for each route with dynamic color based on active index
      // const icons = {
        // Home: <Ionicons name="home-outline" size={24} color={activeRoute === index ? "#ffffff" : "#9CA3AF"} />,
        // Profile: <Ionicons name="person-outline" size={24} color={activeRoute === index ? "#ffffff" : "#9CA3AF"} />,
        // Settings: <Ionicons name="settings-outline" size={24} color={activeRoute === index ? "#ffffff" : "#9CA3AF"} />,
        // Notifications: <Ionicons name="notifications-outline" size={24} color={activeRoute === index ? "#ffffff" : "#9CA3AF"} />,
        // Favorites: <Ionicons name="heart-outline" size={24} color={activeRoute === index ? "#ffffff" : "#9CA3AF"} />,
      // };

      return (
        <CustomDrawerItem
          key={route.key}
          index={index}
          label={label}
          // icon={icons[route.name] || <Ionicons name="apps-outline" size={24} color={activeRoute === index ? "black" : "black"} />}
          isActive={activeRoute === index}
          onPress={() => props.navigation.navigate(route.name)}
        />
      );
    });
  };

  useEffect(() => {
    userDetails();
  }, []);



    const userDetails = async () => {
    try {
      const data = await GETNETWORK(`${BASE_URL}userdetails`, true);
      console.log('User details:', data);
      console.log('===============',data.data_value)
      setUser(data?.data_value)
    }
     catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };
  

//   console.log('user------------------------------------------------------',user[0].UserName
//     )

  return (
<LinearGradient
  colors={
    theme.dark
      ? ['#141E30', '#243B55', '#3a6073'] // Dark mode
      : ['#E0EAFC', '#CFDEF3']            // Light mode
  }
  style={styles.container}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
>
      <StatusBar barStyle="light-content" backgroundColor="#111827" translucent={Platform.OS === 'android'} />
      
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <LinearGradient  colors= {
    theme.dark
      ? ['#0B0F1A', '#1E293B', '#3B4252']

// Dark mode
      : ['#4F46E5', '#4361EE']            // Light mode
  }
       
        style={styles.headerGradient}>
          <Animated.View style={{ transform: [{ scale: profileImageScale }] }}>
               <Image
        source={
          profileImage
            ? { uri: profileImage }
            : require('../assets/images/lotus_infrastructure.jpg')
        }
        
      style={styles.profileImage} />
          </Animated.View>
          
          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>
              {user[0]?.UserName}
                </Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>
              {user[0]?.UserId}
                
                </Text>    
                      </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* <View style={styles.drawerItems}>{renderDrawerItems()}</View> */}

      <Animated.View style={[styles.footer, { transform: [{ translateY: footerTranslateY }] }]}>
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.settingsButton} onPress={() => 
            navigation.navigate('Settings')
        }>
          <Ionicons name="settings-outline" size={22} color="#9CA3AF" />
          <Text style={[styles.settingsText,{ color: theme.colors.text }]}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpButton} onPress={() => alert('Help')}>
          <Ionicons name="help-circle-outline" size={22} color="#9CA3AF" />
          <Text style={[styles.helpText,{ color: theme.colors.text }]}>Help & Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={() => alert('Logout')}>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.logoutGradient}>
            <Text style={styles.logoutText}>Logout</Text>
            <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  username: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    color: '#E5E7EB',
    fontSize: 14,
  },
  drawerItems: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  customDrawerItem: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  drawerItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    position: 'relative',
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activeDrawerItem: {
    backgroundColor: '#4F46E5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  drawerItemLabel: {
    fontSize: 16,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  activeDrawerItemLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    right: 15,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  footer: {
    padding: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(156, 163, 175, 0.3)',
    marginBottom: 20,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingsText: {
    marginLeft: 12,
    color: '#D1D5DB',
    fontSize: 16,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  helpText: {
    marginLeft: 12,
    color: '#D1D5DB',
    fontSize: 16,
  },
  logoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 5,
    elevation: 3,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent:'flex-end'
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default CustomDrawerContent;
