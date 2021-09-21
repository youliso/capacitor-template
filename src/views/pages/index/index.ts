import Store from '@/store';
import Router from '@/router';
import { domCreateElement, View } from '@/common/dom';
import { dateFormat } from '@/utils';
import Head from '@/views/components/head';
import styles from './scss/index.lazy.scss';

export default class Home extends View {
  private testData: StoreProxy<string>;
  private testInterval: NodeJS.Timer;
  components = {
    // Head: new Head()
  };

  onLoad() {
    styles.use();
  }

  onReady() {
  }

  onUnmounted() {
    styles.unuse();
    if (this.testData) this.testData.revoke();
    if (this.testInterval) clearInterval(this.testInterval);
  }


  testRender() {
    const test = domCreateElement('div', 'text');
    this.testData = Store.proxy(dateFormat(), (value) => (test.textContent = value));
    test.textContent = dateFormat();
    this.testInterval = setInterval(() => {
      this.testData.proxy.value = dateFormat();
    }, 1000);
    return test;
  }

  render() {
    const el = domCreateElement('div', 'info');
    const about = domCreateElement('button', 'but', '关于');
    about.addEventListener('click', () => {
      Router.push('/about');
    });
    el.appendChild(this.testRender());
    el.appendChild(about);
    return el;
  }
}
