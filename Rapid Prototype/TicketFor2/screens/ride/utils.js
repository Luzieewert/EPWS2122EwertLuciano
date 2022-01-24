import {genericFunction, handleGet, handlePost} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";

export const createChat = async (rideId, callback = genericFunction) => {
    try {
        return await handlePost(urls.chat, {rideId: rideId}, callback)
    } catch (err) {
        console.error(err)
    }
}

export const createRideLocations = async (rideId, callback = genericFunction) => {
    try {
        return await handlePost(urls.rideLocations, {rideId: rideId}, callback)
    } catch (err) {
        console.error(err)
    }
}

export const getOrCreateRideObjects = async (rideId, chatCallback, rideLocationsCallback) => {
    let chat,userLocations
    await handleGet(urls.chat + rideId, null, (res) => chat = res)
    if (!chat) {
        await createChat(rideId, chatCallback)
    }
    await handleGet(urls.rideLocations + rideId, null, (res) => userLocations = res)
    if (!userLocations) {
        await createRideLocations(rideId, rideLocationsCallback)
    }
}