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
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        // this validate function will not work on existing data
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
        }
    }
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
    },
    //instead of manually creating createdAt and updatedAt fields, we can use timestamps option of mongoose
    // createdAt: {
    //     type: Date,
    // }
},
{
    timestamps: true,
})



module.exports = mongoose.model("User", userSchema);