// Import necessary React and React Native components
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Start screen component - where users enter their name and choose a background color
const Start = ({ navigation }) => {
  // State to store the user's name input
  const [name, setName] = useState('');
  // State to store the selected background color (default is first color)
  const [background, setBackground] = useState('#090C08');

  // Array of available background colors from the design specifications
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    // ImageBackground displays the background image for the start screen
    <ImageBackground
      source={require('../assets/background-image.png')} // Path to your background image
      resizeMode="cover" // Ensures image covers the entire screen
      style={styles.container}
    >
      {/* Main content container */}
      <View style={styles.contentContainer}>
        {/* App title */}
        <Text style={styles.title}>Ping</Text>

        {/* White box containing the input and color selection */}
        <View style={styles.inputContainer}>
          {/* Text input for user's name */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName} // Updates name state as user types
            placeholder="Your name"
            placeholderTextColor="#75708388" // 50% opacity as per design specs
          />

          {/* Section for choosing background color */}
          <View style={styles.colorSection}>
            <Text style={styles.colorLabel}>Choose background color:</Text>

            {/* Container for color option circles */}
            <View style={styles.colorOptions}>
              {/* Map through colors array to create selectable circles */}
              {colors.map((color) => (
                <TouchableOpacity
                  key={color} // Unique key for each color option
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color }, // Apply the color to the circle
                    // Add border if this color is selected
                    background === color && styles.selectedColor,
                  ]}
                  onPress={() => setBackground(color)} // Update selected color
                  accessible={true}
                  accessibilityLabel={`Background color ${color}`}
                  accessibilityRole="button"
                />
              ))}
            </View>
          </View>

          {/* Button to navigate to chat screen */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Validate that user entered a name
              if (name.trim() === '') {
                Alert.alert('Please enter your name');
                return;
              }
              // Navigate to Chat screen and pass user's name and chosen color
              navigation.navigate('Chat', {
                name: name,
                background: background,
              });
            }}
            accessible={true}
            accessibilityLabel="Start chatting"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// Stylesheet for the Start screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up entire screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between', // Distributes space evenly
    alignItems: 'center',
    width: '88%', // 88% of screen width for padding
    paddingVertical: '6%',
  },
  title: {
    fontSize: 45, // As per design specifications
    fontWeight: '600', // Semi-bold
    color: '#FFFFFF', // White text
    marginTop: 60,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF', // White background box
    width: '100%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 4,
  },
  textInput: {
    fontSize: 16, // As per design specifications
    fontWeight: '300', // Light weight
    color: '#757083', // Text color from design specs
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083',
    marginBottom: 20,
    borderRadius: 2,
  },
  colorSection: {
    marginBottom: 20,
  },
  colorLabel: {
    fontSize: 16, // As per design specifications
    fontWeight: '300', // Light weight
    color: '#757083', // Text color from design specs
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row', // Display colors in a row
    justifyContent: 'space-between', // Space colors evenly
    paddingHorizontal: 10,
  },
  colorCircle: {
    width: 50, // Fixed width for circles
    height: 50, // Fixed height for circles
    borderRadius: 25, // Half of width/height to make perfect circle
  },
  selectedColor: {
    borderWidth: 3, // Thicker border for selected color
    borderColor: '#757083', // Border color to indicate selection
  },
  button: {
    backgroundColor: '#757083', // Button background from design specs
    padding: 15,
    borderRadius: 2,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16, // As per design specifications
    fontWeight: '600', // Semi-bold
    color: '#FFFFFF', // White text
  },
});

export default Start;
