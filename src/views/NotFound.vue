<template>
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/uploads/1413399939678471ea070/2c0343f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80');
    "
    loading="lazy"
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-12 m-auto text-center">
          <h1 class="display-1 text-bolder text-white">Error 404</h1>
          <h2 class="text-white">Erm. Page not found</h2>
          <p class="lead text-white">
            We suggest you to go to the homepage while we solve this issue.
          </p>
          <button
            type="button"
            class="btn bg-gradient-warning mt-4"
            @click="navigateTo('/')"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function navigateTo(to) {
  router.push(to);
}
</script>

<style lang="scss" scoped></style>
