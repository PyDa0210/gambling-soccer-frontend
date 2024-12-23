import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // Fondo claro y suave
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50', // Color elegante para títulos
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#34495e',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  inputPassword: {
    flex: 1,
    height: 48,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  showButton: {
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#1abc9c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  link: {
    color: '#2980b9',
    fontSize: 16,
    marginTop: 12,
  },
  dashboardButton: {
    position: 'absolute',
    top: 50,
    right: 15,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dashboardText: {
    color: '#ffffff',
    fontSize: 14,
  },
  recargarButton: {
    width: '100%',
    backgroundColor: '#1abc9c', // Botón de recarga en verde vibrante
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  retirarButton: {
    width: '100%',
    backgroundColor: '#e67e22', // Botón de retiro en naranja
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    padding: 8,
    margin: 10,
    backgroundColor: '#d9534f',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  modalButton: {
    width: '80%',
    backgroundColor: '#1abc9c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  cancelButton: {
    width: '80%',
    backgroundColor: '#bdc3c7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
});

export default globalStyles;
