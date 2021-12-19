import React from 'react';
import {StyleSheet, TextComponent, TouchableOpacity, View, Text} from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
      flex:1
    },
    button: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "black",
        padding: 7
    },
    buttonText: {
        color: "white"
    }
});


const initialState = {
    latitude: 50.929102,
    longitude: 6.941422,
    latitudeDelta: 0.00375,
    longitudeDelta: 0.00521,

}

const MapScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialState}
            >


                <Marker
                    coordinate={{latitude: 50.929027, longitude: 6.941914}}
                    title="Haltestelle"
                    description="Dies ist die Haltestelle der Linie 12"
                />
            </MapView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Chat")}>

                <Text style = {styles.buttonText}>
                    Chat
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default MapScreen;