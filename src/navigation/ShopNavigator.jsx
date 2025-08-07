import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../screens';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Stack = createNativeStackNavigator();

export default function ShopNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
       
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        
        <>
          <Stack.Screen name="Root" component={TabNavigator} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </>
      )}
    </Stack.Navigator>
  );
}
