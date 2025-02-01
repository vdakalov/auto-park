import Mithril from 'mithril';
import HeaderDefaultLayout from './header';

export type Attrs = {
  title: string;
};

export default class DefaultLayout implements Mithril.ClassComponent<Attrs> {

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    window.document.title = `${vnode.attrs.title} | Авто-Парк`;
    const class_ = [
      this.constructor.name,
      vnode.attrs.constructor.name,
    ].join(' ');
    return <div class={class_}>
      <HeaderDefaultLayout />
      <div class="container">
        <h1>{vnode.attrs.title}</h1>
        {vnode.children}
      </div>
    </div>;
  }
}