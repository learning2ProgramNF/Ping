/**
 * Chat Component - Ping App
 *
 * This component displays the main chat interface where users can send and receive messages.
 * It uses the react-native-gifted-chat library to provide a complete chat UI with minimal setup.
 *
 * Features:
 * - Message display with chat bubbles
 * - Text input for composing messages
 * - Send button functionality
 * - System messages for user notifications
 * - Custom bubble colors (black for sent, white for received)
 * - Keyboard handling for both iOS and Android platforms
 */

// Import React hooks for state management and lifecycle methods
import { useCallback, useEffect, useState } from 'react';

// Import React Native components for UI and platform-specific features
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

// Import Gifted Chat components - provides pre-built chat UI elements
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

/**
 * Chat Component
 *
 * @param {Object} route - Navigation route object containing params from previous screen
 *                         Includes: name (user's name) and background (selected color)
 * @param {Object} navigation - Navigation object for screen transitions and options
 */
const Chat = ({ route, navigation }) => {
  // Destructure user's name and chosen background color from route parameters
  // These were passed from the Start screen when user navigated here
  const { name, background } = route.params;

  // State to store all chat messages as an array
  // Each message follows Gifted Chat's required format with _id, text, createdAt, and user
  const [messages, setMessages] = useState([]);

  /**
   * useEffect Hook - Component Lifecycle Method
   *
   * Runs once when component mounts (empty dependency array [])
   * Used to:
   * 1. Set the screen title to display user's name
   * 2. Initialize the chat with static example messages
   *
   * Dependencies: [] means this only runs once on mount
   */
  useEffect(() => {
    // Set the navigation header title to show the user's name
    navigation.setOptions({ title: name });

    // Initialize messages array with two static messages:
    // 1. A regular user message from "React Native"
    // 2. A system message announcing the user has joined
    setMessages([
      {
        _id: 1, // Unique identifier for this message
        text: 'Hello developer', // Message content to display
        createdAt: new Date(), // Timestamp when message was created
        user: {
          _id: 2, // User ID of the message sender (different from current user)
          name: 'React Native', // Display name shown above message
          avatar: 'https://placeimg.com/140/140/any', // Profile picture URL
        },
      },
      {
        _id: 2, // Unique identifier for system message
        text: `${name} has entered the chat`, // Dynamic message using user's name
        createdAt: new Date(), // Timestamp
        system: true, // Marks this as a system message (displays centered, no bubble)
      },
    ]);
  }, []); // Empty dependency array - only run on component mount

  /**
   * onSend Function
   *
   * Called when user sends a new message via the Send button
   * Appends new message(s) to the existing messages array
   *
   * Wrapped in useCallback to optimize performance by preventing unnecessary re-renders
   * Dependencies: [] means the function reference stays stable across renders
   *
   * @param {Array} newMessages - Array containing new message(s) to be added
   *                              Usually contains one message, but could be multiple
   */
  const onSend = useCallback((newMessages = []) => {
    // Update messages state using functional update pattern
    // This gives us access to the previous state (previousMessages)
    setMessages((previousMessages) =>
      // GiftedChat.append() is a utility function that properly merges
      // the new messages with existing ones in the correct order
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []); // Empty dependency array - function definition never changes

  /**
   * renderBubble Function
   *
   * Customizes the appearance of message bubbles
   * Called by GiftedChat for each message to render its bubble
   *
   * Customizations:
   * - Right bubbles (sent messages): Black background, white text
   * - Left bubbles (received messages): White background, black text
   *
   * @param {Object} props - Props passed from GiftedChat component
   *                         Contains message data and default styling
   * @returns {JSX.Element} Customized Bubble component
   */
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props} // Spread operator passes all original props to maintain functionality
        wrapperStyle={{
          // Customize bubble wrapper styles for different positions
          right: {
            // Styles for messages sent by current user (appear on right)
            backgroundColor: '#000', // Black background
          },
          left: {
            // Styles for messages received from others (appear on left)
            backgroundColor: '#FFF', // White background
          },
        }}
        textStyle={{
          // Customize text color inside bubbles
          right: {
            color: '#FFF', // White text for sent messages (on black background)
          },
          left: {
            color: '#000', // Black text for received messages (on white background)
          },
        }}
      />
    );
  };

  /**
   * Main Render
   *
   * Returns the complete chat interface wrapped in a View with:
   * - Custom background color chosen by user
   * - GiftedChat component with all chat functionality
   * - KeyboardAvoidingView to prevent keyboard from covering input (Android only)
   */
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {/* 
        GiftedChat Component
        
        Pre-built chat interface that includes:
        - Scrollable message list showing all messages
        - Text input field for composing messages
        - Send button that triggers onSend when pressed
        - Automatic handling of message timestamps
        - User avatars and names
        - System message styling
      */}
      <GiftedChat
        messages={messages} // Array of messages to display in the chat
        renderBubble={renderBubble} // Custom function to render message bubbles
        onSend={(messages) => onSend(messages)} // Handler called when Send is pressed
        user={{
          _id: 1, // Current user's ID - must be 1 to show messages on right side
          name: name, // Current user's display name
        }}
      />

      {/* 
        Platform-Specific Keyboard Handling
        
        Android Issue: Keyboard can cover the message input field on some devices
        Solution: KeyboardAvoidingView adjusts the view when keyboard appears
        
        Only needed on Android - iOS handles this automatically
        Conditional rendering using ternary operator (condition ? true : false)
      */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

/**
 * Styles
 *
 * StyleSheet for the Chat component
 * Currently minimal as GiftedChat handles most styling internally
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up full available screen height
    // Background color is set dynamically via inline style
  },
});

// Export the Chat component as default export
// This allows it to be imported in App.js for navigation
export default Chat;
