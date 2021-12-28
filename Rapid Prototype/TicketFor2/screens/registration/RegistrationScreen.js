import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import GenericButton from "../components/GenericButton";
import {useNavigation} from '@react-navigation/native';
import styles from "./styles";
import TicketCheckBox from "./TicketCheckBox";
import {handlePost} from "../../utils/databaseInteraction";
import text from "../../theme/text";
import {urls} from "../../utils/urls";

const RegistrationScreen = () => {
    const [registrationData, setRegistrationData] = useState({})
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <TextInput style={styles.textInput}
                       placeholder="Vorname"
                       placeholderTextColor="#003f5c"
                       onChangeText={(e) => setRegistrationData({...registrationData, name: e})}
            />

            <TextInput style={styles.textInput}
                       placeholder="Nachname"
                       placeholderTextColor="#003f5c"
                       onChangeText={(e) => setRegistrationData({...registrationData, last_name: e})}
            />

            <TextInput style={styles.textInput}
                       placeholder="Email"
                       placeholderTextColor="#003f5c"
                       onChangeText={(e) => setRegistrationData({...registrationData, email: e})}
            />

            <TextInput style={styles.textInput}
                       placeholder="Passwort"
                       placeholderTextColor="#003f5c"
                       secureTextEntry={true}
                       onChangeText={(e) => setRegistrationData({...registrationData, password: e})}
            />
            <TicketCheckBox has_ticket={registrationData.has_ticket} setRegistrationData={setRegistrationData}/>
            <GenericButton buttonText="Jetzt registrieren" buttonStyle={styles.button} textStyle={text.inButton}
                           onPress={() => handlePost(urls.register, registrationData, navigation.navigate('Login'))}/>
        </View>

    );
};

export default RegistrationScreen;