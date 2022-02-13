import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from "./contexts/UserContext";
import {RideProvider} from "./contexts/RideContext";
import Navigator from "./navigator/Navigator";
import {locationPermissionHandle} from "./utils/location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking, Platform} from "react-native";

const PERSISTENCE_KEY = "NAVIGATION_STATE"

const App = () => {
    const [isReady, setIsReady] = useState(false);
    const [initialState, setInitialState] = useState();

    useEffect(() => {
        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();

                if (Platform.OS !== 'web' && initialUrl == null) {
                    // Only restore state if there's no deep link and we're not on web
                    const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                    const state = savedStateString ? JSON.parse(savedStateString) : undefined;

                    if (state !== undefined) {
                        setInitialState(state);
                    }
                }
            } finally {
                setIsReady(true);
                await locationPermissionHandle()
            }
        };

        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <NavigationContainer
            initialState={initialState}
            onStateChange={(state) =>
                AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }
        >
            <UserProvider>
                <RideProvider>
                    <Navigator initialState={initialState}/>
                </RideProvider>
            </UserProvider>
        </NavigationContainer>
    );
};

export default App;
