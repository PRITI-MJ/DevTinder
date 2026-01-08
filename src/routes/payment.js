const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const instance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { memberShipAmount } = require("../utils/constants");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {

    try {

        const {membershipType} = req.body;
        const {firstName, lastName, emailId} = req.user;

       const order = await instance.orders.create({
            "amount" : memberShipAmount[membershipType] * 100, // amount in the smallest currency unit,
            "currency" : "INR",
            "receipt" : "receipt#1",
            "notes" : {
                firstName,
                lastName,
                emailId,
                "membershipType" : membershipType,
            },
        })

        //Save it in my database
        console.log(order);

        const payment = new Payment({
            userId: req.user._id,
            orderId: order.id,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            notes: order.notes,
        });

        const savedPayment = await payment.save();

        //return back my order details to frontend
         res.json({...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID});
        }catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }


});

//we never use userAuth here because this is called by razorpay server not by user, and razorpay server will not have our token
paymentRouter.post("/payment/webhook", async(req, res) => {
    try {
        
    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
} )


module.exports = paymentRouter;