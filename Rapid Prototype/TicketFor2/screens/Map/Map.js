import React, {useEffect, useState} from 'react';
import styles from "./styles";
import MapView from "react-native-maps";
import {renderCurrentRideMarker, renderMarkers} from "./utils";
import {View} from "react-native";
import {getLocation} from "../../utils/location";

const Map = ({ride, renderObjects}) => {
    const [location, setLocation] = useState({})

    useEffect(() => {
        getLocation().then(res => setLocation(res))
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation
                region={location}
            >
                {renderObjects && renderMarkers(renderObjects)}
                {Object.keys(ride).length > 0 && renderCurrentRideMarker()}
            </MapView>
        </View>
    )
}

export default Map