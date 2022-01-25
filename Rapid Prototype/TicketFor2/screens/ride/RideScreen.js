import React, {useContext, useEffect, useState} from "react"
import {View} from "react-native";
import GenericButton from "../components/GenericButton";
import {useNavigation} from "@react-navigation/native";
import {RideContext} from "../../contexts/RideContext";
import {UserContext} from "../../contexts/UserContext";
import styles from "./styles";
import text from "../../theme/text";
import {handleGet, handlePut} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";
import {createChat} from "./utils";
import {getHaversineDistanceM} from "../../utils/location";
import {getOtherUser} from "../Map/utils";
import Map from "../Map/Map";

const RideScreen = ({route}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const {mode} = route.params
    const navigation = useNavigation()
    const [location, setLocation] = useState({})
    const showRideStart = ride.ride_status === "Started" && mode === "Creator"


    const updateRideCallback = (res) => {
        const newRide = res
        setRide(newRide)
        const usersSeparated = newRide.ride_status === "Progress" && getHaversineDistanceM(newRide.ride_giver.location, newRide.ride_taker.location) > 100

        if (newRide.ride_status === "Completed" || usersSeparated) {
            navigation.reset({index: 0, routes: [{name: 'PostRide'}]})
        }
    }


    useEffect(() => {
        if (mode === "Creator") createChat(ride._id, null)

        const handle = setInterval(() => handleGet(urls.ride + ride._id, null, updateRideCallback), 5000)
        return () => {
            clearInterval(handle)
        }
    }, [])

    const endRideCallback = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'PostRide'}]
        })
    }

    return (
        <>
            <Map onUserLocationCallback={setLocation} location={location} rideScreen
                 otherUser={getOtherUser(ride, user)}/>
            <View style={styles.container}>

                {showRideStart && <GenericButton
                    onPress={() => handlePut(urls.ride + ride._id, {ride_status: "Progress"}, updateRideCallback)}
                    buttonStyle={styles.button}
                    textStyle={text.inButton}
                    buttonText="Fahrt beginnen!"/>}

                <GenericButton onPress={() => navigation.navigate("Chat")} buttonStyle={styles.button}
                               textStyle={text.inButton}
                               buttonText="Chat"/>

                <GenericButton
                    onPress={() => handlePut(urls.ride + ride._id, {ride_status: "Completed"}, endRideCallback)}
                    buttonStyle={styles.button}
                    textStyle={text.inButton}
                    buttonText="Fahrt beenden"/>
            </View>
        </>
    )
}

export default RideScreen