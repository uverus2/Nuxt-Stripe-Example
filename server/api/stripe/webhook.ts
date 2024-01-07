import Stripe from 'stripe';
import {useEmailDriver} from "~/server/utils/useEmailDriver";


export default defineEventHandler(async event => {
    try{
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
                apiVersion: "2023-08-16"
            }),
            headers = event.node.req.headers,
            body = await readRawBody(event),
            sig = headers["stripe-signature"];

       const hookEvent = stripe.webhooks.constructEvent(
            body as string,
            sig as string,
            process.env.ENDPOINT_SECRET as string
        );

        switch (hookEvent.type) {
            case "charge.succeeded":
                // @ts-ignore
                const chargeSucceeded = hookEvent.data.object,
                      templateName = "receipt",
                      templateData = {
                          toEmail: "test_mail@gmail.com", //chargeSucceeded?.billing_details?.email - Check - https://stripe.com/docs/api/charges/object
                          first_name: "Name", //chargeSucceeded?.billing_details?.name - Check - https://stripe.com/docs/api/charges/object
                          charge_id: chargeSucceeded?.id || "",
                          paymentIntent: chargeSucceeded?.payment_intent || "",
                          receipt_email: chargeSucceeded.receipt_email || ""
                    };

                const execute = useEmailDriver();
                await execute(templateName, templateData);

                break;
            default:
                return false;
        }
    }catch(e){
        console.log(e);
        throw createError({ statusCode: 400, message: (e as Error).message });
    }
});