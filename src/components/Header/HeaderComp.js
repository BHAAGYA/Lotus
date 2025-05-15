import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
const HeaderComp = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  backgroundColor = '#ffffff',
  titleColor = '#000000',
  iconColor = '#000000',
  showShadow = true,
}) => {
  return (
    <View style={[
      styles.container, 
      { backgroundColor },
      showShadow && styles.shadow
    ]}>
      {/* <StatusBar
        barStyle={backgroundColor === '#ffffff' ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundColor}
      /> */}
      
      {/* Left Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={onLeftPress}
        disabled={!onLeftPress}
      >
        {leftIcon && (
          <Feather name={leftIcon} size={24} color={iconColor} />
        )}
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text 
          style={[styles.title, { color: titleColor }]} 
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* Right Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={onRightPress}
        disabled={!onRightPress}
      >
        {rightIcon && (
          <Feather name={rightIcon} size={24} color={iconColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 88 : 56,
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    paddingHorizontal: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HeaderComp;