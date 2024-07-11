import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { db } from '../config/config';
import { ref, onValue } from 'firebase/database';

export default function HistorialScreen() {
  const [operaciones, setOperaciones] = useState([]);

  useEffect(() => {
    const operacionesRef = ref(db, 'operaciones');
    // Escuchar Firebase
    onValue(operacionesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const operacionesArray = Object.values(data);
        setOperaciones(operacionesArray);
      } else {
        setOperaciones([]);
      }
    });

    // Limpieza del listener 
    return () => {
      // Detener la escucha de cambios
    };
  }, []);

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/vector-premium/elegante-fondo-negro-brillos-dorados_94047-55.jpg?w=360" }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Historial de Operaciones</Text>
        {operaciones.length > 0 ? (
          <FlatList
            data={operaciones}
            keyExtractor={(item) => item.idOperacion.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>ID Operación: {item.idOperacion}</Text>
                <Text style={styles.itemText}>Monto: {item.monto}</Text>
                <Text style={styles.itemText}>Tipo de Operación: {item.tipoOperacion}</Text>
                <Text style={styles.itemText}>Comentario: {item.comentario}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.text}>No hay operaciones registradas</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 22,
    marginVertical: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    backgroundColor: '#272829',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
