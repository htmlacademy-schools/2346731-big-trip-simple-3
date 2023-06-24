import {convertToEventDate, convertToTime} from '../utils/date-time';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createEventTemplate = (event) => {
  if (event.isDisabled) {
    return '<div class="event"></div>';
  }
  return `<div class="event">
      <time class="event__date" datetime="${convertToEventDate(event.startDateTime)}">${convertToEventDate(event.startDateTime)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event.eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event.eventType} ${event.getDestination().name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${convertToTime(event.startDateTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${convertToTime(event.endDateTime)}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${event.price.value}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${event.price.value}</span>
        </li>
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`;
};

export default class TripEventView extends AbstractStatefulView {
  tripEvent;

  get template() {
    return createEventTemplate(this.tripEvent);
  }

  constructor(tripEvent) {
    super();
    this.tripEvent = tripEvent;
  }

  setUnwrapHandler = (callback)=>{
    this._callback.unwrap = callback;
    const tripEventUnwrapButton = this.element.querySelector('.event__rollup-btn');
    tripEventUnwrapButton.addEventListener('click', this.#unwrapHandler);
  };

  #unwrapHandler = (evt) => {
    evt.preventDefault();
    this._callback.unwrap(evt);
  };

  _restoreHandlers() {
    if(this.tripEvent.isDisabled){
      return;
    }
    this.setUnwrapHandler(this._callback.unwrap);
  }
}
