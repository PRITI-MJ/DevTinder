const socket= require("socket.io");
const server = require("../app"); //importing the server instance from app.js
const crypto = require("crypto");

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
        socket.on("joinChat", ({firstName, userId, targetUserId}) => {
            const roomId = getSecretRoomId(userId, targetUserId); //generate a unique room ID based on user IDs

            console.log(firstName+ " Joined Room: ", roomId);
            socket.join(roomId);
        });

        socket.on("sendMessage", ({
        firstName, photoId, userId, targetUserId, text, time}) => {
          const roomId = getSecretRoomId(userId, targetUserId); //generate a unique room ID based on user IDs

            io.to(roomId).emit("messageRecieved", {firstName, photoId, text, time})

        });

        socket.on("disconnect", () => {

        });
    });

};

module.exports = initializeSocket;






