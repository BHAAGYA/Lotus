// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   Image,
//   Animated,
//   FlatList,
//   TextInput,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import { clearAll } from '../../utils/Storage';
// import { useDispatch } from 'react-redux';
// import { checkuserToken } from '../../redux/actions/auth';

// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// // Mock data for featured content
// const featuredItems = [
//     { id: '1', title: 'Assigned', subtitle: '5 new tasks' },
//     { id: '2', title: 'Completed', subtitle: '2 drafts saved' },
//     { id: '3', title: 'Pending', subtitle: '3 pending approvals' },
// ];




// const HomeScreen = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;
// const dispatch = useDispatch()
//   // Animation on component mount
//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 900,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   // Header animation based on scroll
//   const headerOpacity = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });

//   // Render featured item card
//   const renderFeaturedItem = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * WIDTH * 0.8,
//       index * WIDTH * 0.8,
//       (index + 1) * WIDTH * 0.8,
//     ];
    
//     const scale = scrollY.interpolate({
//       inputRange,
//       outputRange: [0.9, 1, 0.9],
//       extrapolate: 'clamp',
//     });

//     return (
//       <Animated.View 
//         style={[
//           styles.featuredCard,
//           { transform: [{ scale }] }
//         ]}
//       >
//         <View style={styles.featuredCardInner}>
//           <View style={styles.featuredTextContainer}>
//             <Text style={styles.featuredTitle}>{item.title}</Text>
//             <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
//             <TouchableOpacity style={styles.featuredButton}>
//               <Text style={styles.featuredButtonText}>View</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.featuredImagePlaceholder}>
//             <View style={styles.featuredImage} />
//           </View>
//         </View>
//       </Animated.View>
//     );
//   };
//   const getGroupedLayout = (items) => {
//     const grouped = [];
//     let i = 0;
//     while (i < items.length) {
//       // Two-item row
//       if (i + 1 < items.length) {
//         grouped.push([items[i], items[i + 1]]);
//         i += 2;
//       }
//       // Single centered item
//       if (i < items.length) {
//         grouped.push([items[i]]);
//         i += 1;
//       }
//     }
//     return grouped;
//   };
  

//   const renderFeaturedRow = ({ item }) => {
//     const isSingle = item.length === 1;
//     return (
//       <View
//         style={[
//           styles.featuredRow,
//           isSingle && { justifyContent: 'center' },
//         ]}
//       >
//         {item.map((cardItem, idx) => (
//           <View key={cardItem.id} style={styles.featuredCardGrid}>
//             <View style={styles.quickAccessInner}>
//               <View style={styles.quickAccessText}>
//                 <Text style={styles.quickAccessTitle}>{cardItem.title}</Text>
//                 <Text style={styles.quickAccessSubtitle}>{cardItem.subtitle}</Text>
//                 <TouchableOpacity style={styles.quickAccessButton}>
//                   <Text style={styles.quickAccessButtonText}>Open</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.quickAccessImagePlaceholder}>
//                 {/* <View style={styles.quickAccessImage} /> */}
//               </View>
//             </View>
//           </View>
//         ))}
//       </View>
//     );
//   };
  
  
// //   // Render recommended item card


//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       {/* Background elements */}
     
      
//       {/* Animated header */}
//       <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]} />
      
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity style={styles.profileButton}>
//           <Octicons name="three-bars" size={24} color="#fff" />

//           </TouchableOpacity>
//           <View style={styles.headerTitleContainer}>
//             <Text style={styles.welcomeText}>Welcome back</Text>
//             <Text style={styles.usernameText}>LOTUS</Text>
//           </View>
//           <TouchableOpacity style={styles.notificationButton}
//            onPress={
//             () => {
//                 console.log('Home')
//                 clearAll()
//                 dispatch(checkuserToken())

//             }
//         }
//           >
//           <Icon name="logout" size={24} color="#fff" />

//           </TouchableOpacity>
//         </View>
//       </View>
      
//       <Animated.ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentContainer}
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//         scrollEventThrottle={16}
//       >
//         <Animated.View style={{ opacity: fadeAnim }}>
//           <View style={styles.searchContainer}>
//             <View style={styles.searchIcon} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search products or services..."
//               placeholderTextColor="rgba(255, 255, 255, 0.5)"
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//           </View>
          
//           {/* Featured section */}
//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Featured</Text>
//             <FlatList
//   data={getGroupedLayout(featuredItems)}
//   renderItem={renderFeaturedRow}
//   keyExtractor={(item, index) => index.toString()}
//   contentContainerStyle={styles.featuredListContainer}
// />

//           </View>



//           <View style={[styles.sectionContainer, { alignItems: 'center' }]}>
//             <Text style={styles.sectionTitle}>Featured</Text>
//             <FlatList
//                 vertical 
//               data={featuredItems}
//               renderItem={renderFeaturedItem}
//               keyExtractor={(item) => item.id}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.featuredListContainer}
//               snapToInterval={WIDTH * 0.85}
//               snapToAlignment="center"
//               decelerationRate="fast"
//             />
//           </View>
        
      

//         </Animated.View>
//       </Animated.ScrollView>
      
//       {/* Bottom navigation */}
//       <View style={styles.bottomNavigation}>
//         <TouchableOpacity style={styles.navButton}>
//           <View style={[styles.navIcon, styles.navIconActive]} />
//           <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <View style={styles.navIcon} />
//           <Text style={styles.navText}>Discover</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButtonCenter}>
//           <View style={styles.navButtonCenterInner} />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <View style={styles.navIcon} />
//           <Text style={styles.navText}>Favorites</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <View style={styles.navIcon} />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 26, 255, 0.82)',
//   },
  
//   headerBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 103,
//     backgroundColor: 'rgba(132, 0, 255, 0.82)',
//     zIndex: 1,
//   },
//   header: {
//     paddingTop: Platform.OS === 'ios' ? 50 : 50,
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//     zIndex: 2,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   profileButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   profileIcon: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.6)',
//   },
//   headerTitleContainer: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   welcomeText: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.7)',
//   },
//   usernameText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   notificationButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   notificationIcon: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: 'rgba(255, 255, 255, 0.6)',
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#FF6B6B',
//     borderWidth: 1,
//     borderColor: '#10002B',
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: '#1a1a1a',

//   },
//   contentContainer: {
//     paddingBottom: 90,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.08)',
//     borderRadius: 16,
//     marginHorizontal: 20,
//     marginVertical: 15,
//     paddingHorizontal: 15,
//     height: 50,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   searchIcon: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     color: '#fff',
//     fontSize: 16,
//   },
//   sectionContainer: {
//     marginTop: 25,
    
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginLeft: 20,
//     marginBottom: 15,
//   },
//   sectionHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginBottom: 15,
//   },
//   seeAllText: {
//     fontSize: 14,
//     color: '#9D4EDD',
//     fontWeight: '600',
//   },
//   featuredListContainer: {
//     paddingLeft: 20,
//     paddingRight: 5,
//   },
//   featuredCard: {
//     width: WIDTH * 0.8,
//     height: 180,
//     marginRight: 15,
//     borderRadius: 20,
//     backgroundColor: '#3a506b',
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   featuredCardInner: {
//     flex: 1,
//     flexDirection: 'row',
//     padding: 20,
//   },
//   featuredTextContainer: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   featuredTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#f7fff7',
//     marginBottom: 5,
//   },
//   featuredSubtitle: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.7)',
//     marginBottom: 20,
//   },
//   featuredButton: {
//     backgroundColor: '#9D4EDD',
//     borderRadius: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     alignSelf: 'flex-start',
//   },
//   featuredButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   featuredImagePlaceholder: {
//     width: 80,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   featuredImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
 
//   bottomNavigation: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 70,
//     backgroundColor: 'rgba(20, 3, 43, 0.95)',
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(255, 255, 255, 0.1)',
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     paddingBottom: Platform.OS === 'ios' ? 20 : 0,
//   },
//   navButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   navButtonCenter: {
//     width: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   navButtonCenterInner: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#9D4EDD',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     shadowColor: '#9D4EDD',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.5,
//     shadowRadius: 8,
//     elevation: 8,
//     borderWidth: 3,
//     borderColor: 'rgba(20, 3, 43, 0.95)',
//     transform: [{ translateY: -15 }],
//   },
//   navIcon: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     backgroundColor: 'rgba(255, 255, 255, 0.4)',
//     marginBottom: 5,
//   },
//   navIconActive: {
//     backgroundColor: '#9D4EDD',
//   },
//   navText: {
//     fontSize: 12,
//     color: 'rgba(255, 255, 255, 0.5)',
//   },
//   navTextActive: {
//     color: '#fff',
//     fontWeight: '500',
//   },

  

  
//   quickAccessInner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//   },
  
//   quickAccessText: {
//     marginRight: 8,
//   },
  
//   quickAccessTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
  
//   quickAccessSubtitle: {
//     fontSize: 12,
//     color: '#777',
//   },
  
//   quickAccessButton: {
//     marginTop: 6,
//     backgroundColor: '#4e9bde',
//     // paddingVertical: 6,
//     borderRadius: 8,
//     height: 30,
//     width: 50,
//   },
  
//   quickAccessButtonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//     textAlign: 'center',
//     alignSelf: 'center',
//     paddingVertical: 6,
//   },
  
//   quickAccessImagePlaceholder: {
//     width: 30,
//     height: 30,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
//   quickAccessImage: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#aaa',
//     borderRadius: 4,
//   },
//   featuredRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     marginRight:15
//   },
//   featuredCardGrid: {
//     backgroundColor: '#333',
// width: WIDTH * 0.42,
//     borderRadius: 12,
//     padding: 10,
//     marginHorizontal: 5,
//   },
// });

















import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Dimensions 
} from 'react-native';
import React, { useContext } from 'react';
import { ProfileContext } from '../ProfileContext/ProfileContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BRAND } from '../../constants/color';
import { MyStatusBar } from '../../constants/config';
import HeaderComp from '../../components/Header/HeaderComp';

const { width } = Dimensions.get('window');

const CreateJob = () => {
  const { theme } = useContext(ProfileContext);
  const navigation = useNavigation();

  // Sample job data (you can replace this with real data from your backend)
  const recentJobs = [
    {
      id: 1,
      title: 'Senior React Native Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: '$120k - $180k',
      type: 'Full-time',
      posted: '2 days ago',
      status: 'Active'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      salary: '$80k - $120k',
      type: 'Contract',
      posted: '5 days ago',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Startup Inc',
      location: 'Remote',
      salary: '$100k - $140k',
      type: 'Full-time',
      posted: '1 week ago',
      status: 'Active'
    }
  ];

  const renderJobCard = (job) => (
    <TouchableOpacity
      key={job.id}
      style={[styles.jobCard, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('JobDetails', { jobId: job.id })}
    >
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleSection}>
          <Text style={[styles.jobTitle, { color: theme.colors.text }]}>{job.title}</Text>
          <Text style={[styles.jobCompany, { color: theme.colors.textSecondary }]}>{job.company}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: job.status === 'Active' ? '#4CAF50' : '#FFA500' }]}>
          <Text style={styles.statusText}>{job.status}</Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{job.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{job.salary}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="briefcase-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{job.type}</Text>
        </View>
      </View>

      <View style={styles.jobFooter}>
        <Text style={[styles.postedText, { color: theme.colors.textSecondary }]}>Posted {job.posted}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="pencil-outline" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color="#FF5252" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <MyStatusBar backgroundColor="rgb(255, 183, 0)" barStyle="dark-content" />
      <HeaderComp
        title="Create Job"
        leftIcon="arrow-left"
        backgroundColor="rgb(255, 183, 0)"
        titleColor="#ffffff"
        iconColor="#ffffff"
        onLeftPress={() => navigation.goBack()}
        showShadow={false}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Your Job Postings</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewJobForm')}
            style={styles.addButton}
          >
            <Ionicons name="add-circle-outline" size={30} color="rgb(255, 183, 0)" />
          </TouchableOpacity>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="briefcase" size={30} color="rgb(255, 183, 0)" />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Total Jobs</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="checkmark-circle" size={30} color="#4CAF50" />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>8</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Active</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="people" size={30} color="#2196F3" />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>156</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Applicants</Text>
          </View>
        </View>

        {/* Create New Job CTA */}
        <TouchableOpacity
          style={[styles.createJobCTA, { backgroundColor: 'rgb(255, 183, 0)' }]}
          onPress={() => navigation.navigate('NewJobForm')}
        >
          <Ionicons name="add-circle" size={40} color="#ffffff" />
          <View style={styles.ctaTextContainer}>
            <Text style={styles.ctaTitle}>Create New Job</Text>
            <Text style={styles.ctaSubtitle}>Start hiring talented professionals</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Recent Jobs Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Jobs</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: 'rgb(255, 183, 0)' }]}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentJobs.map(renderJobCard)}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

export default CreateJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  createJobCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  ctaTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  jobCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobTitleSection: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedText: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 12,
    padding: 4,
  },
}); 



import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Switch
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../ProfileContext/ProfileContext';
import HeaderComp from '../../components/Header/HeaderComp';
import { MyStatusBar } from '../../constants/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddJob = () => {
  const { theme } = useContext(ProfileContext);
  const navigation = useNavigation();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    department: '',
    minSalary: '',
    maxSalary: '',
    description: '',
    requirements: '',
    benefits: '',
    type: 'full-time',
    experience: 'entry',
    isRemote: false,
    isUrgent: false,
  });

  const jobTypes = [
    { label: 'Full-time', value: 'full-time' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Contract', value: 'contract' },
    { label: 'Internship', value: 'internship' },
  ];

  const experienceLevels = [
    { label: 'Entry Level', value: 'entry' },
    { label: 'Mid Level', value: 'mid' },
    { label: 'Senior Level', value: 'senior' },
    { label: 'Expert', value: 'expert' },
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add your submission logic here
    navigation.goBack();
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <MyStatusBar backgroundColor="rgb(255, 183, 0)" barStyle="dark-content" />
      
      <HeaderComp
        title="Create Job"
        leftIcon="arrow-left"
        backgroundColor="rgb(255, 183, 0)"
        titleColor="#ffffff"
        iconColor="#ffffff"
        onLeftPress={() => navigation.goBack()}
        showShadow={false}
      />

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Job Title */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Job No. *</Text>
            <TextInput
              style={[styles.input, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.inputBackground || theme.colors.card,
                borderColor: theme.colors.border
              }]}
              placeholder="Job No."
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.title}
              onChangeText={(text) => updateFormData('title', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Client Name *</Text>
            <TextInput
              style={[styles.input, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.inputBackground || theme.colors.card,
                borderColor: theme.colors.border
              }]}
              placeholder="Client Name"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.company}
              onChangeText={(text) => updateFormData('company', text)}
            />
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Location *</Text>
            <TextInput
              style={[styles.input, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.inputBackground || theme.colors.card,
                borderColor: theme.colors.border
              }]}
              placeholder="e.g. San Francisco, CA"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.location}
              onChangeText={(text) => updateFormData('location', text)}
            />
          </View>

         

          {/* Salary Range */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Salary Range *</Text>
            <View style={styles.salaryRow}>
              <TextInput
                style={[styles.salaryInput, { 
                  color: theme.colors.text,
                  backgroundColor: theme.colors.inputBackground || theme.colors.card,
                  borderColor: theme.colors.border
                }]}
                placeholder="Min"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.minSalary}
                onChangeText={(text) => updateFormData('minSalary', text)}
                keyboardType="numeric"
              />
              <Text style={[styles.salaryDash, { color: theme.colors.text }]}>—</Text>
              <TextInput
                style={[styles.salaryInput, { 
                  color: theme.colors.text,
                  backgroundColor: theme.colors.inputBackground || theme.colors.card,
                  borderColor: theme.colors.border
                }]}
                placeholder="Max"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.maxSalary}
                onChangeText={(text) => updateFormData('maxSalary', text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Job Type */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Job Type *</Text>
            <View style={styles.optionsRow}>
              {jobTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.optionButton,
                    { borderColor: theme.colors.border },
                    formData.type === type.value && styles.optionButtonActive
                  ]}
                  onPress={() => updateFormData('type', type.value)}
                >
                  <Text style={[
                    styles.optionText,
                    { color: theme.colors.text },
                    formData.type === type.value && styles.optionTextActive
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Experience Level */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Experience Level *</Text>
            <View style={styles.optionsRow}>
              {experienceLevels.map((level) => (
                <TouchableOpacity
                  key={level.value}
                  style={[
                    styles.optionButton,
                    { borderColor: theme.colors.border },
                    formData.experience === level.value && styles.optionButtonActive
                  ]}
                  onPress={() => updateFormData('experience', level.value)}
                >
                  <Text style={[
                    styles.optionText,
                    { color: theme.colors.text },
                    formData.experience === level.value && styles.optionTextActive
                  ]}>
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Remote & Urgent Switches */}
          <View style={styles.switchesContainer}>
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Remote Position</Text>
              <Switch
                value={formData.isRemote}
                onValueChange={(value) => updateFormData('isRemote', value)}
                trackColor={{ false: '#767577', true: 'rgb(255, 183, 0)' }}
                thumbColor={formData.isRemote ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Urgent Hiring</Text>
              <Switch
                value={formData.isUrgent}
                onValueChange={(value) => updateFormData('isUrgent', value)}
                trackColor={{ false: '#767577', true: 'rgb(255, 183, 0)' }}
                thumbColor={formData.isUrgent ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Job Description */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Job Description *</Text>
            <TextInput
              style={[styles.textArea, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.inputBackground || theme.colors.card,
                borderColor: theme.colors.border
              }]}
              placeholder="Describe the role and responsibilities..."
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.description}
              onChangeText={(text) => updateFormData('description', text)}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Requirements */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Requirements *</Text>
            <TextInput
              style={[styles.textArea, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.inputBackground || theme.colors.card,
                borderColor: theme.colors.border
              }]}
              placeholder="List the required skills and qualifications..."
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.requirements}
              onChangeText={(text) => updateFormData('requirements', text)}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Benefits */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Benefits</Text>
            <TextInput
              style={[styles.textArea, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.inputBackground || theme.colors.card,
                borderColor: theme.colors.border
              }]}
              placeholder="List the benefits and perks..."
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.benefits}
              onChangeText={(text) => updateFormData('benefits', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.draftButton, { borderColor: theme.colors.border }]}
              onPress={() => console.log('Save as draft')}
            >
              <Text style={[styles.draftButtonText, { color: theme.colors.text }]}>Save as Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Post Job</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  salaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  salaryDash: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionButtonActive: {
    backgroundColor: 'rgb(255, 183, 0)',
    borderColor: 'rgb(255, 183, 0)',
  },
  optionText: {
    fontSize: 14,
  },
  optionTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  switchesContainer: {
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchLabel: {
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 30,
  },
  draftButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: 'rgb(255, 183, 0)',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});




















const handleCreateJob = async () => {
  const url = "http://192.168.0.211/job/api/createjob";

  try {
    const result = await POSTNETWORK(url, formData, true);
    console.log('Job API response:', result);

    if (result?.status === 'success') {
      Alert.alert('Success', 'Job added successfully!');
      navigation.goBack(); // Refetches job list on previous screen
    } else {
      Alert.alert('Error', result?.message || 'Failed to add job');
    }
  } catch (error) {
    console.error('Error posting job:', error);
    Alert.alert('Error', 'Failed to submit job');
  }
};