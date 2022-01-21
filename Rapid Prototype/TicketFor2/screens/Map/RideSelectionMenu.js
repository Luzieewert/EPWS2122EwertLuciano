import React, {useContext, useState} from "react"
import {View} from "react-native";
import GenericButton from "../components/GenericButton";
import {UserContext} from "../../contexts/UserContext";
import {RideContext} from "../../contexts/RideContext";
import {handlePost, handlePut} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";
import EndStationSelector from "./EndStationSelector";
import styles from "./styles";
import text from "../../theme/text";
import DepartureSelector from "./DepartureSelector";


const RideSelectionMenu = ({isCreator,selectedElement, setSelectedElement}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const [step, setStep] = useState(isCreator ? 1 : 2)
    const [departure, setSelectedDeparture] = useState({})
    const [rideObj, setRideObj] = useState({})



    const selectDeparture = (departure) => {
        setRideObj({
            start_station_name: selectedElement.name,
            ride_giver: user,
            ride_status: isCreator ? "Created" : "Pending",
            lineName: departure.name,
            direction: departure.direction,
            start_station_cords: selectedElement.start_station_cords,
            ride_start: departure.time
        })
        setSelectedDeparture(departure)
        setStep(2)
    }

    const selectEndStation = (station) => {
        setRideObj((prev) => {
            return {
                ...prev,
                ...{
                    end_station_name: station,
                }
            }
        })
        setStep(3)
    }


    const handleButtonPress = async (isCreator, rideData) => {
        if(isCreator) {
           await handlePost(urls.ride, rideData, setRide)
            setSelectedElement(null)
        } else {
           await handlePut(urls.ride + ride._id, rideData, setRide)
        }
    }

    return (
        <View style={styles.rideSelectionMenu}>
            <View style={styles.rideSelectionMenuInnerContainer}>
            {step === 1 && <DepartureSelector departures={selectedElement.departures} selectLine={selectDeparture}/>}
            {step === 2 && <EndStationSelector lineName={departure.name} start_station_name={selectedElement.start_station_name} direction={departure.direction} selectEndStation={selectEndStation}/>}
            {step === 3 && <GenericButton onPress={() => handleButtonPress(isCreator,rideObj)}
                                          buttonStyle={styles.rideSelectionMenuCreationBtn} buttonText="Fahrt erstellen"
                                          textStyle={styles.rideSelectionMenuCreationBtnText}/>}
            </View>
            <GenericButton onPress={() => setSelectedElement(null)} buttonStyle={styles.closeBtn} textStyle={text.inButton} buttonText="X"/>
        </View>
    )
}

export default RideSelectionMenu