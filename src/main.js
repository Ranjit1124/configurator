// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import { createVuetify} from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import store from './Store';
// import axios from 'axios';
// import { VNumberInput } from 'vuetify/labs/VNumberInput'
const vuetify = createVuetify({
    components:{
      ...components,
      

    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },}
  });
  
const app = createApp(App)
// app.config.globalProperties.$axios = axios;

// app.config.globalProperties.$axios = axios; 
// app.use(store);
// app.use(router)
app.use(vuetify)
app.mount('#app')