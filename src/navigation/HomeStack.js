import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Pages/Home/Home';
// Add more screen imports as needed
import CustomDrawerContent from './CustomDrawerContent';
import ContentPage from '../Pages/ContentPage/ContentPage';
import changeProfile from '../Pages/ChangeProfile/changeProfile';
import Settings from '../Pages/Settings/Settings';
import Profile from '../Pages/Profile/Profile';
import EditPage from '../Pages/EditPage/EditPage';
import CreateJob from '../Pages/Create/CreateJob';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack navigator (e.g., Home and inner screens)
const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      {/* Add more Stack Screens if needed */}
      <Stack.Screen name='changeProfile'
      component={changeProfile}
       options={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      />
      <Stack.Screen name='Settings'
      component={Settings}
       options={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      />
      <Stack.Screen name='Profile'
      component={Profile}
       options={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      />
      <Stack.Screen name='EditPage'
      component={EditPage}
       options={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      />
      <Stack.Screen name='CreateJob'
      component={CreateJob}
       options={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      />
    </Stack.Navigator>
  );
};

// Drawer navigator (wraps the stack)
const HomeDrawer: React.FC = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{ headerShown: false }}
  > 
  
          <Drawer.Screen name="Dashboard" component={HomeStack} />
          {/* <Drawer.Screen name="ContentPage" component={ContentPage} /> */}


      {/* Add more drawer items here, if needed */}
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
