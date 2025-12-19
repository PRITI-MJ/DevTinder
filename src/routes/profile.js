const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require('../middlewares/auth');
const {validateEditProfileData} = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async (req, res) => { 
  try
    {
      const user = req.user; //coming from the userAuth middleware
      res.send(user) 
    }
    catch(error){
      res.status(400).send("ERROR: " + error.message);
    }

})

profileRouter.patch("/profile/edit",  userAuth, async(req, res) => {
  try{
    if(!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!!")
    }

    const loggedInuser = req.user;
    // console.log(loggedInuser);
    
    //loggedInuser.firstName = req.body.firstName;
    Object.keys(req.body).forEach((key) => loggedInuser[key] = req.body[key])

    //to save this update in the db
    await loggedInuser.save();


    //res.send(`${loggedInuser.firstName}, Your profile updated successfully!!`)
    res.json({
      message: `${loggedInuser.firstName}, Your profile updated successfully!!`,
      data: loggedInuser,
      });

    // console.log(loggedInuser);

  } catch(err) {
    res.status(400).send("ERROR: " + err.message)
  }
} )


module.exports = profileRouter;