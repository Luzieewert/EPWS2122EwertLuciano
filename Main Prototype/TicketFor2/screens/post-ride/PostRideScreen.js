import React, {useContext} from "react"
import {Text, View} from "react-native";
import GenericButton from "../components/GenericButton";
import {useNavigation} from "@react-navigation/native";
import {RideContext} from "../../contexts/RideContext";
import {UserContext} from "../../contexts/UserContext";
import styles from "./styles";
import text from "../../theme/text";

const PostRideScreen = () => {
    const navigation = useNavigation()
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)

    const handleBackToMap = () => {
        setRide({})
        user.has_ticket ? navigation.reset({index: 0, routes: [{name: 'ModeSelection'}]}) : navigation.reset({index: 0, routes: [{name: 'Map', params: {mode: "Searcher"}}]})
    }
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Sie haben etwas Gutes getan! Wir wünschen Ihnen einen wunderschönen Tag.</Text>
            <GenericButton buttonText="Zur Karte" buttonStyle={styles.button} textStyle={text.inButton} onPress={handleBackToMap}/>
        </View>
    )
}

export default PostRideScreen