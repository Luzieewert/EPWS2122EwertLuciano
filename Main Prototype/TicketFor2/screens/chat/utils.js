import {GiftedChat} from "react-native-gifted-chat";
import {handlePut} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";

export const handleMessageSend = async (ride,messages = [], callback) => {
    callback(prev => GiftedChat.append(prev, messages[0]))
    await handlePut(urls.chat + ride._id, messages[0], () => null)
}
