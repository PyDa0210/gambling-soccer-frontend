import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainPage from './screens/MainPage';
import ProfileScreen from './screens/ProfileScreen';
import BettingScreen from './screens/BettingScreen'; // Importa la nueva pantalla de apuestas

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla de inicio de sesión */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Iniciar sesión',
            headerStyle: { backgroundColor: '#1abc9c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        {/* Pantalla de registro */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Registro',
            headerStyle: { backgroundColor: '#3498db' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        {/* Pantalla principal */}
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{
            title: 'Bienvenido a Gambling Soccer',
            headerStyle: { backgroundColor: '#1abc9c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' },
            headerLeft: null, // Deshabilita el botón de retroceso en la MainPage
          }}
        />
        {/* Pantalla del perfil */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Perfil',
            headerStyle: { backgroundColor: '#3498db' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        {/* Pantalla de apuestas */}
        <Stack.Screen
          name="Betting"
          component={BettingScreen}
          options={{
            title: 'Apuestas',
            headerStyle: { backgroundColor: '#8e44ad' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
0