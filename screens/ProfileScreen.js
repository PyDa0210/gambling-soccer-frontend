import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import globalStyles from '../styles/styles';

const ProfileScreen = ({ route }) => {
  const { user } = route.params;
  const [recargaMonto, setRecargaMonto] = useState('');
  const [retiroMonto, setRetiroMonto] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [saldo, setSaldo] = useState(user.saldo);

  // Manejo de recarga de saldo
  const handleRecarga = async () => {
    if (!recargaMonto || parseFloat(recargaMonto) <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido para recargar');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.11:4000/recargar-saldo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, monto: parseFloat(recargaMonto) }),
      });

      const data = await response.json();

      if (response.ok) {
        setSaldo(data.nuevoSaldo);
        setModalVisible(false);
        setRecargaMonto('');
        Alert.alert('Éxito', `Recarga realizada con éxito. Nuevo saldo: $${data.nuevoSaldo} COP`);
      } else {
        Alert.alert('Error', data.message || 'No se pudo realizar la recarga');
      }
    } catch (error) {
      console.error('Error al recargar saldo:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  // Manejo de retiro de saldo
  const handleRetiro = async () => {
    if (!retiroMonto || parseFloat(retiroMonto) <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido para retirar');
      return;
    }
    if (parseFloat(retiroMonto) > saldo) {
      Alert.alert('Error', 'No tienes saldo suficiente para este retiro');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.11:4000/retirar-saldo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, monto: parseFloat(retiroMonto) }),
      });

      const data = await response.json();

      if (response.ok) {
        setSaldo(data.nuevoSaldo);
        setWithdrawModalVisible(false);
        setRetiroMonto('');
        Alert.alert('Éxito', `Retiro realizado con éxito. Nuevo saldo: $${data.nuevoSaldo} COP`);
      } else {
        Alert.alert('Error', data.message || 'No se pudo realizar el retiro');
      }
    } catch (error) {
      console.error('Error al retirar saldo:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Perfil de Usuario</Text>
      <Text style={globalStyles.subTitle}>Nombres: {user.nombres}</Text>
      <Text style={globalStyles.subTitle}>Apellidos: {user.apellidos}</Text>
      <Text style={globalStyles.subTitle}>Email: {user.email}</Text>
      <Text style={globalStyles.subTitle}>Saldo: ${saldo} COP</Text>

      <TouchableOpacity
        style={globalStyles.recargarButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={globalStyles.buttonText}>Recargar Saldo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.retirarButton}
        onPress={() => setWithdrawModalVisible(true)}
      >
        <Text style={globalStyles.buttonText}>Retirar Saldo</Text>
      </TouchableOpacity>

      {/* Modal de recarga */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Ingresa el monto a recargar</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Monto en COP"
              keyboardType="numeric"
              value={recargaMonto}
              onChangeText={setRecargaMonto}
            />
            <TouchableOpacity style={globalStyles.modalButton} onPress={handleRecarga}>
              <Text style={globalStyles.modalButtonText}>Confirmar Recarga</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={globalStyles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de retiro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={withdrawModalVisible}
        onRequestClose={() => setWithdrawModalVisible(false)}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Ingresa el monto a retirar</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Monto en COP"
              keyboardType="numeric"
              value={retiroMonto}
              onChangeText={setRetiroMonto}
            />
            <TouchableOpacity style={globalStyles.modalButton} onPress={handleRetiro}>
              <Text style={globalStyles.modalButtonText}>Confirmar Retiro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.cancelButton}
              onPress={() => setWithdrawModalVisible(false)}
            >
              <Text style={globalStyles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
