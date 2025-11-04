import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import api from '../services/api';

export default function Cadastro({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    try {
      await api.post('/users/singup', { email, senha });
      Alert.alert('Sucesso', 'Usuário criado!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#007AFF',
  },
});