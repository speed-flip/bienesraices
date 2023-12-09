import { useState } from 'react';

import { View, Image, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import CustomAlert from '../../components/CustomAlert';
import AdminClient from '../../config/AdminClient';

import { saveItem } from '../../services/AsyncStorage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ msg: '', error: false });

  async function handleSubmit() {

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    const body = {
      email,
      password,
    }

    try {
      setLoading(true);
      const { data } = await AdminClient.post('/auth/login', body);

      saveItem('token', data.token);
      navigation.navigate('Admin');

    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.message,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../../../assets/img-auth.jpg')}
        style={styles.imagen}
      />
      <View style={styles.formulario}>
        <View style={{ marginBottom: 20 }}>
          <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}>
            Inicio de Sesión
          </Text>
          <Text variant='bodyMedium'>
            Ingresa tus credenciales para BienesRaices
          </Text>
        </View>

        <TextInput
          mode="outlined"
          label="Correo electronico"
          placeholder="correo@example.com"
          style={{ marginBottom: 15 }}
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
          disabled={loading}
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          placeholder="**********"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          disabled={loading}
        />

        <Button
          labelStyle={{ fontSize: 14, marginVertical: 10 }}
          onPress={() => navigation.navigate('SignUp')}
        >
          ¿No tienes una cuenta? Crea una
        </Button>

        <Button
          mode='contained'
          style={{ marginVertical: 15 }}
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          Iniciar Sesión
        </Button>
      </View>

      <CustomAlert
        alerta={alerta.msg ? true : false}
        title={alerta.error ? 'Error' : ''}
        content={alerta.msg}
        onPress={() => {
          setAlerta(false);
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  formulario: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  imagen: {
    width: 'auto',
    height: 220,
  },
});

export default Login;
