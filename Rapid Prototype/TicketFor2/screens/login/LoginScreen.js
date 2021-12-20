import React, {useContext, useState} from 'react';
import { View, TextInput } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GenericButton from "../components/GenericButton";
import axios from "axios";
import {UserContext} from "../../contexts/UserContext";


const BUTTON = {
    backgroundColor: 'black',
    elevation: 5,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 8
}
const TEXTINPUT = {borderRadius: 5, borderWidth: 1, borderColor: "black", marginBottom: 7}


const handleRegistrationPress = (navigation) => {
    navigation.navigate('Registration')
    return null;
};
const LoginScreen = () => {
    const navigation = useNavigation();
    const [loginData, setLoginData] = useState({})
    const [user, setUser] = useContext(UserContext)
    const handleLogin = async (data) => {
        await axios.post('http://localhost:8001/TicketFor2/login', data)
            .then((res) => {
                setUser(res.data.user)
                navigation.reset({index: 0, routes: [{name: 'Map'}]})
                navigation.navigate('Map')
            })
            .catch((err) => {
                console.log(err);
            });

    };

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


            <GenericButton buttonText="Anmelden" buttonStyle={BUTTON} textStyle={{color: 'white'}}
                           onPress={() => handleLogin(loginData)}/>

            <GenericButton buttonText="Registrieren" buttonStyle={BUTTON} textStyle={{color: 'white'}}
                           onPress={() => handleRegistrationPress(navigation)}/>

        </View>


    );
};

export default LoginScreen;