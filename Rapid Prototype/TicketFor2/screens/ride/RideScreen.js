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
import {getOrCreateRideObjects} from "./utils";
import {getHaversineDistanceM} from "../../utils/location";
import Map from "../Map/Map";

const RideScreen = ({route}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const {mode} = route.params
    const navigation = useNavigation()
    const [location, setLocation] = useState({})
    const [otherUser, setOtherUser] = useState({})
    const isRide = Object.keys(ride).length > 0

    const endRideCallback = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'PostRide'}]
        })
    }

    const updateRideCallback = (res) => {
        const newRide = res
        setRide(newRide)
        if (newRide.ride_status === "Completed") {
            handlePut(urls.ride + ride._id, {ride_status: "Completed"}, endRideCallback)
        }
    }

    const updateOtherUserCallback = (res) => {
        const key = user._id === ride.ride_giver._id ? "ride_taker" : "ride_giver"
        setOtherUser(res[key])

        const usersSeparated = ride.ride_status === "Progress" && getHaversineDistanceM(res.ride_giver.location, res.ride_taker.location) > 100
        if (usersSeparated) {
            handlePut(urls.ride + ride._id, {ride_status: "Completed"}, updateRideCallback)
        }
    }

    useEffect(() => {
        if (mode === "Creator" && ride._id) getOrCreateRideObjects(ride._id, null, setOtherUser)
        const handleRide = setInterval(() => handleGet(urls.ride + ride._id, null, updateRideCallback), 5000)
        const handleLocations = setInterval(() => handleGet(urls.rideLocations + ride._id, null, updateOtherUserCallback), 5000)
        return () => {
            clearInterval(handleLocations)
            clearInterval(handleRide)
        }
    }, [ride._id,ride.ride_status])

    if (!isRide) return null
    const showRideStart = ride.ride_status === "Started" && mode === "Creator"

    return (
        <>
            <Map onUserLocationCallback={setLocation} location={location} rideScreen
                 otherUser={otherUser} setOtherUser={setOtherUser}/>
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