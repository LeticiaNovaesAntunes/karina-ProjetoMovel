import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function ClassesListScreen({ route, navigation }: any) {
  const { part } = route.params;
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/classes/part/${part}`)
      .then(res => res.json())
      .then(setClasses)
      .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exercícios — {part}</Text>

      {classes.map((item: any) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => navigation.navigate("ClassDetailScreen", { data: item })}
        >
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.exercise_name}</Text>
            <Text style={styles.level}>Nível: {item.level}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  level: {
    fontSize: 15,
    color: "#777"
  }
});
