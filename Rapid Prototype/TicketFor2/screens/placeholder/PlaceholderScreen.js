import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {UserContext} from "../../contexts/UserContext";






const PlaceholderScreen = () => {
    const [user] = useContext(UserContext)

    return (
        <View style={{paddingHorizontal: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 100}}>
            <Text style={{fontSize: 21}}>Welcome {user.name}</Text>
        </View>


    );
};

export default PlaceholderScreen;