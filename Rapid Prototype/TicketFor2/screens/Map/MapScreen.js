import React, {useContext, useState} from 'react';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import GenericButton from "../components/GenericButton";
import {UserContext} from "../../contexts/UserContext";
import StationSelector from "./StationSelector";
import {RideContext} from "../../contexts/RideContext";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
});

const askForLocation = () => {
    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(granted => {
        console.log(granted) // just to ensure that permissions were granted
    });
}

const RIDECREATIONBUTTON = {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#000000",
    borderRadius: 5,
    padding: 8
}

const RIDECREATIONBUTTONTEXT = {
    color: "white"
}

const lines = [
    {
        id: 78645,
        name: "12 (Zollstock Südfriedhof)",
        direction: "Zollstock Südfriedhof",
        stations: ["Eifelstr.", "Eifelplatz", "Pohligstr.", "Herthastr.", "Gottesweg", "Zollstockgürtel", "Zollstock Südfriedhof"]
    },

    {
        id: 78677,
        name: "12 (Merkenich)",
        direction: "Merkenich",
        stations: ["Zülpicher Platz", "Rudolfplatz",
            "Friesenplatz", "Christophstr./Mediapark",
            "Hansaring", "Ebertplatz", "Lohsestr.", "Florastr.",
            "Neusser Str./Gürtel", "Mollwitzstr.", "Scheibenstr.",
            "Wilhelm-Sollmann-Str.", "Niehl",
            "Geestemünder Str.", "Fordwerke Süd",
            "Fordwerke Mitte", "Fordwerke Nord",
            "Merkenich Mitte", "Merkenich"]
    },
    {
        id: 78655,
        name: "15 (Übierring)",
        direction: "Zollstock Südfriedhof",
        stations: ["Eifelstr.", "Eifelplatz", "Pohligstr.", "Herthastr.", "Gottesweg", "Zollstockgürtel", "Zollstock Südfriedhof"]
    },
    {
        id: 78653,
        name: "15 (Chorweiler)",
        direction: "Zollstock Südfriedhof",
        stations: ["Eifelstr.", "Eifelplatz", "Pohligstr.", "Herthastr.", "Gottesweg", "Zollstockgürtel", "Zollstock Südfriedhof"]
    },
]


const barbarossaStation = [
    {
        name: "Barbarossaplatz",
        lines: "12, 15",
        coordinates: {
            latitude: 50.929027,
            longitude: 6.941914
        }

    },
    {
        name: "Barbarossaplatz",
        lines: "16, 18",
        coordinates: {
            latitude: 50.92896328137546,
            longitude: 6.943209791154708
        }
    }
]

const markerStatusMap = {
    Created: "green",
    Pending: "yellow",
}


const initialState = {
    latitude: 50.929027,
    longitude: 6.941914,
    latitudeDelta: 0.00375,
    longitudeDelta: 0.00521,
}

const MapScreen = () => {
    const [user, setUser] = useContext(UserContext)
    const [ride, setRide] = useContext(RideContext)
    const [showRides, setShowRides] = useState(false)
    const [showButton, setShowButton] = useState(user.has_ticket === true)
    const [showStationSelector, setShowStationSelector] = useState(false)

    const searchForRides = () => {
        if (!user.has_ticket) return null
        setShowRides(true)
        setShowButton(false)
    }

    const selectStation = () => {
        if (!user.has_ticket) return null
        setShowStationSelector(true)
    }

    const closeStationSelector = () => {
        setShowStationSelector(false)
        setShowButton(true)
        setShowRides(false)
    }

    const handleRideCreationSuccess = () => {
        setShowStationSelector(false)
        setShowButton(false)
        setShowRides(false)
    }

    const renderMarkers = () => {
        return barbarossaStation.map((station, index) => {
            return <Marker
                onCalloutPress={selectStation}
                key={index}
                coordinate={station.coordinates}
                title={station.name + "(" + station.lines + ")"}/>
        })
    }
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={initialState}
                    showsUserLocation={true}
                    onMapReady={askForLocation}
                >
                    {showRides && renderMarkers()}
                    {ride && <Marker coordinate={{
                        latitude: 50.929027,
                        longitude: 6.941914,
                    }} title={ride.start_station_name + " " + "(" + ride.ride_status + ")"} pinColor={markerStatusMap[ride.ride_status]}/>}
                </MapView>
                {showButton && <GenericButton onPress={searchForRides}
                                              buttonStyle={RIDECREATIONBUTTON}
                                              buttonText="Fahrt Erstellen"
                                              textStyle={RIDECREATIONBUTTONTEXT}

                />}
                {showStationSelector && <StationSelector handleRideCreationSuccess={handleRideCreationSuccess} lines={lines} onClose={closeStationSelector}/>}

            </View>
        );
    }

    export default MapScreen;