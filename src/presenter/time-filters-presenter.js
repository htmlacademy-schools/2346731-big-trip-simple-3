import TimeFiltersView from '../view/time-filters-view';
import {render} from '../framework/render';

export default class TimeFiltersPresenter {
  #timeFiltersView = new TimeFiltersView();

  init(){
    const filtersParentElement = document.querySelector('.trip-controls__filters');
    render(this.#timeFiltersView, filtersParentElement);
  }
}
