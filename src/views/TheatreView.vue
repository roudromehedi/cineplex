<template>
  <div class="projects-3 section-dark  d-flex mt-15" id="projects-3">
    <div class="container mt-15">
      <div class="row d-flex justify-center mb-5">
        <div class="col-md-8 text-center">
          <h6 class="category text-muted">On Cinemas!</h6>
          <h2 class="title text-white">Our Awesome Theaters</h2>
        </div>
      </div>
      <div class="row">
        <div
          v-for="theatre in theatreStore.theaters"
          :key="theatre.id"
          class="col-md-6 col-lg-4 mb-4"
        >
          <div class="card">
            <a href="#Cineplex">
              <img
                class="card-img-top"
                src="https://cinedom.de/wp-content/uploads/sites/2/2022/03/2019-cinedom-feindaten-43.jpg"
                alt="Theater Image"
              />
            </a>
            <div class="card-body">
              <h5 class="card-title">{{ theatre.theaterName }}</h5>
              <p class="card-text">
                <strong>Theater Type:</strong> {{ theatre.theaterType }}<br />
                <strong>Seating Capacity:</strong> {{ theatre.seatingCapacity }}<br />
                <strong>Wheelchair Accessible:</strong> {{ theatre.wheelChair ? "Yes" : "No" }}<br />
                <strong>Sound System:</strong> {{ theatre.soundSystem }}<br />
                <strong>Resolution:</strong> {{ theatre.resolution }}<br />
                <strong>Dimension:</strong> {{ theatre.dimention }}<br />
                <strong>Speakers:</strong> {{ theatre.speakers }}<br />
                <strong>Screen Size:</strong> {{ theatre.screenSize }} inches<br />
                <strong>Show Times:</strong>
                <ul class="list-unstyled">
                  <li v-for="time in theatre.showTime" :key="time">{{ time }}</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheatreStore } from "../stores/theaters.js";
import { onMounted } from "vue";
const theatreStore = useTheatreStore();

const loadTheaters = async () => {
  await theatreStore.getTheaters();
};

onMounted(async () => {
  loadTheaters();
});
</script>

<style scoped>
.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-body {
  padding: 1.25rem;
}
</style>
