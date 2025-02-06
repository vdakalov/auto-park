import Mithril from 'mithril';

export type Acc = {
  id: number;
  name: string;
};

export type Attrs = {
  acc: Acc;
  onRemove?: (id: number) => void;
};

export default class AcceptorComponent implements Mithril.ClassComponent<Attrs> {

  private onRemove(acc: Acc, callback: (id: number) => void): void {
    callback(acc.id);
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const acc = vnode.attrs.acc;
    const cb = vnode.attrs.onRemove;
    const removeButton = cb === undefined ? undefined
      : <button class="btn btn-link"
                onclick={this.onRemove.bind(this, acc, cb)}>Удалить</button>;
    return <li>
      {acc.name}
      {removeButton}
    </li>;
  }
}