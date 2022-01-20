import {Marker} from "react-native-maps";
import React from "react";

export const markerStatus = {
    Created: "blue",
    Pending: "yellow",
}

export const renderMarkers = (markers, onMarkerCalloutPress) => {
    return markers.map((marker, index) => {
        return <Marker
            onCalloutPress={onMarkerCalloutPress}
            key={index}
            coordinate={marker.start_station_cords}
            title={marker.start_station_name}/>
    })
}

export const renderCurrentRideMarker = (ride, onCalloutPress) => {
    return <Marker key={"mark176" + ride.ride_status} coordinate={{
        latitude: ride.start_station_cords.latitude,
        longitude: ride.start_station_cords.longitude,
    }} onCalloutPress={onCalloutPress}
                   title={ride.start_station_name + " " + "(" + ride.ride_status + ")"}
                   pinColor={markerStatus[ride.ride_status]}/>
}