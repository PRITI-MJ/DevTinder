const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        trim: true,
        //db level validation
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
          validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not a valid gender type`
        },
        // this validate function will not work on existing data
        // validate(value) {
        //     if(!["male", "female", "others"].includes(value)) {
        //         throw new Error("Gender data is not valid");
        // }
},
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        //db level validation
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL" + value);
            }
        }
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
});

//creating a user schema to get JWT token specific to the user
//we create a normal function instead of arrow function because this keyword which will point to the current user will not work in arrow function
userSchema.methods.getJWT = async function () {
    const user = this;

    //creating a jwt token valid for 1 day
    const token = await jwt.sign({_id:user._id}, "DEV@Tinder$790", {expiresIn: "1d"});
    return token;
};


//method to validate password specific to the user
userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}


module.exports = mongoose.model("User", userSchema);