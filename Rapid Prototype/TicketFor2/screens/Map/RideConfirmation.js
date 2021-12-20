import React from "react"
import {Text, View} from "react-native";
import GenericButton from "../components/GenericButton";

const RIDECONFIRMATION = {
    position: "absolute",
    top: "20%",
    left: "15%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: "70%",
    height: "50%",
}

const BUTTONSCONTAINER = {
    flexDirection: "row",
}

const BUTTON = {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 5,
    marginTop: 7,
    marginHorizontal: 4
}

const TEXTSTYLE = {
    color: "white"
}

const INNERCONTAINER = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
}




const RideConfirmation = ({taker, handleConfirmation}) => {
    return (
        <View style={RIDECONFIRMATION}>
            <View style={INNERCONTAINER}>
            <Text style={TEXTSTYLE}> {taker?.name} {taker?.last_name} möchte mit dir fahren.</Text>
            <View style={BUTTONSCONTAINER}><GenericButton onPress={() => handleConfirmation(true)} buttonStyle={BUTTON} buttonText="Annehmen" textStyle={TEXTSTYLE}/><GenericButton
              buttonStyle={BUTTON} onPress={() => handleConfirmation(false)}  buttonText="Ablehnen" textStyle={TEXTSTYLE}/></View>
            </View>
        </View>
    )
}

export default RideConfirmation