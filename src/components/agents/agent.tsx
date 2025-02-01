import Mithril from 'mithril';
import { LocationPath } from '../../libs/location-path';
import AgentModelController from '../../model/agent/controller';

export type Attrs = {
  agent: AgentModelController
};

export default class AgentComponent implements Mithril.ClassComponent<Attrs> {

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <tr>
      <td>{vnode.attrs.agent.id}</td>
      <td>{vnode.attrs.agent.name}</td>
      <td>{vnode.attrs.agent.legalEntity.name}</td>
      <td>{vnode.attrs.agent.legalEntity.inn}</td>
      <td>{vnode.attrs.agent.legalEntity.address}</td>
      <td>
        {Mithril(Mithril.route.Link, {
          href: LocationPath.Agent,
          params: {
            id: vnode.attrs.agent.id,
          }
        }, 'Открыть')}
      </td>
    </tr>;
  }
}