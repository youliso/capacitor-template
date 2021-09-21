import Router from '@/router';
import { Style } from '@capacitor/status-bar';
import { setOverlay, setStyle } from '@/utils/status_bar';
import '@/views/scss/color.scss';
import '@/views/scss/index.scss';

(async () => {
  await setOverlay({ overlay: true });
  await setStyle({ style: Style.Light });
  Router.init();
})();