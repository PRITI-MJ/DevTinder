const cron = require('node-cron');
const {subDays, startOfDay, endOfDay} = require('date-fns');
const {ConnectionRequestModel} = require('../models/ConnectionRequestModel');
const sendEmail = require("./sendEmail");

cron.schedule('0 8 1 * * *', async () => {
    // send emails to all people who got requeststhe previous day

    try {

        const yesterday = subDays(new Date(), 1);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);



        const pendingRequestsOfYesterday = await ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd,

            }
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequestsOfYesterday.map(req => req.toUserId.email))]

        for(const email of listOfEmails){
            // send emails
            try {
                 const res = await sendEmail.run("New Friend Request pending for" + toEmailId, "There are so many friend requests pending, please login to the devtinderonline.cloud and accept or reject the requests");
            }catch(err){
                console.log(`Error sending email to ${email}:`, err);
            }
           
        }

    }
    catch (error) {
        console.log(error);
    }
});