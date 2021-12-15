import React, {useEffect, useState} from 'react';
import { ActivityIndicator, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import RNLocation, {checkPermission} from 'react-native-location';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
/*
RNLocation.configure({
    distanceFilter: null
})
*/
const permissionHandle = async () => {

    console.log('here')


    let permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
            detail: 'coarse' // or 'fine'
        }
    });

    console.log('here2')
    console.log(permission)

}

const initialState = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}



const MapScreen = () => {

   // navigator.geolocation = require('@react-native-community/geolocation');

   /* const [currentLocation, setCurrentLocation] = useState(initialState)
    useEffect(() => {
        // Update the document title using the browser API
        permissionHandle();
    });

    useEffect(() => {
        // Update the document title using the browser API
        navigator.geolocation.getCurrentPosition(position => {
                //alert(JSON.stringify(position))
                const {longitude, latitude} = position.coords;
                setCurrentLocation({
                    ...currentLocation,
                    latitude,
                    longitude,
                })
            }
            , error => alert(error.message),
            {timeout: 20000, maximumAge: 1000}
        )
    }, []); */

    return ( //currentLocation.latitude ? (

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}  >

            <MapView
                style = {styles.map}
                provider={PROVIDER_GOOGLE}
                //showsUserLocation
                initialRegion={ //currentLocation}
                    {
                        latitude: 50.929102,
                        longitude: 6.941422,
                        latitudeDelta: 0.00375,
                        longitudeDelta: 0.00521,
                    }}
                >

            <Marker
                coordinate={{ latitude : 50.929027 , longitude : 6.941914 }}
                title="Haltestelle"
                description="Dies ist die Haltestelle der Linie 12"
            />
            </MapView>

        </View>
    ); //: <ActivityIndicator style = {{flex : 1}} animating size = 'large'/>
}

export default MapScreen;