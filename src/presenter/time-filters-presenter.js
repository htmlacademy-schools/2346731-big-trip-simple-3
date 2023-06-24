import TimeFiltersView from '../view/time-filters-view';
import {render} from '../framework/render';

export default class TimeFiltersPresenter {
  #timeFiltersView = new TimeFiltersView();
  #timeFiltersModel;

  constructor(timeFiltersModel) {
    this.#timeFiltersModel = timeFiltersModel;
    this.#timeFiltersView.setFilterChangeHandler(this.#filterChangeHandler);
  }

  init(){
    const filtersParentElement = document.querySelector('.trip-controls__filters');
    render(this.#timeFiltersView, filtersParentElement);
  }

  #filterChangeHandler = (evt)=>{
    this.#timeFiltersModel.selectedFilter = evt.target.value;
  };
}
