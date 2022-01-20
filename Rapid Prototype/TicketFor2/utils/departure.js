import {genericFunction, handleGet} from "./databaseInteraction";
import {urls} from "./urls";

export const getDepartures = async (location,callback = genericFunction, radius = 400 ) => {
    try {
        return await handleGet(urls.departures, {location: location, radius: radius}, callback)
    }
    catch (err) {
        console.error(err)
    }
}