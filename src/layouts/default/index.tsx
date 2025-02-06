import Mithril from 'mithril';
import HeaderDefaultLayout from './header';

export type Attrs = {
  title: string;
  page: string;
};

export default class DefaultLayout implements Mithril.ClassComponent<Attrs> {

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    window.document.title = `${vnode.attrs.title} | Авто-Парк`;
    return <div class={this.constructor.name}>
      <HeaderDefaultLayout />
      <div class={`container ${vnode.attrs.page}`}>
        <h1>{vnode.attrs.title}</h1>
        {vnode.children}
      </div>
    </div>;
  }
}