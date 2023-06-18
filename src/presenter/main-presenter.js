import TimeFiltersPresenter from './time-filters-presenter';
import TripEventListPresenter from './trip-event-list-presenter';
import {createRandomTripEvent} from '../temp-data-factory';

export default class MainPresenter {
  #timeFiltersModel;
  #tripEventListModel;

  constructor(timeFiltersModel, tripEventListModel) {
    this.#timeFiltersModel = timeFiltersModel;
    this.#tripEventListModel = tripEventListModel;
  }

  #timeFiltersPresenter = new TimeFiltersPresenter();
  #eventListPresenter = new TripEventListPresenter([createRandomTripEvent(), createRandomTripEvent(), createRandomTripEvent()]);

  init(){
    this.#timeFiltersPresenter.init();
    this.#eventListPresenter.init();
  }
}
