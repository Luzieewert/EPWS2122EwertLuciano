import {genericFunction, handlePost} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";

export const createChat = async (rideId, callback = genericFunction) => {
    try {
        return await handlePost(urls.chat, {rideId: rideId}, callback)
    }
    catch (err) {
        console.error(err)
    }
}