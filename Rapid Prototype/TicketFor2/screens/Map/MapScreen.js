import React from 'react';
import { StyleSheet, View} from 'react-native';
import MapView, { Marker} from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
      flex:1
    },
});

const initialState = {
    latitude: 50.929102,
    longitude: 6.941422,
    latitudeDelta: 0.00375,
    longitudeDelta: 0.00521,

}


const MapScreen = () => {
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

        </View>
    );
}

export default MapScreen;