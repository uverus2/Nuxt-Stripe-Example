<script setup>
const props = defineProps({
  error: Object
});

const getErrorMessage = computed(() => {
  const errCode = props?.error?.statuCode ?? 500;
  console.log(errCode);

  switch(errCode){
    case 404:
      return "The page does not exist!";
    case 503:
      return "Our services are currently unavailable. Please try again later!";
    case 504:
      return "There was a problem returning information back to you. Please try again!";
    default:
      return "There is a problem with our service. Please try again later!"
  }
});

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main class="container-fluid flex flex-col text-center h-screen justify-center bg-fawn">
    <h1 class="text-xl mt-4 font-bold">
      {{ getErrorMessage }}
    </h1>

    <div class="flex mt-4 w-auto h-auto mx-auto sm:w-2/3 sm:h-1/2">
      <svg-error-page/>
    </div>

    <div class="mt-4" v-if="error.statusCode === 404">
      <button
          class="bg-burnt-orange text-md sm:text-xl w-1/3 border-dark-purple text-gray-700 border-solid border-2 p-2 rounded-full hover:bg-dark-purple hover:border-4 hover:text-citrine"
          @click="handleError">
        Go Home
      </button>
    </div>
  </main>
</template>