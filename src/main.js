// dependencies
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SubHeader from "./components/SubHeader.vue";

//CSS Reset import
import "@/assets/css/normalize.css";

//dayjs format options extension
dayjs.extend(relativeTime);

createApp(App)
  .provide("dayJS", dayjs)
  .use(router)
  .component("SubHeader", SubHeader)
  .mount("#app");
