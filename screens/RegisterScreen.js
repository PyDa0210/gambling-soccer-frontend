import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../styles/styles';

const RegisterScreen = ({ navigation }) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!nombres || !apellidos || !usuario || !contraseña || !cedula || !email || !fechaNacimiento) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.11:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombres,
          apellidos,
          usuario,
          contraseña,
          cedula,
          email,
          fechaNacimiento: fechaNacimiento.toISOString().split('T')[0],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Registro exitoso');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'No se pudo completar el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowDatePicker(Platform.OS === 'ios');
    setFechaNacimiento(currentDate);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Regístrate en Gambling Soccer</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Nombres"
        value={nombres}
        onChangeText={setNombres}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Apellidos"
        value={apellidos}
        onChangeText={setApellidos}
      />
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

      <TextInput
        style={globalStyles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      {/* Selector de fecha de nacimiento */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={globalStyles.dateInput}>
        <Text style={globalStyles.dateText}>
          Fecha de Nacimiento: {fechaNacimiento.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={fechaNacimiento}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
