import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import Header from '../components/Header';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log("TOCADO el botón login");
    if (!email || !password) {
      Alert.alert("Error", "Completá todos los campos");
      return;
    }

    try {
      console.log("Intentando loguear con:", email, password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login exitoso:", userCredential.user);

      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }));

    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
      Alert.alert("Error al iniciar sesión", error.message);
    }
  };

  return (
    <View>
      <Header/>
      <View  style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10 }}
      />
      <Button
        style={{ color: "#145C9E" }}
        title="Iniciar Sesión"
        onPress={() => {
          console.log("BOTON TOCADO");
          handleLogin();
        }}
      />

      <Text
        style={{ marginTop: 10, color: "#145C9E" }}
        onPress={() => navigation.navigate('SignUp')}
      >
        ¿No tenés cuenta? Registrate
      </Text>
      </View>
    
    </View>
  );
}


