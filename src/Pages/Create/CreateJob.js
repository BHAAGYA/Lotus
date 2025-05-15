import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ProfileContext } from '../ProfileContext/ProfileContext';

const CreateJob = () => {
      const { theme, toggleTheme  } = useContext(ProfileContext);
    
  return (
    <View style=
    {{
        backgroundColor:theme.colors.background,
        flex:1
    }}>
      
    </View>
  )
}

export default CreateJob

const styles = StyleSheet.create({})