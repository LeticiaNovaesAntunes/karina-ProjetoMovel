import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MainAppScreen({ navigation }: any) {

  const categories = [
    { name: "Postura", color: ['#F7C0D8', '#F083A2'] },
    { name: "Pernas", color: ['#C6E2FF', '#8AB6F9'] },
    { name: "Abdômen", color: ['#FFD6A5', '#FF965D'] },
    { name: "Cardio", color: ['#FFB3B3', '#FF6F6F'] },
  ];

  // Mapa para transformar texto → ENUM do Prisma
  const partEnumMap: any = {
    "Postura": "POSTURA",
    "Pernas": "PERNAS",
    "Abdômen": "ABDOMEN",
    "Cardio": "CARDIO",
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Yoga para o Dia</Text>
      <Text style={styles.subtitle}>Escolha um objetivo para treinar</Text>

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

              navigation.navigate("ClasseListScreen", {
                part: enumValue   // ← envia POSTURA, PERNAS, ABDOMEN, CARDIO
              });
            }}
          >
            <LinearGradient colors={item.color} style={styles.optionCard}>
              <Text style={styles.optionText}>{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE1EC',
    paddingTop: 70,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    color: '#4A4A4A',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6D6D6D',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  optionWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  optionCard: {
    width: '100%',
    height: 90,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  optionText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
