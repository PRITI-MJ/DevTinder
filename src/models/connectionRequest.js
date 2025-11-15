const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        //this is the type of the userID
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        //We create an anum when we want to restrict user for some values
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{value} is incorrect status type`
        }
    }
}, {
    timestamps: true
});

const ConnectionRequest = new mongoose.model(
    "ConnectionRequest", 
     connectionRequestSchema
);

module.exports = ConnectionRequest;
