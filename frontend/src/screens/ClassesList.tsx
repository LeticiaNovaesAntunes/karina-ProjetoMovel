import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import TopNavBar from './Header'; // Assumindo que seu arquivo é Header.tsx

// Cores e Fontes tiradas do MainAppScreen
const COLORS = {
    primary: '#c65091ff',
    background: '#FFFDFD',
    textDark: '#555555',
    textMedium: '#777777',
    cardBackground: '#FFFFFF',
    textLight: '#777',
};

// Altura aproximada da NavBar (SafeAreaView + headerContent)
const NAVBAR_HEIGHT_ADJUSTMENT = 90;

export default function ClassesListScreen({ route, navigation }: any) {
    const { part } = route.params;
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/classes/part/${part}`)
            .then(res => res.json())
            .then(setClasses)
            .catch(err => console.log(err));
    }, [part]);

    return (
        <View style={styles.screenContainer}>
            <TopNavBar 
                navigation={navigation} 
                activeScreen={'ClassesListScreen'} 
            />
            
            <ScrollView 
                style={styles.scrollViewFlex}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Exercícios — {part}</Text>

                {classes.map((item: any) => (
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
                            <Text style={styles.level}>Nível: {item.level}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
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
        // Garante que o ScrollView comece abaixo da NavBar.
        // O padding é adicionado ao style, não contentContainerStyle, para funcionar com flex.
        paddingTop: NAVBAR_HEIGHT_ADJUSTMENT,
    },
    contentContainer: {
        paddingHorizontal: 25,
        paddingBottom: 40,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: 30,
        textAlign: 'left',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        marginBottom: 20,
        overflow: "hidden",
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
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
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 5,
    },
    level: {
        fontSize: 14,
        color: COLORS.textMedium,
    }
});