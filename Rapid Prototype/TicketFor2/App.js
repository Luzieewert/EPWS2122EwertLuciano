import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/login/LoginScreen';
import RegistrationScreen from './screens/registration/RegistrationScreen';
import PlaceholderScreen from './screens/placeholder/PlaceholderScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from "./screens/Map/MapScreen";
import {UserProvider} from "./contexts/UserContext";
import {Button} from "react-native";
import LogOutButton from "./screens/components/LogOutButton";
import ChatScreen from "./screens/chat/ChatScreen";
import ChatScreenFallback from "./screens/chat/ChatScreenFallback";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <UserProvider>
      <Stack.Navigator>
          <Stack.Screen
              options={{
                  title: 'Login',
                  headerTitleAlign: 'center',
              }}
              name="Login"
              component={LoginScreen}/>
          <Stack.Screen
              options={{
                  title: 'Map',
                  headerTitleAlign: 'center',
                  headerRight: LogOutButton

              }}
              name="Map"
              component={MapScreen}
          />

          <Stack.Screen
              options={{
                  title: 'Registration',
                  headerTitleAlign: 'center',
              }}
              name="Registration"
              component={RegistrationScreen}
          />
          <Stack.Screen
              options={{
                  title: 'Chat',
                  headerTitleAlign: 'center',
              }}
              name="Chat"
              component={ChatScreen}
          />
          <Stack.Screen
              options={{
                  title: 'Chat',
                  headerTitleAlign: 'center',
              }}
              name="ChatFallback"
              component={ChatScreenFallback}
          />
      </Stack.Navigator>
        </UserProvider>
    </NavigationContainer>
  );
};


export default App;
