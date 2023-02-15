import { createApp } from 'vue';
import App from '@/App.vue';
import '@/assets/tailwind.css';
import 'APlayer/dist/APlayer.min.css';
import '@/assets/aplayer.custom.css';

const app = createApp(App)
app.mount('#app');
