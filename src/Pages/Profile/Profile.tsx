import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MyStatusBar } from '../../constants/config';
import HeaderComp from '../../components/Header/HeaderComp';
import { GETNETWORK } from '../../utils/Network';
import { BASE_URL } from '../../constants/url';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ProfileContext } from '../ProfileContext/ProfileContext';

const { width } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [avatarUri, setAvatarUri] = useState(null);
  const { avatarUri: contextAvatarUri, updateProfileImage, theme, toggleTheme } = useContext(ProfileContext);

  // Sample user data - replace with actual user data
  const userData = {
    name: 'John Doe',
    email: 'vijay@123',
    location: 'Odisha, BBSR',
    LastUpdate: '12/05/25',
    jobTitle: 'Senior Developer',
    department: 'Engineering',
    phone: '+91 9876543210',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
  };

  const profileStats = [
    { label: 'Assigned', value: '24', icon: 'briefcase-outline', color: theme.colors.primary },
    { label: 'Completed', value: '8', icon: 'checkmark-circle-outline', color: theme.colors.success },
    { label: 'Pending', value: '15', icon: 'time-outline', color: theme.colors.warning },
  ];

 

  useEffect(() => {
    userDetails();
  }, []);

  useEffect(() => {
    console.log('Current theme:', theme);
  }, [theme]);

  const userDetails = async () => {
    try {
      const data = await GETNETWORK(`${BASE_URL}userdetails`, true);
      console.log('User details:', data);
      setUser(data?.data_value);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const options = {
    mediaType: 'photo',
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.8,
  };

  const openCamera = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setAvatarUri(uri);
          updateProfileImage(uri);
        }
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorCode) {
        console.log('Gallery Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setAvatarUri(uri);
          updateProfileImage(uri);
        }
      }
    });
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            console.log('User logged out');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <MyStatusBar 
        barStyle={theme.colors.statusBar} 
        backgroundColor={theme.colors.headerBackground} 
      />
      
      <HeaderComp
        title="Profile"
        leftIcon="arrow-left"
        backgroundColor={theme.colors.headerBackground}
        titleColor={theme.colors.headerText}
        iconColor={theme.colors.headerText}
        onLeftPress={() => navigation.goBack()}
        showShadow={false}
        rightIcon="settings"
        onRightPress={() => navigation.navigate('Settings')}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* Profile Header */}
          <View style={[styles.profileHeader, { backgroundColor: theme.colors.cardBackground }]}>
            <LinearGradient
              colors={[theme.colors.primary + '20', theme.colors.primary + '10']}
              style={styles.profileHeaderGradient}
            >
              <View style={styles.avatarSection}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={
                      avatarUri || contextAvatarUri
                        ? { uri: avatarUri || contextAvatarUri }
                        : require('../../assets/images/lotus_infrastructure.jpg')
                    }
                    style={[styles.avatar, { borderColor: theme.colors.primary }]}
                  />
                  <TouchableOpacity
                    style={[styles.editAvatarButton, { backgroundColor: theme.colors.primary }]}
                    activeOpacity={0.7}
                    onPress={showImagePickerOptions}
                  >
                    <Ionicons name="camera" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                <View style={styles.userDetails}>
                  <Text style={[styles.userName, { color: theme.colors.text }]}>
                    {user[0]?.UserName || userData.name}
                  </Text>
                  <Text style={[styles.userTitle, { color: theme.colors.primary }]}>
                    {user[0]?.UserId}
                  </Text>
                 
                </View>

                <TouchableOpacity
                  style={[styles.themeToggle, { backgroundColor: theme.colors.surface }]}
                  onPress={toggleTheme}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name={theme.dark ? "sunny-outline" : "moon-outline"} 
                    size={20} 
                    color={theme.colors.text} 
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Contact Information */}
          <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Contact Information
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <View style={[styles.contactIconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
                  <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={[styles.contactLabel, { color: theme.colors.subtext }]}>Email</Text>
                  <Text style={[styles.contactValue, { color: theme.colors.text }]}>
                    {userData.email}
                  </Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <View style={[styles.contactIconContainer, { backgroundColor: theme.colors.secondary + '20' }]}>
                  <Ionicons name="call-outline" size={20} color={theme.colors.secondary} />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={[styles.contactLabel, { color: theme.colors.subtext }]}>Phone</Text>
                  <Text style={[styles.contactValue, { color: theme.colors.text }]}>
                    {userData.phone}
                  </Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <View style={[styles.contactIconContainer, { backgroundColor: theme.colors.success + '20' }]}>
                  <Ionicons name="location-outline" size={20} color={theme.colors.success} />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={[styles.contactLabel, { color: theme.colors.subtext }]}>Location</Text>
                  <Text style={[styles.contactValue, { color: theme.colors.text }]}>
                    {userData.location}
                  </Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <View style={[styles.contactIconContainer, { backgroundColor: theme.colors.info + '20' }]}>
                  <Ionicons name="calendar-outline" size={20} color={theme.colors.info} />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={[styles.contactLabel, { color: theme.colors.subtext }]}>Last Update</Text>
                  <Text style={[styles.contactValue, { color: theme.colors.text }]}>
                    {userData.LastUpdate}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View style={[styles.statsCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Statistics
            </Text>
            <View style={styles.statsContainer}>
              {profileStats.map((stat, index) => (
                <View key={index} style={[styles.statItem, { backgroundColor: theme.colors.surface }]}>
                  <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
                    <Ionicons name={stat.icon} size={24} color={stat.color} />
                  </View>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>
                    {stat.value}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>


          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeaderGradient: {
    padding: 24,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userDepartment: {
    fontSize: 14,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  contactInfo: {
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  statsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  menuContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 13,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 32,
  },
});