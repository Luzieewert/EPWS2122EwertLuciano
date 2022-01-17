import {Alert, PermissionsAndroid} from "react-native";
import Geolocation from 'react-native-geolocation-service';

const deltas = {
    latitudeDelta: 0.00375,
    longitudeDelta: 0.00521,
}


const options = {
    accuracy: {
        android: 'high',
        ios: 'best',
    },
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
    distanceFilter: 0,
    forceRequestLocation: true,
    forceLocationManager: false,
    showLocationDialog: true,
}

export const locationPermissionHandle = async () => {
    let permission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

    if (!permission) {
        permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            , {
                title: "Wir brauchen ihre Standort",
                message: "Wir nutzen ihre Standort um alle TicketFor2 Funktionalitäten zu ermöglichen",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }).catch(err => {
            console.error(err)
        })
    }
    return permission
}

export const getLocation = (callback) => {
    Geolocation.getCurrentPosition(
        (position) => {
            callback({
                ...deltas,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        },
        (error) => {
            Alert.alert(`Code ${error.code}`, error.message);
        },
        options,
    )
}

export const getLocationUpdates = (ref, callback) => {
    ref.current = Geolocation.watchPosition(
        (position) => {
            callback({
                ...deltas,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        (error) => {
            console.log(error);
        },
        {
            ...options,
            interval: 5000,
            fastestInterval: 2000,
            useSignificantChanges: false,
        },
    );
}

export const stopLocationUpdates = (ref) => {
    if (ref.current !== null) {
        Geolocation.clearWatch(ref.current);
        ref.current = null;
    }
}

export const onUserLocationChange = (event, ref) => {
    const location = {
        ...deltas,
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude
    }
    ref.current.animateToRegion(location, 1500)
}

