import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        // https://github.com/stripe/stripe-node#configuration
        apiVersion: "2023-08-16"
    });

    const charge = await stripe.paymentIntents.retrieve(
        'pi_3O1F60GpfaJ9wUkz0SAM2jMB'
    );

    return {
        charge
    }
});