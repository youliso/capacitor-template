import { createApp } from 'vue';
import { Style } from '@capacitor/status-bar';
import { setOverlay, setStyle } from '@/lib/status_bar';
import App from './App.vue';
import router from './router';

(async () => {
  await setOverlay({ overlay: true });
  await setStyle({ style: Style.Light });
  createApp(App)
    .use(router)
    .mount('#app');
})();