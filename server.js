'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var expressStaticGzip = require("express-static-gzip");
const morgan = require('morgan');
const mongoose = require('mongoose');

// const cors = require('cors');
const productTypeRoutes = require('./routes/product_type.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.routes');
const stripeRoutes = require('./routes/stripe.routes');
const merchandiseRoutes = require('./routes/merchandise.routes');
const userPurchaseRoutes = require('./routes/user-purchase.routes');
const discountRoutes = require('./routes/discount.routes');
const applyDiscountRoutes = require('./routes/apply-discount.routes');
const productSearchRoutes = require('./routes/product-search.routes');
const bannerRoutes = require('./routes/banner.routes');
const productByNameRoutes = require('./routes/product-by-name.routes');
const paypalPaymentNotificationMailRoutes = require('./routes/paypalPaymentNotificationMail.routes');
const speakerRoutes = require('./routes/speakers.routes');

// ************ MongoDB Connection ************* //
mongoose.connect(`mongodb+srv://vikrant:${process.env.MONGODB_ATLAS_PW}@cluster0.lkqob.mongodb.net/webinardock?retryWrites=true&w=majority`)
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch(err => {
    console.log(err);
  });
// ********************************************** //

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
// app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/***********************CORS*******************************/

// Add headers before the routes are defined
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/**********************************************************/

/*********************API_ROUTES***************************/

app.use('/api', productTypeRoutes);
app.use('/api', adminRoutes);
app.use('/api', productRoutes);
app.use('/api', stripeRoutes);
app.use('/api', merchandiseRoutes);
app.use('/api', userPurchaseRoutes);
app.use('/api', discountRoutes);
app.use('/api', applyDiscountRoutes);
app.use('/api', productSearchRoutes);
app.use('/api', bannerRoutes);
app.use('/api', productByNameRoutes);
app.use('/api', speakerRoutes);
app.use('/api', paypalPaymentNotificationMailRoutes);

/*********************************************************/

if (process.env.NODE_ENV === 'production') {
  app.use(
    expressStaticGzip(path.join(__dirname, 'client/build'), {
    // enableBrotli: true, // only if you have brotli files too
    }),
  );

  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

/*********************STRIPE_API***************************/
// app.post('/payment', (req, res) => {
//   const body = {
//     source: req.body.token.id,
//     amount: req.body.amount,
//     currency: 'usd',
//     description: "Software development services"
//   };

//   stripe.charges.create(body, (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).send({ error: stripeErr });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   });
// });
/**********************************************************/