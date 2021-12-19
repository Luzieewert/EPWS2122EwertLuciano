import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/login/LoginScreen';
import RegistrationScreen from './screens/registration/RegistrationScreen';
import PlaceholderScreen from './screens/placeholder/PlaceholderScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from "./screens/Map/MapScreen";
import {UserProvider} from "./contexts/UserContext";
import LogOutButton from "./screens/components/LogOutButton";
import {RideProvider} from "./contexts/RideContext";
import ChatScreenFallback from "./screens/chat/ChatScreenFallback";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <UserProvider>
            <RideProvider>
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
                  title: 'Ride',
                  headerTitleAlign: 'center',
                  headerRight: LogOutButton
              }}
              name="Ride"
              component={PlaceholderScreen}
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
                  title: 'Placeholder',
                  headerTitleAlign: 'center',
              }}
              name="Placeholder"
              component={PlaceholderScreen}
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
            </RideProvider>
        </UserProvider>
    </NavigationContainer>
  );
};


export default App;
