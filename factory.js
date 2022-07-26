const nodemailer = require('nodemailer');
module.exports = {
    mail: function (email, receipt) {
        var transporter = nodemailer.createTransport({
            host : process.env.ADMIN_HOST,
            port: process.env.ADMIN_PORT,
            secure: true,
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });
    
        var mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email, 
            subject:'Webinar Dock Product Purchase.',
            text:`Thanks for the Purchase of product.`,
            html:`
                <form>
                    <p>
                        Thanks for the Purchase of product. Please get your receipt by clicking link below.
                        <br><br>
                        Thank You 
                        <br>
                        Webinar Dock Team.
                    </p>
                    <a href=${receipt}>Get Your Receipt!</a>
                </form>`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
            }
            else{
                console.log('Email Sent: '+ info.response);
            }
        });
    },

    notificationMail: function (email, data) {
        var transporter = nodemailer.createTransport({
            host : process.env.ADMIN_HOST,
            port: process.env.ADMIN_PORT,
            secure: true,
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });
    
        var mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email, 
            subject:`Product Puchase on ${new Date()}`,
            text:`${data.name} has purchased the Product.`,
            html:`
                <form>
                    <br>
                    <p>
                        <strong>Mr. ${data.name}</strong> has purchased the product of <strong>$${data.price}</strong>.
                        <br>
                        On ${new Date()} his Email ID is ${data.email}.
                        <br>
                        Please check Admin Dashboard for more detail.
                        <br>
                        Thank You.
                        <br>
                        <strong>WebinarDock Admin</strong>
                    </p>
                </form>`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
            }
            else{
                console.log('Email Sent: '+ info.response);
            }
        });
    }
}