// main.js

import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const pinia = createPinia();
const app = createApp(App);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(pinia);
// Use the Vuetify plugin
const vuetify = createVuetify({
  components,
  directives,
});

// Use the router plugin
app.use(router);

// Mount the app with Vuetify
app.use(vuetify, VueSweetalert2).mount("#app");
