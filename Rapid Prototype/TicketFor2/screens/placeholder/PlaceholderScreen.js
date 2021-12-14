import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {UserContext} from "../../contexts/UserContext";
import LogOutButton from "../components/LogOutButton";



const CONTAINER = {
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 200
}

const LOGOUTCONTAINER = {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "grey",
    padding: 8
}


const PlaceholderScreen = () => {
    const [user] = useContext(UserContext)

    return (
        <View>
        <View style={CONTAINER}>
            <Text style={{fontSize: 21}}>Welcome {user.name}</Text>

        </View>
            <View style={LOGOUTCONTAINER}><LogOutButton/></View>

        </View>


    );
};

export default PlaceholderScreen;