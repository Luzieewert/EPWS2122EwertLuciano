import React, {useContext} from "react"
import {Text, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {UserContext} from "../../contexts/UserContext";
import {RideContext} from "../../contexts/RideContext";


const LogOutButton = () => {
    const navigation = useNavigation()
    const [user, setUser] = useContext(UserContext)
    const [ride, setRide] = useContext(RideContext)



    const handleLogOut = async () => {
        await axios.get('http://localhost:8001/TicketFor2/logout')
            .then(() => {
                setUser({})
                setRide({})

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
