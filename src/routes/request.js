
const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const User = require("../models/user");


const ConnectionRequest = require("../models/connectionRequest");

const sendEmail = require("../utils/sendEmail");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  //here userAuth is applicable for logged in User
 try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;


    //no status should be allowed except ignored and interested
    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)) {
      return res.status(400).json({message: "Invalid status type:" + status})
    }

    //checking whether toUserId is present or not
    const toUser = await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({
          message: "User not found",
        })
      }


    // Prevent sending connection request to yourself
      // if (String(fromUserId) === String(toUserId)) {
      //   return res.status(400).send({ message: "You cannot send a request to yourself." });
      // }

    //IF there is an existing ConnectionRequest. these two things should not be there:-
    //1. the fromUserId should not send same request to toUserId more than 1 time.(duplicate connection request)
    //2. the toUserId should not send the connection request to the same fromUserId
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
          {fromUserId, toUserId},
          { fromUserId: toUserId, toUserId: fromUserId}

        ]
    })

    if(existingConnectionRequest) {
      return res.status(400).send({message: "Connection Request Already Exists!!"})
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId, 
      toUserId, 
      status
    });

const data = await connectionRequest.save();


    const emailResponse = await sendEmail.run("A new friend rquest from " + req.user.firstName,
      `${req.user.firstName} ${status} ${toUser.firstName}`);
    // console.log(emailResponse);
    

res.json({
  message: `${req.user.firstName} ${status} ${toUser.firstName}`,
  data,
});

 }catch(err){
    res.status(400).send("ERROR: " + err.message);
 }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
     const loggedInUser = req.user;
     const {status, requestId} = req.params;


      //validate the status
     const allowedStatus = ["accepted", "rejected"];
     if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message: "Status not allowed!"
      })
     }

     //Priti was sending request to Hrithik.
     //checking if Hrithik(toUserId) is logged in or not.
     //status should be in interested state, ignored ones can't be accepted.
     //request Id should be valid
     const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
     });
     if(!connectionRequest) {
      return res.status(400).json({message: "Connection request not found!!"})
     }

     connectionRequest.status = status;

     const data = await connectionRequest.save();

     res.json({
      message: "Connection request " + status,
      data
     })


  }catch(err){
    console.log(err);
  }
})

module.exports = requestRouter;