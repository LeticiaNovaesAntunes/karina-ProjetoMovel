import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import api from '../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import TopNavBar from './Header';

export default function TelaPerfil({ navigation }: any) {
    const [perfil, setPerfil] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const buscarPerfil = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users/profile');
            setPerfil(response.data);
        } catch (error: any) {
            if (error?.response?.status === 401) {
                setPerfil(null);
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

    const profileImageSource = perfil.photoUrl
        ? { uri: perfil.photoUrl }
        : require('../../assets/placeholder.png');

    return (
        <View style={styles.container}>
             <TopNavBar
                navigation={navigation} 
                activeScreen={'TelaPerfil'} 
            />
            <View style={styles.header}>
                <Image 
                    source={profileImageSource}
                    style={styles.profileImage}
                    defaultSource={require('../../assets/placeholder.png')} 
                />
                
                <Text style={styles.titulo}>{perfil.name}</Text>
                <Text style={isAdmin ? styles.adminText : styles.userText}>
                    {isAdmin ? 'Administrador' : 'Usuário Padrão'}
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <MaterialIcons name="email" size={20} color="#666" style={styles.icon} />
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{perfil.email}</Text>
                    </View>
                </View>
                
                <View style={styles.infoRow}>
                    <MaterialIcons name="phone" size={20} color="#666" style={styles.icon} />
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
                <div>
                <TouchableOpacity onPress={() => navigation.navigate('TelaAdmin')}>
                    <Text style={styles.adminLink}>Acessar Painel de Controle</Text>
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('CreateClasses')}>
                    <Text style={styles.adminLink}>Cadastar Aulas</Text>
                </TouchableOpacity></div>
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
        borderBottomColor: '#EEE',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#DDD',
        borderWidth: 3,
        borderColor: '#D02C70',
        marginBottom: 10
    },
    titulo: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#333',
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
        color: '#666',
        marginTop: 5,
    },
    card: {
        backgroundColor: '#FFF',
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
        color: '#999',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#333',
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
        color: '#FFF',
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
