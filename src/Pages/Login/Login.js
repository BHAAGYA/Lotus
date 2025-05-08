import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { storeObjByKey } from '../../utils/Storage';
import { checkuserToken } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';


const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const dispatch = useDispatch();
 

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background shapes */}
      <View style={styles.gradientShape1} />
      <View style={styles.gradientShape2} />
      <View style={styles.gradientShape3} />

      {/* Overlay */}
      <View style={styles.blurOverlay} />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.brandName}>Login</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>

          {/* Username */}
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
            <Ionicons name="person" size={22} color="#ffffff" style={styles.inputIcon} />
            </View>
            <TextInput
              placeholder="Username"
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
                  <Ionicons name="lock-closed-outline" size={22} color="#ffffff" style={styles.inputIcon} />
            </View>
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.6)"
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Ionicons
                      name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="#ffffff"
                    />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
              const Token = 'Token'
              console.log('Login', Token)
              storeObjByKey('loginResponse', Token)
              dispatch(checkuserToken())
    
          }}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19', // Dark navy background
  },
  gradientShape1: {
    position: 'absolute',
    top: -HEIGHT * 0.2,
    left: -WIDTH * 0.2,
    width: WIDTH * 0.8,
    height: HEIGHT * 0.5,
    borderRadius: HEIGHT * 0.25,
    backgroundColor: '#4CAF50', // Green
    opacity: 0.7,
    transform: [{ rotate: '35deg' }],
  },
  gradientShape2: {
    position: 'absolute',
    top: HEIGHT * 0.05,
    right: -WIDTH * 0.3,
    width: WIDTH * 0.7,
    height: HEIGHT * 0.3,
    borderRadius: HEIGHT * 0.15,
    backgroundColor: '#2196F3', // Blue
    opacity: 0.6,
    transform: [{ rotate: '-15deg' }],
  },
  gradientShape3: {
    position: 'absolute',
    bottom: -HEIGHT * 0.1,
    right: WIDTH * 0.1,
    width: WIDTH * 0.6,
    height: HEIGHT * 0.3,
    borderRadius: HEIGHT * 0.15,
    backgroundColor: '#FFEB3B', // Yellow
    opacity: 0.5,
    transform: [{ rotate: '20deg' }],
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(11, 15, 25, 0.6)', // Matching container background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF9800', // Orange
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  brandName: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: 3,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)', // Slate blue with transparency
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  iconContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
  },
  forgotPassword: {
    color: '#38BDF8', // Light blue
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FF9800', // Orange
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFA726',
    shadowOffset: { width: 0, height: 4 },     
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
