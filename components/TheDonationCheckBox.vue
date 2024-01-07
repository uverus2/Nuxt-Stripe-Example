<script setup>
  const changeAmount = ref(false),
        emit = defineEmits('toggleDonation');

  watch(changeAmount, value => emit('toggleDonation', value));
</script>
<template>
  <div class="grid grid-cols-2 py-4">
    <div>
      <label class="text-citrine font-bold text-lg" for="checkbox">Would you like to change the donation amount?</label>
      <p class="text-fawn font-light italic">*Please note the default donation amount is £20!</p>
    </div>
    <input type="checkbox" id="checkbox" name="donation_check" class="justify-self-center w-5" v-model="changeAmount" />
  </div>
</template>