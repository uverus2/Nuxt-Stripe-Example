<script setup>
  const scrollToView = () => {
    const scrollTo = document.getElementById('pay-form');
    scrollTo.scrollIntoView({ behavior: "smooth" });
  }
</script>
<template>
  <header class="p-5 h-screen bg-center sm:bg-cover bg-fixed flex flex-col bg-[url('/img/hero-image.jpg')] justify-center sm:justify-end">
    <div class="text-left font-weight-bold p-4 flex flex-col justify-end md:justify-between h-full sm:h-1/4 md:h-1/3">
      <h1 class="text-3xl md:text-6xl drop-shadow-xl mb-3 rounded text-citrine">Donate to access our Ebook!</h1>
      <p class="text-fawn text-md sm:text-md sm:text-lg">Sed ut perspiciatis unde omnis iste natus error sit voluptaam rem aperi dt, quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
      <a class="text-lg lg:text-4xl bg-citrine rounded-r-3xl p-3 text-rus-violet hover:underline w-full sm:w-2/4 mt-3 hover:w-2/3 md:w-1/4 md:hover:w-1/3 sm:mt-2"
         @click.prevent="scrollToView"
      >
        Donate Now
      </a>
    </div>
  </header>
</template>