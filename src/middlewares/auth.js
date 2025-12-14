 // Handle Auth Middleware for all requests GET, POST, DELETE
// const adminAuth = (req, res, next) => {
//   console.log("Admin auth is getting checked!!");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if(!isAdminAuthorized){
//     res.status(401).send("Unauthorized request");
//   }else{
//     next();
//   }
// }

// const userAuth = (req, res, next) => {
//   console.log("User auth is getting checked!!");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if(!isAdminAuthorized){
//     res.status(401).send("Unauthorized request");
//   }else{
//     next();
//   }
// }

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { find } = require('../models/user');

const userAuth = async (req, res, next) => {
  try{
     //Read the token from the req cookies
    const cookies = req.cookies;
    const {token} = cookies;

  if(!token){
    return res.status(401).send("Please Login!");
  }

    //Validate the token
    const decodedObj = jwt.verify(token, "DEV@Tinder$790")

    const {_id} = decodedObj;

    //find the user from the database
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User not found");
  }

  //attach the user object to the req object
  //so that we can access the user from the req object in the route handler
  req.user = user;
     next();
  }
  catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
}


module.exports = {
    //adminAuth,
    userAuth,
}