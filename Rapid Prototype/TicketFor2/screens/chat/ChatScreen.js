import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StreamChat} from 'stream-chat';
import { Channel, Chat, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider } from 'stream-chat-react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Define values.
const api_key = '25vyk3xv7vva'
const api_secret = 'txzup8e8ruvgt7tj9nqpzc6ebj5jvzmf43uz96xm34mj7sf6fnqjcnj2tge2fajn'
const user_id = 'luzie'

// Initialize a Server Client
const serverClient = StreamChat.getInstance( api_key, api_secret);
// Create User Token
const token = serverClient.createToken(user_id);
/*
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGFyay1ib2F0LTEiLCJleHAiOjE2Mzk4NTg0MDN9.9v9G2iaeRCAQNG8eJUrU684rXFh-apbFkX2kPPMstb4';

const user = { id: 'dark-boat-1' };

const chatClient = StreamChat.getInstance('25vyk3xv7vva');
const connectUserPromise = chatClient.connectUser(user, userToken);
*/
const channel = serverClient.channel('messaging', 'channel_id');

const ChannelScreen = () => {
    const { bottom } = useSafeAreaInsets();

    return (
        <ChatOverlayProvider bottomInset={bottom} topInset={0}>
            <SafeAreaView>
                <Chat client={serverClient}>
                    {/* Setting keyboardVerticalOffset as 0, since we don't have any header yet */}
                    <Channel channel={channel} keyboardVerticalOffset={0}>
                        <View style={StyleSheet.absoluteFill}>
                            <MessageList />
                            <MessageInput />
                        </View>
                    </Channel>
                </Chat>
            </SafeAreaView>
        </ChatOverlayProvider>
    );
};


const ChatScreen = () => {
    const [ready, setReady] = useState();

    useEffect(() => {
        const initChat = async () => {
            await connectUserPromise;
            await channel.watch();
            setReady(true);
        };

        initChat();
    }, []);

    if (!ready) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ChannelScreen channel={channel} />
        </SafeAreaProvider>
    );
}
export default ChatScreen;