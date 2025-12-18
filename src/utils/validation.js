const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Please provide the required fields");
    }
    else if(firstName.length < 3 || firstName.length > 30) {
        throw new Error("First name must be between 3 and 30 characters");
    }

     else if(lastName.length < 3 || lastName.length > 30) {
        throw new Error("Last name must be between 3 and 30 characters");
    }

    else if(!validator.isEmail(emailId)) {
        throw new error("Please provide a valid email address");
    }

    else if(!validator.isStrongPassword(password)) {
        throw new Error("Please provide a strong password");    
    }

}


const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "password", "age", "photoUrl", "about", "gender", "skills"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
}