import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function HeaderNav() {
  const navigation = useNavigation<NavProp>();


  return (
    <View style={styles.container}>

      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("MainAppScreen")}>
          <Text style={styles.item}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Text style={styles.item}>Meu Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    backgroundColor: '#FDE6E4',
    borderBottomWidth: 1,
    borderColor: '#F5B0C2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

    // FIXA NO TOPO
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 10,
  },

  logo: {
    fontSize: 26,
    fontWeight: '300',
    color: '#000',
    letterSpacing: 1,
  },

  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  item: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
});
