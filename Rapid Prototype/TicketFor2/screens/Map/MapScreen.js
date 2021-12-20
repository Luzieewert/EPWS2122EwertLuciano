import React, {useContext, useEffect, useState} from 'react';
import {PermissionsAndroid, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GenericButton from "../components/GenericButton";
import {UserContext} from "../../contexts/UserContext";
import StationSelector from "./StationSelector";
import {RideContext} from "../../contexts/RideContext";
import axios from "axios";
import RideConfirmation from "./RideConfirmation";
import {useNavigation} from "@react-navigation/native";
import StationSelectorSearch from "./StationSelectorSearch";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    button: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "black",
        padding: 7
    },
    buttonText: {
        color: "white"
    }
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

const RIDESEARCHBUTTON = {
    position: "absolute",
    top: 55,
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

const linesSearch = [
    {
        id: 78645,
        name: "12 (Zollstock Südfriedhof)",
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

const barbarossaStationSearcher = [
    {
        name: "Barbarossaplatz",
        lines: "12, 15",
        coordinates: {
            latitude: 50.929027,
            longitude: 6.941914
        }
    },
]

const markerStatusMap = {
    Created: "blue",
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
    const [showRidesSearcher, setShowRidesSearcher] = useState(false)
    const [showCreateButton, setShowCreateButton] = useState(user.has_ticket === true)
    const [showSearchButton, setShowSearchButton] = useState(true)
    const [showStationSelector, setShowStationSelector] = useState(false)
    const [showStationSelectorSearch, setShowStationSelectorSearch] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const navigation = useNavigation()


    const getCurrentRide = async (rideId) => {
        await axios.get('http://localhost:8001/TicketFor2/ride/' + rideId)
            .then((res) => {
                const newRide = res.data
                setRide(newRide)
            })
            .catch((err) => {
                console.log(err);
            });
    }



    useEffect(() => {
        if (Object.keys(ride).length > 0) {
            const handle = setInterval(() => getCurrentRide(ride._id), 5000)
            return () => {
                clearInterval(handle)
            }
        }
        return () => {
        }
    }, [ride])



    useEffect(()=> {
        if(ride && ride.ride_status === "Started"){
            setShowCreateButton(user.has_ticket === true)
            navigation.reset({index: 0, routes: [{name: 'Ride'}]})
        }
    },[ride?.ride_status])

    const searchForRides = () => {
        setShowRides(true)
        setShowCreateButton(false)
        setShowSearchButton(false)
    }

    const searchForRidesSearcher = () => {
        setShowRidesSearcher(true)
        setShowSearchButton(false)
    }

    const selectStation = () => {
        if (!user.has_ticket) return null
        setShowStationSelector(true)
    }

    const selectStationSearch = () => {
        setShowStationSelectorSearch(true)
    }

    const closeStationSelector = () => {
        setShowStationSelector(false)
        setShowCreateButton(true)
        setShowRides(false)
    }

    const closeStationSelectorSearch = () => {
        setShowStationSelectorSearch(false)
        setShowCreateButton(true)
        setShowRides(false)
    }

    const handleRideCreationSuccess = () => {
        setShowStationSelector(false)
        setShowCreateButton(false)
        setShowRides(false)
        setShowSearchButton(false)
        setShowStationSelectorSearch(false)
        setShowRidesSearcher(false)
    }

    const updateRide = async (rideData) => {
        await axios.put('http://localhost:8001/TicketFor2/ride/' + ride._id, rideData)
            .then((res) => {
                const newRide = res.data
                setRide(newRide)
                setShowConfirmation(false)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleConfirmation = (choice) => {
        if (choice) {
            updateRide({"ride_status": "Started"}).then(() => {
                const newRide = {...ride,ride_status: "Started"}
                setRide(newRide)
            })
        } else {
            updateRide({"ride_taker": {}, "ride_status": "Created"}).then(() => null)
        }
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

    const renderMarkersSearch = () => {
        return barbarossaStationSearcher.map((station, index) => {
            return <Marker
                onCalloutPress={selectStationSearch}
                key={index}
                coordinate={station.coordinates}
                title={station.name + "(" + station.lines + ")"}/>
        })
    }

    const renderCurrentRideMarker = () => {
        return <Marker key={"mark176" + ride.ride_status} coordinate={{
            latitude: 50.929027,
            longitude: 6.941914,
        }} onCalloutPress={ride.ride_status === "Pending" && user.has_ticket ? () => setShowConfirmation(true) : null}
                       title={ride.start_station_name + " " + "(" + ride.ride_status + ")"}
                       pinColor={markerStatusMap[ride.ride_status]}/>
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
                {showRidesSearcher && renderMarkersSearch()}
                {Object.keys(ride).length > 0 && renderCurrentRideMarker()}
            </MapView>
            {showCreateButton && <GenericButton onPress={searchForRides}
                                                buttonStyle={RIDECREATIONBUTTON}
                                                buttonText="Fahrt Erstellen"
                                                textStyle={RIDECREATIONBUTTONTEXT}
            />}
            {showSearchButton && <GenericButton onPress={searchForRidesSearcher}
                                                buttonStyle={RIDESEARCHBUTTON}
                                                buttonText="Fahrt Suchen"
                                                textStyle={RIDECREATIONBUTTONTEXT}
            />}
            {showStationSelector && <StationSelector handleRideCreationSuccess={handleRideCreationSuccess} lines={lines}
                                                     onClose={closeStationSelector}/>}
            {showStationSelectorSearch && <StationSelectorSearch handleRideCreationSuccess={handleRideCreationSuccess} lines={linesSearch}
                                                     onClose={closeStationSelectorSearch}/>}
            {showConfirmation && <RideConfirmation handleConfirmation={handleConfirmation} taker={ride?.ride_taker}/>}


        </View>
    );
}

export default MapScreen;