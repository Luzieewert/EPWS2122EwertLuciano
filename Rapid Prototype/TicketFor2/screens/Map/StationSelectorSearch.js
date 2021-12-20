import React, {useContext, useState} from "react"
import {ScrollView, Text, View} from "react-native";
import GenericButton from "../components/GenericButton";
import {UserContext} from "../../contexts/UserContext";
import axios from "axios";
import {RideContext} from "../../contexts/RideContext";

const STATIONSELECTOR = {
    position: "absolute",
    top: "20%",
    left: "15%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: "70%",
    height: "50%"
}

const BUTTON = {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 8
}
const LINETEXT = {
    color: "white"
}

const NORMALTEXT = {
    color: "white",
    marginBottom: 7
}

const VIEW = {
    marginTop: 10,
    padding: 4
}

const CREATEBUTTONVIEW = {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
}

const CREATEBUTTON = {
    padding: 7,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5
}

const CREATEBUTTONTEXT = {
    color: "white",
    fontSize: 18,
}


const SCROLLVIEW = {
    padding: 4
}

const CLOSEBUTTON = {
    position: "absolute",
    top: 5,
    right: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 100,
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center"
}

const CLOSEBUTTONTEXT = {
    color: "white",
}


const StationSelectorSearch = ({lines, onClose , handleRideCreationSuccess}) => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const [step, setStep] = useState(1)
    const [selectedLine, setSelectedLine] = useState()
    const [rideObj, setRideObj] = useState({})

    const getCurrentRideStation = async (rideStation) => {
        await axios.get('http://localhost:8001/TicketFor2/rideByStation/' + rideStation)
            .then((res) => {
                const newRide = res.data
                setRide(newRide)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const updateRide = async (rideData) => {
        await axios.put('http://localhost:8001/TicketFor2/ride/' + ride._id, rideData)
            .then((res) => {
                const newRide = res.data
                setRide(newRide)
                handleRideCreationSuccess()
            })
            .catch((err) => {
                console.log(err);
            });
    };



    const selectLine = (line) => {
        setRideObj({start_station_name: line.name})
        setStep(2)
        setSelectedLine(line)
        getCurrentRideStation("12 (Zollstock Südfriedhof)").then()
    }

    const selectEndStation = (station) => {
        setRideObj((prev) => {
            console.log(prev)
            return {
                ...prev,
                ...{
                    end_station_name: station,
                    ride_taker: user,
                    ride_status: "Pending"
                }
            }
        })
        setStep(3)
    }

    return (
        <View style={STATIONSELECTOR}>

            {step === 1 && <View style={VIEW}>
                <Text style={NORMALTEXT}>Bitte wählen die gewünschte Linie</Text>
                {lines.map((line, index) => <GenericButton onPress={() => selectLine(line)} key={index}
                                                           buttonStyle={BUTTON} buttonText={line.name}
                                                           textStyle={LINETEXT}/>)}
            </View>}
            {step === 2 && <ScrollView style={SCROLLVIEW} contentContainerStyle={SCROLLVIEW}>
                <Text style={NORMALTEXT}>Bitte wählen sie Ihre Endstation</Text>
                {selectedLine.stations.map((station, index) => <GenericButton key={index} buttonStyle={BUTTON}
                                                                              buttonText={station}
                                                                              textStyle={LINETEXT}
                                                                              onPress={() => selectEndStation(station)}/>)}
            </ScrollView>}
            {step === 3 && <View style={CREATEBUTTONVIEW}>
                <GenericButton onPress={()=>updateRide(rideObj)} buttonStyle={CREATEBUTTON} buttonText="Fahrt anfragen"
                               textStyle={CREATEBUTTONTEXT}/>
            </View>}
            <GenericButton onPress={onClose} buttonStyle={CLOSEBUTTON} textStyle={CLOSEBUTTONTEXT} buttonText="X"/>
        </View>
    )
}

export default StationSelectorSearch