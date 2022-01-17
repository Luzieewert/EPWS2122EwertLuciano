import React, {useRef} from 'react';
import styles from "./styles";
import MapView from "react-native-maps";
import {renderCurrentRideMarker, renderMarkers} from "./utils";
import {View} from "react-native";
import {onUserLocationChange} from "../../utils/location";

const Map = ({ride, renderObjects}) => {
    const map = useRef()

    return (
        <View style={styles.container}>
            <MapView
                ref={map}
                style={styles.map}
                showsUserLocation={true}
                onUserLocationChange={(event) => onUserLocationChange(event, map)}

            >
                {renderObjects && renderMarkers(renderObjects)}
                {Object.keys(ride).length > 0 && renderCurrentRideMarker()}
            </MapView>
        </View>
    )
}

export default Map

