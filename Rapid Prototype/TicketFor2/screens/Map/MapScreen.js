import React, {useContext, useEffect, useRef, useState} from 'react';
import {RideContext} from "../../contexts/RideContext";
import {useNavigation} from "@react-navigation/native";
import {handleGet, handlePut} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";
import RideSelectionMenu from "./RideSelectionMenu";
import RideConfirmation from "./RideConfirmation";
import Map from "./Map";
import {stopLocationUpdates} from "../../utils/location";

const MapScreen = ({route}) => {
    const [ride, setRide] = useContext(RideContext)
    const [renderObjects,setRenderObjects] = useState([])
    const [showRideSelection, setShowRideSelection] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const watchId = useRef()

    const navigation = useNavigation()
    const isRide = Object.keys(ride).length > 0
    const {mode} = route.params

    const setUpdatedRide = (res) => {
        const newRide = res.data.ride
        setRide(newRide)
    }

    useEffect(() => {
        if (isRide) {
            const handle = setInterval(() => handleGet(urls.ride + ride._id, setUpdatedRide), 5000)
            return () => {
                clearInterval(handle)
            }
        }
        return () => {
        }
    }, [ride])

    useEffect(() => {
        if (isRide && ride.ride_status === "Started") {
            stopLocationUpdates(watchId)
            navigation.reset({index: 0, routes: [{name: 'Ride'}]}, {mode: mode})
        }
        return () => {
        }
    }, [ride?.ride_status])

    useEffect(() => {
        // if(mode === "Creator") setRenderObjects to Stations
        // if(mode === "Searcher") setRenderObjects to Rides
    }, [])

    const updateRideSuccess =  (res) => {
        const newRide = res.data.ride
        setRide(newRide)
        setShowConfirmation(false)
    };

    const handleConfirmation = (choice) => {
        if (choice) {
            handlePut(urls.ride,{"ride_status": "Started"}, updateRideSuccess).then(null)
        } else {
            handlePut(urls.ride,{"ride_taker": {}, "ride_status": "Created"},updateRideSuccess).then(null)
        }
    }


    return (
        <>
            <Map ride={ride} renderObjects={renderObjects} watchRef={watchId}/>
            {showRideSelection && <RideSelectionMenu isCreator={mode === "Creator"}/>}
            {showConfirmation && <RideConfirmation handleConfirmation={handleConfirmation} taker={ride?.ride_taker}/>}
        </>
    );
}

export default MapScreen;