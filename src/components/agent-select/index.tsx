import Mithril from 'mithril';

export type Agent = {
  id: number;
  name: string;
};

export type Attrs = {
  agents: Agent[];
  placeholder?: string;
  onselect?: (agent: Agent) => void;
};

type OptionAttrs = {
  agent: Agent;
};

class AgentOptionComponent implements Mithril.ClassComponent<OptionAttrs> {
  public view(vnode: Mithril.Vnode<OptionAttrs, this>): Mithril.Children {
    return <option key={vnode.attrs.agent.id} value={vnode.attrs.agent.id}>
      {vnode.attrs.agent.name}
    </option>;
  }
}

export default class AgentSelectComponent implements Mithril.ClassComponent<Attrs> {

  private onChange(vnode: Mithril.Vnode<Attrs, this>, event: Event): void {
    if (vnode.attrs.onselect === undefined) {
      return;
    }
    if (event.target instanceof HTMLSelectElement) {
      const value = Number.parseInt(event.target.value);
      event.target.value = '';
      if (Number.isInteger(value)) {
        const agent = vnode.attrs.agents.find(agent => agent.id === value);
        if (agent !== undefined) {
          vnode.attrs.onselect(agent);
        }
      }
    }
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const placeholder = vnode.attrs.placeholder !== undefined
      ? <option value="">{vnode.attrs.placeholder}</option>
      : undefined;
    return <select
      class="form-select"
      onchange={this.onChange.bind(this, vnode)}>
      {placeholder}
      {vnode.attrs.agents.map(agent => <AgentOptionComponent agent={agent} />)}
    </select>;
  }
}