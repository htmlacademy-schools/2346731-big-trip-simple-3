import TimeFiltersPresenter from './time-filters-presenter';
import TripEventListPresenter from './trip-event-list-presenter';

export default class MainPresenter {
  #timeFiltersModel;
  #tripEventListModel;
  #timeFiltersPresenter;
  #tripEventListPresenter;

  constructor(timeFiltersModel, tripEventListModel) {
    this.#timeFiltersModel = timeFiltersModel;
    this.#tripEventListModel = tripEventListModel;
    this.#timeFiltersPresenter = new TimeFiltersPresenter(timeFiltersModel);
    this.#tripEventListPresenter = new TripEventListPresenter(this.#tripEventListModel);
    this.#timeFiltersModel.addObserver(this.#tripEventListModel.filterChangeObserver);
    this.#tripEventListModel.addObserver(this.#tripEventListPresenter.updateViewObserver);
  }

  init(){
    this.#timeFiltersPresenter.init();
    this.#tripEventListPresenter.init();
  }
}
