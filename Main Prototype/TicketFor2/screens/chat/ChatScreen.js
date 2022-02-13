import React, {useState, useEffect, useContext} from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import {handleGet} from "../../utils/databaseInteraction";
import {urls} from "../../utils/urls";
import {RideContext} from "../../contexts/RideContext";
import {UserContext} from "../../contexts/UserContext";
import {handleMessageSend} from "./utils";
import {Text, View} from "react-native";


const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [ride, setRide] = useContext(RideContext)
    const [user, setUser] = useContext(UserContext)


    useEffect(() => {
        const getChatCallback = (res) => {
            setMessages(res.messages)
        }
        const handle = setInterval(() => handleGet(urls.chat + ride._id, null, getChatCallback), 3000)
        return () => {
            clearInterval(handle)
        }
    }, [messages, ride._id])
    if (!user) return null
    return (
        <GiftedChat
            messages={messages}
            onSend={messages => handleMessageSend(ride, messages, setMessages)}
            user={{
                _id: user._id,
                name: user.name,
                avatar: 'https://placeimg.com/140/140/any',
            }}
            showUserAvatar
            showAvatarForEveryMessage
            renderLoading={() => <View><Text>Loading...</Text></View>}
        />
    )
}
export default ChatScreen;