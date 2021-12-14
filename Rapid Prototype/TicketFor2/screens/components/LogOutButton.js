import React, {useContext} from "react"
import {Text, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {UserContext} from "../../contexts/UserContext";


const LogOutButton = () => {
    const navigation = useNavigation()
    const [user, setUser] = useContext(UserContext)


    const handleLogOut = async () => {
        await axios.get('http://localhost:8001/TicketFor2/logout')
            .then(() => {
                setUser({})
                navigation.reset({index: 0, routes: [{name: 'Login'}]})
                navigation.navigate('Login')
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <TouchableOpacity onPress={handleLogOut}>
            <Text>Log Out</Text>
        </TouchableOpacity>
    )
}

export default LogOutButton
