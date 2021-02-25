import { createApp } from "vue";
import App from "./App.vue";

import Stories from "./../lib/main";

let app = createApp(App);

app.use(Stories);

app.mount("#app");
