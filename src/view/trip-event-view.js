import AbstractView from './abstract-view.js';
import {TripEvent} from '../model/trip-event';

const createEventTemplate = (event) => (
  `<div class="event">
      <time class="event__date" datetime="2019-03-18">${event.startDateTime.getDay()}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event.eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event.eventType} ${event.getDestination().name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${event.startDateTime.getHours()}:${event.startDateTime.getMinutes()}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${event.endDateTime.getHours()}:${event.endDateTime.getMinutes()}</time>
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
    </div>`
);

export default class TripEventView extends AbstractView {
  tripEvent;

  get template() {
    return createEventTemplate(this.tripEvent);
  }

  constructor(tripEvent) {
    super();
    this.tripEvent = tripEvent;
  }
}
