const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const instance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { memberShipAmount } = require("../utils/constants");
const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

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
        const webhookSignature = req.get["x-razorpay-signature"];
        validateWebhookSignature(
            JSON.stringify(req.body),
            webhookSignature,
            process.env.RAZORPAY_WEBHOOK_SECRET
        );

        if(!isWebhookValid) {
            return res.status(400).json({msg: "Invalid webhook signature"});
        }

        // Update the payment status in DB
        const paymentDetails = req.body.payload.payment.entity;

        const payment = await Payment.findOne({orderId: paymentDetails.order_id});
        payment.status = paymentDetails.status;
        await payment.save();

        const user = await User.findOne({_id: payment.userId});
        user.isPremium = true;
        user.memberShipType = paymentDetails.notes.membershipType;
        await user.save();

        // Update the user as premium


        // return success response to razorpay

        // if(req.body.event === "payment.captured") {

        // }
        // if(req.body.event === "payment.failed") {
            
        // }

        //return success response to razorpay
        return res.status(200).json({msg: "Webhook received successfully"});
    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});


module.exports = paymentRouter;