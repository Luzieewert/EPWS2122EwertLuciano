const Chat = require("../models/Chat");
const getChatByRideId = (req, res) => {
    const {rideId} = req.params
    Chat.findOne({rideId: rideId}, null, null, (err, chat) => {
        if (err) res.send(err)
        else res.status(200).json({result: chat});
    })
}

const createChat = (req, res) => {
    const newChat = new Chat({...req.body})
    newChat.save()
        .then((chat) => {
            return res.status(200).json({result: chat});
        })
        .catch(err => {
            return console.log(err)
        });
}

const updateChatByRideId = (req, res) => {
    const {rideId} = req.params
    try {
        Chat.findOne({rideId: rideId}, null, null, (err, chat) => {
            chat.messages = [req.body,...chat.messages]
            chat.save()
            if (err) res.send(err)
            else res.status(200).json({result: chat});
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = {getChatByRideId, createChat, updateChatByRideId}