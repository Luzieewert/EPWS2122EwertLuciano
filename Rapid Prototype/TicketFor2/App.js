import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from "./contexts/UserContext";
import {RideProvider} from "./contexts/RideContext";
import Navigator from "./navigator/Navigator";
import {locationPermissionHandle} from "./utils/location";


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
