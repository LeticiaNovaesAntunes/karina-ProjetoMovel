import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';  // ← agora vem do .env

// Checar se leu corretamente:
console.log("🔌 API BASE URL carregada:", API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL, // ← agora é seguro
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor adiciona automaticamente o Bearer Token
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');

        console.log('Token encontrado no AsyncStorage:', token ? 'Sim' : 'Não');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
