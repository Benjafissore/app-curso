import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function ProfileScreen() {
  const user = useSelector(state => state.auth.user);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación denegado');
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Perfil de usuario</Text>
        {user ? (
          <>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </>
        ) : (
          <Text>No hay usuario logueado.</Text>
        )}
        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Ubicación actual:</Text>
          {loading && <ActivityIndicator />}
          {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Mi ubicación"
              />
            </MapView>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  label: { fontSize: 18, color: 'gray' },
  value: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  mapContainer: { marginTop: 24, width: 320, height: 220, borderRadius: 12, overflow: 'hidden', backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  mapTitle: { fontWeight: 'bold', marginBottom: 8 },
  map: { width: '100%', height: '85%' },
});