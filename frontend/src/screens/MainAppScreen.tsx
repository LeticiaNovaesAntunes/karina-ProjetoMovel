import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './Header';

export default function MainAppScreen({ navigation }: any) {

  const categories = [
    { name: "Pernas" },
    { name: "Abdômen" },
    { name: "Postura" },
    { name: "Cardio" },
  ];

  const partEnumMap: any = {
    "Postura": "POSTURA",
    "Pernas": "PERNAS",
    "Abdômen": "ABDOMEN",
    "Cardio": "CARDIO",
  };

  return (
    <LinearGradient
      colors={['#FDE6E4', '#FFFFFF']}
      style={styles.container}
    >
       <Header title="Treinos" />
      <View style={styles.header}>
        <Text style={styles.appName}>Serena</Text>
        <Text style={styles.subtitle}>Encontre seu equilíbrio</Text>
      </View>

      {/* OPTIONS */}
      <ScrollView
        contentContainerStyle={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionWrapper}
            onPress={() => {
              const enumValue = partEnumMap[item.name];
              navigation.navigate("ClasseListScreen", { part: enumValue });
            }}
          >
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Respire fundo. Você está no lugar certo.</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 25,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  appName: {
    fontSize: 48,
    color: '#000000',
    fontWeight: '300',
    letterSpacing: 2,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 18,
    color: '#555',
    fontWeight: '300',
  },

  optionsContainer: {
    paddingBottom: 120,
  },

  optionWrapper: {
    width: '100%',
    marginBottom: 22,
  },

  card: {
    width: '100%',
    height: 95,
    borderRadius: 28,
    backgroundColor: '#ffffffff',
    color: '#000000ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F5B0C2',
    borderColor: '#F5B0C2',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  cardText: {
    fontSize: 24,
    color: '#000000ff',
    fontWeight: '300',
    letterSpacing: 2,
  },

  footer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  footerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '300',
  },
});
