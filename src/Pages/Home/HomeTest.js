import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  Animated,
  FlatList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { clearAll } from '../../utils/Storage';
import { useDispatch } from 'react-redux';
import { checkuserToken } from '../../redux/actions/auth';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// Mock data for featured content
const featuredItems = [
    { id: '1', title: 'Assigned', subtitle: '5 new tasks' },
    { id: '2', title: 'Completed', subtitle: '2 drafts saved' },
    { id: '3', title: 'Pending', subtitle: '3 pending approvals' },
];




const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
const dispatch = useDispatch()
  // Animation on component mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  // Header animation based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Render featured item card
  const renderFeaturedItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * WIDTH * 0.8,
      index * WIDTH * 0.8,
      (index + 1) * WIDTH * 0.8,
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
          { transform: [{ scale }] }
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
  const getGroupedLayout = (items) => {
    const grouped = [];
    let i = 0;
    while (i < items.length) {
      // Two-item row
      if (i + 1 < items.length) {
        grouped.push([items[i], items[i + 1]]);
        i += 2;
      }
      // Single centered item
      if (i < items.length) {
        grouped.push([items[i]]);
        i += 1;
      }
    }
    return grouped;
  };
  

  const renderFeaturedRow = ({ item }) => {
    const isSingle = item.length === 1;
    return (
      <View
        style={[
          styles.featuredRow,
          isSingle && { justifyContent: 'center' },
        ]}
      >
        {item.map((cardItem, idx) => (
          <View key={cardItem.id} style={styles.featuredCardGrid}>
            <View style={styles.quickAccessInner}>
              <View style={styles.quickAccessText}>
                <Text style={styles.quickAccessTitle}>{cardItem.title}</Text>
                <Text style={styles.quickAccessSubtitle}>{cardItem.subtitle}</Text>
                <TouchableOpacity style={styles.quickAccessButton}>
                  <Text style={styles.quickAccessButtonText}>Open</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.quickAccessImagePlaceholder}>
                {/* <View style={styles.quickAccessImage} /> */}
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };
  
  
//   // Render recommended item card


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background elements */}
     
      
      {/* Animated header */}
      <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]} />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.profileButton}>
          <Octicons name="three-bars" size={24} color="#fff" />

          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.usernameText}>LOTUS</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}
           onPress={
            () => {
                console.log('Home')
                clearAll()
                dispatch(checkuserToken())

            }
        }
          >
          <Icon name="logout" size={24} color="#fff" />

          </TouchableOpacity>
        </View>
      </View>
      
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
          <View style={styles.searchContainer}>
            <View style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products or services..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {/* Featured section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <FlatList
  data={getGroupedLayout(featuredItems)}
  renderItem={renderFeaturedRow}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={styles.featuredListContainer}
/>

          </View>



          <View style={[styles.sectionContainer, { alignItems: 'center' }]}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <FlatList
                vertical 
              data={featuredItems}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredListContainer}
              snapToInterval={WIDTH * 0.85}
              snapToAlignment="center"
              decelerationRate="fast"
            />
          </View>
        
      

        </Animated.View>
      </Animated.ScrollView>
      
      {/* Bottom navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <View style={[styles.navIcon, styles.navIconActive]} />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.navIcon} />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButtonCenter}>
          <View style={styles.navButtonCenterInner} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.navIcon} />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 26, 255, 0.82)',
  },
  
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 103,
    backgroundColor: 'rgba(132, 0, 255, 0.82)',
    zIndex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 50,
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 15,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  notificationIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    borderWidth: 1,
    borderColor: '#10002B',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a1a',

  },
  contentContainer: {
    paddingBottom: 90,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 25,
    
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    marginBottom: 15,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#9D4EDD',
    fontWeight: '600',
  },
  featuredListContainer: {
    paddingLeft: 20,
    paddingRight: 5,
  },
  featuredCard: {
    width: WIDTH * 0.8,
    height: 180,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: '#3a506b',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featuredCardInner: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  featuredTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f7fff7',
    marginBottom: 5,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
  },
  featuredButton: {
    backgroundColor: '#9D4EDD',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  featuredImagePlaceholder: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
 
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(20, 3, 43, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonCenter: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonCenterInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9D4EDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#9D4EDD',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'rgba(20, 3, 43, 0.95)',
    transform: [{ translateY: -15 }],
  },
  navIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 5,
  },
  navIconActive: {
    backgroundColor: '#9D4EDD',
  },
  navText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  navTextActive: {
    color: '#fff',
    fontWeight: '500',
  },

  

  
  quickAccessInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  
  quickAccessText: {
    marginRight: 8,
  },
  
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  
  quickAccessSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  
  quickAccessButton: {
    marginTop: 6,
    backgroundColor: '#4e9bde',
    // paddingVertical: 6,
    borderRadius: 8,
    height: 30,
    width: 50,
  },
  
  quickAccessButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    paddingVertical: 6,
  },
  
  quickAccessImagePlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  quickAccessImage: {
    width: 20,
    height: 20,
    backgroundColor: '#aaa',
    borderRadius: 4,
  },
  featuredRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginRight:15
  },
  featuredCardGrid: {
    backgroundColor: '#333',
width: WIDTH * 0.42,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 5,
  },
});
