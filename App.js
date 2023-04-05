import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Screens/Home';
import Detail from './Screens/Detail';
import Login from './Screens/Login';

import { firebase } from './config';

const Stack = createStackNavigator();

const AuthContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

    const signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('Signed out successfully');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const authContextValue = useMemo(
    () => ({
      signIn: async (email, password) => {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
          alert(error.message);
        }
      },
      signOut: async () => {
        try {
          await firebase.auth().signOut();
        } catch (error) {
          alert(error.message);
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen 
                name='Home' 
                children={(props) => <Home {...props} signOut={signOut} />} 
              />
              <Stack.Screen 
                name='Detail'
                children={(props) => <Detail {...props} signOut={signOut} />}
              />
            </>
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}