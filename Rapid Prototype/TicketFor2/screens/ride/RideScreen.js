import React, {useContext, useEffect} from "react"
import {View} from "react-native";
import GenericButton from "../components/GenericButton";
import {useNavigation} from "@react-navigation/native";
import {RideContext} from "../../contexts/RideContext";
import {UserContext} from "../../contexts/UserContext";
import styles from "./styles";
import text from "../../theme/text";
import {handleGet, handlePut} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";

const RideScreen = ({route}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const {mode} = route.params
    const navigation = useNavigation()

    const updateRideCallback = (res) => {
        const newRide = res.data.ride
        setRide(newRide)

        if (newRide.ride_status === "Completed") {
            navigation.reset({index: 0, routes: [{name: 'PostRide'}]})
        }
    }


    useEffect(() => {
        const handle = setInterval(() => handleGet(urls.ride + ride._id, updateRideCallback), 5000)
        return () => {
            clearInterval(handle)
        }
    }, [ride])


    return (
        <View style={styles.container}>
            <GenericButton onPress={()=>navigation.navigate("ChatFallback")} buttonStyle={styles.button}
                           textStyle={text.inButton}
                           buttonText="Chat"/>
            {mode === "Creator" &&
                <GenericButton onPress={() => handlePut(urls.ride + ride._id, () => navigation.reset({
                    index: 0,
                    routes: [{name: 'PostRide'}]
                }))} buttonStyle={styles.button}
                               textStyle={text.inButton}
                               buttonText="End Ride"/>}
        </View>
    )
}

export default RideScreen