import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NovaSenhaScreen = ({ route, navigation }: any) => {
    const { email, token } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (newPassword.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email, 
                    token, 
                    newPassword 
                }),
            });
            
            if (response.ok) {
                Alert.alert('Sucesso!', 'Sua senha foi redefinida. Faça login com sua nova senha.');
                navigation.navigate('Login');
            } else {
                const errorData = await response.json();
                Alert.alert('Erro', errorData.error || 'Token inválido, expirado ou erro ao redefinir.');
            }
        } catch (error) {
            Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
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
                <Text style={styles.title}>Nova Senha</Text>
                <Text style={styles.subtitle}>
                    Digite sua nova senha.
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nova Senha"
                    placeholderTextColor="#999999"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Nova Senha"
                    placeholderTextColor="#999999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={handleResetPassword}>
                    <LinearGradient
                        colors={['#BA68C8', '#9C27B0']}
                        style={styles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </LinearGradient>
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
    input: { width: '100%', height: 50, borderColor: '#CCCCCC', borderWidth: 1, borderRadius: 25, paddingHorizontal: 20, marginBottom: 15, fontSize: 16, color: '#333333' },
    buttonContainer: { width: '100%', height: 50, borderRadius: 25, overflow: 'hidden', marginBottom: 20 },
    buttonGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});

export default NovaSenhaScreen;