import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';

import AdminClient from '../../config/AdminClient';
import { getItem } from '../../services/AsyncStorage';

const Home = () => {

  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    getInmuebles();
    async function getInmuebles() {
      const token = await getItem('token')
      try {
        const { data } = await AdminClient('/inmueble', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(`${process.env.EXPO_PUBLIC_IMAGE_URL}${data.inmuebles[0].imagenes[0]}`);
        setInmuebles(data.inmuebles);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <View>
      <FlatList
        data={inmuebles}
        renderItem={({ item }) => (
          <View>
            <Image
              source={`${process.env.EXPO_PUBLIC_BACKEND_URL}${item.imagenes[0]}`}
              width={100}
              height={200}
            />
            <Text>{item.nombre}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Home;
