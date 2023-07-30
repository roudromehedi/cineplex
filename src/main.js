// main.js



import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

// Use the Vuetify plugin
const vuetify = createVuetify({
  components,
  directives,
})

// Use the router plugin
app.use(router)

// Mount the app with Vuetify
app.use(vuetify).mount('#app')
