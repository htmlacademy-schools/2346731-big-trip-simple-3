import {createElement, render} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view';
import TripEventPresenter from './trip-event-presenter';
import TripEventsSortbarView from '../view/trip-events-sortbar-view';
import {compareByDay, compareByPrice, sortList} from '../framework/utils/events-sort-module';

function showWelcomeMessage() {
  const eventListParentElement = document.querySelector('.trip-events');
  const welcomeMessageElement = createElement('<p class="trip-events__msg">Click New Event to create your first point</p>');
  eventListParentElement.insertAdjacentElement('beforeend', welcomeMessageElement);
}

//---------------------------------------------------------

export default class TripEventListPresenter {
  #sortbarView = new TripEventsSortbarView();
  #tripEventsListView = new TripEventsListView();
  #presenters = [];


  constructor(tripEventsArray) {
    this.#sortbarView.setChangeHandler(this.sort);
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

  sort = (evt) => {
    const listElement = this.#tripEventsListView.element;
    const sortingType = evt.target.value;
    switch (sortingType) {
      case ('sort-day'):
        sortList(listElement, compareByDay);
        break;
      case ('sort-event'):
        break;
      case ('sort-time'):
        break;
      case ('sort-price'):
        sortList(listElement, compareByPrice);
        break;
      case ('sort-offers'):
        break;
      default:
    }
  };

  init(){
    //Sort
    const sortbarParentElement = document.querySelector('.trip-events');
    render(this.#sortbarView, sortbarParentElement);
    //TripEventsList
    const eventListParentElement = document.querySelector('.trip-events');
    if(this.#tripEventsListView.isEmpty()) {
      showWelcomeMessage();
    }
    render(this.#tripEventsListView, eventListParentElement);
  }
}
