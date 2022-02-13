import React from 'react';
import {View} from "react-native";
import GenericButton from "../components/GenericButton";
import {locationPermissionHandle} from "../../utils/location";
import {useNavigation} from "@react-navigation/native";
import styles from "./styles";


const ModeSelection = () => {
    const navigation = useNavigation();

    const handleModeSelect = async (mode) => {
        const permission = await locationPermissionHandle()

        if (!permission || permission === "never_ask_again") {
            console.warn("Wir haben kein Zugriff auf ihr Standort")
            return null
        }
        navigation.navigate("Map", {mode: mode})
    }

    return (
        <View style={styles.innerContainer}>
            <GenericButton buttonStyle={styles.modeButton} onPress={() => handleModeSelect("Creator")} textStyle={styles.modeButtonText}
                           buttonText="Fahrt anbieten"/>
            <GenericButton buttonStyle={styles.modeButton} onPress={() => handleModeSelect("Searcher")} textStyle={styles.modeButtonText}
                           buttonText="Fahrt suchen"/>
        </View>
    )
}

export default ModeSelection