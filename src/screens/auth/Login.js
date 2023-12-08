import { View, Text, Button } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        title='ir a admin'
        onPress={() => {
          navigation.navigate('Admin');
        }}
      />
    </View>
  )
}

export default Login;
