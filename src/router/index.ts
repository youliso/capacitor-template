import pageRoute from '@/router/modular/page';
import { domCreateElement } from '@/common/dom';
import { toParams } from '@/utils';

export class Router {
  private static instance: Router;
  private instances: { [key: string]: View } = {};

  public appDom: HTMLElement = document.body;
  public routes: Route[] = [...pageRoute];
  // 当前路由
  public current: View;

  static getInstance() {
    if (!Router.instance) Router.instance = new Router();
    return Router.instance;
  }

  constructor() {}

  init(path?: string) {
    window.onpopstate = (e) => {
      this.replace(document.location.pathname + document.location.search, e.state).catch(
        console.error
      );
    };
    if (path && typeof path === 'string') {
      this.replace(path).catch(console.error);
      return;
    }
    this.replace(document.location.pathname + document.location.search).catch(console.error);
  }

  getRoute(path: string) {
    for (let i = 0, len = this.routes.length; i < len; i++) {
      const route = this.routes[i];
      if (route.path === path) return route;
    }
    return null;
  }

  setRoute(route: Route) {
    this.routes.push(route);
  }

  unInstance(name: string) {
    delete this.instances[name];
  }

  async replace(path: string, params?: any) {
    const paths = path.split('?');
    const query = toParams(paths[1]);
    const route: Route = this.getRoute(paths[0]);
    if (!route) {
      console.warn(`beyond the history of ${path}`);
      return;
    }
    history.replaceState(params, route.name || path, path);
    await this.rIng(route, query, params);
  }

  /**
   * 跳转路由
   */
  async push(path: string, params?: any) {
    const paths = path.split('?');
    const query = toParams(paths[1]);
    const route: Route = this.getRoute(paths[0]);
    if (!route) {
      console.warn(`beyond the history of ${path}`);
      return;
    }
    history.pushState(params, route.name || path, path);
    await this.rIng(route, query, params);
  }

  /**
   * 回退路由
   */
  back() {
    history.back();
  }

  go(delta: number) {
    history.go(delta);
  }

  private async rIng(route: Route, query?: any, params?: any) {
    await route
      .component()
      .then((View) => this.pretreatment(route, View, query, params))
      .catch(console.error);
  }

  private pretreatment(route: Route, View: any, query?: any, params?: any) {
    document.title = route.name || route.path;
    let view: View;
    if (route.instance) {
      view = this.instances[View.default.name];
      const initLoad = !this.instances[View.default.name];
      if (initLoad) {
        view = new View.default() as View;
        view.$instance = true;
        if (!view.$name) view.$name = View.default.name;
      }
      this.unCurrent();
      if (initLoad) view.onLoad(query, params);
      else view.onActivated(query, params);
      this.renderView(view, query, params);
      this.current = view;
      if (initLoad) view.onReady();
      return;
    }
    view = new View.default() as View;
    if (!view.$name) view.$name = View.default.name;
    this.unCurrent();
    view.onLoad(query, params);
    this.renderView(view, query, params);
    this.current = view;
    view.onReady();
  }

  private unCurrent() {
    if (this.current) {
      if (this.current.$instance) {
        this.instances[this.current.$name] = this.current;
        if (this.current.components) {
          for (const componentKey in this.current.components) {
            this.current.components[componentKey].onDeactivated();
          }
        }
        this.current.onDeactivated();
      } else {
        delete this.instances[this.current.$name];
        if (this.current.components) {
          for (const componentKey in this.current.components) {
            this.current.components[componentKey].onUnmounted();
          }
        }
        this.current.onUnmounted();
      }
      this.appDom.removeChild(this.current.$el);
      delete this.current;
    }
  }

  private renderView(view: View, query?: any, params?: any) {
    if (view.$el) {
      if (view.components) {
        for (const componentKey in view.components) {
          view.components[componentKey].onActivated(query, params);
        }
      }
      this.appDom.appendChild(view.$el);
      return;
    }
    const viewEl = domCreateElement('div', 'container');
    const cl = view.render();
    if (Array.isArray(cl)) for (const v of cl) viewEl.appendChild(v);
    else viewEl.appendChild(cl);
    if (view.components) {
      const componentsEl = domCreateElement('div', 'components');
      for (const componentKey in view.components) {
        const component = view.components[componentKey];
        component.onLoad(query, params);
        const el = domCreateElement('div', `component ${componentKey.toLowerCase()}`);
        const cl = component.render();
        if (Array.isArray(cl)) for (const v of cl) el.appendChild(v);
        else el.appendChild(cl);
        componentsEl.appendChild(el);
        component.$currentName = view.$name;
        component.$name = componentKey;
        component.$el = el;
        component.onReady();
      }
      viewEl.appendChild(componentsEl);
    }
    this.appDom.appendChild(viewEl);
    view.$el = viewEl;
  }
}

export default Router.getInstance();
