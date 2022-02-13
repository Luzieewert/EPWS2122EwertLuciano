import React from "react"
import {ScrollView, Text} from "react-native";
import GenericButton from "../components/GenericButton";
import styles from "./styles";
import text from "../../theme/text";


const DepartureSelector = ({departures, selectLine}) => {
    return (
        <ScrollView style={styles.departureSelector}>
            <Text style={styles.departureSelectorText}>Bitte wählen die gewünschte Abfahrt</Text>
            {departures.map((departure, index) => {
                const name = `(${departure.name}) ${departure.direction} ${departure.time}`
                return <GenericButton onPress={() => selectLine(departure)} key={index}
                                      buttonStyle={styles.departureSelectorButton} buttonText={name}
                                      textStyle={text.inButton}/>
            })}
        </ScrollView>
    )
}

export default DepartureSelector