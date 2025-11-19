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


//In schema method or pre function, we can't able to use arrow function
//Before we save the connectionRequest in the database, this function will be called
//this is a better way to check same userIds rather than in request.js routes
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!!")
    }
    next();
})

const ConnectionRequest = new mongoose.model(
    "ConnectionRequest", 
     connectionRequestSchema
);

module.exports = ConnectionRequest;
