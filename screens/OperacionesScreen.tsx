import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { db } from '../config/config';
import { TextInput } from 'react-native-gesture-handler';
import { ref, set } from 'firebase/database';

export default function OperacionesScreen() {
  const [idOperacion, setIdOperacion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('');
  const [comentario, setComentario] = useState('');

  const guardarOperacion = () => {
    if (idOperacion && monto && tipoOperacion && comentario) {
      set(ref(db, 'operaciones/' + idOperacion), {
        idOperacion: idOperacion,
        monto: monto,
        tipoOperacion: tipoOperacion,
        comentario: comentario,
      })
      .then(() => {
        Alert.alert("Mensaje", "¡Operación registrada correctamente!");
        setIdOperacion('');
        setMonto('');
        setTipoOperacion('');
        setComentario('');
      })
      .catch(error => {
        Alert.alert("Error", "Hubo un problema al registrar la operación: " + error.message);
      });
    } else {
      Alert.alert("Advertencia", "Por favor completa todos los campos.");
    }
  };

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/vector-premium/elegante-fondo-negro-brillos-dorados_94047-55.jpg?w=360" }} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerdos}>
          <Text style={styles.text}>Registro de Operación</Text>
          <Text style={styles.textDos}>ID Operación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa ID de la operación"
            placeholderTextColor='#434242f7'
            value={idOperacion}
            onChangeText={text => setIdOperacion(text)}
          />
          <Text style={styles.textDos}>Monto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el monto"
            placeholderTextColor='#434242f7'
            value={monto}
            onChangeText={text => setMonto(text)}
          />
          <Text style={styles.textDos}>Tipo de Operación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el tipo de operación"
            placeholderTextColor='#434242f7'
            value={tipoOperacion}
            onChangeText={text => setTipoOperacion(text)}
          />
          <Text style={styles.textDos}>Comentario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa un comentario"
            placeholderTextColor='#434242f7'
            value={comentario}
            onChangeText={text => setComentario(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={guardarOperacion}>
            <Text style={styles.btntext}>REGISTRAR OPERACIÓN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

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
