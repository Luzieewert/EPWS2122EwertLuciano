import {StyleSheet} from "react-native";
import spacing from "../../theme/spacing";
import border from "../../theme/border";
import button from "../../theme/button";
import text from "../../theme/text";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    creationButton: {
        position: "absolute",
        top: 15,
        left: 15,
        ...button.base,
        ...border.base,
    },
    searchButton: {
        position: "absolute",
        top: 55,
        left: 15,
        ...border.base,
        ...button.base,
    },
    rideSelectionMenu: {
        position: "absolute",
        top: "20%",
        left: "2.5%",
        backgroundColor: "black",
        paddingHorizontal: 10,
        borderRadius: 5,
        height: "50%",
        width: "95%",
    },
    rideSelectionMenuInnerContainer: {
        flex:1,
        marginTop: 30,
        marginBottom: 20,
        justifyContent: "center"
    },
    rideSelectionMenuButton: {
        marginVertical: 4,
        ...button.base
    },
    rideSelectionMenuText: {
        ...text.inButton,
        marginBottom: spacing[0]
    },
    rideSelectionMenuCreationBtnCont: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    rideSelectionMenuCreationBtn: {
        ...button.base,
        ...border.base,
        borderColor: "#fff",
        alignSelf: "center"
    },
    rideSelectionMenuCreationBtnText: {
        ...text.inButton,
        fontSize: 18
    },

    departureSelector: {
        marginTop: 10,
        padding: 4
    },

    departureSelectorText: {
        ...text.inButton,
        marginBottom: 7
    },

    departureSelectorButton: {
        ...button.base,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: "white",
    },
    closeBtn: {
        position: "absolute",
        top: 5,
        right: 5,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 100,
        width: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        flex:1
    },
    rideConfirmationContainer: {
        position: "absolute",
        top: "20%",
        left: "15%",
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
        width: "70%",
        height: "50%",
    },
    rideConfirmationInnerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    rideConfirmationButtonContainer: {
        flexDirection: "row",
    },
    rideConfirmationButton: {
        ...button.base,
        marginTop: spacing[0],
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: "white",
    },
    mapActionButton: {
        position: "absolute",
        top: 10,
        left: 10,
        ...button.base,
        ...border.base
    }

});

export default styles