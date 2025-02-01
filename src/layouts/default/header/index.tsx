import Mithril from 'mithril';
import { LocationPath } from '../../../libs/location-path';

export default class HeaderDefaultLayout implements Mithril.ClassComponent {
  public view(vnode: Mithril.Vnode<{}, this>): Mithril.Children {
    return <nav class="navbar navbar-expand-md bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="#">Авто-Парк</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-lg-0">
            <li class="nav-item">
              {/*<a class="nav-link active" aria-current="page" href="#">Home</a>*/}
              {Mithril(Mithril.route.Link, {
                href: LocationPath.Index,
                class: 'nav-link'
              }, 'Главная')}
            </li>
            <li class="nav-item">
              {/*<a class="nav-link" href="#">Link</a>*/}
              {Mithril(Mithril.route.Link, {
                href: LocationPath.Agents,
                class: 'nav-link'
              }, 'Агенты')}
            </li>
            <li class="nav-item">
              {Mithril(Mithril.route.Link, {
                href: LocationPath.InvoiceCreate, //
                class: 'nav-link'
              }, 'Выставить счёт')}
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>;
  }
}