const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User = require("../models/user");


const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"];


//Get all the pending connection requests of the loggedIn user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
try{
    const loggedInUser = req.user;

    //findOne we use when we have to find only one user data
    //find we use when we have to find all the users data
    const connectionRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested"
    }).populate("fromUserId", USER_SAFE_DATA)
    //.populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"]);
     //here firstName and lastName are the filters which we are applying to the fromUserId
     //so that instead of extracting all the values of the fromUserId(includes email, password,etc.), it will only extract firstName and lastName
     //we can also use strings instead of array
     //.populate("fromUserId", "firstName lastName");

    res.status(200).json({
        message: "Data fetched successfully!!",
        data: connectionRequests
    
    })

}
catch(err) {
    res.status(400).send("ERROR: " + err.message)
}
})


userRouter.get("/user/connections", userAuth, async(req, res) => {
    try {
        //priti => Hrithik => accepted
        //Hrithik => Elon => accepted
        //collecting all the requests which is in accepted state for the loggedIn user
        //loggedIn user can be either fromUserId or toUserId
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)


        const data = connectionRequests.map((row)=> {
            if(row.fromUserId.equals(loggedInUser._id)){
                return row.toUserId;
        }
          return row.fromUserId;
    
    })

        res.json({data});

    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message)
    }
})


userRouter.get("/feed", userAuth, async(req, res) => {
    try{
        //things what should be there and should not be there in the feed of loggedIn user
        //1. loggedIn user should not see his own profile in the feed
        //2. loggedIn user should not see the profiles of the users who are already connected with him
        //3. loggedIn user should not see the profiles of the users whose connection request is pending with him (both sent and recieved)
        //4. loggedIn user should not see the profile whom he has ignored as well as the profiles who has ignored him
         
        const loggedInUser = req.user;

        //pagination
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit; //max limit is 50

        const skip = (page - 1) * limit;


        //find all the connections (send + recieved)
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser},
                {fromUserId: loggedInUser}
            ]
        }).select("fromUserId toUserId")
         

        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })

        // console.log(hideUserFromFeed);

        const feedUsers = await User.find({
        $and: [
           {_id : {$nin: Array.from(hideUserFromFeed)}},
           {_id : {$nin: loggedInUser._id}},
        ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.json({data: feedUsers});
    } 
    catch(err) {
        res.status(400).send("ERROR: " + err.message)
    }
})


module.exports = userRouter;