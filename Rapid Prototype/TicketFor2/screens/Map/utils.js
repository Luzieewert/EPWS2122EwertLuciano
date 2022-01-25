import {Marker} from "react-native-maps";
import React from "react";

export const markerStatus = {
    Created: "blue",
    Pending: "yellow",
    User: "yellow"
}

export const renderMarkers = (markers, onCalloutPress) => {
    return markers.map((marker, index) => {
        return <Marker
            onCalloutPress={() => onCalloutPress(marker)}
            key={index}
            coordinate={marker.start_station_cords}
            title={marker.name}/>
    })
}

export const renderCurrentRideMarker = (ride, onCalloutPress) => {
    const name = `(${ride.lineName}) ${ride.direction} (${ride.ride_start})`
    return <Marker key={"mark176" + ride.ride_status} coordinate={{
        latitude: ride.start_station_cords.latitude,
        longitude: ride.start_station_cords.longitude,
    }} onCalloutPress={onCalloutPress}
                   title={name + " " + "(" + ride.ride_status + ")"}
                   pinColor={markerStatus[ride.ride_status]}/>
}

export const renderOtherUser = (user) => {
    if(!user.location) return null
    return <Marker coordinate={{
        latitude: user.location.latitude,
        longitude: user.location.longitude,
    }} pinColor={markerStatus["User"]}
    title={user.name + " " + user.last_name}
    />
}

export const getOtherUser = (ride,user) => {
    return ride.ride_giver._id === user._id ? ride.ride_taker : ride.ride_giver
}