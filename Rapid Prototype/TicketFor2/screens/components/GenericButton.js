import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const GenericButton = ({idT ,textStyle, buttonText, buttonStyle, onPress}) => {
    return (
        <TouchableOpacity idT={idT} style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default GenericButton;