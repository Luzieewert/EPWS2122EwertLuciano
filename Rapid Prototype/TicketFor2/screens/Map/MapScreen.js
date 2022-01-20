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
import {getDepartures} from "../../utils/departure";

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

    const handleActionButtonPress = async (location) => {
        if (isCreator) {
            const locationString = `${location.latitude},${location.longitude}`
            await getDepartures(locationString, setRenderObjects)
        }
    }

    useEffect(() => {
        if (isRide) {
            const handle = setInterval(() => handleGet(urls.ride + ride._id, setRide), 5000)
            return () => {
                clearInterval(handle)
            }
        }
        return () => {
        }
    }, [ride])

    useEffect(() => {
        if (isRide && ride.ride_status === "Started") {
            navigation.reset({index: 0, routes: [{name: 'Ride'}]}, {mode: mode})
        }
        return () => {
        }
    }, [ride?.ride_status])


    const handleConfirmation = async (choice) => {
        const updateRideCallback = (res) => {
            setRide(res)
            setShowConfirmation(false)
        }

        if (choice) {
           await handlePut(urls.ride, {"ride_status": "Started"}, updateRideCallback)
        } else {
           await handlePut(urls.ride, {"ride_taker": {}, "ride_status": "Created"}, updateRideCallback)
        }
    }
    return (
        <>
            <Map ride={ride} renderObjects={renderObjects} onUserLocationCallback={setLocation} location={location}
                 onRenderObjectsCalloutPress={setSelectedElement}/>
            {selectedElement &&
                <RideSelectionMenu selectedElement={selectedElement} setSelectedElement={setSelectedElement}
                                   isCreator={isCreator}/>}
            {showConfirmation && <RideConfirmation handleConfirmation={handleConfirmation} taker={ride?.ride_taker}/>}
            {!isRide && <GenericButton buttonStyle={styles.mapActionButton} textStyle={text.inButton}
                                       onPress={() => handleActionButtonPress(location)} buttonText={actionBtnText}/>}
        </>
    );
}

export default MapScreen;