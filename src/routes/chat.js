const express = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");


const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async(req, res) => {
    const { targetUserId} = req.params;
    const userId = req?.user._id;

    try{
          //Check if userId and targetUserId are friends
           const isFriend = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
                { fromUserId: targetUserId, toUserId: userId, status: "accepted" }
            ]
            });

            if(!isFriend) {
                return res.status(400).json({message: "You are not friends!!"})
             }

        let chat = await Chat.findOne({
            participants: {$all: [userId, targetUserId]}
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName photoUrl",
        });

        if(!chat){
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            });

            await chat.save();
        }
        res.json(chat);
    }catch(err){
        console.log(err);
    }

})

module.exports = chatRouter;