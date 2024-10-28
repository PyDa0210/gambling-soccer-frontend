import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput } from 'react-native';
import globalStyles from '../styles/styles';

const BettingScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [saldo, setSaldo] = useState(1000); // saldo inicial ficticio

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          'X-RapidAPI-Key': '9420ea3be4msh1556c4e757e0865p114ab9jsn13f7ea8c4e10', // Clave API
        },
      });
      const data = await response.json();

      const fakeMatch = {
        fixture: { id: 9999, date: new Date().toISOString() },
        teams: { home: { name: "Colombia" }, away: { name: "España" } },
      };

      setMatches([fakeMatch, ...(data.response || [])]);
    } catch (error) {
      console.error('Error fetching matches:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos de los partidos.');
      setMatches([{
        fixture: { id: 9999, date: new Date().toISOString() },
        teams: { home: { name: "Colombia" }, away: { name: "España" }},
      }]);
    } finally {
      setLoading(false);
    }
  };

  const placeBet = () => {
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido.');
      return;
    }
    if (amount > saldo) {
      Alert.alert('Error', 'Saldo insuficiente para esta apuesta.');
      return;
    }

    // Restar el monto apostado del saldo actual
    setSaldo(saldo - amount);

    // Mostrar confirmación
    Alert.alert(
      'Apuesta Realizada',
      `Apuesta de $${amount} COP al equipo ${selectedTeam} en el partido ${selectedMatch.teams.home.name} vs ${selectedMatch.teams.away.name}`
    );

    // Cerrar el modal
    setModalVisible(false);
    setBetAmount('');
    setSelectedTeam('');
  };

  const renderMatch = ({ item }) => (
    <TouchableOpacity
      style={globalStyles.button}
      onPress={() => {
        setSelectedMatch(item);
        setModalVisible(true);
      }}
    >
      <Text style={globalStyles.buttonText}>
        {item.teams.home.name} vs {item.teams.away.name} - {new Date(item.fixture.date).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Apuestas de Fútbol</Text>
      <Text style={globalStyles.subTitle}>Saldo: ${saldo} COP</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1abc9c" />
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.fixture.id.toString()}
          ListEmptyComponent={() => <Text style={globalStyles.subTitle}>No hay partidos disponibles</Text>}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalView}>
            {selectedMatch && (
              <>
                <Text style={globalStyles.modalTitle}>
                  Apuesta en: {selectedMatch.teams.home.name} vs {selectedMatch.teams.away.name}
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Monto de la apuesta"
                  keyboardType="numeric"
                  value={betAmount}
                  onChangeText={setBetAmount}
                />
                <TouchableOpacity
                  style={[globalStyles.button, selectedTeam === selectedMatch.teams.home.name && globalStyles.selectedButton]}
                  onPress={() => setSelectedTeam(selectedMatch.teams.home.name)}
                >
                  <Text style={globalStyles.buttonText}>{selectedMatch.teams.home.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.button, selectedTeam === selectedMatch.teams.away.name && globalStyles.selectedButton]}
                  onPress={() => setSelectedTeam(selectedMatch.teams.away.name)}
                >
                  <Text style={globalStyles.buttonText}>{selectedMatch.teams.away.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.modalButton} onPress={placeBet}>
                  <Text style={globalStyles.modalButtonText}>Confirmar Apuesta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.cancelButton, { backgroundColor: '#e74c3c' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={globalStyles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BettingScreen;
