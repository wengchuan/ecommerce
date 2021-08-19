const stripe = require('stripe')('sk_test_51JP9voBriOGseYlOtp4iof3vSC3cPWyJybvxetpgZCLROwoMt7OsMUIzsSKCU3NhzPU5PArw9RU2JgNsl3d4gvH300iXkwfOje');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000/';

app.post('/create-checkout-session', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const session = await stripe.checkout.sessions.create({
    payment_method_types: [
      'card',
    ],
    line_items: [
      {
        // TODO: replace this with the `price` of the product you want to sell
        name :'product',
        currency :'myr',
        amount:2000,
        quantity: 1,
   
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url)
});

app.listen(4242, () => console.log('Running on port 4242'));