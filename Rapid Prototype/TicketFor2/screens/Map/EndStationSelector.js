import React from "react"
import {ScrollView, Text} from "react-native";
import GenericButton from "../components/GenericButton";
import styles from "./styles";
import text from "../../theme/text";


const EndStationSelector = (stations, selectEndStation) => {
    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainer}>
            <Text style={text.normal}>Bitte wählen sie Ihre Endstation</Text>
            {stations.map((station, index) => <GenericButton key={index} buttonStyle={styles.lineSelectorButton}
                                                                          buttonText={station}
                                                                          textStyle={text.inButton}
                                                                          onPress={() => selectEndStation(station)}/>)}
        </ScrollView>
    )
}

export default EndStationSelector