import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { db, auth } from '../config/config'; 

export default function PerfilScreen() {
  const [userData, setUserData] = useState({
    usuario: '',
    correo: '',
    celular: ''
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const nodoUsuario = ref(db, 'usuario/' + user.uid);
      const listener = onValue(nodoUsuario, (snapshot) => {
        const usuarioGuardado = snapshot.val();
        if (usuarioGuardado) {
          setUserData(usuarioGuardado);
        } else {
          Alert.alert("Error", "No se encontraron datos del usuario.");
        }
      });

      return () => {
        listener();
      };
    } else {
      Alert.alert("Error", "No hay usuario autenticado.");
    }
  }, []);

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/vector-premium/elegante-fondo-negro-brillos-dorados_94047-55.jpg?w=360" }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Perfil de Usuario</Text>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{userData.usuario}</Text>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{userData.correo}</Text>
        <Text style={styles.label}>Celular:</Text>
        <Text style={styles.value}>{userData.celular}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    marginVertical: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "white",
    marginVertical: 5,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

