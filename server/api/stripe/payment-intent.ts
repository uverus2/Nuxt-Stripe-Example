import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
   try{
       const { productID, amount, customer_name } = await readBody(event);

       const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
           // https://github.com/stripe/stripe-node#configuration
           apiVersion: "2023-08-16"
       });

       const { data } = await stripe.prices.list({
           product: productID
       });

       const paymentIntent = await stripe.paymentIntents.create({
           amount: amount as number,
           currency: data[0].currency,
           metadata: {
               infoOnCustomer: customer_name as string
           },
           automatic_payment_methods: {
               enabled: true
           }
       });

       return { secret: paymentIntent.client_secret };

   }catch(error){
       throw createError({
           statusCode: 500,
           statusMessage: (error as Error).message
       });
   }
});