import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importe para o botão
import api from '../services/api'; // Sua instância de API
// Importe a imagem do logo (Ajuste o caminho se necessário)
// import logo from '../../assets/logo.png'; // Caminho típico: ../../assets/logo.png


// Renomeamos para manter a convenção do seu código original, mas o nome é apenas um detalhe
export default function Cadastro({ navigation }: any) {
  // Adicionando os novos campos do estilo
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState(''); 


  const handleCadastro = async () => {
    // 1. Validação de Senha
    if (senha !== confirmSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    
    if (!name || !email || !telefone || !senha) {
       Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
       return;
    }

    try {
      const userData = { name, email, senha, telefone };
      await api.post('/users/singup', userData);

      Alert.alert('Sucesso', 'Usuário criado!');
      navigation.navigate('Login'); // Ajuste 'Login' para o nome da sua tela de login se for diferente
    } catch (error) {
      console.log('Erro de Cadastro:', error); 
      Alert.alert('Erro', 'Falha ao criar usuário. Verifique sua conexão e tente novamente.');
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
         {/* <Image source={logo} style={styles.logo} />  */}
        
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Junte-se à nossa comunidade de bem-estar</Text>

        {/* Campo Nome Completo */}
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#999999"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        {/* Campo E-mail */}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        {/* Campo Telefone */}
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#999999"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        {/* Campo Senha */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        
        {/* Campo Confirme Senha */}
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          placeholderTextColor="#999999"
          value={confirmSenha}
          onChangeText={setConfirmSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleCadastro}>
          <LinearGradient
            colors={['#F83A7F', '#D02C70']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Link para Login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}> {/* Ajuste 'Login' se o nome da rota for 'LoginScreen' */}
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// O Objeto de Estilos Completo do Segundo Código
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
    resizeMode: 'contain',
  },
  title: {
    // Note: Esta linha requer que a fonte Montserrat_700Bold esteja carregada
    // fontFamily: 'Montserrat_700Bold', 
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    // Note: Esta linha requer que a fonte OpenSans_400Regular esteja carregada
    // fontFamily: 'OpenSans_400Regular', 
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
    // fontFamily: 'OpenSans_400Regular',
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
  loginText: {
    fontSize: 16,
    color: '#666666',
    // fontFamily: 'OpenSans_400Regular',
  },
  loginLink: {
    color: '#F83A7F',
    fontWeight: 'bold',
  },
});