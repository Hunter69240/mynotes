// Import React to use React components
import * as React from 'react';

// Import NavigationContainer to manage navigation state and linking
import { NavigationContainer } from '@react-navigation/native';

// Import method to create a stack navigator (for navigating between screens)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import GestureHandlerRootView to wrap the app for gesture support
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import Home screen component
import Home from './Screens/Home';

// Import CardDisplay component 
import CardDisplay from './components/CardDisplay';

// Create a Stack Navigator object
const Stack = createNativeStackNavigator();

// Main App component
export default function App() {
  return (
    // Wrap the entire app with GestureHandlerRootView for gesture support (required by some libraries like react-native-reanimated)
    <GestureHandlerRootView style={{ flex: 1 }}>

      {/* NavigationContainer is required to use React Navigation */}
      <NavigationContainer>

        {/* Stack Navigator handles screen navigation */}
        <Stack.Navigator initialRouteName="Home">

          {/* Define the Home screen (initial screen); hide the default header */}
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }}
          />

          {/* Define the CardDisplay screen; also hide the header */}
          <Stack.Screen 
            name="CardDisplay" 
            component={CardDisplay} 
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
