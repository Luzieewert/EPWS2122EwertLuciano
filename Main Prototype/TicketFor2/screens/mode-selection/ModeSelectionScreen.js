import React from "react"
import {View} from "react-native";
import ModeSelection from "./ModeSelection";
import styles from "./styles";

const ModeSelectionScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <ModeSelection />
        </View>
    )
}

export default ModeSelectionScreen