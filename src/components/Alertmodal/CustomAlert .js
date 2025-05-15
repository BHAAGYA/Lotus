import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { HEIGHT, WIDTH } from '../../constants/config';

const { width } = Dimensions.get('window');

// Alert types with their respective colors
const ALERT_TYPES = {
  SUCCESS: {
    backgroundColor: 'rgba(16, 185, 129, 0.9)', // Green with transparency
    borderColor: '#10B981', // Green
    iconText: '✓',
    iconBackgroundColor: '#10B981', // Green
    title: 'Success',
  },
  ERROR: {
    backgroundColor: 'rgb(255, 111, 0)', // Red with transparency
    borderColor: '#EF4444', // Red
    // iconText: '✕',
    iconBackgroundColor: '#EF4444', // Red
    title: 'Error',
  },
  WARNING: {
    backgroundColor: 'rgba(245, 158, 11, 0.9)', // Amber with transparency
    borderColor: '#F59E0B', // Amber
    iconText: '!',
    iconBackgroundColor: '#F59E0B', // Amber
    title: 'Warning',
  },
  INFO: {
    backgroundColor: 'rgba(59, 130, 246, 0.9)', // Blue with transparency
    borderColor: '#3B82F6', // Blue
    iconText: 'i',
    iconBackgroundColor: '#3B82F6', // Blue
    title: 'Info',
  },
};

const CustomAlert = ({
  visible,
  type = 'INFO',
  title,
  message,
  onClose,
  autoClose = true,
  duration = 3000,
  showCloseButton = true,
  onAction,
  actionText,
}) => {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Determine alert style based on type
  const alertStyle = ALERT_TYPES[type.toUpperCase()] || ALERT_TYPES.INFO;
  
  useEffect(() => {
    let closeTimeout;
    
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Auto close if enabled
      if (autoClose) {
        closeTimeout = setTimeout(() => {
          handleClose();
        }, duration);
      }
    } else {
      // Reset animation values when not visible
      slideAnim.setValue(-width);
      fadeAnim.setValue(0);
    }
    
    // Clear timeout on cleanup
    return () => {
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [visible]);
  
  const handleClose = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onClose) onClose();
    });
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.overlay} />
        <Animated.View
          style={[
            styles.alertContainer,
            {
              backgroundColor: alertStyle.backgroundColor,
              borderColor: alertStyle.borderColor,
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
       
          
          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>
              {title || alertStyle.title}
            </Text>
            {message && <Text style={styles.messageText}>{message}</Text>}
            
            {/* Action Button (optional) */}
            {onAction && actionText && (
              <TouchableOpacity 
                style={[
                  styles.actionButton, 
                  { backgroundColor: alertStyle.iconBackgroundColor }
                ]} 
                onPress={() => {
                  onAction();
                  handleClose();
                }}
              >
                <Text style={styles.actionButtonText}>{actionText}</Text>
              </TouchableOpacity>
            )}
                {showCloseButton && (
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          )}
          </View>
          
          {/* Close Button */}
      
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
      width: WIDTH * 0.9,
      height: HEIGHT * 0.3,
      padding: 20,
      borderRadius: 16,
      borderLeftWidth: 5,
      backgroundColor: 'pink',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 6,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      alignSelf: 'center',
    },
    iconText: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: 'bold',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#111827',
      textAlign: 'center',
      marginBottom: 8,
    },
    messageText: {
      fontSize: 15,
      color: '#374151',
      textAlign: 'center',
      paddingHorizontal: 10,
    },
    closeButton: {
      position: 'absolute',
      bottom: 12,
      alignSelf: 'center',
      paddingVertical: 8,
      paddingHorizontal: 30,
      backgroundColor: '#3B82F6', // default blue
      borderRadius: 8,
    },
    closeButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    actionButton: {
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginTop: 12,
      backgroundColor: '#10B981', // Default green action
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
  });
  

export default CustomAlert;
