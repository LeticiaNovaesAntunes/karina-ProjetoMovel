import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import EsquecerSenha from './src/screens/EsquecerSenha';
import MainAppScreen from './src/screens/MainAppScreen';
import ClassesListScreen from './src/screens/ClassesList';
import ClassDetailScreen from './src/screens/ClassDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EsquecerSenha" component={EsquecerSenha} />
        <Stack.Screen name="MainAppScreen" component={MainAppScreen}/>
        <Stack.Screen name="ClasseListScreen" component={ClassesListScreen}/>
        <Stack.Screen name="ClassDetailScreen" component={ClassDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}