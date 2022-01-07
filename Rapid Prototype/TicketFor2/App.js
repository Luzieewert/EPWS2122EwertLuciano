import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from "./contexts/UserContext";
import {RideProvider} from "./contexts/RideContext";
import Navigator from "./navigator/Navigator";
import RNLocation from 'react-native-location';
import {locationPermissionHandle} from "./utils/location";

RNLocation.configure({
    distanceFilter: 1.0,
}).then(() => null)



const App = () => {
    useEffect(() => {
       locationPermissionHandle().then(null)
    }, [])
    return (
        <NavigationContainer>
            <UserProvider>
                <RideProvider>
                    <Navigator/>
                </RideProvider>
            </UserProvider>
        </NavigationContainer>
    );
};

export default App;
