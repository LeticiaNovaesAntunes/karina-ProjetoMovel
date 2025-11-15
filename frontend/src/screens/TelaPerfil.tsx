import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'; // 💡 Adicionado Image
import api from '../services/api';
import { useFocusEffect } from '@react-navigation/native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function TelaPerfil({ navigation }) {
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);

    const buscarPerfil = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users/profile'); 
console.log('Tamanho da photoUrl recebida:', response.data.photoUrl?.length);
            console.log('Dados do Perfil Recebidos:', response.data);
            
            setPerfil(response.data);
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            if (error.response && error.response.status === 401) {
                // Lógica de deslogar/redirecionar se necessário
            }
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            buscarPerfil();
        }, [])
    );

    if (loading) {
        return <Text style={styles.loading}>Carregando Perfil...</Text>;
    }

    if (!perfil) {
        return <Text style={styles.error}>Perfil não encontrado. Faça login novamente.</Text>;
    }
    
    const isAdmin = perfil.role === 'ADMIN';

    // 🎯 Lógica para a imagem de perfil
    const profileImageSource = perfil.photoUrl 
        ? { uri: perfil.photoUrl } // Usa a Base64 ou URL salva no DB
        : require('../../assets/placeholder.png'); // Imagem default (ajuste o caminho se necessário)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* ✅ Exibição da Imagem */}
                <Image 
                    source={profileImageSource} 
                    style={styles.profileImage}
                    // Fallback para ícone caso a imagem falhe (opcional)
                    defaultSource={require('../../assets/placeholder.png')} 
                />
                
                <Text style={styles.titulo}>{perfil.name}</Text>
                <Text style={isAdmin ? styles.adminText : styles.userText}>{isAdmin ? 'Administrador' : 'Usuário Padrão'}</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <MaterialIcons name="email" size={20} color="#666666" style={styles.icon} />
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{perfil.email}</Text>
                    </View>
                </View>
                
                <View style={styles.infoRow}>
                    <MaterialIcons name="phone" size={20} color="#666666" style={styles.icon} />
                    <View>
                        <Text style={styles.label}>Telefone</Text>
                        <Text style={styles.value}>{perfil.telefone || 'Não informado'}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.buttonContainer} 
                onPress={() => navigation.navigate('TelaEditarPerfil', { perfilAtual: perfil })}
            >
                <LinearGradient
                    colors={['#F83A7F', '#D02C70']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </LinearGradient>
            </TouchableOpacity>

            {isAdmin && (
                <TouchableOpacity onPress={() => navigation.navigate('TelaAdmin')}>
                    <Text style={styles.adminLink}>Acessar Painel de Controle</Text>
                </TouchableOpacity>
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F7F7F7',
        padding: 25 
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    // ✅ NOVO ESTILO: Imagem de perfil
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#DDDDDD', 
        borderWidth: 3,
        borderColor: '#D02C70',
        marginBottom: 10
    },
    titulo: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#333333',
        marginTop: 10 
    },
    adminText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#D02C70',
        marginTop: 5,
        backgroundColor: '#FFE9F0',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
    },
    userText: {
        fontSize: 14,
        color: '#666666',
        marginTop: 5,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 10,
    },
    icon: {
        marginRight: 15,
    },
    label: {
        fontSize: 14,
        color: '#999999',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#333333',
        marginTop: 2,
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
    },
    adminLink: {
        textAlign: 'center',
        color: '#D02C70',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    loading: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#333' },
    error: { color: 'red', textAlign: 'center', marginTop: 50, fontSize: 16 },
});