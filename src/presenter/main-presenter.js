import TimeFiltersPresenter from './time-filters-presenter';
import TripEventListPresenter from './trip-event-list-presenter';
import {createRandomTripEvent} from '../temp-data-factory';

export default class MainPresenter {
  #timeFiltersPresenter = new TimeFiltersPresenter();
  #eventListPresenter = new TripEventListPresenter([createRandomTripEvent(), createRandomTripEvent()]);

  init(){
    this.#timeFiltersPresenter.init();
    this.#eventListPresenter.init();
    this.#eventListPresenter.addTripEvent(createRandomTripEvent());
    this.#eventListPresenter.addTripEvent(createRandomTripEvent());
  }
}
