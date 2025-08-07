import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/store';
import ShopNavigator from './src/navigation/ShopNavigator';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


export default function App() {


  const [fontsLoaded] = useFonts({
    'RobotoSlab': require('./assets/fonts/RobotoSlab-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});






