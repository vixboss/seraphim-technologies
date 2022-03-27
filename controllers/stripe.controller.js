require('dotenv').config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn react Today"}],
    [2, { priceInCents: 20000, name: "Learn CSS Today"}]
]);

const stripePayment = async(req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.map(item => {
                // const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name+' ('+ item.mode +')',
                        },
                        unit_amount: item.price * 100

                    },
                    quantity: item.quantity
                }
            }),
            success_url:"https://webinardock.com/shop",
            cancel_url: "https://webinardock.com/checkout"
       }); 
       res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(400).send(error);
    }
}

function mail(email, receipt) {
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
}

const stripePaymentSuccessful = (req, res, next) => {
    const event = req.body;
    const billing_details = event.data.object.charges.data[0].billing_details;
    const email = billing_details.email;
    const name = billing_details.name;
    const address = billing_details.address;
    const receipt = event.data.object.charges.data[0].receipt_url;
    console.log(receipt);

    // On payment goes success.

    switch(event.type){
        case 'payment_intent.succeeded': {
            // const email = event['data']['object']['receipt_email'];
            mail(email, receipt);
            console.log(`Payment Intent was successful for ${email}!`);
            break;
        }
        default: 
            return res.status(400).end();
    }
    res.status(200).json({received: true});
}

module.exports = {
    stripePayment,
    stripePaymentSuccessful
}