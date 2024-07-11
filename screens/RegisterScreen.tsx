import { onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { db, auth } from '../config/config'; 
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }: any) {

  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [celular, setCelular] = useState('');

  const guardarUsuario = () => {
    if (usuario && correo && contrasenia && celular) {
      createUserWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
          const user = userCredential.user;
          set(ref(db, 'usuario/' + user.uid), {
            usuario: usuario,
            correo: correo,
            contrasenia: contrasenia,
            celular: celular,
          })
            .then(() => {
              Alert.alert("Mensaje", "¡Usuario registrado correctamente!");
              setUsuario('');
              setCorreo('');
              setContrasenia('');
              setCelular('');
              navigation.navigate('Welcome');
            })
            .catch(error => {
              Alert.alert("Error", "Hubo un problema al registrar el usuario en la base de datos: " + error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Error", "Hubo un problema al registrar el usuario: " + errorMessage);
        });
    } else {
      Alert.alert("Advertencia", "Por favor ingresa todos los campos.");
    }
  };

  useEffect(() => {
    const nodoUsuario = ref(db, 'usuario/' + usuario);
    const listener = onValue(nodoUsuario, (snapshot) => {
      const usuarioGuardado = snapshot.val();
      if (usuarioGuardado) {
        console.log("Usuario guardado correctamente:", usuarioGuardado);
      }
    });

    return () => {
      listener();
    };
  }, [usuario]);

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/vector-premium/elegante-fondo-negro-brillos-dorados_94047-55.jpg?w=360" }} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerdos}>
          <Text style={styles.text}>¡Crea tu cuenta bancaria con nosotros!</Text>
          <Text style={styles.textDos}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            placeholderTextColor='#434242f7'
            value={usuario}
            onChangeText={text => setUsuario(text)}
          />
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
          <Text style={styles.textDos}>Celular</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu número de celular"
            placeholderTextColor='#434242f7'
            value={celular}
            onChangeText={text => setCelular(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={() => { guardarUsuario(); }}>
            <Text style={styles.btntext}>REGISTRAR</Text>
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
