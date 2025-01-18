import Mithril from 'mithril';

export type Attrs = {
  title: string;
  name: string;
  message: string;
  stack?: string;
};

export default class ErrorLayout implements Mithril.ClassComponent<Attrs> {

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    window.document.title = `${vnode.attrs.title} | Авто-Парк`;
    const class_ = [
      this.constructor.name,
      vnode.attrs.name,
    ].join(' ');
    return <div class={class_}>
      <div class="container">
        <h1>{vnode.attrs.name}</h1>
        <p>{vnode.attrs.message}</p>
        <pre>{vnode.attrs.stack}</pre>
        <hr/>
        {vnode.children}
      </div>
    </div>;
  }
}