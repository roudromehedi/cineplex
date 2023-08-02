<template>
  <div class="col-lg-3 col-md-6 col-12">
    <div class="card mb-4">
      <div class="card-body p-3">
        <div class="row">
          <div class="col-8">
            <div class="numbers">
              <p class="text-sm mb-0 text-uppercase font-weight-bold">
                {{ cardTitle }}
              </p>
              <h5 class="font-weight-bolder">{{ movieList.length }}</h5>
              <p class="mb-0">
                <span class="text-success text-sm font-weight-bolder"
                  >+{{ movieList.length }}%</span
                >
                than last month
              </p>
            </div>
          </div>
          <div
            v-if="navigation"
            class="col-4 text-end"
            @click="navigateTo(navigation)"
          >
            <div
              class="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle cursor-pointer"
            >
              <i
                class="ni ni-curved-next text-lg opacity-10"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  movieList: Array,
  cardTitle: String,
  navigation: String,
});
console.log(props.movieList.length);

function navigateTo(to) {
  router.push(to);
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
