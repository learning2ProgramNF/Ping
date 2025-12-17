// Import necessary React and React Native components
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import our custom screen components
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator - this manages screen transitions
const Stack = createNativeStackNavigator();

// Main App component - entry point of the application
const App = () => {
  return (
    // NavigationContainer wraps the entire navigation structure
    <NavigationContainer>
      {/* Stack.Navigator manages the screen stack and navigation */}
      <Stack.Navigator
        initialRouteName="Start" // First screen users see
      >
        {/* Define the Start screen */}
        <Stack.Screen name="Start" component={Start} />
        {/* Define the Chat screen */}
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
