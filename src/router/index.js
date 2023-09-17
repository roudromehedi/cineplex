import { createRouter, createWebHistory } from "vue-router";
const Home = () => import("../views/HomeView.vue");
const About = () => import("../views/AboutView.vue");
const Movies = () => import("../views/MoviesView.vue");
const NotFound = () => import("../views/NotFound.vue");
const MovieDetails = () => import("../views/movie-details.vue");
const Bookings = () => import("../views/MovieBookings.vue");
const ManageMovies = () => import("../views/ManageMovies.vue");
const Dashboard = () => import("../views/DashboardPro.vue");
const Theaters = () => import("../views/TheatreView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/movies",
      name: "movies",
      component: Movies,
    },
    {
      path: "/theaters",
      name: "theaters",
      component: Theaters,
    },
    {
      path: "/movies/:id",
      name: "MovieDetails",
      component: MovieDetails,
      props: true,
    },
    {
      path: "/bookings",
      name: "bookings",
      component: Bookings,
    },

    {
      path: "/manage-movies",
      name: "ManageMovies",
      component: ManageMovies,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
