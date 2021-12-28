import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/login/LoginScreen";
import LogOutButton from "../screens/components/LogOutButton";
import MapScreen from "../screens/Map/MapScreen";
import RideScreen from "../screens/ride/RideScreen";
import RegistrationScreen from "../screens/registration/RegistrationScreen";
import PlaceholderScreen from "../screens/placeholder/PlaceholderScreen";
import ChatScreenFallback from "../screens/chat/ChatScreenFallback";
import PostRideScreen from "../screens/post-ride/PostRideScreen";


const Stack = createNativeStackNavigator();


const Navigator = () => {
    return (
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
                component={RideScreen}
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

            <Stack.Screen
                options={{
                    title: 'After Party',
                    headerTitleAlign: 'center',
                }}
                name="PostRide"
                component={PostRideScreen}
            />
        </Stack.Navigator>
    )
}

export default Navigator