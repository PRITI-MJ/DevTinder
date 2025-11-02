const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Please provide the required fields");
    }
    else if(firstName.length < 3 || firstName.length > 30) {
        throw new Error("First name must be between 3 and 30 characters");
    }

     else if(lastName.length < 4 || lastName.length > 30) {
        throw new Error("First name must be between 4 and 30 characters");
    }

    else if(!validator.isEmail(emailId)) {
        throw new error("Please provide a valid email address");
    }

    else if(!validator.isStrongPassword(password)) {
        throw new Error("Please provide a strong password");    
    }

}