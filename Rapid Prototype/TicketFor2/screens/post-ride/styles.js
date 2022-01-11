import {StyleSheet} from "react-native";
import button from "../../theme/button";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        alignItems: "center",
    },

    mainText: {
        fontSize: 24,
        color: "#4ca0ed"
    },
    button: {
        ...button.base,
        marginTop: 7
    }
});

export default styles