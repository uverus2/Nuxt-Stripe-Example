<script setup>
import {useField} from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text"
  },
});

const {value, errorMessage} = useField(() => props.name);
const emit = defineEmits(['errorMessage']);

watch(errorMessage, message => {
  emit('errorMessage', message);
});

</script>

<template>
  <input v-model="value" :type="type || 'text'"
         v-bind="$attrs"
         class="border-citrine bg-fawn pl-2 mt-1 block w-full px-3 py-2 border border-basic rounded-md text-sm shadow-sm"
  />
</template>