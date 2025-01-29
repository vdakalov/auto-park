import Mithril from 'mithril';
import Page from '../../../libs/page';
import DefaultLayout from '../../../layouts/default';
import AgentModelController from '../../../model/agent/controller';
import { Path } from '../../../libs/router';

export type Attrs = {
  id: string;
};

export default class AgentEditPage extends Page implements Mithril.ClassComponent<Attrs> {

  public title: string  = 'Изменение агента';

  private name: string | undefined = undefined;

  private legalName: string | undefined = undefined;

  private legalInn: number | undefined = undefined;

  private legalAddress: string | undefined = undefined;

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

  private onLegalAddressChanged(agent: AgentModelController, event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.legalAddress = event.target.value;
    }
  }

  private reset(): void {
    this.name = undefined;
    this.legalName = undefined;
    this.legalInn = undefined;
    this.legalAddress = undefined;
  }

  private goBack(id: number): void {
    this.reset();
    Mithril.route.set(Path.Agent, { id });
  }

  private onSave(agent: AgentModelController): void {
    if (this.name !== undefined && agent.name !== this.name) {
      agent.name = this.name;
    }
    if (this.legalName !== undefined && agent.legalEntity.name !== this.legalName) {
      agent.legalEntity.name = this.legalName;
    }
    if (this.legalInn !== undefined && agent.legalEntity.inn !== this.legalInn) {
      agent.legalEntity.inn = this.legalInn;
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
    this.legalName = this.legalName === undefined ? agent.legalEntity.name : this.legalName;
    this.legalInn = this.legalInn === undefined ? agent.legalEntity.inn : this.legalInn;
    this.legalAddress = this.legalAddress === undefined ? agent.legalEntity.address : this.legalAddress;
    return <DefaultLayout page={this}>
      <h3>Пользователь</h3>
      <div class="mb-3">
        <label htmlFor="name" class="form-label">Имя пользователя</label>
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
      <h3>Ораганизация</h3>
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
        <label htmlFor="legal-name" class="form-label">Наименование</label>
        <input
          id="legal-name"
          type="text"
          class="form-control"
          autocomplete="off"
          value={this.legalName}
          onchange={this.onLegalNameChanged.bind(this, agent)}
        />
      </div>
      <div class="mb-3">
        <label htmlFor="legal-address" class="form-label">Адрес</label>
        <input
          id="legal-address"
          type="text"
          class="form-control"
          autocomplete="off"
          value={this.legalAddress}
          onchange={this.onLegalAddressChanged.bind(this, agent)}
        />
      </div>
      <div class="mb-3">
        <button class="btn btn-primary" onclick={this.onSave.bind(this, agent)}>Сохранить</button>
        <button class="btn btn-link" onclick={this.onCancel.bind(this, agent)}>Отмена</button>
      </div>
    </DefaultLayout>
  }
}