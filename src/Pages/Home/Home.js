
import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { clearAll } from '../../utils/Storage';
import { useDispatch } from 'react-redux';
import { checkuserToken } from '../../redux/actions/auth';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// Mock data for all content sections
const appData = {
  featured: [
    { id: '1', title: 'Assigned', subtitle: '5 new tasks', buttonText: 'View' },
    { id: '2', title: 'Completed', subtitle: '2 drafts saved', buttonText: 'View' },
    { id: '3', title: 'Pending', subtitle: '3 pending approvals', buttonText: 'View' },
  ],
  navigation: [
    { id: 'home', label: 'Home', icon: 'home', active: true },
    { id: 'discover', label: 'Discover', icon: 'search', active: false },
    { id: 'create', label: '', icon: 'add', special: true },
    { id: 'favorites', label: 'Favorites', icon: 'favorite', active: false },
    { id: 'profile', label: 'Profile', icon: 'person', active: false },
  ]
};

// Reusable card component
const ContentCard = ({ item, style, isHorizontal, index = 0 }) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Staggered animation effect based on index
    const delay = index * 100;
    
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, []);

  const cardStyles = isHorizontal ? styles.featuredCard : styles.gridCard;
  const titleStyles = isHorizontal ? styles.featuredTitle : styles.quickAccessTitle;
  const subtitleStyles = isHorizontal ? styles.featuredSubtitle : styles.quickAccessSubtitle;
  const buttonStyles = isHorizontal ? styles.featuredButton : styles.quickAccessButton;
  const buttonTextStyles = isHorizontal ? styles.featuredButtonText : styles.quickAccessButtonText;

  const [isPressed, setIsPressed] = useState(false);
  
  const onPressIn = () => setIsPressed(true);
  const onPressOut = () => setIsPressed(false);
  
  // Card press animation
  const cardScale = isPressed ? 0.97 : 1;

  return (
    <Animated.View 
      style={[
        cardStyles, 
        style,
        { 
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }] 
        }
      ]}
    >
      {/* <TouchableOpacity 
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ flex: 1, transform: [{ scale: cardScale }] }}
      > */}
        <View style={isHorizontal ? styles.featuredCardInner : styles.quickAccessInner}>
          <View style={isHorizontal ? styles.featuredTextContainer : styles.quickAccessText}>
            <Text style={titleStyles}>{item.title}</Text>
            <Text style={subtitleStyles}>{item.subtitle}</Text>
            <TouchableOpacity 
              style={buttonStyles}
              onPress={() => console.log(`${item.title} button pressed`)}
            >
              <Text style={buttonTextStyles}>{item.buttonText || 'Open'}</Text>
            </TouchableOpacity>
          </View>
          <View style={isHorizontal ? styles.featuredImagePlaceholder : styles.quickAccessImagePlaceholder}>
            {/* Placeholder for images */}
          </View>
        </View>
    </Animated.View>
  );
};

// Reusable section component with animations
const ContentSection = ({ title, data, renderItem, horizontal = false, style }) => {
    const titleAnim = useRef(new Animated.Value(0)).current;
    const listAnim = useRef(new Animated.Value(horizontal ? WIDTH : 50)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.sequence([
        Animated.timing(titleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.spring(listAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);
  
    return (
      <View style={[styles.sectionContainer, style]}>
        <Animated.Text
          style={[
            styles.sectionTitle,
            {
              opacity: titleAnim,
              transform: [
                {
                  translateY: titleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {title}
        </Animated.Text>
    <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
        <Animated.View
          style={{
            transform: [horizontal ? { translateX: listAnim } : { translateY: listAnim }],
            width: '100%',
          }}
        >
         <Animated.FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
//   horizontal={horizontal}
  onScroll={
    scrollY
      ? Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )
      : null
  }
  scrollEventThrottle={16}
  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
  snapToInterval={WIDTH * 0.85}
  snapToAlignment="center"
  decelerationRate="fast"
  contentContainerStyle={styles.featuredListContainer}
/>

        </Animated.View>
        </Animated.ScrollView>
      </View>
    );
  };
  

// NavButton component
const NavButton = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
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
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Icon name={item.icon} size={24} color="#fff" />
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
        <Icon name={item.icon} size={22} color={item.active ? "#fff" : "#aaa"} />
        <Text style={[styles.navText, item.active && styles.navTextActive]}>{item.label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-100)).current;
  const searchBarTranslateX = useRef(new Animated.Value(-WIDTH)).current;
  const dispatch = useDispatch();

  // Animation on component mount
  useEffect(() => {
    // Sequence of animations for a smooth app startup
    Animated.sequence([
      // Header slides down
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      
      // Search bar slides in from left
      Animated.timing(searchBarTranslateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      
      // Main content fades in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      })
    ]).start();
  }, []);

  // Header animation based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Render horizontal featured item
  const renderFeaturedItem = ({ item, index, scrollY }) => {
    const ITEM_HEIGHT = 250; // Adjust to your actual card height
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];
  
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });
  
    return (
      <Animated.View
        style={[
          styles.featuredCard,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.featuredCardInner}>
          <View style={styles.featuredTextContainer}>
            <Text style={styles.featuredTitle}>{item.title}</Text>
            <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
            <TouchableOpacity style={styles.featuredButton}>
              <Text style={styles.featuredButtonText}>View</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuredImagePlaceholder}>
            <View style={styles.featuredImage} />
          </View>
        </View>
      </Animated.View>
    );
  };
  

  // Render grid layout
  const renderGridLayout = () => {
    const rows = [];
    let i = 0;
    const items = [...appData.featured]; // Clone to avoid mutations
    
    while (i < items.length) {
      const rowItems = i + 1 < items.length ? [items[i], items[i + 1]] : [items[i]];
      const isSingleItem = rowItems.length === 1;
      
      rows.push(
        <View key={`row-${i}`} style={[styles.featuredRow, isSingleItem && { justifyContent: 'center' }]}>
          {rowItems.map((item, idx) => (
            <ContentCard 
              key={item.id} 
              item={item} 
              isHorizontal={false} 
              index={i + idx} 
            />
          ))}
        </View>
      );
      
      i += 2;
    }
    
    return <View>{rows}</View>;
  };

  // Animation for section transitions
  const animateSectionChange = (sectionId) => {
    // Create a wave effect by animating opacity and scale
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

  // Handle navigation item press
  const handleNavPress = (item) => {
    // Animate the section change
    animateSectionChange(item.id);
    
    // if (item.id === 'home') {
    //   // Animate before logout
    //   Animated.sequence([
    //     Animated.timing(fadeAnim, {
    //       toValue: 0.5,
    //       duration: 300,
    //       useNativeDriver: true
    //     }),
    //     Animated.timing(fadeAnim, {
    //       toValue: 0,
    //       duration: 300,
    //       useNativeDriver: true
    //     })
    //   ]).start(() => {
    //     clearAll();
    //     dispatch(checkuserToken());
    //   });
    // }
    // Add other navigation handling here
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated header background */}
      <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]} />
      
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] }
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.profileButton}
            // onPress={() => {
            //   // Add a wobble animation to the menu button
            //   const wobbleAnim = Animated.sequence([
            //     Animated.timing(headerTranslateY, { toValue: -5, duration: 50, useNativeDriver: true }),
            //     Animated.timing(headerTranslateY, { toValue: 5, duration: 100, useNativeDriver: true }),
            //     Animated.timing(headerTranslateY, { toValue: -3, duration: 100, useNativeDriver: true }),
            //     Animated.timing(headerTranslateY, { toValue: 0, duration: 50, useNativeDriver: true })
            //   ]);
            //   wobbleAnim.start();
            // }}
          >
            <Octicons name="three-bars" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.usernameText}>LOTUS</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => {
              // Add scale animation before logout
              Animated.sequence([
                Animated.timing(fadeAnim, {
                  toValue: 0.5,
                  duration: 300,
                  useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true
                })
              ]).start(() => {
                clearAll();
                dispatch(checkuserToken());
              });
            }}
          >
            <Icon name="logout" size={24} color="#Dc4D01" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      {/* Main content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Search bar */}
          <Animated.View 
            style={[
              styles.searchContainer,
              { transform: [{ translateX: searchBarTranslateX }] }
            ]}
          >
            <Icon name="search" size={20} color="rgba(255,255,255,0.5)" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products or services..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => {
                // Light pulse animation when search is focused
                Animated.sequence([
                  Animated.timing(searchBarTranslateX, {
                    toValue: 5,
                    duration: 100,
                    useNativeDriver: true
                  }),
                  Animated.timing(searchBarTranslateX, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                  })
                ]).start();
              }}
            />
          </Animated.View>
          
          {/* Grid layout section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            {renderGridLayout()}
          </View>
          
          {/* Horizontal scrolling section */}
          <ContentSection
  title="Featured"
  data={appData.featured}
  renderItem={({ item, index }) =>
    renderFeaturedItem({ item, index, scrollY })
  }
  horizontal={false}
  style={{ alignItems: 'center' }}
  scrollY={scrollY}
/>


        </Animated.View>
      </Animated.ScrollView>
      
      {/* Bottom navigation */}
      <View style={styles.bottomNavigation}>
        {appData.navigation.map(item => (
          <NavButton 
            key={item.id} 
            item={item} 
            onPress={() => handleNavPress(item)} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep blue background
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#3B82F6', // Bright blue header
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
    alignItems: 'center',
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  usernameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(215, 180, 180, 0.91)',
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
    backgroundColor: 'rgba(185, 226, 206, 0.41)', 
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#fff',
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featuredListContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },  
  gridListContainer: {
    width: '100%',
  },
  featuredRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featuredCard: {
    width: WIDTH * 0.8,
    height: 150,
    backgroundColor: '#1E293B', // Card background
    borderRadius: 15,
    marginLeft: 20,
    overflow: 'hidden',
  },
  gridCard: {
    width: WIDTH * 0.43,
    height: 130,
    backgroundColor: '#1E293B', // Card background
    borderRadius: 15,
    overflow: 'hidden',
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quickAccessTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  featuredSubtitle: {
    color: '#94A3B8', // Muted text color
    fontSize: 14,
    marginBottom: 15,
  },
  quickAccessSubtitle: {
    color: '#94A3B8', // Muted text color
    fontSize: 12,
    marginBottom: 10,
  },
  featuredButton: {
    backgroundColor: '#10B981', // Teal accent color
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quickAccessButton: {
    backgroundColor: '#10B981', // Teal accent color
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quickAccessButtonText: {
    color: '#fff',
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
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#1E293B', // Nav bar background
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    backgroundColor: '#F97316', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  navButtonCenterInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F97316', // Teal accent color
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: '#94A3B8', // Muted text
    fontSize: 12,
    marginTop: 4,
  },
  navTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;