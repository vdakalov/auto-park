import Mithril from 'mithril';

export type Attrs = {
  label: string;
  id?: string;
  mb?: number;
};

export default class FormControlComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const mb = vnode.attrs.mb === undefined ? 3 : vnode.attrs.mb;
    return <div class={'mb-' + mb}>
      <label htmlFor={vnode.attrs.id} class="form-label">{vnode.attrs.label}</label>
      {vnode.children}
    </div>;
  }
}