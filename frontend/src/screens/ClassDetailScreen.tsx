import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ClassDetailScreen({ route }: any) {
  const { data } = route.params;

  // Sua imagem local de fallback
  const FallbackImage = require('../../assets/image.png');

  // Cores Fortes e Vibrantes
  const PRIMARY_COLOR = '#007AFF'; // Azul Profundo
  const SECONDARY_COLOR = '#34C759'; // Verde Energético
  const TEXT_COLOR = '#1C1C1E'; // Preto Intenso para Títulos
  // const SUBTEXT_COLOR = '#6C757D'; // Não está sendo usado diretamente
const imageSource = typeof data.image_url === 'string'
    ? { uri: data.image_url } // Se for string (URL), usa { uri: ... }
    : data.image_url;         // Se for require() (referência local), usa a referência direta

// A imagem final a ser usada no <Image>
const finalImageSource = imageSource || FallbackImage;

  // Extrai o ID do vídeo do YouTube (mantido, mas sem uso visual aqui)
  const extractId = (url: string) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : url;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TÍTULO */}
      <Text style={styles.title}>{data.exercise_name}</Text>

      {/* IMAGEM GRANDE DO EXERCÍCIO (BLOCO ADICIONADO/CORRIGIDO) */}
      <Image
        // Tenta usar a imagem passada, senão usa a imagem local importada
        source={imageSource || FallbackImage} 
        style={styles.image}
      />


      {/* INFORMAÇÕES CHIPS (Nível e Parte) */}
      <View style={styles.infoChipsContainer}>
        {/* Chip Azul Profundo com Fundo Suave */}
        <View style={[styles.infoChip, { backgroundColor: PRIMARY_COLOR + '20' }]}> 
            <MaterialIcons name="star-rate" size={18} color={PRIMARY_COLOR} />
            <Text style={[styles.infoChipText, { color: PRIMARY_COLOR }]}>Nível: {data.level}</Text>
        </View>
        {/* Chip Verde Energético com Fundo Suave */}
        <View style={[styles.infoChip, { backgroundColor: SECONDARY_COLOR + '20' }]}> 
            <MaterialIcons name="self-improvement" size={18} color={SECONDARY_COLOR} />
            <Text style={[styles.infoChipText, { color: SECONDARY_COLOR }]}>Foco: {data.part_exercised}</Text>
        </View>
      </View>

      {/* DESCRIÇÃO */}
      <Text style={[styles.sectionTitle, { color: TEXT_COLOR }]}>Descrição do Exercício</Text>
      <Text style={styles.description}>{data.description}</Text>

      {/* INSTRUÇÕES (Adicionado para dar mais corpo) */}
      <Text style={[styles.sectionTitle, { color: TEXT_COLOR }]}>Como Fazer</Text>
      <View style={styles.stepContainer}>
        {/* Número do Passo com a Cor Primária */}
        <View style={[styles.stepNumberCircle, { backgroundColor: PRIMARY_COLOR }]}>
            <Text style={styles.stepNumberText}>1</Text>
        </View>
        <Text style={styles.stepText}>Inicie na postura de pé (Tadasana), com os pés unidos e o corpo alongado.</Text>
      </View>
      <View style={styles.stepContainer}>
         <View style={[styles.stepNumberCircle, { backgroundColor: PRIMARY_COLOR }]}>
            <Text style={styles.stepNumberText}>2</Text>
        </View>
        <Text style={styles.stepText}>Inspire e eleve os braços, unindo as palmas das mãos acima da cabeça.</Text>
      </View>
      <View style={styles.stepContainer}>
         <View style={[styles.stepNumberCircle, { backgroundColor: PRIMARY_COLOR }]}>
            <Text style={styles.stepNumberText}>3</Text>
        </View>
        <Text style={styles.stepText}>Mantenha a postura respirando profundamente por 30 segundos.</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9', 
    padding: 25,
    paddingBottom: 60,
  },
  title: {
    fontSize: 34,
    fontWeight: '900', 
    color: '#1C1C1E', 
    marginBottom: 20,
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: 250, 
    borderRadius: 15, 
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  // --- Chips de Informação (Nível/Parte) ---
  infoChipsContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 12,
    flexWrap: 'wrap',
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 9, 
    borderRadius: 30,
  },
  infoChipText: {
    fontSize: 15, 
    fontWeight: '700',
    marginLeft: 6,
  },
  // --- Seções ---
  sectionTitle: {
    fontSize: 26, 
    fontWeight: '900',
    marginTop: 25,
    marginBottom: 10,
    color: '#1C1C1E', 
  },
  description: {
    fontSize: 17,
    lineHeight: 25,
    color: "#6C757D", 
    marginBottom: 20,
  },
  // --- Passos ---
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 15, 
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  stepNumberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  stepText: {
    flex: 1,
    fontSize: 17,
    color: "#333", 
    lineHeight: 24,
  }
});