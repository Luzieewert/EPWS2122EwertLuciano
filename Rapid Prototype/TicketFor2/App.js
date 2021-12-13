import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/login/LoginScreen';
import RegistrationScreen from './screens/registration/RegistrationScreen';
import PlaceholderScreen from './screens/placeholder/PlaceholderScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
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

            </Stack.Navigator>
        </NavigationContainer>


    );
};


export default App;
