<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text"
  },
  label: {
    type: String,
    default: "text"
  }
});

const errorMessage = ref(""),
      getError = message => errorMessage.value = message;
</script>

<template>
  <div class="py-4">
    <div>
      <label :for="name" class="text-citrine font-bold text-lg"> {{ label }} </label>
      <InputField
          :id="name"
          :name="name"
          :type="type"
          v-bind="$attrs"
          @errorMessage="getError"
      />
    </div>
    <div v-if="errorMessage" class="text-center mt-3">
      <p class="text-amber-800 capitalize font-bold">
        {{ errorMessage }}
      </p>
    </div>
  </div>

</template>