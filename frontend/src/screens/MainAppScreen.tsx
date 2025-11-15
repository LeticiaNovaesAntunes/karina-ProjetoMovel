import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const MOCK_USER = {
    name: "Serena",
    role: "ADMIN",
};

const TOP_NAV_OPTIONS = [
    { name: "Início", icon: "home", screen: "TelaInicial" },
    { name: "Exercícios", icon: "fitness-center", screen: "TelaExercicios" },
    { name: "Comunidade", icon: "people-alt", screen: "TelaComunidade" },
    { name: "Perfil", icon: "person", screen: "TelaPerfil" },
];

export default function MainAppScreen({ navigation }: any) {
    const [user, setUser] = useState(MOCK_USER);
    const isAdmin = user.role === 'ADMIN'; 
    
    const categories = [
        { name: "Postura", icon: "accessibility-new", color: ['#eb538eff', '#FFA9C7'] }, 
        { name: "Pernas", icon: "directions-run", color: ['#6aadc5ff', '#95D1E8'] }, 
        { name: "Abdômen", icon: "fitness-center", color: ['#d8c55cff', '#FFE87A'] }, 
        { name: "Cardio", icon: "favorite", color: ['#5c4ba7ff', '#A391F9'] }, 
    ];

    const partEnumMap: any = {
        "Postura": "POSTURA",
        "Pernas": "PERNAS",
        "Abdômen": "ABDOMEN",
        "Cardio": "CARDIO",
    };

    const handleNavigation = (screen: string) => {
        if (navigation?.navigate) {
            navigation.navigate(screen);
        } else {
            Alert.alert("Erro de Rota", `A rota '${screen}' não pôde ser acessada.`);
        }
    };

    const handleCategoryPress = (itemName: string) => {
        const enumValue = partEnumMap[itemName];
        navigation.navigate("ClassesListScreen", { part: enumValue });
    };

    return (
        <View style={styles.container}>
            
            {/* TOP NAVBAR */}
            <View style={styles.fixedHeader}>
                <View style={styles.headerContent}>
                    {TOP_NAV_OPTIONS.map((item, index) => {
                        const isActive = item.name === 'Início';
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.topNavItem}
                                onPress={() => handleNavigation(item.screen)}
                            >
                                <MaterialIcons 
                                    name={item.icon as any} 
                                    size={24} 
                                    color={isActive ? styles.colorPrimary.color : styles.colorTextLight.color} 
                                />
                                <Text style={[
                                    styles.topNavText, 
                                    {color: isActive ? styles.colorPrimary.color : styles.colorTextLight.color}
                                ]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* SCROLL PRINCIPAL */}
            <ScrollView 
                style={styles.contentArea}
                contentContainerStyle={styles.optionsContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.mainTitle}>Yoga para o Dia 🧘‍♀️</Text>
                <Text style={styles.subtitle}>Escolha seu foco e comece a treinar</Text>

                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionWrapper}
                        onPress={() => handleCategoryPress(item.name)}
                    >
                        <LinearGradient 
                            colors={item.color} 
                            style={styles.optionCard}
                            start={{ x: 0.05, y: 0.05 }}
                            end={{ x: 0.95, y: 0.95 }}
                        >
                            <MaterialIcons name={item.icon as any} size={40} color="#FFFFFF" style={{marginBottom: 10}}/>
                            <Text style={styles.optionText}>{item.name}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    colorPrimary: { color: '#c65091ff' },
    colorTextLight: { color: '#AAAAAA' },

    container: {
        flex: 1,
        backgroundColor: '#FFFDFD',
    },

    fixedHeader: {
        paddingTop: 50,
        backgroundColor: '#FFFFFF', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
        zIndex: 10, 
    },

    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingBottom: 10,
        height: 50,
    },

    topNavItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },

    topNavText: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 4,
    },

    contentArea: {
        flex: 1,
    },

    optionsContainer: {
        paddingHorizontal: 25, 
        paddingTop: 30,
        paddingBottom: 20,
        gap: 20,
    },

    mainTitle: {
        fontSize: 34,
        color: '#555555',
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'left',
    },

    subtitle: {
        fontSize: 18,
        color: '#777777',
        marginBottom: 40,
        textAlign: 'left',
        fontWeight: '500',
    },

    optionWrapper: {
        width: '100%',
    },

    optionCard: {
        width: '100%',
        height: 140,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },

    optionText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: '800',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
});