import Mithril from 'mithril';
import DefaultPage from '../../libs/pages/default';
import AgentModelController from '../../model/agent/controller';
import { LocationPath } from '../../libs/location-path';

export type Attrs = {
  id: string;
};

export default class AgentPage extends DefaultPage<Attrs> {

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

  protected render(): Mithril.Children {
    const agent = this.ensurePageAgent();
    this.title = agent.name;
    return [
      Mithril(Mithril.route.Link, {
        class: 'btn btn-primary',
        href: LocationPath.AgentEdit,
        params: {
          id: agent.id
        }
      }, 'Изменить'),
      <p>Название организации: {agent.legalEntity.name}</p>,
      <p>ИНН: {agent.legalEntity.inn}</p>,
      <p>Адрес: {agent.legalEntity.address}</p>,
      <button class="btn btn-link" onclick={this.onRequest.bind(this, agent)}>Request</button>
    ];
  }
}
