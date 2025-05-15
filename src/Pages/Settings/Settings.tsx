import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import  LinearGradient  from 'react-native-linear-gradient';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MyStatusBar } from '../../constants/config';
import HeaderComp from '../../components/Header/HeaderComp';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Your logout logic here
    console.log('Logout pressed');
  };

  return (
    <LinearGradient
    colors={['#0D1B2A', '#1E3A8A', '#4F81BD']}
    style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
          <MyStatusBar barStyle="dark-content" backgroundColor={'rgb(255, 183, 0)'} />
                <HeaderComp
                  title="Settings"
                  leftIcon="arrow-left"
                  backgroundColor="rgb(255, 183, 0)"
                  titleColor="#ffffff"
                  iconColor="#ffffff"
                  onLeftPress={() => navigation.goBack()}
                  showShadow={false}
                />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your account preferences</Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.option} 
              onPress={() => navigation.navigate('EditPage')}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="key-outline" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Edit Profile</Text>
                  <Text style={styles.optionDescription}>Update your information</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.option} 
              onPress={() => navigation.navigate('changeProfile')}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="key-outline" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Change Password</Text>
                  <Text style={styles.optionDescription}>Update your account password</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} activeOpacity={0.7}>
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Notifications</Text>
                  <Text style={styles.optionDescription}>Manage notification preferences</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} activeOpacity={0.7}>
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="privacy-tip" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Privacy Policy</Text>
                  <Text style={styles.optionDescription}>Read our privacy terms</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} activeOpacity={0.7}>
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="information-circle-outline" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>About</Text>
                  <Text style={styles.optionDescription}>App version and information</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={[styles.option, styles.logoutOption]} 
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <View style={[styles.iconContainer, styles.logoutIconContainer]}>
                  <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
                  <Text style={[styles.optionDescription, styles.logoutDescription]}>
                    Sign out of your account
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    fontWeight: '400',
  },
  optionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 16,
    borderRadius: 20,
    paddingVertical: 8,
    backdropFilter: 'blur(10px)',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  logoutOption: {
    marginBottom: 8,
  },
  logoutIconContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  logoutText: {
    color: '#EF4444',
  },
  logoutDescription: {
    color: '#F87171',
  },
});

export default SettingsScreen;