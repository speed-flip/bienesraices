import { useState } from 'react';

import { View, Image, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    console.log({ email, password });
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
          <Text variant='bodySmall'>
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
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          placeholder="**********"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
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
        >
          Iniciar Sesión
        </Button>
      </View>
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
