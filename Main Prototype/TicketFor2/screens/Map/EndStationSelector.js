import React, {useEffect, useState} from "react"
import {ScrollView, Text} from "react-native";
import GenericButton from "../components/GenericButton";
import styles from "./styles";
import text from "../../theme/text";
import {getLinePath} from "../../utils/departure";


const EndStationSelector = ({lineName, start_station_name, direction, selectEndStation}) => {
    const [stations, setStations] = useState([])

    useEffect(() => {
        getLinePath(lineName, start_station_name, direction, setStations)
    }, [])


    if(!stations) return null
    return (
        <ScrollView>
            <Text style={text.inButton}>Bitte wählen sie Ihre Endstation</Text>
            {stations.map((station, index) => <GenericButton key={index} buttonStyle={styles.departureSelectorButton}
                                                             buttonText={station}
                                                             textStyle={text.inButton}
                                                             onPress={() => selectEndStation(station)}/>)}
        </ScrollView>
    )
}

export default EndStationSelector