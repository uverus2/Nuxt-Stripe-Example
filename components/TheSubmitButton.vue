<script setup>
const props = defineProps({
  amount: {
    type: Number,
    default: 20
  },
  loading: {
    type: Boolean,
    required: true
  }
});
</script>
<template>
  <div class="text-center py-4 ">
    <button class="bg-citrine border-dark-purple text-gray-700 border-solid border-2 p-3 rounded-full hover:bg-dark-purple hover:border-4 hover:text-citrine text-md w-full md:text-xl md:w-1/4"
            type="submit"
            :class="{'opacity-50 cursor-wait': loading}"
            :disabled="loading"
    >Donate £{{amount}}</button>
  </div>
</template>