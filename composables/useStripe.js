import {loadStripe} from "@stripe/stripe-js";

export function useStripe () {
    const loading = ref(true),
          config = useRuntimeConfig();

    let stripe = null,
        elements = null;

    const checkElements = () => !stripe || !elements;

    onMounted(async () => {
        stripe = await loadStripe(config.public.STRIPE_KEY);

        elements = stripe?.elements({
            mode: "payment",
            amount: 2000, //you can use elements.update() to update the amount
            currency: "gbp"
        });

        const paymentElement = elements.create("payment");
        paymentElement.mount("#payment-element");

        loading.value = false;
    });

    const updateAmount = async donation => {
        try{
            await elements.update({
                amount: donation * 100
            })
        }catch(e){
            throw new Error("Something with wrong the amount!");
        }
    }

    const getPaymentIntent = async (amount, name) => {
       try{
           const {data: response} = await useFetch('/api/stripe/payment-intent', {
               method: "POST",
               body: {
                   productID: config.public.STRIPE_PRODUCT_ID,
                   amount: amount * 100,
                   customer_name: name
               }
           });

           return response;
       }catch(e){
           throw new Error("Payment Intent could be not be submitted!");
       }
    }

    const submitElements = async () => {
        try{
            const { submitError } = await elements.submit();

            return { submitError };
        }catch(e){
            throw new Error("Stripe Elements could not be submitted!");
        }
    }

    const triggerPayment = async (clientSecret, data) => {
        const {
            name,
            email,
            address,
            city,
            county,
            postcode,
        } = data;

        console.log(elements);
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                receipt_email: email,
                payment_method_data: {
                    billing_details: {
                        address: {
                            city: city,
                            line1: address,
                            state: county,
                            postal_code: postcode,
                            country: "GB"
                        },
                        email: email,
                        name: name
                    }
                },
                shipping: {
                    address: {
                        city: city,
                        line1: address,
                        state: county,
                        postal_code: postcode,
                        country: "GB"
                    },
                    name: name
                },
                return_url: config.public.STRIPE_REDIRECT_URL + "?email=" + email
            }
            // Uncomment below if you only want redirect for redirect-based payments
            // redirect: "if_required",
        });

        return { error };
    }

    return { loading, checkElements, updateAmount, getPaymentIntent, triggerPayment, submitElements }
}