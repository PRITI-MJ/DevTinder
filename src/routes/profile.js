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
    catch(err){
      res.status(400).send("ERROR: " + err.message);
    }

})

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
  try{
    if(!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!!")
    }

    const loggedInuser = req.user;
    console.log(loggedInuser);

  } catch(err) {
    res.status(400).send("ERROR: " + err.message)
  }
} )


module.exports = profileRouter;