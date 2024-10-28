import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import globalStyles from '../styles/styles';

const LoginScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!usuario || !contraseña) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.11:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('MainPage', { user: data.usuario });
      } else {
        Alert.alert('Error', data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bienvenido a Gambling Soccer</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <View style={globalStyles.passwordContainer}>
        <TextInput
          style={globalStyles.inputPassword}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          autoCapitalize="none" // Evita que inicie con mayúsculas
          value={contraseña}
          onChangeText={setContraseña}
        />
        <TouchableOpacity
          style={globalStyles.showButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={globalStyles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
