import {StyleSheet} from "react-native";
import button from "../../theme/button";
import spacing from "../../theme/spacing";
import text from "../../theme/text";


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        marginBottom: spacing[2]
    },

    modeButton: {
        ...button.base,
        marginBottom: spacing[0],
    },

    modeButtonText: {
        ...text.inButton,
        fontSize: 24
    }
});

export default styles