import TimeFiltersPresenter from './time-filters-presenter';
import TripEventsSortbarPresenter from './trip-events-sortbar-presenter';
import TripEventListPresenter from './trip-event-list-presenter';
import {createRandomTripEvent} from '../temp-data-factory';

export default class MainPresenter {
  #timeFiltersPresenter = new TimeFiltersPresenter();
  #eventsSortBarPresenter = new TripEventsSortbarPresenter();
  #eventListPresenter = new TripEventListPresenter([]);

  init(){
    this.#timeFiltersPresenter.init();
    this.#eventsSortBarPresenter.init();
    this.#eventListPresenter.init();
    this.#eventListPresenter.addTripEvent(createRandomTripEvent());
    this.#eventListPresenter.addTripEvent(createRandomTripEvent());
  }
}
