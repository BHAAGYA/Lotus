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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MyStatusBar } from '../../constants/config';
import HeaderComp from '../../components/Header/HeaderComp';
import { GETNETWORK } from '../../utils/Network';
import { BASE_URL } from '../../constants/url';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ProfileContext } from '../ProfileContext/ProfileContext';


const Profile = () => {
  const navigation = useNavigation();
  const [user,setUser]=useState('')
  const [avatarUri, setAvatarUri] = useState(null); // state for image URI
  const { avatarUri: contextAvatarUri, updateProfileImage,theme, toggleTheme  } = useContext(ProfileContext);


  // Sample user data - replace with actual user data
  const userData = {
    name: 'John Doe',
    email: 'vijay@123',
    location: 'Odisha, BBSR',
    LastUpdate: '12/05/25',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg', // Replace with actual image
  };

  const profileStats = [
    { label: 'Assigned', value: '24' },
    { label: 'Completed', value: '8' },
    { label: 'Pending', value: '15' },
  ];

 
    useEffect(() => {
      userDetails();
    }, []);
  
  
   useEffect(() => {
    console.log('Current theme:999999999999999999999999999999', theme);
   
  }, [theme]);
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
                setAvatarUri(uri);             // local state update
                updateProfileImage(uri);       // global context update
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
              setAvatarUri(uri);             // local state update
              updateProfileImage(uri);       // global context update
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
  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <MyStatusBar barStyle={theme.colors.statusBar} backgroundColor={theme.colors.headerBackground} />
      <HeaderComp
        title="Profile"
        leftIcon="arrow-left"
        backgroundColor={theme.colors.headerBackground}
        titleColor={theme.colors.headerText}
        iconColor={theme.colors.headerText}
        onLeftPress={() => navigation.goBack()}
        showShadow={false}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <View style={[styles.profileCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  avatarUri
                    ? { uri: avatarUri }
                    : require('../../assets/images/lotus_infrastructure.jpg')
                }
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
              <TouchableOpacity
                style={[styles.editAvatarButton, { backgroundColor: theme.colors.profileButtonBg }]}
                activeOpacity={0.7}
                onPress={showImagePickerOptions}
              >
                <Ionicons name="camera" size={16} color={theme.colors.headerText} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.userName, { color: theme.colors.text }]}>{user[0]?.UserName}</Text>
            <Text style={[styles.userTitle, { color: theme.colors.subtext }]}>{user[0]?.UserId}</Text>

            <View style={styles.userInfo}>
              <View style={styles.infoItem}>
                <Ionicons name="mail-outline" size={16} color={theme.colors.muted} />
                <Text style={[styles.infoText, { color: theme.colors.subtext }]}>
                  {userData.email}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={16} color={theme.colors.muted} />
                <Text style={[styles.infoText, { color: theme.colors.subtext }]}>
                  {userData.location}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={16} color={theme.colors.muted} />
                <Text style={[styles.infoText, { color: theme.colors.subtext }]}>
                  {userData.LastUpdate}
                </Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              {profileStats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#0D1B2A',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 16,
  },
  userInfo: {
    width: '100%',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#CBD5E1',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#94A3B8',
  },
  menuContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 16,
    borderRadius: 20,
    paddingVertical: 8,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 8,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 13,
    color: '#94A3B8',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});