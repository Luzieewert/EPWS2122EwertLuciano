import {StyleSheet} from "react-native";
import spacing from "../../theme/spacing";
import button from "../../theme/button";
import border from "../../theme/border";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing[0]
    },
    textInput: {
       ...border.base,
        marginVertical: spacing[0]
    },
    button: {
        ...button.base,
        marginHorizontal: spacing[0],
        marginBottom: spacing[0]
    },
    checkBoxContainer: {
        flexDirection: "row",
        marginBottom: spacing[2],
        alignItems: "center"
    }
});

export default styles