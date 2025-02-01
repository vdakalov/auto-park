import Mithril from 'mithril';
import DefaultPage from '../../../libs/pages/default';
import AgentModelController from '../../../model/agent/controller';
import { LocationPath } from '../../../libs/location-path';
import LegalEntityModelController from '../../../model/legal-entity/controller';

export type Attrs = {};

export default class AgentCreatePage extends DefaultPage<Attrs> {
  public title = 'Новый агент';

  private name: string = '';
  private legalName: string = '';
  private legalInn: number = Number.NaN;
  private legalAddress: string = '';

  private onFillLegalEntity(): void {
    if (Number.isInteger(this.legalInn)) {
      this.application.checko
        .getCompanyInfo(this.legalInn)
        .then(data => {
          this.legalName = data['НаимПолн'];
          this.legalAddress = data['ЮрАдрес']['АдресРФ'];
        });
    }
  }

  private onNameChanged(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.name = event.target.value.trim();
    }
  }

  private onLegalInnChanged(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      const number = Number.parseInt(event.target.value);
      if (number.toString() === event.target.value) {
        this.legalInn = number;
      }
    }
  }

  private onLegalNameChanged(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.legalName = event.target.value.trim();
    }
  }

  private onLegalAddressChanged(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.legalAddress = event.target.value;
    }
  }

  private onCreate(): void {
    const legalEntity = LegalEntityModelController
      .create(this.legalName, this.legalInn, this.legalAddress);
    const agentModel = AgentModelController
      .create(this.name, legalEntity);
    this.application.update(({ agents }) => agents.addAgentModel(agentModel));
    Mithril.route.set(LocationPath.Agents);
  }

  private onCancel(): void {
    Mithril.route.set(LocationPath.Agents);
  }

  protected render(): Mithril.Children {
    return [
      <h3>Пользователь</h3>,
      <div class="mb-3">
        <label htmlFor="name" class="form-label">Имя пользователя</label>
        <input
          id="name"
          type="email"
          class="form-control"
          autocomplete="off"
          placeholder="Основной агент"
          oninput={this.onNameChanged.bind(this)}
        />
      </div>,
      <h3>Организация</h3>,
      <div class="mb-3">
        <label htmlFor="legal-inn" class="form-label">ИНН</label>
        <div class="input-group mb-3">
          <input
            id="legal-inn"
            type="text"
            class="form-control"
            placeholder="5050057749"
            aria-label="ИНН"
            aria-describedby="fill-legal-entity"
            oninput={this.onLegalInnChanged.bind(this)}
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="fill-legal-entity"
            onclick={this.onFillLegalEntity.bind(this)}
          >Заполнить</button>
        </div>
      </div>,
      <div class="mb-3">
        <label htmlFor="legal-name" class="form-label">Наименование</label>
        <input
          id="legal-name"
          type="text"
          class="form-control"
          autocomplete="off"
          placeholder="ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ &quot;ПАЛЫЧ&quot;"
          value={this.legalName}
          oninput={this.onLegalNameChanged.bind(this)}
        />
      </div>,
      <div class="mb-3">
        <label htmlFor="legal-address" class="form-label">Адрес</label>
        <input
          id="legal-address"
          type="text"
          class="form-control"
          placeholder="141280, Московская область, г. Пушкино, г. Ивантеевка, Маяковского проезд, д. 8/10"
          autocomplete="off"
          value={this.legalAddress}
          oninput={this.onLegalAddressChanged.bind(this)}
        />
      </div>,
      <div class="mb-3">
        <button class="btn btn-primary" onclick={this.onCreate.bind(this)}>Создать</button>
        <button class="btn btn-link" onclick={this.onCancel.bind(this)}>Отмена</button>
      </div>
    ];
  }
}