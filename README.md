# Simple Nuxt JS and Stipe donation page

**Disclaimer** - This is a simple project with the idea of trying Stripe Simple checkout. There could be a better way to achieve the desired effect.

You can view the project on Netlify [here](https://fascinating-pastelito-ed73c2.netlify.app/).
P.S - I am not a designer.

## Start the project

Install via **npm** or **yarn**.
- ```npm install```

Create a **.env** file and copy the contents from **example-env**.

Generate your keys. 

Run the code in dev 
- ```npm run dev```

For all the other commands [see](https://nuxt.com/docs/api/commands/add).

## Required Keys

- Stripe API Keys
  - You can acquire them here [following](https://stripe.com/docs/keys).
  - It is quite easy to do, create a stripe accound and using the strip dashboard navigate to "Developers" and then "API Keys".
- AWS SES Keys 
    - You will need to create a free Amazon AWS account.
    - Find more info about the keys [here](https://docs.aws.amazon.com/ses/latest/dg/send-email-concepts-credentials.html).

## Webhook Set Up

If you wish to use the webhook and the email sending you are required to register a webhook in Stripe config panel. More information [here](https://stripe.com/docs/webhooks?locale=en-GB).

Stripe API [docs](https://stripe.com/docs/api/events) for available events.

Webhook API docs [here](https://stripe.com/docs/api/webhook_endpoints).

For local testing have a look at the Stripe CLI [here](https://stripe.com/docs/cli).

Docker set up was very [straightforward](https://stripe.com/docs/cli/docker).

## Mail Driver

The code is configured to work with "SES" and "mailtrap" based on the "MAIL_DRIVER" env option. 

You are required to generate keys for each if you wish to use it. 

To add a new driver for sending emails:
- Add the option in "useEmailDriver.ts" 
- Create a service in "services" directory
- Implement your logic for sending the emails.

## Stripe CLI Commands with Docker

First ensure the HOST and NUXT_HOST are configured to "0.0.0.0" in your ENV file.

The below commands are also using port 3000 so if you are using a different port make sure you change it below as well.

You can achieve the WebHook events in 2 differen ways:
**(Replace API_KEY with your API Key)**

Create a container and listen to events:
- First run: ```docker run --rm -it --add-host host.docker.internal:host-gateway stripe/stripe-cli listen --forward-to http://host.docker.internal:3000/api/stripe/webhook --api-key {API_KEY}```
- You can then trigger events like so: ```docker run --rm -it stripe/stripe-cli trigger payment_intent.created --api-key {API_KEY}```

Alternatively,

You can create a docker image and trigger events on the instance of the image:
- First run: ```docker run --rm -it  --add-host host.docker.internal:host-gateway stripe/stripe-cli listen --api-key {API_KEY}```
- Go into the image (Exec code in it)
- Trigger events like so: ```stripe trigger charge.captured```


