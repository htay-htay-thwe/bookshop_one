import { createApp } from 'vue';      // Vue first
import App from './App.vue';
import router from './router';
import store from './store';

import CKEditor from '@ckeditor/ckeditor5-vue';  // CKEditor after Vue

const app = createApp(App);
app.use(router);
app.use(store);
app.use(CKEditor);   // register plugin

app.mount('#app');
