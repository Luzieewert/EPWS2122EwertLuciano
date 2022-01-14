import React, {useEffect, useState} from 'react';
import styles from "./styles";
import MapView from "react-native-maps";
import {renderCurrentRideMarker, renderMarkers} from "./utils";
import {View} from "react-native";
import {getLocationUpdates} from "../../utils/location";

const Map = ({ride, renderObjects, watchRef}) => {
    const [location, setLocation] = useState()


    useEffect(() => {
        getLocationUpdates(watchRef,setLocation)
    }, [])

    if (!location) return null


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                region={location}
            >
                {renderObjects && renderMarkers(renderObjects)}
                {Object.keys(ride).length > 0 && renderCurrentRideMarker()}
            </MapView>
        </View>
    )
}

export default Map

