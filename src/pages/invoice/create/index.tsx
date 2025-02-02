import Mithril from 'mithril';
import DefaultPage from '../../../libs/pages/default';
import FormControlComponent from '../../../components/form-control';
import AgentSelectorComponent from '../../../components/agent-selector';
import InvoiceServicesComponent from '../../../components/invoice-services';
import InvoiceModelController from '../../../model/invoice/controller';

export type Attrs = {
  id: string;
  agent: string;
};

export default class InvoicePage extends DefaultPage<Attrs> implements Mithril.ClassComponent<Attrs> {
  public title: string = 'Счёт на оплату';

  private invoice: InvoiceModelController = InvoiceModelController.create(0, this.application.ctrl);

  protected render(): Mithril.Children {
    const agent = this.getPageAgent('agent');

    return [
      <FormControlComponent id="agent" label="Агент">
        <AgentSelectorComponent
          id="agent"
          agents={this.application.agents}
          selected={agent?.id}
        />
      </FormControlComponent>,
      <h3>Услуги</h3>,
      <InvoiceServicesComponent/>,
      <button class="btn btn-primary">Выставить</button>
    ];
  }

  public oninit(vnode: Mithril.Vnode<Attrs, this>): void {
    super.oninit(vnode);
    this.invoice = this.getPageInvoice() || this.invoice;
  }
}