import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// --- REQUIRES NO TOPO (mais confiável pro bundler) ---
const SaudacaoAoSol = require('../../assets/fluxo.png');
const PosturaArvore = require('../../assets/foco.png');
const PonteElevacao = require('../../assets/desafio.png');
// fallback (coloque um placeholder.png na pasta assets, opcional)

interface ClassItem {
  id: number;
  exercise_name: string;
  level: string;
  image_url: any; // require() retorna any
}

export default function ClassesListScreen({ route, navigation }: any) {
  // proteja caso route ou route.params não existam
  const part = route?.params?.part ?? 'Geral';

  const [classes, setClasses] = useState<ClassItem[]>([]);

  const PRIMARY_COLOR = '#FF3B30';
  const SECONDARY_COLOR = '#007AFF';

  useEffect(() => {
    // Verificações rápidas — log para debug
    // console.log('Part recebida:', part);

    setClasses([
      {
        id: 1,
        exercise_name: "Saudação ao Sol Completa",
        level: "Iniciante",        image_url: SaudacaoAoSolExists(SaudacaoAoSol) ? SaudacaoAoSol : Placeholder

      },
      {
        id: 2,
        exercise_name: "Postura da Árvore Avançada",
        level: "Intermediário",
        image_url: PosturaArvoreExists(PosturaArvore) ? PosturaArvore : Placeholder
      },
      {
        id: 3,
        exercise_name: "Ponte com Elevação Total",
        level: "Avançado",
        image_url: PonteElevacaoExists(PonteElevacao) ? PonteElevacao : Placeholder
      },
    ]);
  }, [part]);

  // Funções simples para emitir warning se require falhar (normalmente require lança erro se arquivo inexistente,
  // mas deixo essas funções caso queira condicionar algo)
  function SaudacaoAoSolExists(img: any) {
    if (!img) {
      console.warn('Imagem SaudacaoAoSol não encontrada — usando placeholder');
      return false;
    }
    return true;
  }
  function PosturaArvoreExists(img: any) {
    if (!img) {
      console.warn('Imagem PosturaArvore não encontrada — usando placeholder');
      return false;
    }
    return true;
  }
  function PonteElevacaoExists(img: any) {
    if (!img) {
      console.warn('Imagem PonteElevacao não encontrada — usando placeholder');
      return false;
    }
    return true;
  }

  const getLevelStyle = (level: string) => {
    if (level === 'Iniciante') return { backgroundColor: '#007AFF15', color: '#007AFF' };
    if (level === 'Intermediário') return { backgroundColor: '#FF950015', color: '#FF9500' };
    if (level === 'Avançado') return { backgroundColor: '#FF3B3015', color: '#FF3B30' };
    return { backgroundColor: '#F0F0F0', color: '#777' };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color={PRIMARY_COLOR} />
        </TouchableOpacity>

        <Text style={styles.title}>Aulas de {part}</Text>
      </View>

      {classes.map((item: ClassItem) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => navigation.navigate('ClassDetailScreen', { data: item })}
        >
          <Image
            source={item.image_url}
            style={styles.image}
            resizeMode="cover"
            // no Android, defaultSource funciona somente com require() estático; se quiser, use:
            // defaultSource={Placeholder}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{item.exercise_name}</Text>

            <View style={[styles.levelTag, { backgroundColor: getLevelStyle(item.level).backgroundColor }]}>
              <Text style={[styles.levelText, { color: getLevelStyle(item.level).color }]}>
                {item.level.toUpperCase()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {classes.length === 0 && <Text style={styles.noData}>Nenhuma aula encontrada para {part}.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 25,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1C1C1E',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  info: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#333333',
    marginRight: 10,
  },
  levelTag: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  levelText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  noData: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});
