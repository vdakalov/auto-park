import Mithril from 'mithril';
import AgentComponent from './agent';
import AgentModelController from '../../model/agent/controller';

export type Attrs = {
  agents: AgentModelController[];
};

export default class AgentsComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const rows = Array.from(vnode.attrs.agents)
      .map(agent => Mithril(AgentComponent, { key: agent.id, agent }));
    return <table class="table">
      <thead>
      <tr>
        <th>№</th>
        <th>Название</th>
        <th>Юр. наименование</th>
        <th>ИНН</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  }
}