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
  Alert,
} from 'react-native';
import { storeObjByKey } from '../../utils/Storage';
import { checkuserToken } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { POSTNETWORK } from '../../utils/Network';
import { BASE_URL } from '../../constants/url';
import { Loader } from '../../components/Loader';
import CustomAlert from '../../components/Alertmodal/CustomAlert ';
import LinearGradient from 'react-native-linear-gradient';
import WavyCardBackground from './WavyCardBackground';
import { MyStatusBar } from '../../constants/config';
import { BRAND, BRANDBLUE, BRANDRED } from '../../constants/color';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('ERROR'); 
  const dispatch = useDispatch();
  const navigation=useNavigation()


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const handleLogin = async () => {
    const payload = {
      userid: username,
      password: password,
    };
  
    try {
      setIsLoading(true); // Show loader
  
      const response = await POSTNETWORK(
        `${BASE_URL}login`,
        payload,
        false,
        false
      );
  
      if (response?.token || response?.status === 'success') {
        setToken(response?.token);
        storeObjByKey('loginResponse', response);
        dispatch(checkuserToken(response?.token));
        console.log('Login successful:', response);
       
      } 
      
      else {
Alert.alert(response?.message || 'Invalid username or password')        
        console.error('Login failed:', response?.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false); // Hide loader
    }
  };
  

  
  
  


  return (
    <LinearGradient
    colors={['#0D1B2A', '#1E3A8A', '#4F81BD']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}
  >     
   <MyStatusBar barStyle="dark-content" backgroundColor={'rgb(255, 183, 0)'} />

      <View style={styles.gradientShape1} />
      <View style={styles.gradientShape2} />
      <View style={styles.gradientShape3} />

      {/* <View style={styles.blurOverlay} /> */}

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.brandName}>Login</Text>
        </View>
        {/* <WavyCardBackground style={{ position: 'absolute', top: 0, zIndex: -1 }} height={220} /> */}

        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
            <Ionicons name="person" size={22} color="#3B588A" style={styles.inputIcon} />
            </View>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#5D7A9C"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
                  <Ionicons name="lock-closed-outline" size={22} color="#3B588A" style={styles.inputIcon} />
            </View>
            <TextInput
              placeholder="Password"
              placeholderTextColor='#5D7A9C'
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
                      color="#f95d00"
                    />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={()=>{
            navigation.navigate("ForgotPassword")
          }}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
              // const Token = 'Token'
              // console.log('Login', Token)
              // storeObjByKey('loginResponse', Token)
              // dispatch(checkuserToken())
              handleLogin()
    
          }}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    <Loader visible={isLoading} /> 
    {/* <CustomAlert
        visible={showAlert}
        title={alertType === 'SUCCESS' ? 'Login Success' : 'Login Failed'}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
        type={alertType}
        autoClose={false}
        showCloseButton={true}
      /> */}
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#201E4B'
  },
  gradientShape1: {
    position: 'absolute',
    top: -HEIGHT * 0.2,
    left: -WIDTH * 0.2,
    width: WIDTH * 0.8,
    height: HEIGHT * 0.5,
    borderRadius: HEIGHT * 0.25,
    backgroundColor: 'rgb(255, 183, 0)', // Softer overlay
    opacity: 0.7,
    transform: [{ rotate: '50deg' }],
  },
  gradientShape2: {
    position: 'absolute',
    top: HEIGHT * 0.3,
    right: -WIDTH * 0.3,
    width: WIDTH * 0.7,
    height: HEIGHT * 0.3,
    borderRadius: HEIGHT * 0.15,
    // backgroundColor: '#00B8A9', // Bright Teal
    backgroundColor: 'rgb(255, 0, 51)', // Softer overlay

    opacity: 0.7,
    transform: [{ rotate: '-15deg' }],
  },
  gradientShape3: {
    position: 'absolute',
    bottom: HEIGHT * 0.03,
    left: -WIDTH * 0.5,
    width: WIDTH * 0.99,
    height: HEIGHT * 0.3,
    borderRadius: HEIGHT * 0.15,
    backgroundColor: '#A685E2', // Soft Violet
    opacity: 0.7,
    transform: [{ rotate: '20deg' }],
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6F00', // Vibrant Orange
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1', // Bold Denim
  },
  brandName: {
    fontSize: 16,
    color: '#00ACC1', // Bright Turquoise
    letterSpacing: 3,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFF1EB',
    // borderRadius: 24,
    padding: 30,
    shadowColor: '#00ACC1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
borderTopLeftRadius:40,
borderTopRightRadius:10,
borderBottomLeftRadius:20,
borderBottomRightRadius:40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#90A4AE',
    marginBottom: 20,
    overflow: 'hidden',
    borderBottomColor:'#FF6F00',
    borderBottomWidth:0.5
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
    backgroundColor: '#90A4AE',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#0B4470',
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
    color: '#00ACC1',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FF6F00', // Vibrant Orange
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6F00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});



