import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { logoutUser } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../Global/Colors';

export default function Header() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <StatusBar style="light" />
        <View style={styles.row}>
          {user ? (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>La cocinita</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.azulOscuro,
  },
  headerWrapper: {
    backgroundColor: colors.azulOscuro,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 38,
    paddingHorizontal: 14,
    marginTop: 8,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 38,
    fontFamily: 'RobotoSlab',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: "#DCC7BE",
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 18,
    elevation: 2,
  },
  logoutButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 120,
    height: 1,
  },
});



