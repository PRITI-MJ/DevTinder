const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
        
    },
    lastName: {
        type: String
    },
    emailId: {
       type: String,
        required: true, 
        unique: true,
        lowercase: true,
        trim: true

      
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png"
    },
    about: {
        type: String,
        default: "This is a default about of the user."
    },
    skills: {
        type: [String]
    }
})



module.exports = mongoose.model("User", userSchema);