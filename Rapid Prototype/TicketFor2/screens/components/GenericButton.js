import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const GenericButton = ({textStyle, buttonText, buttonStyle, onPress}) => {
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default GenericButton;