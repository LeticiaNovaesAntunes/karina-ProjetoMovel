import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import EsquecerSenha from './src/screens/EsquecerSenha';
import TelaPerfil from './src/screens/TelaPerfil';
import TelaEditarPerfil from './src/screens/TelaEditarPerfil';
import TelaAdmin from './src/screens/TelaAdmin';
import MainAppScreen from './src/screens/MainAppScreen';
import ClassesListScreen from './src/screens/ClassesList';
import ClassDetailScreen from './src/screens/ClassDetailScreen';
import CreateClasses from './src/screens/CreateClass';
import AllClassesScreen from './src/screens/AllClasses';
import VerificarTokenScreen from './src/screens/VerificarTokenScreen';
import NovaSenhaScreen from './src/screens/NovaSenhaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator  initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EsquecerSenha" component={EsquecerSenha} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
        <Stack.Screen name="TelaEditarPerfil" component={TelaEditarPerfil} />
        <Stack.Screen name="TelaAdmin" component={TelaAdmin} />
        <Stack.Screen name="MainAppScreen" component={MainAppScreen}/>
        <Stack.Screen name="ClassesListScreen" component={ClassesListScreen}/>
        <Stack.Screen name="ClassDetailScreen" component={ClassDetailScreen} />
        <Stack.Screen name="CreateClasses" component={CreateClasses} />
        <Stack.Screen name="AllClassesScreen" component={AllClassesScreen} />
        <Stack.Screen name="VerificarTokenScreen" component={VerificarTokenScreen} />
        <Stack.Screen name="NovaSenhaScreen" component={NovaSenhaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}