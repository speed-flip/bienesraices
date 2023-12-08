import { useState } from 'react';

import { View, Image, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const SignUp = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    console.log({ nombre, email, password });
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
          value={nombre}
          onChangeText={setNombre}
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
        >
          Crear Cuenta
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

export default SignUp;
