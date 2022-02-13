import {Alert, PermissionsAndroid} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import {genericFunction, handlePut} from "./databaseInteraction";

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

const getHaversineDistanceM = (location1, location2) => {
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

const addUserLocationToRide = (userID, location, callback) => {
    callback(prev => {
        const result = prev.ride_giver._id === userID ? {...prev, ride_giver: {...prev.ride_giver, location: location}} : {...prev, ride_taker: {...prev.ride_taker, location: location}}
        handlePut(urls.ride, result, null)
        return prev.ride_giver._id === userID ? {...prev, ride_giver: {...prev.ride_giver, location: location}} : {...prev, ride_taker: {...prev.ride_taker, location: location}}
    })
}

export const onUserLocationChange = (event, ref, callback = genericFunction, currentLocation, initialRender, setInitialRender, ride, setRide, userID) => {
    const location = {
        ...deltas,
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude
    }
    const locationDifference = getHaversineDistanceM(location, currentLocation) > 50
    callback(location)
    if(ride.ride_status === "Started" || ride.ride_status === "Progress") return addUserLocationToRide(userID, {latitude: location.latitude, longitude: location.longitude}, setRide )
    if(!locationDifference && !initialRender) return null
    ref.current.animateToRegion(location, 1500)
    setInitialRender(false)
}


