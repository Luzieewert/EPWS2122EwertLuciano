import React from "react"
import {Text, View} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import styles from "./styles";

const TicketCheckBox = ({has_ticket, setRegistrationData}) => {
    return (
        <View style={styles.checkBoxContainer}>
            <CheckBox
                disabled={false}
                value={has_ticket}
                onValueChange={(e) => setRegistrationData(prev => { return {...prev, has_ticket: e}}
                )}
            />
            <Text style={{color: "black"}}>Ich besitze ein Ticket</Text>
        </View>
    )
}

export default TicketCheckBox