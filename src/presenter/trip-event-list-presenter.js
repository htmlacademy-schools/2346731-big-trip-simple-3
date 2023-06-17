import {createElement, render} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view';
import TripEventPresenter from './trip-event-presenter';

export default class TripEventListPresenter {
  #tripEventsListView = new TripEventsListView();
  #presenters = [];


  constructor(tripEventsArray) {
    for (const tripEvent of tripEventsArray) {
      this.addTripEvent(tripEvent);
    }
  }

  addTripEvent(tripEvent){
    const eventPresenter = new TripEventPresenter(tripEvent, this);
    this.#tripEventsListView.add(eventPresenter.tripEventView);
    this.#presenters.push(eventPresenter);
  }

  resetAllEventPresentersToEventView(){
    for (const presenter of this.#presenters) {
      presenter.resetToTripEventView();
    }
  }

  init(){
    const eventListParentElement = document.querySelector('.trip-events');
    if(this.#tripEventsListView.isEmpty()) {
      showWelcomeMessage();
    }
    render(this.#tripEventsListView, eventListParentElement);
  }
}

function showWelcomeMessage() {
  const eventListParentElement = document.querySelector('.trip-events');
  const welcomeMessageElement = createElement('<p class="trip-events__msg">Click New Event to create your first point</p>');
  eventListParentElement.insertAdjacentElement('beforeend', welcomeMessageElement);
}
