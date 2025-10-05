const express = require('express');

const app = express();


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


app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params); //{userId: '707',name: 'PRITI',password: 'testing'}
    res.send({firstname : "Priti", lastname: "Mukherjee"})
})



app.listen(2501, () => {
    console.log("Server is successfully listening on port 3000");
});


