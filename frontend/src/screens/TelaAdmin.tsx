import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, ActivityIndicator, Modal, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Image } from 'react-native'; // Adicionado Image
import api from '../services/api'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFocusEffect } from '@react-navigation/native';

// ---------------------------------------------------------------------
// 1. INTERFACE E CORES
// ---------------------------------------------------------------------
interface Usuario {
    id: string; // UUID
    name: string;
    email: string;
    telefone: string | null;
    role: string;
    isBlocked: boolean; // O campo de controle
    photoUrl?: string | null; // Pode ser nulo
}

const COLORS = {
    primary: '#D02C70', // Rosa/Vermelho principal
    secondary: '#9C27B0', // Roxo dos ícones
    background: '#F0F2F5', // Fundo mais suave
    card: '#FFFFFF', // Cor do Card
    textDark: '#1F2937', // Texto principal
    textLight: '#4B5563', // Texto secundário
    statusActive: '#10B981', // Verde
    statusInactive: '#F87171', // Vermelho (mais suave que FF3B30)
    buttonDelete: '#EF4444', // Vermelho para deletar
    buttonLock: '#F59E0B', // Laranja para bloquear
    buttonUnlock: '#3B82F6', // Azul para desbloquear
    inputBorder: '#E5E7EB', // Borda do Input
};


export default function TelaAdmin({ navigation }) {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Controle do Modal de Troca de Senha
    const [modalVisivel, setModalVisivel] = useState(false);
    const [usuarioParaTroca, setUsuarioParaTroca] = useState<Usuario | null>(null);
    const [novaSenha, setNovaSenha] = useState('');
    
    // Controle do Modal de Detalhes
    const [modalDetalhesVisivel, setModalDetalhesVisivel] = useState(false);
    const [usuarioDetalhe, setUsuarioDetalhe] = useState<Usuario | null>(null);

// src/screens/TelaAdmin.tsx

const buscarUsuarios = async () => {
    setLoading(true);
    try {
        const response = await api.get('/users'); 
        // Assumimos que a API retorna um array de objetos Usuario
        const usuariosNaoOrdenados: Usuario[] = response.data;

        // ✅ LÓGICA DE ORDENAÇÃO ALFABÉTICA POR NOME
        const usuariosOrdenados = usuariosNaoOrdenados.sort((a, b) => {
            // Usamos localeCompare para ordenação correta por string
            return a.name.localeCompare(b.name);
        });
        
        setUsuarios(usuariosOrdenados); // Salva a lista já ordenada
    } catch (error) {
        console.error('Erro ao buscar usuários:', error.response?.data || error.message);
        if (error.response && error.response.status === 403) {
            Alert.alert('Acesso Negado', 'Você não tem permissão de Administrador para ver esta página.');
        } else {
            Alert.alert('Erro', 'Falha ao carregar a lista de usuários.');
        }
    } finally {
        setLoading(false);
    }
};
    
    useFocusEffect(
        React.useCallback(() => {
            buscarUsuarios();
            return () => setUsuarios([]); 
        }, [])
    );

    const toggleBloqueio = async (userId: string, isCurrentlyBlocked: boolean) => {
        const targetBlockStatus = !isCurrentlyBlocked; 

        try {
            await api.patch(`/users/admin/${userId}`, {
                isBlocked: targetBlockStatus 
            });
            
            Alert.alert('Sucesso', `Usuário agora está ${targetBlockStatus ? 'INATIVO' : 'ATIVO'}.`);
            
            setUsuarios(prevUsuarios => 
                prevUsuarios.map(u => 
                    u.id === userId ? { ...u, isBlocked: targetBlockStatus } : u
                )
            );
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível alterar o status do usuário.');
        }
    };

    const handleDeleteUser = (userId: string, userName: string) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja DELETAR permanentemente o usuário ${userName}? Esta ação é irreversível.`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Deletar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete(`/users/admin/${userId}`);
                            Alert.alert('Sucesso', `${userName} foi deletado.`);
                            
                            setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.id !== userId));
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível deletar o usuário.');
                        }
                    },
                },
            ],
        );
    };

    const confirmarTrocaSenha = async () => {
        if (!usuarioParaTroca) return;

        if (!novaSenha || novaSenha.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        try {
            await api.patch(`/users/admin/${usuarioParaTroca.id}`, {
                newPassword: novaSenha
            });
            
            Alert.alert('Sucesso', `A senha de ${usuarioParaTroca.name} foi redefinida com sucesso!`);
            
            setModalVisivel(false); 
            setNovaSenha(''); 

        } catch (error: any) {
            console.error("Erro ao trocar senha:", error.response?.data || error.message);
            Alert.alert('Erro', 'Não foi possível trocar a senha. Tente novamente.');
        }
    };

    const abrirModalTrocaSenha = (usuario: Usuario) => {
        setUsuarioParaTroca(usuario);
        setModalVisivel(true);
        setNovaSenha('');
    };

    const abrirModalDetalhes = (usuario: Usuario) => {
        setUsuarioDetalhe(usuario);
        setModalDetalhesVisivel(true);
    };


    // ---------------------------------------------------------------------
    // RENDERIZAÇÃO DA FLATLIST
    // ---------------------------------------------------------------------
    const renderItem = ({ item }: { item: Usuario }) => (
        <View style={styles.userCard}>
            {/* ✅ FOTO DO USUÁRIO OU PLACEHOLDER */}
            {item.photoUrl ? (
                <Image source={{ uri: item.photoUrl }} style={styles.userPhoto} />
            ) : (
                <View style={styles.userPhotoPlaceholder}>
                    <MaterialIcons name="person" size={30} color={COLORS.textLight} />
                </View>
            )}

            <View style={styles.userInfo}>
                {/* Informações Primárias */}
            <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
            </Text>   
            <Text style={styles.userEmail}>{item.email}</Text>
                
                {/* Status e Role em linha */}
                <View style={styles.statusRow}>
                    <Text style={item.isBlocked ? styles.statusInactive : styles.statusActive}>
                        <MaterialIcons name={item.isBlocked ? 'lock' : 'check-circle-outline'} size={14} color={item.isBlocked ? COLORS.statusInactive : COLORS.statusActive} />
                        {' '}
                        {item.isBlocked ? 'INATIVO' : 'ATIVO'}
                    </Text>
                </View>
                
                {/* Link de Detalhes */}
                <TouchableOpacity onPress={() => abrirModalDetalhes(item)} style={styles.detailsLink}>
                    <Text style={styles.detailsText}>Ver Detalhes</Text>
                    <MaterialIcons name="arrow-forward-ios" size={12} color={COLORS.primary} style={{marginLeft: 5}}/>
                </TouchableOpacity>
            </View>

            {/* ✅ GRUPO DE BOTÕES DE AÇÃO */}
            <View style={styles.actionGroup}>
                
                {/* 1. Bloqueio/Desbloqueio */}
                <TouchableOpacity 
                    style={[styles.actionButton, item.isBlocked ? styles.buttonUnlock : styles.buttonLock]}
                    onPress={() => toggleBloqueio(item.id, item.isBlocked)}
                >
                    <MaterialIcons name={item.isBlocked ? 'lock-open' : 'lock'} size={18} color="white" />
                </TouchableOpacity>

                {/* 2. Troca de Senha */}
                <TouchableOpacity 
                    onPress={() => abrirModalTrocaSenha(item)} 
                    style={styles.actionButtonSecondary} 
                >
                    <MaterialIcons name="vpn-key" size={20} color={COLORS.secondary} />
                </TouchableOpacity>
                
                {/* 3. Deletar */}
                <TouchableOpacity 
                    onPress={() => handleDeleteUser(item.id, item.name)} 
                    style={styles.actionButtonDelete}
                >
                    <MaterialIcons name="delete" size={20} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );

    // ---------------------------------------------------------------------
    // RENDERIZAÇÃO PRINCIPAL (Loading, Erro, FlatList e Modais)
    // ---------------------------------------------------------------------

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando usuários...</Text>
            </View>
        );
    }
    
    if (usuarios.length === 0 && !loading) {
        return (
             <View style={styles.centered}>
                <Text style={styles.loadingText}>Nenhum usuário cadastrado.</Text>
             </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Título mais proeminente */}
            <Text style={styles.titulo}>Painel de Administração</Text>
            <Text style={styles.subTitulo}>Gerencie **{usuarios.length}** usuários cadastrados no sistema.</Text>
            
            {/* 1. MODAL DE TROCA DE SENHA */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => setModalVisivel(false)}
            >
                <KeyboardAvoidingView 
                    style={styles.modalView} 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Redefinir Senha</Text>
                        <Text style={styles.modalSubtitle}>Usuário: **{usuarioParaTroca?.name}**</Text>
                        
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nova Senha (min 6 caracteres)"
                            placeholderTextColor={COLORS.textLight}
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            secureTextEntry={true}
                        />

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.buttonCancel]}
                                onPress={() => setModalVisivel(false)}
                            >
                                <Text style={styles.buttonTextModal}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.modalButton, styles.buttonConfirm]}
                                onPress={confirmarTrocaSenha}
                            >
                                <Text style={styles.buttonTextModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            
            {/* 2. MODAL DE DETALHES COMPLETOS */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDetalhesVisivel}
                onRequestClose={() => setModalDetalhesVisivel(false)}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalContentDetails}>
                        <Text style={styles.detailsTitle}>Detalhes Completos do Usuário</Text>
                        
                        {usuarioDetalhe && (
                            <ScrollView style={styles.detailsScrollView}>
                                <Text style={styles.detailItem}><Text style={styles.detailLabel}>Nome:</Text> {usuarioDetalhe.name}</Text>
                                <Text style={styles.detailItem}><Text style={styles.detailLabel}>Email:</Text> {usuarioDetalhe.email}</Text>
                                <Text style={styles.detailItem}><Text style={styles.detailLabel}>Telefone:</Text> {usuarioDetalhe.telefone || 'N/A'}</Text>
                                <Text style={styles.detailItem}><Text style={styles.detailLabel}>Permissão:</Text> {usuarioDetalhe.role}</Text>
                                <Text style={styles.detailItem}><Text style={styles.detailLabel}>Status:</Text> <Text style={usuarioDetalhe.isBlocked ? styles.statusInactive : styles.statusActive}>{usuarioDetalhe.isBlocked ? 'INATIVO' : 'ATIVO'}</Text></Text>
                                <Text style={styles.detailItem}><Text style={styles.detailLabel}>ID (UUID):</Text> {usuarioDetalhe.id}</Text>
                                <Text style={styles.detailItem}><Text style={styles.detailLabel}>Foto/URL:</Text> {usuarioDetalhe.photoUrl || 'N/A'}</Text>
                            </ScrollView>
                        )}
                        
                        <TouchableOpacity 
                            style={styles.detailsCloseButton}
                            onPress={() => setModalDetalhesVisivel(false)}
                        >
                            <Text style={styles.buttonTextModal}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/* 3. FLATLIST PRINCIPAL */}
            <FlatList
                data={usuarios}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}

// ------------------------------------------------------------------------------------------------
// ESTILOS (REVISADOS PARA LAYOUT COM FOTO)
// ------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
    // --- LAYOUT E GERAIS ---
    container: { flex: 1, backgroundColor: COLORS.background, },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
    loadingText: { marginTop: 10, color: COLORS.textLight, fontSize: 16, },
    // --- TÍTULOS ---
    titulo: { fontSize: 26, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 5, paddingHorizontal: 20, paddingTop: 10, },
    subTitulo: { fontSize: 14, color: COLORS.textLight, marginBottom: 15, paddingHorizontal: 20, },
    
    // --- CARD DE USUÁRIO ---
    userCard: { 
        backgroundColor: COLORS.card, 
        borderRadius: 12, 
        padding: 15, 
        marginHorizontal: 15, 
        marginBottom: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.08, 
        shadowRadius: 4, 
        elevation: 3, 
    },
    // ✅ FOTO DO USUÁRIO
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25, // Formato circular
        marginRight: 15,
        backgroundColor: '#E0E0E0', // Fundo para a imagem carregar
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },
    // ✅ PLACEHOLDER DA FOTO (quando photoUrl é null)
    userPhotoPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        backgroundColor: '#EAEAEA', // Cor de fundo do placeholder
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },
    userInfo: { flex: 1, marginRight: 10, },
    userName: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 2, },
    userEmail: { fontSize: 14, color: COLORS.textLight, marginBottom: 5, },
    statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, },
    userRole: { fontSize: 12, color: COLORS.textLight, marginLeft: 8, },
    
    // --- STATUS (COM ÍCONE) ---
    statusActive: { color: COLORS.statusActive, fontWeight: 'bold', fontSize: 12, flexDirection: 'row', alignItems: 'center', },
    statusInactive: { color: COLORS.statusInactive, fontWeight: 'bold', fontSize: 12, flexDirection: 'row', alignItems: 'center', },
    
    // --- BOTÕES DE AÇÃO (GRUPO LATERAL) ---
    actionGroup: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', },
    
    // 1. BLOQUEIO/DESBLOQUEIO (Destaque principal)
    actionButton: { 
        borderRadius: 8, 
        padding: 8, 
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLock: { backgroundColor: COLORS.buttonLock, }, 
    buttonUnlock: { backgroundColor: COLORS.buttonUnlock, }, 
    
    // 2. AÇÕES SECUNDÁRIAS (Senha e Deletar)
    actionButtonSecondary: { 
        borderRadius: 8, 
        padding: 8, 
        marginLeft: 8,
        backgroundColor: COLORS.inputBorder, // Fundo cinza claro
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonDelete: { 
        backgroundColor: COLORS.buttonDelete, 
        borderRadius: 8, 
        padding: 8, 
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    // --- LINK DE DETALHES ---
    detailsLink: { flexDirection: 'row', alignItems: 'center', paddingVertical: 3, marginTop: 5, },
    detailsText: { color: COLORS.primary, fontSize: 13, fontWeight: 'bold', },
    
    // --- ESTILOS DO MODAL ---
    modalView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', },
    modalContent: { width: '85%', backgroundColor: COLORS.card, borderRadius: 15, padding: 30, alignItems: 'center', elevation: 8, },
    modalContentDetails: { width: '90%', maxHeight: '80%', backgroundColor: COLORS.card, borderRadius: 15, padding: 20, alignItems: 'flex-start', elevation: 8, },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: COLORS.textDark, },
    modalSubtitle: { fontSize: 15, color: COLORS.primary, marginBottom: 25, },
    modalInput: { width: '100%', height: 50, borderColor: COLORS.inputBorder, borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 25, fontSize: 16, backgroundColor: '#FAFAFA', },
    modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', },
    modalButton: { flex: 1, borderRadius: 10, padding: 12, marginHorizontal: 5, alignItems: 'center', },
    buttonCancel: { backgroundColor: COLORS.textLight, },
    buttonConfirm: { backgroundColor: COLORS.statusActive, }, 
    buttonTextModal: { color: 'white', fontSize: 16, fontWeight: 'bold', },

    // Detalhes
    detailsTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: COLORS.primary, alignSelf: 'center', },
    detailsScrollView: { width: '100%', padding: 10, backgroundColor: '#F9F9F9', borderRadius: 8, marginBottom: 15, },
    detailItem: { fontSize: 15, paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: COLORS.inputBorder, color: COLORS.textLight, lineHeight: 20, },
    detailLabel: { fontWeight: 'bold', color: COLORS.textDark, marginRight: 5, },
    detailsCloseButton: { backgroundColor: COLORS.primary, borderRadius: 25, paddingVertical: 10, paddingHorizontal: 30, marginTop: 20, width: '100%', alignItems: 'center', },
});