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
import MapView from "react-native-maps";
import {onUserLocationChange} from "../../utils/location";
import {findOtherUser, renderCurrentRideMarker, renderMarkers} from "../Map/utils";
import Map from "../Map/Map";

const RideScreen = ({route}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const {mode} = route.params
    const navigation = useNavigation()
    const [renderObjects, setRenderObjects] = useState([])
    const [location, setLocation] = useState({})

    const updateRideCallback = (res) => {
        const newRide = res
        setRide(newRide)

        if (newRide.ride_status === "Completed") {
            navigation.reset({index: 0, routes: [{name: 'PostRide'}]})
        }
    }


    useEffect(() => {
        if (mode === "Creator") {
            createChat(ride._id, null)
        }

    }, [])


    useEffect(() => {
        const handle = setInterval(() => handleGet(urls.ride + ride._id, null, updateRideCallback), 5000)
        return () => {
            clearInterval(handle)
        }
    }, [ride])

    const endRideCallback = (res) => {
        navigation.reset({
            index: 0,
            routes: [{name: 'PostRide'}]
        })}

    const rideStart = ride.ride_status === "Started" && mode === "Creator"

    return (
        <>
            <Map ride={ride} renderObjects={renderObjects} onUserLocationCallback={setLocation} location={location} otherUser={findOtherUser(ride)} setRide={setRide} />
            <View style = {styles.container}>

                { rideStart && <GenericButton onPress={() => handlePut(urls.ride + ride._id,{ride_status: "Progress"}, updateRideCallback )} buttonStyle={styles.button}
                               textStyle={text.inButton}
                               buttonText="Fahrt beginnen!"/>}

            <GenericButton onPress={() => navigation.navigate("Chat")} buttonStyle={styles.button}
                           textStyle={text.inButton}
                           buttonText="Chat"/>

                <GenericButton onPress={() => handlePut(urls.ride + ride._id,{ride_status: "Completed"}, endRideCallback )} buttonStyle={styles.button}
                               textStyle={text.inButton}
                               buttonText="Fahrt beenden"/>
            </View>
        </>
    )
}

export default RideScreen