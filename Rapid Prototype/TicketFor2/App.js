import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/home/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from "./screens/Map/MapScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
              options={{
                  title: 'Map',
                  headerTitleAlign: 'center',
              }}
              name="Map"
              component={MapScreen}
          />
        <Stack.Screen
          options={{
            title: 'TicketFor2',
            headerTitleAlign: 'center',
          }}
          name="Home"
          component={HomeScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
