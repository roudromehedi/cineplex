<template>
  <section class="">
    <div
      class="page-header min-vh-75"
      style="
        background-image: url(https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2378&q=80);
      "
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-4"></span>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-white text-center">
            <h2 class="text-white">Book your tickets now!</h2>
            <p class="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, nesciunt?
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
      <div class="container">
        <div
          class="row border-radius-md pb-4 p-3 mx-sm-0 mx-1 position-relative"
        >
          <div class="col-lg-3 mt-lg-n2 mt-2">
            <label class="ms-0">Title</label>
            <select
              class="form-control"
              name="choices-leave"
              id="choices-leave"
            >
              <option value="Choice 1" selected="">Oppenheimer</option>
              <option value="Choice 2">Blue creast</option>
              <option value="Choice 3">Avatar</option>
              <option value="Choice 4">Inception</option>
            </select>
          </div>
          <div class="col-lg-3 mt-lg-n2 mt-2">
            <label class="ms-0">To</label>
            <select class="form-control" name="choices-to" id="choices-to">
              <option value="Choice 1" selected="">Genre</option>
              <option value="Choice 2">Mystery</option>
              <option value="Choice 3">Thriller</option>
              <option value="Choice 4">Romance</option>
            </select>
          </div>
          <div class="col-lg-3 mt-lg-n2 mt-2">
            <label class="ms-0">Date</label>
            <div class="input-group input-group-static">
              <span class="input-group-text"
                ><i class="fas fa-calendar"></i
              ></span>
              <input
                class="form-control datepicker"
                placeholder="Please select date"
                type="text"
              />
            </div>
          </div>
          <div class="col-lg-3 mt-lg-n2 mt-2">
            <label>&nbsp;</label>
            <button type="button" class="btn bg-gradient-primary w-100 mb-0">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-10">
      <div class="row">
        <div class="col-md-8 mx-auto text-center">
          <h6 class="text-gradient text-info text-uppercase">
            On Cinemas Now!
          </h6>
          <h2 class="text-white">MOVIES</h2>
        </div>
      </div>
      <div class="row mt-5">
        <CarouselSwiper> </CarouselSwiper>
      </div>
      <div class="row pt-7 pb-6">
        <div class="col-lg-6">
          <h2 class="text-gradient text-info text-uppercase">
            View All Movies
          </h2>
          <p class="text-white">
            The Arctic Ocean freezes every winter and much of the sea-ice then
            thaws every summer, and that process will continue whatever.
          </p>
        </div>
        <div
          class="col-lg-6 text-end d-flex flex-column justify-content-center"
        >
          <button
            type="button"
            class="btn bg-gradient-info mb-0 ms-lg-auto me-lg-0 me-auto mt-lg-0 mt-2"
          >
            Show All
          </button>
        </div>
      </div>
    </div>
    <div class="container mt-10">
      <div class="row">
        <div class="col-md-8 mx-auto text-center">
          <h6 class="text-gradient text-info text-uppercase">
            On Cinemas Now!
          </h6>
          <h2 class="text-white">MOVIES</h2>
        </div>
      </div>
      <div class="row mt-5">
        <CarouselSwiper> </CarouselSwiper>
      </div>
      <div class="row pt-7 pb-6">
        <div class="col-lg-6">
          <h2 class="text-gradient text-info text-uppercase">
            View All Movies
          </h2>
          <p class="text-white">
            The Arctic Ocean freezes every winter and much of the sea-ice then
            thaws every summer, and that process will continue whatever.
          </p>
        </div>
        <div
          class="col-lg-6 text-end d-flex flex-column justify-content-center"
        >
          <button
            type="button"
            class="btn bg-gradient-info mb-0 ms-lg-auto me-lg-0 me-auto mt-lg-0 mt-2"
          >
            Show All
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import CarouselSwiper from "@/components/CarouselSwiper.vue";
</script>
<style>
/* Customize the hero section styles as per your requirements */
.hero-section {
  position: relative;
  height: 400px; /* Adjust the height as per your preference */
  color: white;
}

.hero-image {
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
