import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { MyStatusBar } from '../../constants/config';
import HeaderComp from '../../components/Header/HeaderComp';
import { useNavigation } from '@react-navigation/native';
import { POSTNETWORK } from '../../utils/Network';
import { BASE_URL } from '../../constants/url';

const ChangePassword = () => {
  const navigation = useNavigation();

  const [userID, setUserID] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!userID) {
      newErrors.userID = 'User ID is required';
      valid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
      valid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await POSTNETWORK(
          `${BASE_URL}changepassword`,
          { 
            NewPassword: newPassword,
            UserId: userID,
          },
          true,
          false
        );
  
        if (response?.status === true || response?.success === true) {
          Alert.alert('Success', 'Password reset successfully!');
          setUserID('');
          setNewPassword('');
          setConfirmPassword('');
          setErrors({});
        } else {
          Alert.alert('Error', response?.detail || 'Failed to reset password');
        }
      } catch (error) {
        console.error('Password reset error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
    colors={['#0D1B2A', '#1E3A8A', '#4F81BD']}
    start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
       <MyStatusBar barStyle="dark-content" backgroundColor={'rgb(255, 183, 0)'} />
                <HeaderComp
                  title="Change Password"
                  leftIcon="arrow-left"
                  backgroundColor="rgb(255, 183, 0)"
                  titleColor="#ffffff" 
                  iconColor="#ffffff"
                  onLeftPress={() => navigation.goBack()}
                  showShadow={false}
                />        
        <SafeAreaView style={styles.safeArea}>
       

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.scroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formContainer}>
                <View style={styles.formHeader}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="lock-closed-outline" size={32} color="#FFFFFF" />
                  </View>
                  <Text style={styles.formTitle}>Create a new password</Text>
                  
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>User ID</Text>
                  <View style={[styles.inputWrapper, errors.userID && styles.inputError]}>
                    <Ionicons name="person-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={userID}
                      onChangeText={(text) => {
                        setUserID(text);
                        if (errors.userID) {
                          setErrors({ ...errors, userID: '' });
                        }
                      }}
                      placeholder="Enter your user ID"
                      placeholderTextColor="#64748B"
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.userID && <Text style={styles.error}>{errors.userID}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>New Password</Text>
                  <View style={[styles.inputWrapper, errors.newPassword && styles.inputError]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={newPassword}
                      onChangeText={(text) => {
                        setNewPassword(text);
                        if (errors.newPassword) {
                          setErrors({ ...errors, newPassword: '' });
                        }
                      }}
                      placeholder="Enter new password"
                      placeholderTextColor="#64748B"
                      secureTextEntry={!showNewPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowNewPassword(!showNewPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#94A3B8"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.newPassword && <Text style={styles.error}>{errors.newPassword}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={confirmPassword}
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (errors.confirmPassword) {
                          setErrors({ ...errors, confirmPassword: '' });
                        }
                      }}
                      placeholder="Confirm new password"
                      placeholderTextColor="#64748B"
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#94A3B8"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 75,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E2E8F0',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: 'rgb(255, 183, 0)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  passwordRequirements: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    padding: 16,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 12,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  requirementMet: {
    color: '#10B981',
  },
});