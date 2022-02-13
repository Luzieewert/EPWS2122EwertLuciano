import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/login/LoginScreen";
import LogOutButton from "../screens/components/LogOutButton";
import MapScreen from "../screens/Map/MapScreen";
import RideScreen from "../screens/ride/RideScreen";
import RegistrationScreen from "../screens/registration/RegistrationScreen";
import PlaceholderScreen from "../screens/placeholder/PlaceholderScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import PostRideScreen from "../screens/post-ride/PostRideScreen";
import ModeSelectionScreen from "../screens/mode-selection/ModeSelectionScreen";
import {RideContext} from "../contexts/RideContext";
import {UserContext} from "../contexts/UserContext";
import {useNavigation} from "@react-navigation/native";
import {handleGet} from "../utils/databaseInteraction";
import {urls} from "../utils/urls";


const Stack = createNativeStackNavigator();


const Navigator = ({initialState}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const navigation = useNavigation()

    const getRideCallback = (res) => {
        if (res === null) return null
        const mode = res.ride_giver._id === user._id ? "Creator" : "Searcher"

        const useOwnSwitcher = initialState ? initialState.routes.some(route => route.name === "Login" || route.name === "ModeSelection") : true

        setRide(res)
        if (useOwnSwitcher) {
            switch (res.ride_status) {
                case "Created":
                case "Pending":
                    return navigation.reset({
                        index: 1,
                        routes: [{name: "ModeSelection"}, {name: "Map", params: {mode: mode}}]
                    })
                case "Started":
                case "Progress":
                    return navigation.reset({index: 0, routes: [{name: "Ride", params: {mode: mode}}]})
            }
        }

    }

    useEffect(() => {
        if (user) {
            if (user._id) {
                handleGet(urls.rideByUser + user._id, null, getRideCallback)
            } else {
                navigation.reset({index: 0, routes: [{name: "Login"}]})
            }
        }
        return () => {
        }
    }, [user])

    return (
        <Stack.Navigator initialRouteName="Login">
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
                name="Chat"
                component={ChatScreen}
            />

            <Stack.Screen
                options={{
                    title: 'After Party',
                    headerTitleAlign: 'center',
                }}
                name="PostRide"
                component={PostRideScreen}
            />

            <Stack.Screen
                options={{
                    title: 'Mode Selection',
                    headerTitleAlign: 'center',
                    headerRight: LogOutButton
                }}
                name="ModeSelection"
                component={ModeSelectionScreen}
            />
        </Stack.Navigator>
    )
}

export default Navigator