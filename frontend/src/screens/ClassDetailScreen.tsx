import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function ClassDetailScreen({ route }: any) {
  const { data } = route.params;

  // Extrai o ID do vídeo do YouTube
  const extractId = (url: string) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : url;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.exercise_name}</Text>

      {/* IMAGEM GRANDE DO EXERCÍCIO */}
      <Image
        source={{ uri: data.image_url }}
        style={styles.image}
      />


      {/* INFORMAÇÕES */}
      <Text style={styles.level}>Nível: {data.level}</Text>
      <Text style={styles.part}>Parte trabalhada: {data.part_exercised}</Text>

      {/* DESCRIÇÃO */}
      <Text style={styles.descriptionTitle}>Descrição</Text>
      <Text style={styles.description}>{data.description}</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  level: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  part: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '600',
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
  }
});
