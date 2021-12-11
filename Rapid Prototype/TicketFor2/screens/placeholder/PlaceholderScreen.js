import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Button} from 'react-native';






const PlaceholderScreen = ({route}) => {
    const {user} = route.params
    return (
        <View style={{paddingHorizontal: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 100}}>
            <Text style={{fontSize: 21}}>Welcome {user.name}</Text>
        </View>


    );
};

export default PlaceholderScreen;