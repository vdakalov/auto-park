import Mithril from 'mithril';
import InvoiceModelController from '../../model/invoice/controller';
import InvoiceServicesListSectionComponent from './sections/invoice-services-list';

export type Attrs = {
  invoice: InvoiceModelController;
};

export default class InvoiceServicesComponent implements Mithril.ClassComponent<Attrs> {

  private form: boolean = false;

  private formName: string = '';
  private formNumber: number = 0;
  private formPrice: number = 0;

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <div>
      <button class="btn btn-primary">Добавить услугу</button>
      <table>
        <thead>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Цена (руб.)</th>
          <th>Количество (шт./ед.)</th>
          <th>Сумма (руб.)</th>
        </tr>
        </thead>
        <InvoiceServicesListSectionComponent services={vnode.attrs.invoice.services} />
      </table>
    </div>;
  }
}