import {StyleSheet} from "react-native";
import spacing from "../../theme/spacing";
import border from "../../theme/border";
import button from "../../theme/button";

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
});

export default styles