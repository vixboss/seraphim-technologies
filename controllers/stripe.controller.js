require('dotenv').config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const firebase = require('../db');
// const firestore = firebase.firestore();
// const fb = require('firebase-admin');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripePayment = async(req, res, next) => {
    const currentUser = req.body.currentUser;
    const cartItems = req.body.cartItems;
    console.log(currentUser)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cartItems.map(item => {
                // const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name+' ('+ item.mode +')',
                        },
                        unit_amount: item.price * 100,
                        
                    },
                    quantity: item.quantity,
                }
            }),
            customer_email: currentUser.email,
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
    // console.log(event.data.object);
    const billing_details = event.data.object.charges.data[0].billing_details;
    const email = billing_details.email;
    const name = billing_details.name;
    const address = billing_details.address;
    const receipt = event.data.object.charges.data[0].receipt_url;

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

const checkoutCompletedSuccessful = async (req, res, next) => {
    const event = req.body;

    if(event.type === 'checkout.session.completed'){

        // In "checkout.session.completed" event handler, get the ID of the Checkout Session
        const id = event.data.object.id; // "cs_xxx"

        // Retrieve the Checkout Session with expand
        const session = await stripe.checkout.sessions.retrieve(id, {
            expand: [ "line_items" ]
        });
    
        // Get the customer email
        const email = event.data.object.customer_email;
    
        // Get the Items
        const items = session.line_items;
    
        // To save customer products
        await savePurchasedProduct(email, items);
    }
}

const savePurchasedProduct = async(email, items) => {
    // try{
    //     const customerEmail = email;
    //     const customerItems = items;
    //     const collectionRef = await firestore.collection('user_purchased');
    //     var flag = false;
    //     await collectionRef.get().then(snapshot =>{
    //         const collectionsMap = snapshot.docs.map(docSnapshot => {
    //             const { email } = docSnapshot.data();
    //             const  id  = docSnapshot.id;

    //             if(email === customerEmail){
    //                 flag = true;
    //                 collectionRef.doc(id).update({
    //                     items: fb.firestore.FieldValue.arrayUnion({
    //                         ...customerItems.data, 
    //                         status: 'Active',
    //                         date: new Date(),
    //                     })
    //                 });
    //             }
    //         });

    //         if(!flag){
    //             collectionRef.doc().set({
    //                 email: customerEmail,
    //                 items: [{
    //                     ...customerItems.data, 
    //                     date: new Date(),
    //                 }]
                    
    //             });
    //         }
    //     });
    // } catch(error) {
    //     console.error(error.message);
    // }
}

module.exports = {
    stripePayment,
    stripePaymentSuccessful,
    checkoutCompletedSuccessful
}