import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import StackNavigation from './src/navigation/StackNavigation';

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

