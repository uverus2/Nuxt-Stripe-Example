<script setup>
const nuxtApp = useNuxtApp(),
    loading = ref(true);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});

nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>
<template>
  <section>
    <div v-if="loading" class="flex flex-col text-center h-screen justify-center bg-fawn">
      <div class="flex mt-4 w-auto h-auto mx-auto sm:w-1/2 sm:h-1/2">
        <svg-loading class="animate-pulse"/>
      </div>
    </div>
  </section>
</template>