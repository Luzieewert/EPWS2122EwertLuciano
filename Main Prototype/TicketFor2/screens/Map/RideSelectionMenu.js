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


const RideSelectionMenu = ({isCreator, selectedElement, setSelectedElement}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const [step, setStep] = useState(isCreator ? 1 : 2)
    const [departure, setSelectedDeparture] = useState({})
    const [rideObj, setRideObj] = useState({})

    const buttonText = isCreator ? "Fahrt erstellen" : "Fahrt anfragen"



    const selectDeparture = (departure) => {
        setRideObj({
            name: `(${departure.name}) ${departure.direction} ${departure.time}`,
            ride_giver: user,
            lineName: departure.name,
            direction: departure.direction,
            start_station_cords: selectedElement.start_station_cords,
            ride_start: departure.time,
            start_station_name: selectedElement.name
        })
        setSelectedDeparture(departure)
        setStep(2)
    }


    const selectEndStation = (station) => {
        const data = isCreator ?
            {
                ride_giver_end_station: station,
                ride_status: "Created",
            } :
            {
                ride_taker_end_station: station,
                ride_status: "Pending",
                ride_taker: user
            }

        setRideObj((prev) => {
            return {
                ...prev,
                ...data
            }
        })
        setStep(3)
    }


    const handleButtonPress = async (isCreator, rideData) => {
        if (isCreator) {
            await handlePost(urls.ride, rideData, setRide)
        } else {
            await handlePut(urls.ride + selectedElement._id, rideData, setRide)
        }
        setSelectedElement(null)
    }

    const getStationSelectorProps = (isCreator) => {
        return {
            lineName: isCreator ? departure.name : selectedElement.lineName,
            direction: isCreator ? departure.direction : selectedElement.direction,
            start_station_name: isCreator ? selectedElement.name : selectedElement.start_station_name,
            selectEndStation: selectEndStation
        }
    }

    return (
        <View style={styles.rideSelectionMenu}>
            <View style={styles.rideSelectionMenuInnerContainer}>
                {step === 1 &&
                    <DepartureSelector departures={selectedElement.departures} selectLine={selectDeparture}/>}
                {step === 2 && <EndStationSelector {...getStationSelectorProps(isCreator)}/>}
                {step === 3 && <GenericButton onPress={() => handleButtonPress(isCreator, rideObj)}
                                              buttonStyle={styles.rideSelectionMenuCreationBtn} buttonText={buttonText}
                                              textStyle={styles.rideSelectionMenuCreationBtnText}/>}
            </View>
            <GenericButton onPress={() => setSelectedElement(null)} buttonStyle={styles.closeBtn}
                           textStyle={text.inButton} buttonText="X"/>
        </View>
    )
}

export default RideSelectionMenu