import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Platform } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';ss
// import { WebView } from 'react-native-webview'; // só necessário para mobile

export default function ClassDetailScreen({ route }: any) {
  const { data } = route.params;

  // Função para extrair videoId do link completo do YouTube
  const getVideoId = (url: string) => {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(data.video_url); // supondo que o link completo vem em data.youtube_link

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text style={styles.title}>{data.exercise_name}</Text>

      {/* Imagem do exercício */}
      <Image source={{ uri: data.image_url }} style={styles.image} />

      {/* Vídeo */}
      {videoId && (
        <View style={styles.videoContainer}>
          {Platform.OS === 'web' ? (
            <iframe
              width="100%"
              height="360"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <WebView
              style={{ width: '100%', height: 220 }}
              source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
            />
          )}
        </View>
      )}

      {/* Info e badges */}
      <View style={styles.infoSection}>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#F4A1C1' }]}>
            <Text style={styles.badgeText}>{data.level}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FFD966' }]}>
            <Text style={styles.badgeText}>{data.part_exercised}</Text>
          </View>
          {data.duration && (
            <View style={styles.timeBadge}>
              <MaterialCommunityIcons name="clock-outline" size={16} color="#555" />
              <Text style={styles.timeText}>{data.duration}</Text>
            </View>
          )}
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descrição</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 0,
    marginBottom: 25,
  },
  videoContainer: {
    width: '100%',
    height: 220,
    marginBottom: 20,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  badgesContainer: {
    marginRight: 15,
  },
  badge: {
    paddingVertical: 6,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 5,
    marginBottom: 10,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  descriptionContainer: {
    flex: 1,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    color: '#555',
  },
});
