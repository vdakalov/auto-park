import Mithril from 'mithril';
import InvoiceServiceModelController from '../../../../model/invoice/service/controller';

export type Attrs = {
  index: number;
  service: InvoiceServiceModelController;
};

export default class InvoiceServiceItemComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <tr>
      <td>{vnode.attrs.index + 1}</td>
      <td>{vnode.attrs.service.name}</td>
      <td>{vnode.attrs.service.price}</td>
      <td>{vnode.attrs.service.number}</td>
      <td>{vnode.attrs.service.price * vnode.attrs.service.number}</td>
    </tr>;
  }
}