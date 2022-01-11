import React from "react"
import {Text, View} from "react-native";
import GenericButton from "../components/GenericButton";
import styles from "./styles";
import text from "../../theme/text";


const LineSelector = (lines, selectLine) => {
    return (
        <View style={styles.lineSelector}>
            <Text style={styles.lineSelectorText}>Bitte wählen die gewünschte Linie</Text>
            {lines.map((line, index) => <GenericButton onPress={() => selectLine(line)} key={index}
                                                       buttonStyle={styles.lineSelectorButton} buttonText={line.name}
                                                       textStyle={text.inButton}/>)}
        </View>
    )
}

export default LineSelector