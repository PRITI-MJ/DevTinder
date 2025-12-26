const mongoose = require("mongoose");

//not a good practice
// mongoose.connect("mongodb+srv://namastedev:Brnvm4ZQzuMDGfhw@namastenode.osae2ha.mongodb.net/")

//correct way is to wrap it inside a async function
const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://namastedev:Brnvm4ZQzuMDGfhw@namastenode.osae2ha.mongodb.net/devTinder"
    )
}

module.exports =  connectDB;

