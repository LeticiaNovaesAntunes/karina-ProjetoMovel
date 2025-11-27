import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const VerificarTokenScreen = ({ route, navigation }: any) => {
    const { email } = route.params; 
    const [token, setToken] = useState('');

    const handleVerifyToken = async () => {
        if (token.length !== 4) {
            Alert.alert('Erro', 'O código deve ter 4 dígitos.');
            return;
        }

        // Simulação de verificação inicial no frontend (sem API call nesta etapa)
        // Navegaremos direto para a tela de nova senha para simplificar o fluxo de UI
        navigation.navigate('NovaSenhaScreen', { email, token });
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
                <Text style={styles.title}>Verificação</Text>
                <Text style={styles.subtitle}>
                    Um código de 4 dígitos foi enviado para <Text style={styles.emailText}>{email}</Text>. Digite-o abaixo:
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Código (4 dígitos)"
                    placeholderTextColor="#999999"
                    value={token}
                    onChangeText={setToken}
                    keyboardType="number-pad"
                    maxLength={4}
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={handleVerifyToken}>
                    <LinearGradient
                        colors={['#BA68C8', '#9C27B0']}
                        style={styles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>Verificar Código</Text>
                    </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('EsquecerSenha')}>
                    <Text style={styles.backText}>Reenviar Código</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 25 },
    title: { fontSize: 30, fontWeight: 'bold', color: '#333333', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#666666', marginBottom: 40, textAlign: 'center' },
    emailText: { fontWeight: 'bold', color: '#333333' },
    input: { width: '100%', height: 50, borderColor: '#CCCCCC', borderWidth: 1, borderRadius: 25, paddingHorizontal: 20, marginBottom: 15, fontSize: 16, color: '#333333' },
    buttonContainer: { width: '100%', height: 50, borderRadius: 25, overflow: 'hidden', marginBottom: 20 },
    buttonGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    backText: { fontSize: 16, color: '#F83A7F', fontWeight: 'bold' },
});

export default VerificarTokenScreen;