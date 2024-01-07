import Stripe from 'stripe';

export default defineNuxtRouteMiddleware(async (params, to, from) => {
    if (process.client) return

    const {email, payment_intent} = params.query;

    if(!email || !payment_intent) return navigateTo('/');

    try{
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            // https://github.com/stripe/stripe-node#configuration
            apiVersion: "2023-08-16"
        });

        const charge = await stripe.paymentIntents.retrieve(payment_intent);

        if(charge.receipt_email !== email) return navigateTo('/');

    }catch(e){
        return navigateTo('/')
    }
})