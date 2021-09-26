import { View } from '@/common/dom';
import styles from './scss/index.lazy.scss';
import { init } from './demo';
import { setStyle } from '@/utils/status_bar';
import { Style } from '@capacitor/status-bar';

export default class About extends View {
  components = {};

  onLoad(params?: any) {
    styles.use();
  }

  onActivated() {
    styles.use();
  }

  onDeactivated() {
    styles.unuse();
  }

  onReady() {
    setStyle({ style: Style.Dark });
  }

  onUnmounted() {
    styles.unuse();
  }

  render() {
    return init();
  }
}
