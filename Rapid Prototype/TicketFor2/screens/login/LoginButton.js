import React from 'react';
import {Text, View, TouchableOpacity, TextInput, Button} from 'react-native';

const LoginButton = ({textStyle, buttonText, buttonStyle, onPress}) => {
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default LoginButton;