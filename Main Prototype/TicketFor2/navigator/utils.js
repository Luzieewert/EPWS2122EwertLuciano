import {handleGet} from "../utils/databaseInteraction";
import {urls} from "../utils/urls";

export const getRideState = async (userId,callback) => {
    return await handleGet(urls.rideByUser, null, callback)
}