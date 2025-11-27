import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TopNavBar from './Header';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#c65091ff',
    background: '#FFFDFD',
    textDark: '#555555',
    textMedium: '#777777',
    cardBackground: '#FFFFFF',
    levelFacil: '#10B981',
    levelMedio: '#F59E0B',
    levelDificil: '#EF4444',
};

const NAVBAR_HEIGHT_ADJUSTMENT = 90;
const PADDING_HORIZONTAL = 20;
const CONTENT_WIDTH = width - (PADDING_HORIZONTAL * 2);

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

export default function ClassDetailScreen({ route, navigation }: any) {
    const { data: item } = route.params;

    const handleVideoPress = () => {
        if (item.video_url && item.video_url.startsWith('http')) {
            Linking.openURL(item.video_url);
        } else {
            console.log('URL de vídeo inválida:', item.video_url);
        }
    };

    return (
        <View style={styles.screenContainer}>
            <TopNavBar 
                navigation={navigation} 
                activeScreen={'ClassDetailScreen'} 
            />
            
            <ScrollView 
                style={styles.scrollViewFlex}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{item.exercise_name}</Text>
                
                <View style={styles.headerRow}>
                    <View style={[styles.badge, { backgroundColor: getLevelColor(item.level) }]}>
                        <Text style={styles.badgeText}>{item.level.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.partText}>Foco: {item.part_exercised}</Text>
                </View>

                {item.image_url ? (
                    <Image
                        source={{ uri: item.image_url }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <MaterialIcons name="image-not-supported" size={50} color={COLORS.textMedium} />
                        <Text style={styles.placeholderText}>Sem Imagem</Text>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Descrição da Aula</Text>
                <Text style={styles.description}>{item.description}</Text>

                {item.video_url ? (
                    <TouchableOpacity 
                        style={styles.videoButton} 
                        onPress={handleVideoPress}
                    >
                        <MaterialIcons name="ondemand-video" size={24} color={COLORS.cardBackground} />
                        <Text style={styles.videoButtonText}>Assistir ao Vídeo de Demonstração</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.videoPlaceholder}>
                        <Text style={styles.placeholderText}>Vídeo de demonstração não fornecido.</Text>
                    </View>
                )}

                <View style={{ height: 40 }} />
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
        paddingTop: NAVBAR_HEIGHT_ADJUSTMENT,
    },
    contentContainer: {
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: 15,
        lineHeight: 38,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 15,
    },
    badgeText: {
        color: COLORS.cardBackground,
        fontWeight: 'bold',
        fontSize: 12,
    },
    partText: {
        fontSize: 16,
        color: COLORS.textMedium,
        fontWeight: '600',
    },
    image: {
        width: CONTENT_WIDTH,
        height: width * 0.6,
        borderRadius: 15,
        marginBottom: 30,
    },
    imagePlaceholder: {
        width: CONTENT_WIDTH,
        height: width * 0.6,
        borderRadius: 15,
        marginBottom: 30,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDDDDD',
    },
    placeholderText: {
        marginTop: 10,
        color: COLORS.textMedium,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 5,
    },
    description: {
        fontSize: 16,
        color: COLORS.textMedium,
        marginBottom: 30,
        lineHeight: 24,
        textAlign: 'justify',
    },
    videoButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        marginBottom: 20,
    },
    videoButtonText: {
        color: COLORS.cardBackground,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    videoPlaceholder: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
    }
});