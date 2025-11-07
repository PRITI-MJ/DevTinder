// const express = require('express');

// const app = express();


//This will match all the HTTP method API calls to /test
// app.use("/test" ,(req, res) => {
//     res.send("Hello from the server!");
// });


// app.use("/hello/2", (req, res) => {
//     res.send("abrakadabra");
// })

// app.use("/hello", (req, res) => {
//     res.send("Hello hello hello");
// })

// app.use("/", (req, res) => {
//     res.send("Namaste from the dashboard!");
// })


//This will only handle GET call to /user
// app.get("/user", (req, res) => {
//     res.send({firstname : "Priti", lastname: "Mukherjee"})
// });


// app.post("/user", (req, res) => {
//     // logic for saving the data to DB
//     res.send("Data successfully saved to the database")
// })

// app.delete("/user", (req, res) => {
//     res.send("Deleted successfully")
// })


//advance routing techniques
//as we have put ? after b, it become optional, it will work for /abc and /ac also
// app.get("/ab?c", (req, res) => {
//      res.send({firstname : "Priti", lastname: "Mukherjee"})
//  });

 //as we have put + after b, we can put as many b as possible, it will work for /abc, /abbbbccc, /abbc, etc
//  app.get("/ab+c", (req, res) => {
//     res.send({firstname : "Priti", lastname: "Mukherjee"})
// })

//here we can put anything in between ab and cd, it will work
// app.get("/ab*cd", (req, res) => {
//      res.send({firstname : "Priti", lastname: "Mukherjee"})
//  });

 //grouping the things for optional, /ad, /abcd (here bc together become optional)
// app.get("/a(bc)?d", (req, res) => {
//      res.send({firstname : "Priti", lastname: "Mukherjee"})
//  });

  //grouping the things for repeatable, /abcd, /abcbcbcbcd (here bc together become optional)
// app.get("/a(bc)+d", (req, res) => {
//      res.send({firstname : "Priti", lastname: "Mukherjee"})
//  });

 //we are giving rejex instead of string, it means anything comes which contains a in it, it will work
// app.get(/a/, (req, res) => {
//     res.send({firstname : "Priti", lastname: "Mukherjee"})
// })


//here ab should write together, then only it will work
// app.get(/ab/, (req, res) => {
//     res.send({firstname : "Priti", lastname: "Mukherjee"})
// })

//complex rejex 
//here anything that will end with fly, it will work
// app.get(/.*fly$/, (req, res) => {
//     res.send({firstname : "Priti", lastname: "Mukherjee"})
// })


//if we want to print the user params from the postman or browser
// app.get("/user", (req, res) => {
//     console.log(req.query); //{ userID: '101', password: 'testing' }
//     res.send({firstname : "Priti", lastname: "Mukherjee"})
// })


//how to make it dynamic by using colon(:)
// app.get("/user/:userId", (req, res) => {
//     console.log(req.params); //{ userId: '707' }
//     res.send({firstname : "Priti", lastname: "Mukherjee"})
// })


// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params); //{userId: '707',name: 'PRITI',password: 'testing'}
//     res.send({firstname : "Priti", lastname: "Mukherjee"})
// })


// app.use("/user", (req, res) => {
//     //Route Handler (If no response send from the server, the postman will go on infinite loop)
//     //res.send("Route Handler 1")
//     console.log("Handling the route user!!") 
// })


//it will return from 1st response, it will not go the 2nd response
// if 1st response will not there, it will not go to 2nd response, it will again be in infinte loop
// app.use("/user", (req, res) => {
//     //Route handler 1
//     console.log("Handling the route user!")
//     //res.send("Route handler 1")
// }, 
// (req, res) => {
//     //route handler 2
//     console.log("Handling the route user 2!")
//     res.send("2nd response!!")
// }
// )


//here, we are using next() parameter, so if there is no response in the 1st it will automatically go to the 2nd one and send the 2nd response
//but if there is response in the 1st one and we are applying next(), it will send the 1st response, but then it will throw some error
// app.use("/user", (req, res, next) => {
//     Route handler 1
//     console.log("Handling the route user!")
//     //res.send("Route handler 1");
//     next();
// }, 
// (req, res) => {
//     //route handler 2
//     console.log("Handling the route user 2!")
//     res.send("2nd response!!")
// }
// )


//if we write the response after next(), then it will 1st go to the 2nd response,send it
//after that it will see the 1st reponse, and throw error
// if we write next() after the 2nd route, but do not send any response, postman will throw error as "cannot get /user"
// app.use("/user", (req, res, next) => {
//     //Route handler 1
//     console.log("Handling the route user!")
//     next();
//     res.send("Route handler 1");
// }, 
// (req, res) => {
//     //route handler 2
//     console.log("Handling the route user 2!")
//     res.send("2nd response!!")
//     next();
// }
// )


//we can also put this route handlers in an array
//app.use("/route", rH1, [rH2, rH3], rH4, rH5)
//app.use("/route", [rH1, rH2, rH3, rH4, rH5])



//GET /users => It checks all the app.xxx("matching route") functions => (middleware chains)
// this are called middleware because it will come between the method chain
// app.get("/", (req, res, next) => {
//     //res.send("Handling / route");
//     next();
// })

// app.get("/user", (req, res, next) => {
//     console.log("Handling /user route");
//     next();
// },
// (req, res, next) => {
//     next();
// },
// (req, res, next) => {
//     res.send("2nd route handler")
// }
// )

// const { adminAuth, userAuth } = require("./middlewares/auth")

// app.use("admin", adminAuth)


// //as there are only one , we can directly use userAuth over here

// //so here we don't need userAuth for login, so we can handle it that way
// app.get("/user/login", (req, res) => {
//   res.send("User logged in successfully");
// })

// app.get("/user/data", userAuth, (req, res) => {
//   res.send("User data sent");
// })


// app.get("/admin/getAllData", (req, res) => {
//   res.send("All data sent")
//   })

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("Deleted a user")
// })

// app.get("/getUserData", (req, res) => {
//   //Logic of DB calla nd get user data

//   //so this error will show the code data where it is getting error, which is not feasible
//   // so for this we need handle error gracefully
//   throw new Error("ffrrfrtg");
//   res.send("User Data sent")
// })




// app.get("/getUserData", (req, res) => {
  //Logic of DB call and get user data

  // so for this we need handle error gracefully
  // we can also use try catch block
//   try{
//     throw new Error("ffrrfrtg");
//      res.send("User Data sent")
//   }catch(err) {
//     res.status(500).send("Some error occur contact support team")
//   }

// })



// we should always use try catch block
// but still we should write it at the end to handle the errors
// Handling error 
// we should always write it at the end
// app.use("/", (err, req, res, next) => {
//   if(err) {
    //logic to log the error
//     res.status(500).send("something went wrong")
//   }
// })


const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const { userAuth } = require('./middlewares/auth');

//as the browser can't understand the json which was sent by postman, 
//for this we need a middleware(here express has its own middleware)
app.use(express.json());

 //to read the cookie, we use a middleware from express package called cookie-parser
app.use(cookieParser())

app.post("/signup" , async (req, res) => {

  //console.log(req.body)

  //hardcoded
  //  const user = new User({
  //   firstName: "MS",
  //   lastName: "Dhoni",
  //   emailId: "MSDhoni@abc.com",
  //   password: "MSDONI123",
  //   // _id: "324444446066606063457899"
  // });

  try {
    //to enter the user details we need to follow 3 steps
  //Validation of data
  validateSignUpData(req);

  const {firstName, lastName, password, emailId} = req.body;

  //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10); //10 is the salt rounds
    //Salt rounds means how many times we want to encrypt the password
    //Salt is random data that is used as an additional input to a one-way function that "hashes" a password or passphrase
    //eg:- [password = Priti@123, salt = randomdata] => hash function => encrypted password]
    //more the salt rounds, more secure the password will be, but it will take more time to encrypt
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



app.post("/login", async (req, res) => {
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



app.get("/profile", userAuth, async (req, res) => { 
  try
    {
    //const cookie = req.cookies;
    //console.log(cookie);
    //to read the cookie, we use a middleware from express package called cookie-parser
    //we use this SECRET_KEY to validate the token
    //const {token} = cookie;
    
    // if(!token) {
    //   throw new Error("Invalid Token");
    // }

    //validate the token 
    //const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");

    //console.log(decodedMessage); //{_id: '643f1c3e2f1b2c001f7e4d3a', iat: 1682049283} => user id is hidden in the token
    //const {_id} = decodedMessage;
    //console.log("logged in user id is: "+ _id);

    //const user = await User.findById(_id);
    const user = req.user; //coming from the userAuth middleware
    // if(!user) {
    //   throw new Error("User does not exist");
    // }
      res.send(user) 
    }
    catch(err){
      res.status(400).send("ERROR: " + err.message);
    }

})


app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  //sending a connection request
  console.log("sending a connection request");

  res.send(user.firstName + " Send the Connection Request!!!");
})




//Find user by email
// app.get("/user", async (req,res) => {
//   const userEmail = req.body.emailId;

//   try{
//     //finding one user out of two(if two persons have email id) => first one
//     //const user = await User.findOne({emailId: userEmail})
//     //res.send(user)

//     const user = await User.findOne({emailId: userEmail})
//     if(user.length === 0){
//       res.status(404).send("User not Found!")
//     } else{
//     res.send(user);
//     }
//   }
//   catch(err) {
//     res.status(400).send("Something went wrong")
//   }
 
// })





//Now when we signed up, we want to show the data
//Feed API - GET /feed -  get all the users from the database
// app.get("/feed", async (req, res) => {

//   try{
//     const user = await User.find({});
//     res.send(user);

//   }catch(err){
//     res.status(400).send("Something went wrong")
//   }
  
// })





//delete a user using userId from the database
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;

//   try{
//     //const user = User.findByIdAndDelete({_id: userId});
//     const user = await User.findByIdAndDelete(userId); //both are same
//     res.send("User deleted successfully!!");
//   }
//   catch(err){
//     res.status(400).send("Something went wrong!!")
//   }

// })





//Update data of the user
// app.patch("/user/:userId", async (req, res) => {
//   //const userId = req.body.userId;
//   //fetching userId from the params
//   const userId = req.params?.userId;
//   const data = req.body;



//   try{
//     //API level validation (eg: if we want to restrict emailId updation)
//   const ALLOWED_UPDATES = ["password", "photoUrl", "about", "gender", "age", "skills"];

//   const isUpdateAllowed = Object.keys(data).every((k) => {
//     return ALLOWED_UPDATES.includes(k);
//   });
//   if(!isUpdateAllowed) {
//     throw new Error("Update not allowed");
//   }
//   if(data?.skills.length > 10) {
//     throw new Error("Skills cannot be more than 10");
//   }

//   const user = await User.findByIdAndUpdate({_id: userId},  data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("User updated successfully!!")
//   }
//   catch(err){
//     res.status(400).send("UPDATE FAILED: " + err.message)
//   }
// })



//updating the data using options
//returning the document before => database will return the data before updating
//returning the document after => database will return the data after updating (current updated data)
//By default it is before only
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try{
//     const user = await User.findByIdAndUpdate({_id: userId},  data, {returnDocument: "before"});
//     console.log(user);
//     res.send("User updated successfully!!")
//   }
//   catch(err){
//     res.status(400).send("Something went wrong!!")
//   }
// })





//we should first connect to database and then start listening to api calls
connectDB()
.then(() => {
    console.log("Database connection established....");
    app.listen(2501, () => {
    console.log("Server is successfully listening on port 2501");
});

})
.catch(err=>{
    console.error("Database cannot be connected!!")
})





