import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native'; 
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient'; 
import * as ImagePicker from 'expo-image-picker'; 
import { MaterialIcons } from '@expo/vector-icons'; 

const COLORS = {
    primary: '#9C27B0', 
    secondary: '#D02C70', // Adicionei uma cor secundária para o link Cancelar
    background: '#F7F7F7', 
    textDark: '#333333', 
    textLight: '#666666',
    inputBorder: '#CCCCCC',
    uneditable: '#EEEEEE',
};


export default function TelaEditarPerfil({ route, navigation }: any) {
    const { perfilAtual } = route.params;
    const [telefone, setTelefone] = useState(perfilAtual.telefone || ''); 
    // Armazena a URL/URI da foto (para exibição)
    const [photoUrl, setPhotoUrl] = useState(perfilAtual.photoUrl || ''); 
    // 💾 Armazena a string Base64 para envio ao backend (SÓ É PREENCHIDO SE UMA NOVA FOTO FOR SELECIONADA)
    const [photoBase64, setPhotoBase64] = useState(''); 


    // --- LÓGICA DE ESCOLHA DA IMAGEM ---
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permissão necessária", "Permissão para acessar a biblioteca de fotos é necessária para escolher uma imagem.");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            // 🎯 SOLICITAÇÃO BASE64
            base64: true, 
        });

        if (!pickerResult.canceled) {
            const asset = pickerResult.assets[0];
            
            // 1. Atualiza o URI local para exibição imediata
            setPhotoUrl(asset.uri); 
            
            // 2. 🎯 Formata e salva a string Base64 para envio
            // Adiciona o prefixo MIME type (muito importante para o backend e para o Image component)
            const base64String = `data:image/jpeg;base64,${asset.base64}`;
            setPhotoBase64(base64String); 
        }
    };
    // ------------------------------------

    const handleSalvar = async () => {
        if (!telefone) {
            Alert.alert('Atenção', 'O campo Telefone não pode ficar vazio.');
            return;
        }
        
        // 🔑 Prioriza a nova imagem (Base64) se ela existir, caso contrário, envia a URL original.
        const photoDataToSend = photoBase64 || photoUrl; 
        
        try {
            await api.put('/users/profile', {
                telefone: telefone,
                // ✅ Enviando a string Base64 (se nova foto) ou a URL pública (se foto existente)
                photoUrl: photoDataToSend, 
            });

            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            
            navigation.goBack(); 

        } catch (error: any) {
            console.error('Erro ao salvar perfil:', error.response?.data || error.message);
            const errorMessage = error.response?.data?.error || 'Não foi possível atualizar o perfil. Tente novamente.';
            Alert.alert('Erro', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Editar Perfil</Text>
            <Text style={styles.subtitle}>Apenas contato e foto podem ser alterados.</Text>

            {/* ✅ SEÇÃO DE FOTO (Editável) */}
            <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
                {photoUrl ? (
                    // Exibe a imagem salva (Base64 ou URL)
                    <Image source={{ uri: photoUrl }} style={styles.userPhoto} />
                ) : (
                    <View style={styles.userPhotoPlaceholder}>
                        <MaterialIcons name="camera-alt" size={40} color={COLORS.textLight} />
                        <Text style={styles.photoText}>Adicionar Foto</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Informações não editáveis (Nome e Email) */}
            <View style={styles.infoBox}>
                <Text style={styles.label}>Nome</Text>
                <Text style={styles.uneditableValue}>{perfilAtual.name}</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.uneditableValue}>{perfilAtual.email}</Text>
            </View>

            {/* Campo de Telefone Editável */}
            <Text style={styles.label}>Telefone</Text>
            <TextInput
                style={styles.input}
                placeholder="(xx) xxxxx-xxxx"
                placeholderTextColor="#999999"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />
            
            {/* Botão de Salvar Estilizado com Gradient */}
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSalvar}>
                <LinearGradient
                    colors={['#BA68C8', '#9C27B0']} 
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.buttonText}>Salvar Alterações</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backLink}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: COLORS.background, 
        padding: 25 
    },
    titulo: { fontSize: 28, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 10 },
    subtitle: { fontSize: 14, color: COLORS.textLight, marginBottom: 20 },
    
    // ESTILOS DA FOTO
    photoContainer: {
        alignSelf: 'center',
        marginBottom: 30,
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userPhoto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    userPhotoPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.inputBorder,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoText: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 5,
    },
    
    // ESTILOS DE FORMULÁRIO
    infoBox: { marginBottom: 15 },
    label: { fontSize: 14, marginBottom: 5, color: COLORS.textLight, fontWeight: 'bold' },
    uneditableValue: { fontSize: 16, padding: 12, backgroundColor: COLORS.uneditable, borderRadius: 8, color: COLORS.textDark, marginBottom: 15 },
    input: { height: 50, borderColor: COLORS.inputBorder, borderWidth: 1, borderRadius: 25, paddingHorizontal: 20, marginBottom: 20, fontSize: 16, color: COLORS.textDark },
    
    // ESTILOS DO BOTÃO
    buttonContainer: { width: '100%', height: 50, borderRadius: 25, overflow: 'hidden', marginBottom: 15 },
    buttonGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    backLink: { textAlign: 'center', color: COLORS.secondary, fontWeight: 'bold', fontSize: 16 }
});