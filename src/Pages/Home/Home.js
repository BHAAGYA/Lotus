import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
  FlatList,
  TextInput,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { clearAll } from '../../utils/Storage';
import { useDispatch } from 'react-redux';
import { checkuserToken } from '../../redux/actions/auth';
import { Loader } from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MyStatusBar } from '../../constants/config';
import { BRAND } from '../../constants/color';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme } from 'react-native';
import { ProfileContext } from '../ProfileContext/ProfileContext';
import { DMSans36ptBold, Manrope, ManropeBold, ManropeRegular, OutfitRegular, PlusJakartaSansBold, UbuntuBold, UbuntuRegular } from '../../constants/fontfamily';





const Tab = createMaterialTopTabNavigator();

const TopTabs = ({ theme, colors }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.headerBackground,
          
        },
        tabBarActiveTintColor: theme === 'dark' ? '#FFFFFF' : '#FFFFF',
        tabBarInactiveTintColor: theme === 'dark' ? 'white' : 'white',
        tabBarIndicatorStyle: {
          backgroundColor: theme === 'dark' ? '#3B82F6' : '#FFFFFF',
          height: 3,
          borderRadius: 2,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
        swipeEnabled: true,
        tabBarPressColor: theme === 'dark' ? '#1F2937' : '#F3F4F6',
      }}
    >
      <Tab.Screen name="Assigned Jobs" component={AssignedJobs} />
<Tab.Screen 
  name="Approx Jobs"
  children={() => <ApproxJobs theme={theme} colors={colors} />} 
/>
    </Tab.Navigator>
  );
};



const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// Theme color configuration
// const COLORS = {
//   light: {
//     background: '#F3F4F6',
//     backgroundGradient: ['#FFFFFF', '#F3F4F6'],
//     headerBackground: '#3B82F6',
//     headerText: '#FFFFFF',
//     headerSubtext: 'rgba(255, 255, 255, 0.9)',
//     text: '#111827',
//     subtext: '#6B7280',
//     muted: '#9CA3AF',
//     searchBackground: 'rgba(59, 130, 246, 0.1)',
//     searchText: '#111827',
//     searchPlaceholder: '#9CA3AF',
//     cardBackground: '#FFFFFF',
//     cardBorder: '#E5E7EB',
//     navBackground: '#FFFFFF',
//     navBorder: '#E5E7EB',
//     navText: '#6B7280',
//     navTextActive: '#3B82F6',
//     navIcon: '#6B7280',
//     navIconActive: '#3B82F6',
//     specialButton: '#F97316',
//     specialButtonText: '#FFFFFF',
//     buttonPrimary: '#10B981',
//     buttonText: '#FFFFFF',
//     profileButtonBg: 'rgba(255, 255, 255, 0.2)',
//     notificationButtonBg: 'rgba(255, 255, 255, 0.2)',
//     statusBar: 'dark-content',
//   },
//   dark: {
//     background: '#0F172A',
//     backgroundGradient: ['#0F172A', '#1E293B'],
//     headerBackground: '#1E293B',
//     headerText: '#FFFFFF',
//     headerSubtext: 'rgba(255, 255, 255, 0.8)',
//     text: '#FFFFFF',
//     subtext: '#94A3B8',
//     muted: '#64748B',
//     searchBackground: 'rgba(30, 41, 59, 0.8)',
//     searchText: '#FFFFFF',
//     searchPlaceholder: 'rgba(255, 255, 255, 0.5)',
//     cardBackground: '#1E293B',
//     cardBorder: '#334155',
//     navBackground: '#1E293B',
//     navBorder: '#334155',
//     navText: '#94A3B8',
//     navTextActive: '#FFFFFF',
//     navIcon: '#94A3B8',
//     navIconActive: '#FFFFFF',
//     specialButton: '#F97316',
//     specialButtonText: '#FFFFFF',
//     buttonPrimary: '#10B981',
//     buttonText: '#FFFFFF',
//     profileButtonBg: 'rgba(255, 255, 255, 0.1)',
//     notificationButtonBg: 'rgba(255, 255, 255, 0.1)',
//     statusBar: 'light-content',
//   },
// };

const appData = {
  featured: [
    { id: '1', title: 'Assigned', subtitle: '5 new tasks', buttonText: 'View' },
    { id: '2', title: 'Completed', subtitle: '2 drafts saved', buttonText: 'View' },
    { id: '3', title: 'Pending', subtitle: '3 pending approvals', buttonText: 'View' },
  ],
  navigation: [
    { id: 'home', label: 'Home', icon: 'home', active: true },
    { id: 'settings', label: 'Settings', icon: 'settings', active: false },
    { id: 'create', label: '', icon: 'add', special: true },
    { id: 'favorites', label: 'Favorites', icon: 'favorite', active: false },
    { id: 'profile', label: 'Profile', icon: 'person', active: false },
  ],
 profileStats : [
    { label: 'Assigned', value: '24' },
    { label: 'Completed', value: '8' },
    { label: 'Pending', value: '15' },
  ]
};
const dummyData = [
  { id: '1', title: 'Job 1', description: 'Description for Job 1' },
  { id: '2', title: 'Job 2', description: 'Description for Job 2' },
  { id: '3', title: 'Job 3', description: 'Description for Job 3' },
  { id: '4', title: 'Job 4', description: 'Description for Job 4' },
  { id: '5', title: 'Job 5', description: 'Description for Job 5' },
];



const AssignedJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);
  // const isDarkMode = useColorScheme() === 'dark';
// const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const handleSearch = (text) => {
    const normalizedText = text.toLowerCase().replace(/\s+/g, '').trim();
    setSearchQuery(text);

    if (normalizedText.length >= 3) {
      const filtered = dummyData.filter(item => {
        const title = item.title.toLowerCase().replace(/\s+/g, '').trim();
        const description = item.description.toLowerCase().replace(/\s+/g, '').trim();
        return title.includes(normalizedText) || description.includes(normalizedText);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(dummyData); // Show all if less than 3 characters
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
        borderLeftWidth: 4,
      }}
    >
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        // marginBottom: 8
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#1F2937',
            // marginBottom: 4
          }}>
            {item.title}
          </Text>
    
        </View>
    
      </View>
      
      <Text style={{ 
        fontSize: 14, 
        color: '#4B5563',
        // lineHeight: 20,
        marginBottom: 8
      }}>
        {item.description}
      </Text>
      
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 10
      }}>
        <TouchableOpacity style={{
          backgroundColor: '#F3F4F6',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Ionicons name="eye-outline" size={16} color="#4B5563" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 12, color: '#4B5563', fontWeight: '500' }}>View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{
          backgroundColor: '#3B82F6',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Ionicons name="briefcase-outline" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: '500' }}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={{ 
      flex: 1, 
      // justifyContent: 'center', 
      alignItems: 'center',
      // paddingTop: 20
    }}>
      <Ionicons name="search-outline" size={60} color="#D1D5DB" />
      <Text style={{ 
        textAlign: 'center', 
        marginTop: 16, 
        fontSize: 18, 
        fontWeight: '500',
        color: '#6B7280' 
      }}>
        No jobs found
      </Text>
      
    </View>
  );

  return (
    <View style={{ 
      flex: 1,
      padding: 12,
      backgroundColor: '#F9FAFB'
    }}>
      
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text style={{ 
          fontSize: 20, 
          color: '#111827',
          fontFamily:PlusJakartaSansBold
        }}>
          Assigned Jobs
        </Text>
        <TouchableOpacity style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:5
        }}>
          <Ionicons name="options-outline" size={20} color="#374151" />
        </TouchableOpacity>
      </View>
      
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}>
        <Ionicons name="search-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search jobs..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            flex: 1,
            fontSize: 16,
            color: '#1F2937',
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
      


      {filteredData.length === 0 ? (
        <EmptyListComponent />
      ) : (
        <View style={{ height: 300 }}>
          <FlatList
            data={searchQuery.length >= 3 ? filteredData : dummyData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      </View>
  )
}
const ApproxJobs = ({ theme, colors }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  const handleSearch = (text) => {
    const normalizedText = text.toLowerCase().replace(/\s+/g, '').trim();
    setSearchQuery(text);

    if (normalizedText.length >= 3) {
      const filtered = dummyData.filter(item => {
        const title = item.title.toLowerCase().replace(/\s+/g, '').trim();
        const description = item.description.toLowerCase().replace(/\s+/g, '').trim();
        return title.includes(normalizedText) || description.includes(normalizedText);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(dummyData); // Show all if less than 3 characters
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
  borderLeftWidth: 4,
        borderLeftColor: colors.primary || '#3B82F6'      }}
    >
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        // marginBottom: 8
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#1F2937',
            // marginBottom: 4
          }}>
            {item.title}
          </Text>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            // marginBottom: 10
          }}>
            <View style={{ 
              paddingHorizontal: 8,
              // paddingVertical: 2,
              borderRadius: 12,
              marginRight: 8
            }}>
              <Text style={{ 
                fontSize: 12, 
                fontWeight: '500'
              }}>
                {item.category}
              </Text>
            </View>
            <Text style={{ 
              fontSize: 14,
              color: '#059669',
              fontWeight: '600'
            }}>
              {item.budget}
            </Text>
          </View>
        </View>
 
      </View>
      
      <Text style={{ 
        fontSize: 14, 
        color: '#4B5563',
        // lineHeight: 20,
        marginBottom: 8
      }}>
        {item.description}
      </Text>
      
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 10
      }}>
        <TouchableOpacity style={{
          backgroundColor: '#F3F4F6',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Ionicons name="eye-outline" size={16} color="#4B5563" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 12, color: '#4B5563', fontWeight: '500' }}>View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{
          backgroundColor: '#3B82F6',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Ionicons name="briefcase-outline" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: '500' }}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={{ 
      flex: 1, 
      // justifyContent: 'center', 
      alignItems: 'center',
      // paddingTop: 20
    }}>
      <Ionicons name="search-outline" size={60} color="#D1D5DB" />
      <Text style={{ 
        textAlign: 'center', 
        marginTop: 16, 
        fontSize: 18, 
        fontWeight: '500',
        color: '#6B7280' 
      }}>
        No jobs found
      </Text>
      
    </View>
  );

  return (
    <View style={{ 
      flex: 1,
      padding: 12,
backgroundColor: colors.background
    }}>
      
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold',
color: colors.text 
        }}>
          Available Jobs
        </Text>
        {/* <TouchableOpacity style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:5
        }}>
          <Ionicons name="options-outline" size={20} color={colors.icon || '#374151'} />
        </TouchableOpacity> */}
      </View>
      
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.input || '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}>
        <Ionicons name="search-outline" size={20} color={colors.icon || '#9CA3AF'} style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search jobs..."
          placeholderTextColor={colors.placeholder || '#9CA3AF'}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            flex: 1,
            fontSize: 16,
            color: 'black',
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={20} color={colors.icon || "#9CA3AF"} />
          </TouchableOpacity>
        )}
      </View>
      


      {filteredData.length === 0 ? (
        <EmptyListComponent />
      ) : (
        <View style={{ height: 300 }}>
          <FlatList
            data={searchQuery.length >= 3 ? filteredData : dummyData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      </View>
  )
}

const NavButton = ({ item, onPress, theme }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  // const colors = COLORS[theme];
  
  const onPressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.85,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };
  
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 40,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };
  
  if (item.special) {
    return (
      <TouchableOpacity 
        style={styles.navButtonCenter} 
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View 
          style={[
            styles.navButtonCenterInner,
            { backgroundColor: theme.colors.specialButton },
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Icon name={item.icon} size={24} color={theme.colors.specialButtonText} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={styles.navButton} 
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        <Icon 
          name={item.icon} 
          size={22} 
          color={item.active ? theme.colors.navIconActive : theme.colors.navIcon} 
        />
        <Text style={[
          styles.navText,
          { color: item.active ? theme.colors.navTextActive : theme.colors.navText }
        ]}>{item.label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-100)).current;
  const searchBarTranslateX = useRef(new Animated.Value(-WIDTH)).current;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
    // const { theme } = useContext(ProfileContext);
  const { theme, toggleTheme ,isDarkModee} = useContext(ProfileContext);


  // Toggle theme handler
  const toggleThemee = () => setIsDarkMode((prevState) => !prevState);

  // Animation on component mount
  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(searchBarTranslateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      })
    ]).start();
  }, []);




  const animateSectionChange = (sectionId) => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(scrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
  };

  const handleLogout = () => {
    setIsLoading(true);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(async () => {
      await clearAll();
      dispatch(checkuserToken());
      setIsLoading(false);
    });
  };

  const handleNavPress = (item) => {
    animateSectionChange(item.id);
    switch (item.id) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'settings':
        navigation.navigate('Settings');
        break;
      case 'favorites':
        navigation.navigate('FavoritesScreen');
        break;
      case 'profile':
        navigation.navigate('Profile');
        break;
      case 'create':
        navigation.navigate('CreateJob');
        break;
      default:
        break;
    }
  };
  

  useEffect(() => {
    console.log('Current theme:88888888888888888888888888888888888888', theme);
   
  }, [theme]);

return (
  <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
    <StatusBar barStyle={theme.colors.statusBar} backgroundColor={theme.colors.headerBackground} />

    {/* Header Background */}
    <View style={[styles.headerBackground, { backgroundColor: theme.colors.headerBackground }]} />

    {/* Header */}
    <View style={[styles.header, { backgroundColor: theme.colors.headerBackground }]}>
      <View style={styles.headerContent}>
        <TouchableOpacity 
          style={[styles.profileButton, { backgroundColor: theme.colors.profileButtonBg }]}
          onPress={() => navigation.openDrawer()}
        >
          <Octicons name="three-bars" size={24} color={theme.colors.headerText} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={[styles.welcomeText, { color: theme.colors.headerSubtext }]}>
            Welcome back
          </Text>
          <Text style={[styles.usernameText, { color: theme.colors.headerText }]}>
            LOTUS
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.notificationButton, { backgroundColor: theme.colors.notificationButtonBg }]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={24} color={theme.colors.headerText} />
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Switch
            value={isDarkModee}
            onValueChange={toggleTheme}
            trackColor={{ false: '#E5E7EB', true: '#4B5563' }}
            thumbColor={isDarkMode ? '#FFFFFF' : '#9CA3AF'}
          />
        </View>
      </View>
    </View>

    {/* Main Content */}
    <View style={{ flex: 1 }}>
     
      <View style={[styles.statsContainer, { backgroundColor: theme.colors.cardBackground }]}>
        {appData.profileStats.map((stat, index) => (
          <View
            key={index}
            style={[
              styles.statItem,
              {
                borderRightColor: theme.colors.cardBorder,
                borderRightWidth: index < appData.profileStats.length - 1 ? 1 : 0
              }
            ]}
          >
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Optional Tabs */}
<TopTabs theme={theme} colors={theme.colors} />
    </View>

    {/* Bottom Navigation */}
    <View
      style={[
        styles.bottomNavigation,
        {
          backgroundColor: theme.colors.navBackground,
          borderTopColor: theme.colors.navBorder
        }
      ]}
    >
      {appData.navigation.map(item => (
        <NavButton
          key={item.id}
          item={item}
          onPress={() => handleNavPress(item)}
          theme={theme}
        />
      ))}
    </View>

    {/* Loader */}
    <Loader visible={isLoading} />
  </View>
);


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   listContent: {
    padding: 16,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 14,
          fontFamily:PlusJakartaSansBold
  },
  usernameText: {
    fontSize: 18,
    fontFamily:DMSans36ptBold
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 90,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  statsContainer: {
  flexDirection: 'row',
  marginHorizontal: 20,
  marginVertical: 20,
  borderRadius: 15,
  overflow: 'hidden',
  paddingVertical: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
statItem: {
  flex: 1,
  alignItems: 'center',
  paddingHorizontal: 10,
},
statValue: {
  fontSize: 24,
  // fontWeight: 'bold',
  marginBottom: 5,
fontFamily:UbuntuBold
},
statLabel: {
  fontSize: 14,
  fontWeight: '500',
},
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featuredListContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  featuredRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featuredCard: {
    width: WIDTH * 0.8,
    height: 150,
    borderRadius: 15,
    marginLeft: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  gridCard: {
    width: WIDTH * 0.433,
    height: 130,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
  },
  featuredCardInner: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  quickAccessInner: {
    flex: 1,
    padding: 15,
  },
  featuredTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  quickAccessText: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  featuredSubtitle: {
    fontSize: 14,
    marginBottom: 15,
  },
  quickAccessSubtitle: {
    fontSize: 12,
    marginBottom: 10,
  },
  featuredButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quickAccessButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 10,
  },
  featuredButtonText: {
    fontWeight: 'bold',
  },
  quickAccessButtonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  featuredImagePlaceholder: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAccessImagePlaceholder: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  featuredImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonCenter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  navButtonCenterInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
   card: {
   backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#3B82F6',
  },  
  cardTitle: {
      fontSize: 18,
    fontWeight: '700',
    color: '#111827', 
  },
  cardDescription: {
   marginTop: 8,
    fontSize: 14,
    color: '#4B5563',
  },
});

export default HomeScreen;