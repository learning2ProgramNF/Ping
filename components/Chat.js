// Import necessary React and React Native components
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Chat screen component - displays the chat interface
const Chat = ({ route, navigation }) => {
  // Extract the name and background color passed from Start screen
  const { name, background } = route.params;

  // useEffect runs when component mounts - sets the navigation title
  useEffect(() => {
    // Set the screen title to display the user's name
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    // Main container with the background color chosen by user
    <View style={[styles.container, { backgroundColor: background }]}>
      {/* Placeholder text - will be replaced with chat functionality later */}
      <Text style={styles.text}>Welcome to the chat, {name}!</Text>
    </View>
  );
};

// Stylesheet for the Chat screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up entire screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  text: {
    color: '#FFFFFF', // White text for visibility
    fontSize: 20,
  },
});

export default Chat;
