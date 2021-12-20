import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import GenericButton from "../components/GenericButton";
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import axios from "axios";

const TEXTINPUT= {borderRadius: 5, borderWidth: 1, borderColor: "black", marginBottom: 7}
const BUTTON = {backgroundColor: 'black', elevation: 5, padding: 5, alignItems:"center", marginHorizontal: 8, marginBottom: 8}
const handleRegistration = async (data, navigation) => {
    await axios.post('http://localhost:8001/TicketFor2/signup', data )
        .then( () => {
            navigation.navigate('Login')
        })
        .catch((err) => {
            console.log(err);
        });
};
const RegistrationScreen = () => {
    const [registrationData,setRegistrationData] = useState({})
    const navigation = useNavigation();


    return (
    <View style = {{paddingHorizontal: 8}}>

        <TextInput style = {{...TEXTINPUT, marginTop: 8}}
                   placeholder="Vorname"
                   placeholderTextColor="#003f5c"
            onChangeText={(e) => setRegistrationData({...registrationData, name: e})}
        />

        <TextInput style = {{...TEXTINPUT, marginTop: 8}}
                   placeholder="Nachname"
                   placeholderTextColor="#003f5c"
            onChangeText={(e) => setRegistrationData({...registrationData, last_name: e})}
        />

        <TextInput style = {{...TEXTINPUT, marginTop: 8}}
                   placeholder="Email"
                   placeholderTextColor="#003f5c"
            onChangeText={(e) => setRegistrationData({...registrationData, email: e})}
        />

        <TextInput style = {{...TEXTINPUT, marginTop: 8}}
                   placeholder="Passwort"
                   placeholderTextColor="#003f5c"
                   secureTextEntry={true}
            onChangeText={(e) => setRegistrationData({...registrationData, password: e})}
        />

        <View style={{flexDirection: "row",
            marginBottom: 20, alignItems: "center"}}>
            <CheckBox
                disabled={false}
                value={registrationData.has_ticket}
                onValueChange={(e) => setRegistrationData({...registrationData, has_ticket: e})}
            />
            <Text style={{color: "black"}}>Ich besitze ein Ticket</Text>
        </View>
        <GenericButton buttonText="Jetzt registrieren" buttonStyle={BUTTON} textStyle={{color: 'white'}} onPress={ () => handleRegistration(registrationData, navigation)} />
    </View>

  );
};

export default RegistrationScreen;