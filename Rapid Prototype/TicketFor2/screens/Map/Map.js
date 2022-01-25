import React, {useContext, useRef, useState} from 'react';
import styles from "./styles";
import MapView from "react-native-maps";
import {renderCurrentRideMarker, renderMarkers, renderOtherUser} from "./utils";
import {View} from "react-native";
import {onUserLocationChange} from "../../utils/location";
import {RideContext} from "../../contexts/RideContext";
import {UserContext} from "../../contexts/UserContext";

const Map = ({
                 renderObjects,
                 onUserLocationCallback,
                 location,
                 onRenderObjectsCalloutPress,
                 onCurrentRideCalloutPress,
                 otherUser,
                 rideScreen
             }) => {
    const map = useRef()
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)

    const [initialRender, setInitialRender] = useState(true)
    const isRide = Object.keys(ride).length > 0

    return (
        <View style={styles.container}>
            <MapView
                ref={map}
                style={styles.map}
                showsUserLocation={true}
                onUserLocationChange={(event) => onUserLocationChange(event, map, onUserLocationCallback, location, initialRender, setInitialRender,rideScreen,ride,setRide,user)}
            >
                {renderObjects && !isRide ? renderMarkers(renderObjects, onRenderObjectsCalloutPress) : renderCurrentRideMarker(ride, onCurrentRideCalloutPress)}
                {otherUser && renderOtherUser(otherUser)}
            </MapView>
        </View>
    )
}

export default Map

