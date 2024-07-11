import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const iniciarSesion = () => {
    if (correo && contrasenia) {
      signInWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert("Mensaje", "¡Inicio de sesión exitoso!");
          navigation.navigate('Main'); 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Error", "Hubo un problema al iniciar sesión: " + errorMessage);
        });
    } else {
      Alert.alert("Advertencia", "Por favor ingresa tu correo y contraseña.");
    }
  };

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/vector-premium/elegante-fondo-negro-brillos-dorados_94047-55.jpg?w=360" }} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerdos}>
          <Text style={styles.text}>¡Inicia sesión a OverCapital Bank!</Text>
          <Text style={styles.textDos}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu correo"
            placeholderTextColor='#434242f7'
            value={correo}
            onChangeText={text => setCorreo(text)}
          />
          <Text style={styles.textDos}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor='#434242f7'
            value={contrasenia}
            secureTextEntry={true}
            onChangeText={text => setContrasenia(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={() => { iniciarSesion(); }}>
            <Text style={styles.btntext}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
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
  containerdos: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272829',
    borderRadius: 30,
    padding: 20,
  },
  text: {
    fontSize: 22,
    marginVertical: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textDos: {
    textAlign: "left",
    color: "white",
    fontSize: 19,
    marginVertical: 5,
  },
  btn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#C07F00',
    borderRadius: 5,
    alignItems: 'center',
  },
  btntext: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "80%",
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 21,
    fontSize: 20,
    backgroundColor: '#1c1c1cf7',
    paddingHorizontal: 20,
    color: 'white',
    textAlign: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
