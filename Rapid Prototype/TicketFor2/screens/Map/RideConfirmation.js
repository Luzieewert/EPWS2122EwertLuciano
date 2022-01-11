import React from "react"
import {Text, View} from "react-native";
import GenericButton from "../components/GenericButton";
import styles from "./styles";
import text from "../../theme/text";

const RideConfirmation = ({taker, handleConfirmation}) => {
    return (
        <View style={styles.rideConfirmationContainer}>
            <View style={styles.rideConfirmationInnerContainer}>
                <Text style={text.inButton}> {taker?.name} {taker?.last_name} möchte mit dir fahren.</Text>
                <View style={styles.rideConfirmationButtonContainer}>
                    <GenericButton
                    onPress={() => handleConfirmation(true)} buttonStyle={styles.rideConfirmationButton}
                    buttonText="Annehmen" textStyle={text.inButton}/>
                    <GenericButton
                    buttonStyle={styles.rideConfirmationButton} onPress={() => handleConfirmation(false)}
                    buttonText="Ablehnen" textStyle={text.inButton}/></View>
            </View>
        </View>
    )
}

export default RideConfirmation