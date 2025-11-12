const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        //this is the type of the userID
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        //We create an anum when we want to restrict user for some values
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{value} is incorrect status type`
        }
    }
})