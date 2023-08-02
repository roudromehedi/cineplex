// main.js



import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

// Use the Vuetify plugin
const vuetify = createVuetify({
  components,
  directives,
})

// Use the router plugin
app.use(router)

// Mount the app with Vuetify
app.use(vuetify,VueSweetalert2).mount('#app')
