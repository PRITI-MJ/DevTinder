const express = require('express');

const app = express();


//This will match all the HTTP method API calls to /test
app.use("/test" ,(req, res) => {
    res.send("Hello from the server!");
});


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
app.get("/user", (req, res) => {
    res.send({firstname : "Priti", lastname: "Mukherjee"})
});


app.post("/user", (req, res) => {
    // logic for saving the data to DB
    res.send("Data successfully saved to the database")
})

app.delete("/user", (req, res) => {
    res.send("Deleted successfully")
})


app.listen(2501, () => {
    console.log("Server is successfully listening on port 3000");
});


