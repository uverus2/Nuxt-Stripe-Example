// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    ENDPOINT_SECRET: process.env.ENDPOINT_SECRET,
    AWS_SDK_ACCESS_KEY: process.env.AWS_SDK_ACCESS_KEY,
    AWS_SDK_SECRET_KEY: process.env.AWS_SDK_SECRET_KEY,
    MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
    MAIL_DRIVER: process.env.MAIL_DRIVER,
    public: {
      STRIPE_KEY: process.env.STRIPE_KEY,
      STRIPE_PRODUCT_ID: process.env.STRIPE_PRODUCT_ID,
      STRIPE_REDIRECT_URL: process.env.STRIPE_REDIRECT_URL
    }
  },
  app: {
    head: {
      titleTemplate: '%s - Donation Page',
    }
  },
})
