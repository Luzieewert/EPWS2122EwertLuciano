import React, {useContext, useEffect, useState} from 'react';
import {RideContext} from "../../contexts/RideContext";
import {useNavigation} from "@react-navigation/native";
import {handleGet, handlePut} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";
import RideSelectionMenu from "./RideSelectionMenu";
import RideConfirmation from "./RideConfirmation";
import Map from "./Map";
import GenericButton from "../components/GenericButton";
import text from "../../theme/text";
import styles from "./styles";
import {getDepartures, getRidesByLocation} from "../../utils/departure";

const MapScreen = ({route}) => {
    const [ride, setRide] = useContext(RideContext)
    const [renderObjects, setRenderObjects] = useState([])
    const [selectedElement, setSelectedElement] = useState()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [location, setLocation] = useState({})
    const navigation = useNavigation()

    const isRide = Object.keys(ride).length > 0
    const {mode} = route.params
    const isCreator = mode === "Creator"
    const actionBtnText = isCreator ? "Farht Erstellen" : "Farht Suchen"

    useEffect(() => {
        if (isRide) {
            const handle = setInterval(() => handleGet(urls.ride + ride._id, null, setRide), 5000)
            if (ride.ride_status === "Started") {
                navigation.reset({index: 0, routes: [{name: "Ride", params: {mode: mode}}]})
            }
            return () => {
                clearInterval(handle)
            }
        }
        return () => {}
    }, [ride])

    const handleActionButtonPress = async (location) => {
        if (isCreator) {
            const locationString = `${location.latitude},${location.longitude}`
            await getDepartures(locationString, setRenderObjects)
        } else {
            await getRidesByLocation(location, setRenderObjects)
        }
    }

    const handleConfirmation = async (choice) => {
        const updateRideCallback = (res) => {
            setRide(res)
            setShowConfirmation(false)
        }
        const data = choice ? {"ride_status": "Started"} : {"ride_taker": {}, "ride_status": "Created"}

        return await handlePut(urls.ride + ride._id, data, updateRideCallback)
    }

    const onCurrentRideCalloutPress = () => isCreator && ride.ride_taker ? setShowConfirmation(true) : null

    return (
        <>
            <Map renderObjects={renderObjects} onUserLocationCallback={setLocation} location={location}
                 onRenderObjectsCalloutPress={setSelectedElement}
                 onCurrentRideCalloutPress={onCurrentRideCalloutPress}/>
            {selectedElement &&
                <RideSelectionMenu selectedElement={selectedElement} setSelectedElement={setSelectedElement}
                                   isCreator={isCreator}/>}
            {showConfirmation && <RideConfirmation handleConfirmation={handleConfirmation} taker={ride.ride_taker}/>}
            {!isRide && <GenericButton buttonStyle={styles.mapActionButton} textStyle={text.inButton}
                                       onPress={() => handleActionButtonPress(location)} buttonText={actionBtnText}/>}
        </>
    );
}

export default MapScreen;