import React, {useContext, useState} from "react"
import {View} from "react-native";
import GenericButton from "../components/GenericButton";
import {UserContext} from "../../contexts/UserContext";
import {RideContext} from "../../contexts/RideContext";
import {handlePost, handlePut} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";
import LineSelector from "./LineSelector";
import EndStationSelector from "./EndStationSelector";
import styles from "./styles";
import text from "../../theme/text";


const RideSelectionMenu = ({isCreator,lines, onClose}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const [step, setStep] = useState(isCreator ? 1 : 2)
    const [selectedLine, setSelectedLine] = useState()
    const [rideObj, setRideObj] = useState({})



    const selectLine = (line) => {
        setRideObj({start_station_name: line.name})
        setStep(2)
        setSelectedLine(line)
    }

    const selectEndStation = (station) => {
        setRideObj((prev) => {
            return {
                ...prev,
                ...{
                    end_station_name: station,
                    ride_giver: user,
                    ride_status: isCreator ? "Created" : "Pending"
                }
            }
        })
        setStep(3)
    }

    const handleButtonPressSuccess = (res) => {
        const newRide = res.data.ride
        setRide(newRide)
    }

    const handleButtonPress = async (isCreator, rideData) => {
        if(isCreator) {
           await handlePost(urls.ride, rideData, handleButtonPressSuccess)
        } else {
           await handlePut(urls.ride + ride._id, rideData, handleButtonPressSuccess)
        }
    }

    return (
        <View style={styles.rideSelectionMenu}>
            {step === 1 && <LineSelector lines={lines} selectLine={selectLine}/>}
            {step === 2 && <EndStationSelector stations={selectedLine.stations} selectEndStation={selectEndStation}/>}
            {step === 3 && <GenericButton onPress={() => handleButtonPress(isCreator,rideObj)}
                                          buttonStyle={styles.rideSelectionMenuCreationBtn} buttonText="Fahrt erstellen"
                                          textStyle={styles.rideSelectionMenuCreationBtnText}/>}
            <GenericButton onPress={onClose} buttonStyle={styles.closeBtn} textStyle={text.inButton} buttonText="X"/>
        </View>
    )
}

export default RideSelectionMenu