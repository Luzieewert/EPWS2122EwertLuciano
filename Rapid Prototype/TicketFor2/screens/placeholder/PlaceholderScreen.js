import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {UserContext} from "../../contexts/UserContext";
import LogOutButton from "../components/LogOutButton";
import axios from "axios";



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

const testApi =  async () => {
    await axios.get('http://localhost:8001/TicketFor2/rides')
        .then((res) => {
       console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        });

};

const PlaceholderScreen = () => {
    const [user] = useContext(UserContext)

    return (
        <View>
        <View style={CONTAINER}>
            <Text style={{fontSize: 21}}>Welcome {user.name}</Text>

        </View>
            <View style={LOGOUTCONTAINER}>
                <LogOutButton/>
            </View>
            <View style={{...LOGOUTCONTAINER, marginTop: 8}}>
                <TouchableOpacity onPress={testApi}><Text>Test</Text></TouchableOpacity>
            </View>


        </View>


    );
};

export default PlaceholderScreen;