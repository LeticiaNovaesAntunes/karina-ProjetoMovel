import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TopNavBar from './Header'; 
import api from '../services/api'; // Presumindo que você usa um cliente API (axios)

const COLORS = {
    primary: '#c65091ff',
    background: '#FFFDFD',
    textDark: '#555555',
    textMedium: '#777777',
    cardBackground: '#FFFFFF',
    levelFacil: '#10B981',
    levelMedio: '#F59E0B',
    levelDificil: '#EF4444',
    inputBorder: '#E5E7EB',
};

const NAVBAR_HEIGHT_ADJUSTMENT = 90;

interface AulaData {
    id: number;
    exercise_name: string;
    level: string;
    image_url: string;
    part_exercised: string;
    description: string;
    video_url?: string;
}

const getLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
        case 'FACIL':
            return COLORS.levelFacil;
        case 'MEDIO':
            return COLORS.levelMedio;
        case 'DIFICIL':
            return COLORS.levelDificil;
        default:
            return COLORS.textMedium;
    }
};

export default function AllClassesScreen({ navigation }: any) {
    const [allClasses, setAllClasses] = useState<AulaData[]>([]);
    const [filteredClasses, setFilteredClasses] = useState<AulaData[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    // 1. Busca de Dados
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await api.get('/classes'); 
                setAllClasses(response.data);
                setFilteredClasses(response.data);
            } catch (error) {
                console.error('Erro ao buscar aulas:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchClasses();
    }, []);

    useEffect(() => {
        if (searchText === '') {
            setFilteredClasses(allClasses);
        } else {
            const lowercasedQuery = searchText.toLowerCase();
            const filtered = allClasses.filter(aula => 
                aula.exercise_name.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredClasses(filtered);
        }
    }, [searchText, allClasses]);
    
    return (
        <View style={styles.screenContainer}>
            <TopNavBar 
                navigation={navigation} 
                activeScreen={'TelaExercicios'} 
            />
            
            <View style={styles.fixedHeaderArea}>
                <Text style={styles.mainTitle}>Todos os Exercícios</Text>
                <View style={styles.inputWrapper}>
                    <MaterialIcons name="search" size={24} color={COLORS.textMedium} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar por nome do exercício..."
                        placeholderTextColor={COLORS.textMedium}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchText('')}>
                            <MaterialIcons name="close" size={20} color={COLORS.textMedium} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView 
                style={styles.scrollViewFlex}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
                ) : filteredClasses.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="sentiment-dissatisfied" size={50} color={COLORS.textMedium} />
                        <Text style={styles.emptyText}>Nenhum exercício encontrado para "{searchText}"</Text>
                    </View>
                ) : (
                    filteredClasses.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => navigation.navigate("ClassDetailScreen", { data: item })}
                        >
                            <Image
                                source={{ uri: item.image_url }}
                                style={styles.image}
                            />
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.exercise_name}</Text>
                                <View style={styles.badgeRow}>
                                    <View style={[styles.badge, { backgroundColor: getLevelColor(item.level) }]}>
                                        <Text style={styles.badgeText}>{item.level.toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.partText}>{item.part_exercised}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
                <View style={{height: 20}} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollViewFlex: {
        flex: 1,
        // Espaço para a NavBar e para a área de busca fixa
        paddingTop: NAVBAR_HEIGHT_ADJUSTMENT + 110, 
    },
    contentContainer: {
        paddingHorizontal: 25,
        paddingBottom: 20,
    },
    fixedHeaderArea: {
        position: 'absolute',
        top: NAVBAR_HEIGHT_ADJUSTMENT,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        paddingHorizontal: 25,
        paddingBottom: 20,
        zIndex: 5, 
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: 15,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBackground,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        paddingHorizontal: 15,
        height: 50,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textDark,
        paddingHorizontal: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        marginBottom: 15,
        overflow: "hidden",
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    info: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    name: {
        fontSize: 17,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 8,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
        marginRight: 10,
    },
    badgeText: {
        color: COLORS.cardBackground,
        fontWeight: 'bold',
        fontSize: 10,
    },
    partText: {
        fontSize: 14,
        color: COLORS.textMedium,
    },
    loadingIndicator: {
        marginTop: 50,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
        padding: 20,
    },
    emptyText: {
        marginTop: 15,
        fontSize: 16,
        color: COLORS.textMedium,
        textAlign: 'center',
    }
});