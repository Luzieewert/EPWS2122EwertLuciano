import {StyleSheet} from "react-native";
import button from "../../theme/button";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    button: {
        ...button.base,
        alignItems: "center",
        width: "40%",
        marginVertical: 4
    },

});

export default styles