import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:3000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) throw new Error('Erro ao fazer login');

      const data = await response.json();
      
      // Toast de sucesso
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      
      // Redirecionar para outra página após login
      // router.push('/home'); // Descomente quando tiver uma página home
      
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="← Voltar" onPress={() => router.back()} />
      
      <Text style={styles.title}>Login</Text>
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button 
        title={loading ? 'Entrando...' : 'Entrar'} 
        onPress={handleLogin} 
        disabled={loading} 
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Não tem conta?{' '}
          <Text 
            style={styles.link} 
            onPress={() => router.push('/src/cadastro')}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 30,
    marginTop: 20 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 5, 
    color: '#333',
    fontWeight: '500'
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 15,
    fontSize: 16
  },
  footer: {
    marginTop: 20,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    color: '#666'
  },
  link: {
    color: '#007AFF',
    fontWeight: 'bold'
  }
});