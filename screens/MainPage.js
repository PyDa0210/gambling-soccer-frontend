import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/styles';

const MainPage = ({ navigation, route }) => {
  const { user } = route.params;

  const handleLogout = () => {
    // Regresa al login y borra los datos de la sesión si es necesario
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={globalStyles.logoutButton} onPress={handleLogout}>
        <Text style={globalStyles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={globalStyles.title}>Bienvenido a Gambling Soccer</Text>
      <Text style={globalStyles.subTitle}>Hola, {user.nombres}</Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Profile', { user })}
      >
        <Text style={globalStyles.buttonText}>Ver Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Betting')}
      >
        <Text style={globalStyles.buttonText}>Ir a Apuestas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainPage;
