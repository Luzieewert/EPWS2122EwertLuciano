import React, {useContext} from "react"
import {Text, View} from "react-native";
import GenericButton from "../components/GenericButton";
import {useNavigation} from "@react-navigation/native";
import {RideContext} from "../../contexts/RideContext";
import {UserContext} from "../../contexts/UserContext";

const TEXT = {
    fontSize: 24,
    color: "#4ca0ed"
}
const CONTAINER = {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
}

const BUTTON = {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 5,
    marginTop: 7
}

const BUTTONTEXT = {
color: "white"
}

const PostRideScreen = () => {
    const navigation = useNavigation()
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)

    const handleBackToMap = () => {
        setRide({})
        navigation.navigate("Map")
    }
    return (
        <View style={CONTAINER}>
            <Text style={TEXT}>Sie haben was gutes getan!, wir wünschen ihnen einen wunderschönen Tag</Text>
            <GenericButton buttonText="Zur Karte" buttonStyle={BUTTON} textStyle={BUTTONTEXT} onPress={handleBackToMap}/>
        </View>
    )
}

export default PostRideScreen