import { useState } from 'react';

import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AdminClient from '../../config/AdminClient';
import CustomAlert from '../../components/CustomAlert';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ msg: '', error: false });

  async function handleSubmit() {
    const body = {
      name,
      username: 'user',
      email,
      password,
    }

    try {
      setLoading(true);
      const { data } = await AdminClient.post('/auth/signup', body);
      setAlerta({
        msg: data.msg ?? 'no hay msg en rsp',
      });
      console.log(data);
      setAlerta({
        msg: data.errorResponse ? `${data.errorResponse.msg} ${data.errorResponse.details}` : data.msg,
        error: data.errorResponse ? true : false,
      });
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
      <ScrollView style={styles.formulario}>
        <View style={{ marginBottom: 20 }}>
          <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}>
            Registrarse
          </Text>
          <Text variant='bodyMedium'>
            Completa los siguientes campos para crear tu cuenta en BienesRaices
          </Text>
        </View>

        <TextInput
          mode="outlined"
          label="Nombre"
          placeholder="Jane Doe"
          style={{ marginBottom: 5 }}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          mode="outlined"
          label="Correo electronico"
          placeholder="correo@example.com"
          keyboardType='email-address'
          style={{ marginBottom: 5 }}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          placeholder="**********"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          right={<TextInput.Icon icon="eye" />}
        />

        <Button
          labelStyle={{ fontSize: 14, marginVertical: 10 }}
          onPress={() => navigation.navigate('Login')}
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Button>

        <Button
          mode='contained'
          style={{ marginVertical: 15 }}
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          Crear Cuenta
        </Button>
      </ScrollView>

      <CustomAlert
        alerta={alerta.msg ? true : false}
        title={alerta.error ? 'Error' : ''}
        content={alerta.msg}
        onPress={() => {
          if (alerta.error) {
            setAlerta(false);
          } else {
            navigation.navigate('Login');
          }
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

export default SignUp;
