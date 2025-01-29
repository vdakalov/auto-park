import Mithril from 'mithril';
import DefaultLayout from '../../layouts/default';
import Page from '../../libs/page';
import AgentModelController from '../../model/agent/controller';
import { Path } from '../../libs/router';

export type Attrs = {
  id: string;
};

export default class AgentPage extends Page implements Mithril.ClassComponent<Attrs> {

  public title = 'Unknown Agent';

  private onRequest(agent: AgentModelController): void {
    this.application.checko
      .getCompanyInfo(agent.legalEntity.inn)
      .then(data => {
        agent.legalEntity.name = data['НаимСокр'];
        agent.legalEntity.inn = Number.parseInt(data['ИНН']);
        agent.legalEntity.address = data['ЮрАдрес']['АдресРФ'];
      });
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const agent = this.getAgentByIdParam(vnode.attrs.id);
    this.title = agent.name;
    return <DefaultLayout page={this}>
      {Mithril(Mithril.route.Link, {
        class: 'btn btn-primary',
        href: Path.AgentEdit,
        params: {
          id: agent.id
        }
      }, 'Изменить')}
      <p>Название организации: {agent.legalEntity.name}</p>
      <p>ИНН: {agent.legalEntity.inn}</p>
      <p>Адрес: {agent.legalEntity.address}</p>
      <button class="btn btn-link" onclick={this.onRequest.bind(this, agent)}>Request</button>
    </DefaultLayout>
  }
}