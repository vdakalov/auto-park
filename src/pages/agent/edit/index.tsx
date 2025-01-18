import Mithril from 'mithril';
import Page from '../../../libs/page';
import DefaultLayout from '../../../layouts/default';
import AgentModelController from '../../../model/agent/controller';
import { Path } from '../../../libs/router';
import { AgentModel } from '../../../model/agent';

export type Attrs = {
  id: string;
};

export default class AgentEditPage extends Page implements Mithril.ClassComponent<Attrs> {

  public title: string  = 'Изменение агента';

  private name: string | undefined = undefined;

  private legalName: string | undefined = undefined;

  private legalInn: number | undefined = undefined;

  private onNameChanged(agent: AgentModelController, event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.name = event.target.value.trim();
    }
  }

  private onLegalNameChanged(agent: AgentModelController, event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.legalName = event.target.value.trim();
    }
  }

  private onLegalInnChanged(agent: AgentModelController, event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.legalInn = event.target.valueAsNumber;
    }
  }

  private reset(): void {
    this.name = undefined;
    this.legalName = undefined;
    this.legalInn = undefined;
  }

  private goBack(id: number): void {
    this.reset();
    Mithril.route.set(Path.Agent, { id });
  }

  private onSave(agent: AgentModelController): void {
    if (this.name !== undefined && agent.name !== this.name) {
      agent.name = this.name;
    }
    if (this.legalName !== undefined && agent.legalName !== this.legalName) {
      agent.legalName = this.legalName;
    }
    if (this.legalInn !== undefined && agent.legalInn !== this.legalInn) {
      agent.legalInn = this.legalInn;
    }
    this.application.save();
    this.goBack(agent.id);
  }

  private onCancel(agent: AgentModelController): void {
    this.goBack(agent.id);
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const agent = this.getAgentByIdParam(vnode.attrs.id);
    this.name = this.name === undefined ? agent.name : this.name;
    this.legalName = this.legalName === undefined ? agent.legalName : this.legalName;
    this.legalInn = this.legalInn === undefined ? agent.legalInn : this.legalInn;
    return <DefaultLayout page={this}>
      <div class="mb-3">
        <label htmlFor="name" class="form-label">Пользовательское имя</label>
        <input
          id="name"
          type="email"
          class="form-control"
          autocomplete="off"
          placeholder="Основной агент"
          value={this.name}
          onchange={this.onNameChanged.bind(this, agent)}
        />
      </div>
      <div class="mb-3">
        <label htmlFor="legal-name" class="form-label">Юридическое наименование</label>
        <input
          id="legal-name"
          type="text"
          class="form-control"
          autocomplete="off"
          placeholder="ООО &quot;AAA&quot;"
          value={this.legalName}
          onchange={this.onLegalNameChanged.bind(this, agent)}
        />
      </div>
      <div class="mb-3">
        <label htmlFor="legal-inn" class="form-label">ИНН</label>
        <input
          id="legal-inn"
          type="number"
          class="form-control"
          autocomplete="off"
          value={this.legalInn}
          onchange={this.onLegalInnChanged.bind(this, agent)}
        />
      </div>
      <div class="mb-3">
        <button class="btn btn-primary" onclick={this.onSave.bind(this, agent)}>Сохранить</button>
        <button class="btn btn-link" onclick={this.onCancel.bind(this, agent)}>Отмена</button>
      </div>
    </DefaultLayout>
  }
}