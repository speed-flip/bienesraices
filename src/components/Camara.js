import { Camera, CameraType } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';

function Camara({ setImagenes, imagenes }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const camaraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (camaraRef) {
      try {
        const data = await camaraRef.current.takePictureAsync();
        console.log(data);

        setImagenes([...imagenes, data]);
        console.log(imagenes);

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={camaraRef}
      >
        <View style={{
          position: 'absolute',
          top: 10,
          right: 10,
          left: 10,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
          <IconButton
            icon='repeat-variant'
            iconColor='#fff'
            size={35}
            onPress={toggleCameraType}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={takePicture}
          >
            Tomar Foto
          </Button>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 30,
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Camara;
