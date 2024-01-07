<script setup>
definePageMeta({
  middleware: ["check-success"]
});

useHead({
  title: "Thank you!"
});
</script>
<template>
  <main class="container-fluid flex flex-col text-center h-screen justify-center bg-fawn">
    <the-thank-you/>
    <the-ebook-download/>
  </main>
</template>