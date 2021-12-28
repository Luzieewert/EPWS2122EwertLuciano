import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from "./contexts/UserContext";
import {RideProvider} from "./contexts/RideContext";
import Navigator from "./navigator/Navigator";


const App = () => {
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
