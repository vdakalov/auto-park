import Mithril from 'mithril';
import AgentsModelController from '../../model/agents/controller';
import AgentModelController from '../../model/agent/controller';

type OptionAttrs = {
  agent: AgentModelController;
  selected?: boolean;
};

export type Attrs = {
  agents: AgentsModelController;
  /**
   * select dom-element id
   */
  id?: number;
  /**
   * Agent's id to select by default
   */
  selected?: number;
};

class SelectorOptionComponent implements Mithril.ClassComponent<OptionAttrs> {
  public view(vnode: Mithril.Vnode<OptionAttrs, this>): Mithril.Children {
    const agent = vnode.attrs.agent;
    return <option selected={vnode.attrs.selected} value={agent.id}>{agent.name}</option>;
  }
}

export default class AgentSelectorComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const agents = Array.from(vnode.attrs.agents);
    return <select id={vnode.attrs.id} class="form-select">
      {agents.map(agent => <SelectorOptionComponent agent={agent} selected={agent.id === vnode.attrs.selected} />)}
    </select>;
  }
}