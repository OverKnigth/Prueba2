import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation } : any) {
  return (
    <ImageBackground 
      source={{ uri: 'https://img.freepik.com/vector-premium/elegante-fondo-negro-brillos-dorados_94047-55.jpg?w=360' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a OverCapital Bank!</Text>
        <Image style={styles.image} source={{uri: 'https://static.vecteezy.com/system/resources/previews/009/398/418/non_2x/bank-clipart-design-illustration-free-png.png'}}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Register')}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Desarrollado por: Stalin Moposita</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  image: {
    width: 280,
    height: 220,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#508D4E',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
  },
});
