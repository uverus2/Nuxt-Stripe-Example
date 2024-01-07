<script setup>
import TheFooter from "~/components/TheFooter.vue";
import TheLoader from "~/components/TheLoader.vue";


useHead({
  title: "Welcome"
});


</script>
<template>
  <section class="container-fluid font-main">
    <the-loader/>
    <slot/>
  </section>
  <the-footer/>
</template>
