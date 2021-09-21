/**
 * 组件
 */
export class Component implements VSource {
  $currentName: string;
  $name: string;
  $el: HTMLElement;

  onLoad(query?: any, params?: any) {}

  onReady() {}

  onUnmounted() {}

  onActivated(query?: any, params?: any) {}

  onDeactivated() {}
}

/**
 * 页面
 */
export class View implements VSource {
  $instance: boolean;
  $name: string;
  $el: HTMLElement;

  onLoad(query?: any, params?: any) {}

  onReady() {}

  onUnmounted() {}

  onActivated(query?: any, params?: any) {}

  onDeactivated() {}
}

/**
 * 创建元素
 * @param el 元素
 * @param css class名称（可选）
 * @param text 文本（可选）
 * @param html （可选）
 */
export function domCreateElement<K extends keyof HTMLElementTagNameMap>(
  el: K,
  css?: string | string[],
  text?: string,
  html?: string
) {
  const dom = document.createElement(el);
  if (css) {
    if (typeof css === 'string') dom.setAttribute('class', css);
    else dom.setAttribute('class', css.join(' '));
  }
  if (text) dom.textContent = text;
  if (html) dom.innerHTML = html;
  return dom;
}
