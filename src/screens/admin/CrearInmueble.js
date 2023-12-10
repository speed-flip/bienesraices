import { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, Image } from 'react-native'
import { FAB, Text, TextInput, Portal, Modal, IconButton, TouchableRipple, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import Camara from '../../components/Camara';

import AdminClient from '../../config/AdminClient';
import { getItem } from '../../services/AsyncStorage';

const CrearInmueble = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState('');
  const [sanitarios, setSanitarios] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', flex: 1 };

  async function handleSubmit() {
    if (!descripcion) return;

    const inmuebleData = new FormData();

    inmuebleData.append('nombre', nombre);
    inmuebleData.append('descripcion', descripcion);
    inmuebleData.append('habicaciones', habitaciones);
    inmuebleData.append('sanitarios', sanitarios);
    inmuebleData.append('tipo', tipo);
    inmuebleData.append('precio', precio);
    inmuebleData.append('imagenes', JSON.stringify(imagenes));
    inmuebleData.append('estado_propiedad', estado);
    inmuebleData.append('direccion', 'San Pedro Sula, Honduras');

    console.log(inmuebleData);

    const token = await getItem('token');

    try {
      const { data } = await AdminClient.post('/inmueble', inmuebleData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": 'multipart/form-data',
        }
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }

  }

  function deleteImage(index) {
    const newImages = imagenes.filter((_, indice) => indice !== index);
    setImagenes(newImages);
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text variant='titleSmall' style={{ textAlign: 'center', marginBottom: 20 }}>
        Completa los campos para crear un inmueble
      </Text>

      <ScrollView>
        <TextInput
          mode="outlined"
          label="Nombre"
          placeholder="Casa en el lago"
          style={{ marginBottom: 15 }}
          value={nombre}
          onChangeText={setNombre}
        />
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) =>
            setTipo(itemValue)
          }
          style={{ backgroundColor: '#FFF', marginBottom: 15 }}
        >
          <Picker.Item enabled={false} label="--Seleccion un tipo de inmueble--" value="" />
          <Picker.Item label="Casa" value="casa" />
          <Picker.Item label="Oficina" value="oficina" />
          <Picker.Item label="Apartamento" value="apartamento" />
        </Picker>

        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) =>
            setEstado(itemValue)
          }
          style={{ backgroundColor: '#FFF', marginBottom: 15 }}
        >
          <Picker.Item enabled={false} label="--Seleccion un estado--" value="" />
          <Picker.Item label='En renta' value="renta" />
          <Picker.Item label="En venta" value="venta" />
        </Picker>

        <View style={{ flexDirection: 'row', gap: 5, }}>
          <TextInput
            mode="outlined"
            label="Cantidad de habitaciones"
            placeholder="Ej: 2"
            keyboardType='number-pad'
            style={{ marginBottom: 15, flex: 1, }}
            value={habitaciones}
            onChangeText={setHabitaciones}
          />
          <TextInput
            mode="outlined"
            label="Cantidad de sanitarios"
            placeholder="Ej: 2"
            keyboardType='number-pad'
            style={{ marginBottom: 15, flex: 1, }}
            value={sanitarios}
            onChangeText={setSanitarios}
          />
        </View>

        <TextInput
          mode="outlined"
          label="Precio"
          placeholder="Casa en el lago"
          keyboardType='number-pad'
          style={{ marginBottom: 15 }}
          value={precio}
          onChangeText={setPrecio}
        />

        <TextInput
          mode="outlined"
          label="Descripcion"
          placeholder="Agrega una breve descripcion para el inmueble"
          multiline
          numberOfLines={8}
          style={{ marginBottom: 15 }}
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <Button
          mode='outlined'
          onPress={handleSubmit}
        >
          Crear inmueble
        </Button>

      </ScrollView>

      <FlatList
        data={imagenes}
        horizontal
        style={{ marginVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item, index }) => (
          <TouchableRipple
            onLongPress={() => deleteImage(index)}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Image
              source={{ uri: item.uri }}
              width={150}
              height={200}
            />
          </TouchableRipple>
        )}
        keyExtractor={item => item.uri}
      />

      <FAB
        icon="camera"
        style={styles.fab}
        onPress={showModal}
      />

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <IconButton
            icon='close'
            onPress={hideModal}
            size={30}
            style={styles.close}
          />
          <Camara
            setImagenes={setImagenes}
            imagenes={imagenes}
          />
        </Modal>
      </Portal>

    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CrearInmueble