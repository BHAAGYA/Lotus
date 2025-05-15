import React from 'react';
import Navigation from './src/navigation/Navigation';
import { ProfileProvider } from './src/Pages/ProfileContext/ProfileContext';

const App = () => {
  return (
    <ProfileProvider>
  <Navigation />
  </ProfileProvider>
)
};

export default App;
