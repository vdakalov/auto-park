import Mithril from 'mithril';
import { InvoiceServiceModel } from '../../../../model/invoice/service';
import InvoiceServiceItemComponent from './item';

export type Attrs = {
  services: InvoiceServiceModel[];
};

export default class InvoiceServicesListSectionComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <tbody>
    {vnode.attrs.services.map((service, index) =>
      <InvoiceServiceItemComponent key={service.name} index={index} service={service} />)}
    </tbody>;
  }
}