const nodemailer = require('nodemailer');
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = async (req,res,next,url)=>{
    const transport = nodemailer.createTransport(
        {
            service : "gmail",
            host : "smtp.gmail.com",
            port : 465,
            auth : {
                user: process.env.MAIL_EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            },
        }
    );

    const mailOptions = {
        from : "rahulwarkade954@gmail.com",
        to : req.body.email,
        subject : "Password Reset Link",
        html : `<h1>Your one time password for forget password.</h1>
        <h2>${url}</h2>`,
    }

    transport.sendMail(mailOptions,(err,info)=>{
        if(err) return next(new ErrorHandler(err,500))
    }); 
    return res.status(200).json({message : "mail has been sent successfully!!",url})
} 