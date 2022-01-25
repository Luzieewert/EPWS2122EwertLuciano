import {Alert, PermissionsAndroid} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import {genericFunction, handlePut} from "./databaseInteraction";
import {urls} from "./urls";

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

export const getHaversineDistanceM = (location1, location2) => {
    const RADIUS_OF_EARTH_IN_KM = 6371;
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);

    let [lat1,lon1] = [location1.latitude,location1.longitude]
    let [lat2,lon2] = [location2.latitude,location2.longitude]

    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);

    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2)
        * Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2));
    const c = 2 * Math.asin(Math.sqrt(a));

    return (RADIUS_OF_EARTH_IN_KM * c) * 1000;
};

const saveLocationInRideUser = async (user, location, ride ,setRide) => {
    try {
        const key = user._id === ride.ride_giver._id ? "ride_giver" : "ride_taker"
        await handlePut(urls.ride + ride._id,{[key]: {...user,location: location }},setRide)
    } catch (err) {
        console.error(err)
    }
}

export const onUserLocationChange = (event, ref, callback = genericFunction, currentLocation, initialRender, setInitialRender, rideScreen, ride, setRide, user) => {
    const location = {
        ...deltas,
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude
    }
    const locationDifference = getHaversineDistanceM(location, currentLocation)
    if (rideScreen && locationDifference < 5) saveLocationInRideUser(user, {latitude: location.latitude, longitude:location.longitude }, ride, setRide)
    callback(location)
    if(locationDifference < 50 && !initialRender) return null
    ref.current.animateToRegion(location, 1500)
    setInitialRender(false)
}


