import { StatusBar, SetOverlaysWebViewOptions, StyleOptions } from '@capacitor/status-bar';

/**
 * 设置状态栏透明
 * @param overlays
 */
export async function setOverlay(overlays: SetOverlaysWebViewOptions) {
  await StatusBar.setOverlaysWebView(overlays);
}

export async function setStyle(styles: StyleOptions) {
  await StatusBar.setStyle(styles);
}