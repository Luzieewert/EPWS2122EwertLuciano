import {genericFunction, handleGet} from "./databaseInteraction";
import {urls} from "./urls";

export const getDepartures = async (location, callback = genericFunction, radius = 400) => {
    try {
        return await handleGet(urls.departures, {location: location, radius: radius}, callback)
    } catch (err) {
        console.error(err)
    }
}

export const getLinePath = async (lineName, start_station_name, direction, callback = genericFunction) => {
    try {
        return await handleGet(urls.linePath + lineName, {
            start_station_name: start_station_name,
            direction: direction
        }, callback)
    } catch (err) {
        console.error(err)
    }
}

export const getRidesByLocation = async (location,callback = genericFunction , radius = 400) => {
    try {
        return await handleGet(urls.ridesByLocation,{location: location, radius: radius}, callback)
    } catch (err) {
        console.error(err)
    }
}