import Router from '@/router';
import { View, domCreateElement } from '@/common/dom';
import styles from './scss/index.lazy.scss';
import Head from '@/views/components/head';

export default class About extends View {
  components = {
    // Head: new Head()
  };

  countDom: HTMLButtonElement;
  count: number = 0;

  onLoad(params?: any) {
    styles.use();
  }

  onActivated() {
    styles.use();
  }

  onDeactivated() {
    styles.unuse();
    // Router.unInstance(this.$name);
  }

  onReady() {
  }

  onUnmounted() {
    styles.unuse();
  }

  countAdd() {
    this.count++;
    this.countDom.textContent = `${this.count} add`;
  }

  render() {
    const el = domCreateElement('div', 'info');
    const text = domCreateElement('div', 'text', '关于');
    const home = domCreateElement('button', 'but', '首页');
    this.countDom = domCreateElement('button', 'but', `${this.count} add`);
    home.addEventListener('click', () => Router.back());
    this.countDom.addEventListener('click', () => this.countAdd());
    el.appendChild(text);
    el.appendChild(home);
    el.appendChild(this.countDom);
    return el;
  }
}
