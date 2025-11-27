import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import logo from '../../assets/logo.png';

const EsquecerSenha = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  console.log(email)

 // EsquecerSenha.tsx

const handleRecoverPassword = async () => {
    if (!email) {
        Alert.alert('Erro', 'Por favor, digite seu e-mail.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        
        if (response.ok) {
            // 2. Se o backend disser que o e-mail é válido e o token foi enviado:
            Alert.alert(
                'Token Enviado!',
                'Verifique seu e-mail para o código de 4 dígitos.'
            );
            
            // 3. Navegar para a tela onde o usuário digitará o token e a nova senha
            navigation.navigate('VerificarTokenScreen', { email: email });
        } else {
            // Se o backend retornar 404/400 (e-mail não encontrado ou erro de envio)
            const errorData = await response.json();
            Alert.alert('Erro', errorData.error || 'Não foi possível iniciar a recuperação de senha.');
        }
    } catch (error) {
        Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor. Tente novamente.');
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
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>
          Digite seu e-mail para receber um link de redefinição
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleRecoverPassword}>
          <LinearGradient
            colors={['#BA68C8', '#9C27B0']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Redefinir Senha</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backText}>Voltar para o login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
    fontFamily: 'Montserrat_700Bold',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
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
    fontFamily: 'OpenSans_400Regular',
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
    fontFamily: 'Montserrat_700Bold',
  },
  backText: {
    fontSize: 16,
    color: '#F83A7F',
    fontFamily: 'OpenSans_400Regular',
    fontWeight: 'bold',
  },
});

export default EsquecerSenha;