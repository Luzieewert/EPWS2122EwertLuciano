import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LoginButton from "./LoginButton";
import axios from "axios";


const BUTTON = {
    backgroundColor: 'black',
    elevation: 5,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 8
}
const TEXTINPUT = {borderRadius: 5, borderWidth: 1, borderColor: "black", marginBottom: 7}
const handleLogin = async (data,navigation) => {
    await axios.post('http://localhost:8001/TicketFor2/login', data)
        .then((res) => {
            navigation.navigate('Placeholder', {user: res.data.user})
        })
        .catch((err) => {
            console.log(err);
        });

};

const handleRegistrationPress = (navigation) => {
    navigation.navigate('Registration')
    return null;
};
const LoginScreen = () => {
    const navigation = useNavigation();
    const [loginData, setLoginData] = useState({})

    return (
        <View style={{paddingHorizontal: 8}}>

            <TextInput style={{...TEXTINPUT, marginTop: 8}}
                       placeholder="Email"
                       placeholderTextColor="#003f5c"
                       onChangeText={(e) => setLoginData({...loginData, email: e})}
            />


            <TextInput style={TEXTINPUT}
                       placeholder="Password"
                       placeholderTextColor="#003f5c"
                       secureTextEntry={true}
                       onChangeText={(e) => setLoginData({...loginData, password: e})}
            />


            <LoginButton buttonText="Anmelden" buttonStyle={BUTTON} textStyle={{color: 'white'}}
                         onPress={() => handleLogin(loginData, navigation)}/>

            <LoginButton buttonText="Registrieren" buttonStyle={BUTTON} textStyle={{color: 'white'}}
                         onPress={() => handleRegistrationPress(navigation)}/>

        </View>


    );
};

export default LoginScreen;