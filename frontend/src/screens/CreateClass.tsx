import React, { useState } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Alert,
    ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api'; 
const LEVELS = ['FACIL', 'MEDIO', 'DIFICIL'];
const PARTS = ['POSTURA', 'ABDOMEN', 'PERNAS', 'CARDIO'];

const COLORS = {
    primary: '#D02C70', 
    secondary: '#9C27B0', 
    background: '#F0F2F5', 
    card: '#FFFFFF', 
    textDark: '#1F2937', 
    textLight: '#4B5563', 
    statusActive: '#10B981', 
    statusInactive: '#F87171', 
    buttonDelete: '#EF4444', 
    buttonLock: '#F59E0B', 
    buttonUnlock: '#3B82F6', 
    inputBorder: '#E5E7EB', 
};

interface AulaData {
    exercise_name: string;
    level: string; 
    image_url: string;
    video_url: string;
    part_exercised: string; 
    description: string;
}

export default function CreateClasses({ navigation }) {
    const [formData, setFormData] = useState<AulaData>({
        exercise_name: '',
        level: LEVELS[0] || '', 
        image_url: '',
        video_url: '',
        part_exercised: PARTS[0] || '',
        description: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (name: keyof AulaData, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCadastroAula = async () => {
        const { exercise_name, level, part_exercised, description } = formData;
        
        if (!exercise_name || !level || !part_exercised || !description) {
            Alert.alert('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            // Rota: /classes/create (do seu backend)
            const response = await api.post('/classes/create', formData);
            
            Alert.alert('Sucesso 🎉', `Aula "${response.data.exercise_name}" cadastrada com sucesso!`);
            
            // Limpar o formulário
            setFormData({
                exercise_name: '', 
                level: LEVELS[0] || '', 
                image_url: '', 
                video_url: '', 
                part_exercised: PARTS[0] || '', 
                description: '',
            });
            
        } catch (error: any) {
            console.error('Erro ao cadastrar aula:', error.response?.data || error.message);
            Alert.alert('Erro 🛑', 'Não foi possível cadastrar a aula. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.titulo}>Cadastrar Nova Aula</Text>
                <Text style={styles.subTitulo}>Preencha os dados do novo exercício ou classe.</Text>
                
                {/* 1. Nome do Exercício (Input normal) */}
                <Text style={styles.inputLabel}>Nome do Exercício (*)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Agachamento Livre"
                    placeholderTextColor={COLORS.textLight}
                    value={formData.exercise_name}
                    onChangeText={(text) => handleChange('exercise_name', text)}
                />

                {/* 2. Nível (Picker / Select) */}
                <View style={styles.pickerWrapper}>
                    <Text style={styles.inputLabel}>Nível (*)</Text>
                    <Picker
                        selectedValue={formData.level}
                        onValueChange={(itemValue) => handleChange('level', itemValue)}
                        style={styles.pickerStyle}
                        itemStyle={styles.pickerItemStyle}
                    >
                        {LEVELS.map(level => (
                            <Picker.Item key={level} label={level} value={level} />
                        ))}
                    </Picker>
                </View>

                {/* 3. Parte Exercitada (Picker / Select) */}
                <View style={styles.pickerWrapper}>
                    <Text style={styles.inputLabel}>Parte Exercitada (*)</Text>
                    <Picker
                        selectedValue={formData.part_exercised}
                        onValueChange={(itemValue) => handleChange('part_exercised', itemValue)}
                        style={styles.pickerStyle}
                        itemStyle={styles.pickerItemStyle}
                    >
                        {PARTS.map(part => (
                            <Picker.Item key={part} label={part} value={part} />
                        ))}
                    </Picker>
                </View>
                
                {/* 4. Descrição (Textarea) */}
                <Text style={styles.inputLabel}>Descrição (*)</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Instruções detalhadas sobre como executar o exercício..."
                    placeholderTextColor={COLORS.textLight}
                    multiline
                    numberOfLines={4}
                    value={formData.description}
                    onChangeText={(text) => handleChange('description', text)}
                />
                
                {/* 5. URL da Imagem (Input normal) */}
                <Text style={styles.inputLabel}>URL da Imagem (Opcional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="https://exemplo.com/imagem_exercicio.png"
                    placeholderTextColor={COLORS.textLight}
                    value={formData.image_url}
                    onChangeText={(text) => handleChange('image_url', text)}
                />
                
                {/* 6. URL do Vídeo (Input normal) */}
                <Text style={styles.inputLabel}>URL do Vídeo (Opcional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="https://youtube.com/watch?v=exercicio"
                    placeholderTextColor={COLORS.textLight}
                    value={formData.video_url}
                    onChangeText={(text) => handleChange('video_url', text)}
                />

                <TouchableOpacity 
                    style={styles.submitButton} 
                    onPress={handleCadastroAula}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>
                            <MaterialIcons name="add-circle" size={20} color="white" /> Cadastrar Aula
                        </Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { padding: 20, paddingBottom: 40 },
    titulo: { fontSize: 26, fontWeight: 'bold', color: COLORS.primary, marginBottom: 5 },
    subTitulo: { fontSize: 14, color: COLORS.textLight, marginBottom: 20 },
    inputLabel: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 5 },
    input: {
        width: '100%', height: 50, borderColor: COLORS.inputBorder, borderWidth: 1, 
        borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, 
        color: COLORS.textDark, backgroundColor: COLORS.card,
    },
    textArea: { height: 100, paddingTop: 15, textAlignVertical: 'top' },
    submitButton: {
        backgroundColor: COLORS.statusActive, borderRadius: 10, padding: 15, 
        alignItems: 'center', marginTop: 20, elevation: 3, flexDirection: 'row', 
        justifyContent: 'center',
    },
    submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 5 },
    
    // --- ESTILOS DO PICKER (SELECT) ---
    pickerWrapper: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 10,
        backgroundColor: COLORS.card,
        paddingHorizontal: 0, // Remove o padding horizontal extra do input
    },
    pickerStyle: {
        width: '100%',
        height: 50,
        color: COLORS.textDark,
    },
    pickerItemStyle: {
        fontSize: 16,
    }
});