import React, {useRef, useState} from 'react';
import styles from "./styles";
import MapView from "react-native-maps";
import {renderCurrentRideMarker, renderMarkers} from "./utils";
import {View} from "react-native";
import {onUserLocationChange} from "../../utils/location";

const Map = ({
                 ride,
                 renderObjects,
                 onUserLocationCallback,
                 location,
                 onRenderObjectsCalloutPress,
                 onCurrentRideCalloutPress
             }) => {
    const map = useRef()
    const [initialRender, setInitialRender] = useState(true)
    const isRide = Object.keys(ride).length > 0

    return (
        <View style={styles.container}>
            <MapView
                ref={map}
                style={styles.map}
                showsUserLocation={true}
                onUserLocationChange={(event) => onUserLocationChange(event, map, onUserLocationCallback, location, initialRender, setInitialRender)}
            >
                {renderObjects && !isRide ? renderMarkers(renderObjects, onRenderObjectsCalloutPress) : renderCurrentRideMarker(ride, onCurrentRideCalloutPress)}
            </MapView>
        </View>
    )
}

export default Map

