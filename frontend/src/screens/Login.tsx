import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import api from '../services/api'; 
// import logo from '../../assets/logo.png'; 

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); 

  const handleLogin = async () => {
    try {
      const response = await api.post('/users/singin', { email, senha });

      if (response.data) { 
        Alert.alert('Sucesso', 'Login realizado!');
        navigation.navigate('MainAppScreen'); 
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos');
      }
    } catch (error) {
      console.log('Erro no Login:', error);
      Alert.alert('Erro', 'Falha no login. Verifique seus dados e conexão.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps='handled'
      >
        {/* <Image source={logo} style={styles.logo} /> */}

        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        
       <TouchableOpacity onPress={() => navigation.navigate('EsquecerSenha')}>
  <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <LinearGradient
            colors={['#FF6B8B', '#F83A7F']} 
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}> 
          <Text style={styles.signupText}>
            Não tem uma conta? <Text style={styles.signupLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// O Objeto de Estilos Completo (Copiado do seu exemplo CSS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    // Estas linhas exigem que as fontes estejam carregadas
    // fontFamily: 'Montserrat_700Bold', 
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    // fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: '#333333',
    // fontFamily: 'OpenSans_400Regular',
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    color: '#F83A7F',
    fontSize: 14,
    // fontFamily: 'OpenSans_400Regular',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    // fontFamily: 'Montserrat_700Bold',
  },
  signupText: {
    fontSize: 16,
    color: '#666666',
    // fontFamily: 'OpenSans_400Regular',
  },
  signupLink: {
    color: '#F83A7F',
    fontWeight: 'bold',
  },
});