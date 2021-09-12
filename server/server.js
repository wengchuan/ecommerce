const express = require("express");
const app = express();
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51JP9voBriOGseYlOtp4iof3vSC3cPWyJybvxetpgZCLROwoMt7OsMUIzsSKCU3NhzPU5PArw9RU2JgNsl3d4gvH300iXkwfOje");

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return items;
};
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}); 
app.post("/create-payment-intent", async (req, res) => {
 
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "myr"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post("/create-fpx-intent", async (req, res) => {
 
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
try{
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['fpx'],
    amount: calculateOrderAmount(items),
    currency: 'myr',
  });


  res.send({
    clientSecret: paymentIntent.client_secret
  });
}catch(e){
  return res.status(400).send({
    error: {
      message: e.message,
    },
  });
}


});


app.listen(4242, () => console.log('Node server listening on port 4242!'));
