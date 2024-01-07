<script setup>
import {useForm} from 'vee-validate';
import {useStripe} from "~/composables/useStripe.js";
import InputContainer from "~/components/InputContainer.vue";

//Schemas
import validationSchema from "@/validation/payment-form";
import TheSubmitButton from "~/components/TheSubmitButton.vue";
import TheDonationCheckBox from "~/components/TheDonationCheckBox.vue";

const changeAmount = ref(false),
    amount = ref(20),
    { loading, checkElements, updateAmount, getPaymentIntent, triggerPayment, submitElements } = useStripe(),
    { handleSubmit, defineInputBinds, setFieldValue } = useForm(validationSchema);

const donation = defineInputBinds('donation');
const toggleChangeAmount = value => changeAmount.value = value;
watch(changeAmount, value => {
  if(value){
    setFieldValue('donation', 20);
  }
})

const submitForm = handleSubmit(async values => {
  if(loading.value) return;
  if (checkElements()) return;

  loading.value = true;

  const { name, donation } = values;

  try{
    if(changeAmount.value && donation){
      await updateAmount(donation);
      amount.value = donation;
    }

    const response = await getPaymentIntent(amount.value, name);
    const clientSecret  = response.value.secret;
    const { submitError } = await submitElements();

    if (submitError) {
      loading.value = false;
      return;
    }

    const { error } = triggerPayment(clientSecret, values);

    if(error){
      throw new Error("An issue occurred!");
    }
  }catch(e){
    console.error(e);
  }finally{
    loading.value = false;
  }
});

const displayAmount = computed(() => {
  return !changeAmount.value ? amount.value : donation.value.value;
});

</script>
<template>
  <div class="flex">
    <div class="hidden p-4 w-1/3 h- bg-fawn md:block">
      <div class="h-full">
        <svg-complete-form />
      </div>
    </div>
    <form id="pay-form" @submit.prevent="submitForm" class="p-10 w-full md:w-2/3" >
      <h1 class="text-center font-bold text-4xl text-citrine">Donation Form:</h1>
      <InputContainer name="name" label="Full Name" placeholder="Enter Your Name"/>
      <InputContainer name="email" type="email" label="Email Address" placeholder="Enter Your Email"/>
      <InputContainer name="address" label="Address" placeholder="First line of your address"/>
      <InputContainer name="city" label="City" placeholder="Enter your City of residence"/>
      <InputContainer name="county" label="County" placeholder="Enter your County of residence"/>
      <InputContainer name="postcode" label="Postcode" placeholder="Enter your Postcode"/>

      <TheDonationCheckBox @toggleDonation="toggleChangeAmount"  />

      <InputContainer v-if="changeAmount"
                      name="donation"
                      label="Donation"
                      :disabled="!changeAmount"
                      placeholder="20"
      />

      <StripeCardDetails />

     <TheSubmitButton :loading="loading" :amount="displayAmount"/>
    </form>
  </div>
</template>