console.log("Cronjob file loaded");
const cron = require('node-cron');
const {subDays, startOfDay, endOfDay} = require('date-fns');
const ConnectionRequest = require('../models/connectionRequest');
const sendEmail = require("./sendEmail");

cron.schedule('13 00 * * *', async () => {
    // send emails to all people who got requeststhe previous day

    try {

        const yesterday = subDays(new Date(), 1);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);



        const pendingRequestsOfYesterday = await ConnectionRequest.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd,

            }
        }).populate("fromUserId toUserId");

        const listOfEmails = [
            ...new Set(pendingRequestsOfYesterday.map((req) => req.toUserId?.emailId))
        ];

        console.log(listOfEmails)

        for(const email of listOfEmails){
            // send emails
            try {
                 const res = await sendEmail.run("New Friend Request pending for " + email, "There are so many friend requests pending, please login to the devtinderonline.cloud and accept or reject the requests");
                 console.log(res)
            }catch(err){
                console.log(`Error sending email to ${email}:`, err);
            }
           
        }

    }
    catch (error) {
        console.log(error);
    }
});