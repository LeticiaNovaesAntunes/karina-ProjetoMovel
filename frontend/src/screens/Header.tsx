import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NavItem {
    name: string;
    icon: keyof typeof MaterialIcons.glyphMap; 
    screen: string;
}

export const TOP_NAV_OPTIONS: NavItem[] = [
    { name: "Início", icon: "home", screen: "MainAppScreen" },
    { name: "Exercícios", icon: "fitness-center", screen: "AllClassesScreen" },
    { name: "Comunidade", icon: "people-alt", screen: "TelaComunidade" },
    { name: "Perfil", icon: "person", screen: "TelaPerfil" },
];

interface TopNavBarProps {
    navigation: any; 
    activeScreen: string; 
}

const COLORS = {
    primary: '#D02C70', 
    textLight: '#4B5563',
    card: '#FFFFFF', 
};

const TopNavBar: React.FC<TopNavBarProps> = ({ navigation, activeScreen }) => {

    const handleNavigation = (screen: string) => {
        if (navigation?.navigate) {
            navigation.navigate(screen);
        } else {
            Alert.alert("Erro de Rota", `A rota '${screen}' não pôde ser acessada. Verifique se a prop 'navigation' foi passada.`);
        }
    };

    return (
        <View style={styles.fixedHeader}>
            
            <View style={styles.headerContent}>
                {TOP_NAV_OPTIONS.map((item, index) => {
                    const isActive = item.screen === activeScreen; 
                    
                    const iconColor = isActive ? COLORS.primary : COLORS.textLight;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.topNavItem}
                            onPress={() => handleNavigation(item.screen)}
                        >
                            <MaterialIcons 
                                name={item.icon} 
                                size={24} 
                                color={iconColor} 
                            />
                            <Text style={[
                                styles.topNavText, 
                                { color: iconColor }
                            ]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    fixedHeader: {
        backgroundColor: COLORS.card,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB', 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 10,
        width: '100%',
    },
    headerContent: {
       flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60, 
        paddingHorizontal: 10,
    },
    topNavItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    topNavText: {
        fontSize: 10,
        marginTop: 2,
        fontWeight: 'bold',
    },
});

export default TopNavBar;