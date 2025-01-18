import Mithril from 'mithril';
import HeaderDefaultLayout from './header';
import Page from '../../libs/page';

export type Attrs = {
  page: Page;
};

export default class DefaultLayout implements Mithril.ClassComponent<Attrs> {

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    window.document.title = `${vnode.attrs.page.title} | Авто-Парк`;
    const class_ = [
      this.constructor.name,
      vnode.attrs.page.constructor.name,
    ].join(' ');
    return <div class={class_}>
      <HeaderDefaultLayout />
      <div class="container">
        <h1>{vnode.attrs.page.title}</h1>
        {vnode.children}
      </div>
    </div>;
  }
}