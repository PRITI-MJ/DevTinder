const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup" , async (req, res) => {

  try {
    //to enter the user details we need to follow 3 steps
  //Validation of data
  validateSignUpData(req);

  const {firstName, lastName, password, emailId} = req.body;

  //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10); //10 is the salt rounds
    console.log(passwordHash)

  //save the user in the database
  //to enter the values dynamically, directly from the postman
  //creating a new instance of the User model
  //const user = new User(req.body); (Bad practice as we are directly passing the req.body)
  const user = new User({
      firstName, 
      lastName, 
      emailId, 
      password: passwordHash
  })

  await user.save();
  res.send("User Added Successfully")
  } catch (err) {
    res.status(400).send("ERROR : " + err.message)
  }

})



authRouter.post("/login", async (req, res) => {
  try{
    const { emailId, password } = req.body;

    //checking if the user with the emailId exists or not
    const user = await User.findOne({emailId: emailId});
    if(!user) {
      throw new Error("Invalid Credientials");
    }

    //returns a boolean value
    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid) {

      //Create a JWT token 
      //DEV@Tinder$790 is the secret key which only server knows but user or browser don't know this secret key
      //so basically we are hiding this user id in the token and sending it to the user
      // const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {expiresIn: "1d"});//token will be valid for 1 day
      // console.log(token);
      const token = await user.getJWT(); //using the method created in userSchema

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token, {expires: new Date(Date.now() +1*3600000), httpOnly: true}); //1*3600000 means 1 hour, expires in 1 hour 
      //this expires is only the message sent via the token cookie
      //httpOnly means client side javascript cannot access the cookie except http server
      res.send("User logged in successfully");
    }
    else {
      throw new Error ("Invalid Credientials");
    }
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
}) 


authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  })
  res.send("Logout Successfully!!");
})




module.exports = authRouter;