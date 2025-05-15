import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    TextInput,
    TouchableOpacity,
    Switch,
    Image,
    Alert,
    Platform,
    KeyboardAvoidingView
  } from 'react-native'
  import React, { useState } from 'react'
import { MyStatusBar } from '../../constants/config'
import HeaderComp from '../../components/Header/HeaderComp'
import LinearGradient from 'react-native-linear-gradient'
  
  const EditPage = () => {
    const [firstName, setFirstName] = useState('John')
    const [lastName, setLastName] = useState('Doe')
    const [email, setEmail] = useState('john.doe@example.com')
    const [phone, setPhone] = useState('+1234567890')
    const [bio, setBio] = useState('A passionate developer who loves creating amazing mobile apps.')
    const [notifications, setNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [newsletter, setNewsletter] = useState(false)
    
    const handleSave = () => {
      Alert.alert(
        'Profile Updated',
        'Your changes have been saved successfully!',
        [{ text: 'OK' }]
      )
    }
    
    const handleCancel = () => {
      Alert.alert(
        'Discard Changes?',
        'Are you sure you want to discard your changes?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', style: 'destructive' }
        ]
      )
    }
    
    const handleImageEdit = () => {
      Alert.alert(
        'Change Profile Picture',
        'Choose an option',
        [
          { text: 'Take Photo', onPress: () => console.log('Camera') },
          { text: 'Choose from Gallery', onPress: () => console.log('Gallery') },
          { text: 'Cancel', style: 'cancel' }
        ]
      )
    }
  
    return (

        <LinearGradient
        colors={['#0D1B2A', '#1E3A8A', '#4F81BD']}
        style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
               <MyStatusBar barStyle="dark-content" backgroundColor={'rgb(255, 183, 0)'} />
                            <HeaderComp
                              title="Profile"
                              leftIcon="arrow-left"
                              backgroundColor="rgb(255, 183, 0)"
                              titleColor="#ffffff"
                              iconColor="#ffffff"
                              onLeftPress={() => navigation.goBack()}
                              showShadow={false}
                            />   
      <KeyboardAvoidingView 
        // style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
        
          
          {/* Profile Image Section */}
          <View style={styles.profileImageSection}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/120' }}
                style={styles.profileImage}
              />
              <TouchableOpacity 
                style={styles.editImageButton}
                onPress={handleImageEdit}
              >
                <Text style={styles.editImageText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Name Fields */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                placeholderTextColor="#999"
              />
            </View>
            
            {/* Contact Fields */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
            
            {/* Bio Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell us about yourself"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
          
          {/* Settings Section */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Push Notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={notifications ? '#fff' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={darkMode ? '#fff' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Newsletter</Text>
              <Switch
                value={newsletter}
                onValueChange={setNewsletter}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={newsletter ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </LinearGradient>
    )
  }
  
  export default EditPage
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#f5f5f5',
    },
    scrollContent: {
      paddingBottom: 20,
    },
    header: {
    //   backgroundColor: '#fff',
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    profileImageSection: {
      alignItems: 'center',
      paddingVertical: 30,
    //   backgroundColor: '#fff',
    },
    imageContainer: {
      position: 'relative',
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: '#4CAF50',
    },
    editImageButton: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      backgroundColor: '#4CAF50',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
    },
    editImageText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    formSection: {
    //   backgroundColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',

      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    inputGroup: {
      marginBottom: 20, 
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#f8f8f8',
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      color: '#333',
    },
    textArea: {
      height: 100,
      paddingTop: 12,
    },
    settingsSection: {
    //   backgroundColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',

      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    switchLabel: {
      fontSize: 16,
      color: '#333',
    },
    buttonSection: {
      marginTop: 30,
      paddingHorizontal: 20,
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 8,
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    cancelButtonText: {
      color: '#666',
      fontSize: 18,
      fontWeight: '600',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      borderRadius: 8,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 20,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  })