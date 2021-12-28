import React, {useContext, useState} from 'react';
import {View, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GenericButton from "../components/GenericButton";
import {UserContext} from "../../contexts/UserContext";
import styles from "./styles";
import text from "../../theme/text";
import {handlePost} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [loginData, setLoginData] = useState({})
    const [user, setUser] = useContext(UserContext)

    const handleLoginSuccess = (res) => {
        setUser(res.data.user)
        navigation.reset({index: 0, routes: [{name: 'Map'}]})
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput}
                       placeholder="Email"
                       placeholderTextColor="#003f5c"
                       onChangeText={(e) => setLoginData({...loginData, email: e})}
            />

            <TextInput style={styles.textInput}
                       placeholder="Password"
                       placeholderTextColor="#003f5c"
                       secureTextEntry={true}
                       onChangeText={(e) => setLoginData({...loginData, password: e})}
            />


            <GenericButton buttonText="Anmelden" buttonStyle={styles.button} textStyle={text.inButton}
                           onPress={() => handlePost(urls.login, loginData, handleLoginSuccess)}/>

            <GenericButton buttonText="Registrieren" buttonStyle={styles.button} textStyle={text.inButton}
                           onPress={() => navigation.navigate("Registration")}/>
        </View>
    );
};

export default LoginScreen;