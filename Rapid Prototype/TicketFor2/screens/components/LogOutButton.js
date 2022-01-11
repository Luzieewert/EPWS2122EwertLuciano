import React, {useContext} from "react"
import {Text, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../../contexts/UserContext";
import {RideContext} from "../../contexts/RideContext";
import {handleGet} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";


const LogOutButton = () => {
    const navigation = useNavigation()
    const [user, setUser] = useContext(UserContext)
    const [ride, setRide] = useContext(RideContext)

    const handleLogOutSuccess = () => {
        setUser({})
        setRide({})
        navigation.reset({index: 0, routes: [{name: 'Login'}]})
    };

    return (
        <TouchableOpacity onPress={() => handleGet(urls.logOut,handleLogOutSuccess)}>
            <Text>Logout</Text>
        </TouchableOpacity>
    )
}

export default LogOutButton
