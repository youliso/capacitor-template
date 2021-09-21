import { domCreateElement, Component } from '@/common/dom';
import styles from './scss/index.lazy.scss';


export default class Head extends Component {

  onLoad(params?: any) {
    styles.use();
  }

  onReady() {
  }

  onUnmounted() {
    styles.unuse();
  }

  render() {
    return domCreateElement('div', 'head-info drag');
  }
}
