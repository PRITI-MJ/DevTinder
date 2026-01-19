const socket= require("socket.io");
const server = require("../app"); //importing the server instance from app.js
const crypto = require("crypto");

const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
    return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
}

const initializeSocket = (server) => {
    
    const io = socket(server, {
    cors: {
        origin: "http://localhost:5173", 
    }
    });


    //listening to the socket connection
    io.on("connection", (socket) => {
    //handle events
        socket.on("joinChat", async({firstName, userId, targetUserId}) => {
            const roomId = getSecretRoomId(userId, targetUserId); //generate a unique room ID based on user IDs

            console.log(firstName+ " Joined Room: ", roomId);
            socket.join(roomId);
        });

        socket.on("sendMessage", 
            async ({ firstName,lastName, photoId, userId, targetUserId, text, time}) => {
          
          
          try{
            const roomId = getSecretRoomId(userId, targetUserId); //generate a unique room ID based on user IDs


            //Check if userId and targetUserId are friends
           const isFriend = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
                { fromUserId: targetUserId, toUserId: userId, status: "accepted" }
            ]
            });

            if(!isFriend) {
                 socket.emit("errorMessage", {
                 message: "You are not friends with this user"
                });
                return;
                    }

            // Save message to the database
            let chat = await Chat.findOne({
                participants: {$all: [userId, targetUserId]}
            });

            if(!chat) {
                chat = new Chat({
                    participants: [userId, targetUserId],
                    messages: []
                });
            }

            chat.messages.push({
                senderId: userId,
                text,
            });

            await chat.save();
            io.to(roomId).emit("messageRecieved", {firstName, lastName, photoId, text, time});

          }catch(err) {
            console.log(err)
          }

          

        });

        socket.on("disconnect", () => {

        });
    });

};

module.exports = initializeSocket;






