import { createRouter, createWebHistory } from 'vue-router'
const Home=()=>import("../views/HomeView.vue")
const About=()=>import("../views/AboutView.vue")
const Movies=()=>import("../views/MoviesView.vue")
const NotFound=()=>import("../views/NotFound.vue")
const MovieDetails=()=>import("../views/movie-details.vue")
const bookings=()=>import("../views/MovieBookings.vue")
const AddMovie=()=>import("../views/AddMovie.vue")
const AdminDashboard=()=>import("../views/AdminDashboard.vue")



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/movies/:id',
      name: 'MovieDetails',
      component: MovieDetails,
      props:true
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: bookings,
      
    },
    {
      path: '/add-movie',
      name: 'addMovie',
      component: AddMovie,
      
    },
    {
      path: '/dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
      
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
