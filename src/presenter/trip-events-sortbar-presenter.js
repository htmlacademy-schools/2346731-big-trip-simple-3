import TripEventsSortbarView from '../view/trip-events-sortbar-view';
import {render} from '../render';

export default class TripEventsSortbarPresenter {
  #eventsSortbarView = new TripEventsSortbarView();

  init(){
    const sortbarParentElement = document.querySelector('.trip-events');
    render(this.#eventsSortbarView, sortbarParentElement);
  }
}
