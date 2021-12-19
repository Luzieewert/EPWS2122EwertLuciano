import React, {useContext, useEffect} from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GenericButton from "../components/GenericButton";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {RideContext} from "../../contexts/RideContext";
import {UserContext} from "../../contexts/UserContext";

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        padding: 7,
        borderRadius: 5,
        alignItems: "center",
        width: "40%",
        marginVertical: 4
    },
    buttonText: {
        color: "white"
    },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});


const RideScreen = () => {
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)
    const navigation = useNavigation()


    const getCurrentRide = async (rideId) => {
        await axios.get('http://localhost:8001/TicketFor2/ride/' + rideId)
            .then((res) => {
                const newRide = res.data
                setRide(newRide)
                if(newRide.ride_status === "Completed") {
                    navigation.reset({index: 0, routes: [{name: 'PostRide'}]})
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {
            const handle = setInterval(() => getCurrentRide(ride._id), 5000)
            return () => {
                clearInterval(handle)
            }
    }, [ride])

    const updateRide = async (rideData) => {
        await axios.put('http://localhost:8001/TicketFor2/ride/' + ride._id, rideData)
            .then((res) => {
                const newRide = res.data
                setRide(newRide)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const navigateToChat = () => {
        navigation.navigate("ChatFallback")
    }

    const endRide = (newStatus) => {
        updateRide({ride_status: newStatus}).then(() => {
            navigation.reset({index: 0, routes: [{name: 'PostRide'}]})
        })
    }

    return (
        <View style={styles.container}>
            <GenericButton onPress={navigateToChat} buttonStyle={styles.button} textStyle={styles.buttonText}
                           buttonText="Chat"/>
            {ride.ride_giver._id === user._id && <GenericButton onPress={()=>endRide("Completed")} buttonStyle={styles.button} textStyle={styles.buttonText}
                           buttonText="End Ride"/> }
        </View>
    )
}

export default RideScreen