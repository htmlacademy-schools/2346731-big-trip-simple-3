import {createElement, render} from '../render.js';
import TripEventsListView from '../view/trip-events-list-view';
import TripEventPresenter from './trip-event-presenter';
import TripEventsSortbarView from '../view/trip-events-sortbar-view';
import {
  comparePresentersByDay,
  comparePresentersByPrice,
  sortList
} from '../utils/events-sort-module';

function showWelcomeMessage() {
  const eventListParentElement = document.querySelector('.trip-events');
  const welcomeMessageElement = createElement('<p class="trip-events__msg">Click New Event to create your first point</p>');
  eventListParentElement.insertAdjacentElement('beforeend', welcomeMessageElement);
}

const createListItemTemplate = () => (`
  <li class="trip-events__item"></li>
`);

//---------------------------------------------------------

export default class TripEventListPresenter {
  #sortbarView;
  #tripEventsListView;
  #tripEventsArray = [];
  #presenters = [];


  constructor(tripEventsArray) {
    this.#sortbarView = new TripEventsSortbarView();
    this.#sortbarView.setChangeHandler(this.sortHandler);
    this.#tripEventsListView = new TripEventsListView();
    for (const tripEvent of tripEventsArray) {
      this.#tripEventsArray.push(tripEvent);
      const eventPresenter = new TripEventPresenter(tripEvent, this);
      this.#presenters.push(eventPresenter);
    }
  }

  resetAllEventPresentersToEventView(){
    for (const presenter of this.#presenters) {
      presenter.resetToTripEventView();
    }
  }

  sortHandler = (evt) => {
    const sortingType = evt.target.value;
    let comparator;
    switch (sortingType){
      case('sort-day'):{
        comparator = comparePresentersByDay;
        break;
      }
      case('sort-price'):{
        comparator = comparePresentersByPrice;
        break;
      }
      default: {
        comparator = comparePresentersByDay;
        break;
      }
    }
    this.#presenters = sortList(this.#tripEventsListView.element, this.#presenters, comparator);
  };

  init(){
    //Sort
    const sortbarParentElement = document.querySelector('.trip-events');
    render(this.#sortbarView, sortbarParentElement);
    //TripEventsList
    const eventListParentElement = document.querySelector('.trip-events');
    render(this.#tripEventsListView, eventListParentElement);
    for (const presenter of this.#presenters) {
      const listItemElement = createElement(createListItemTemplate());
      this.#tripEventsListView.element.insertAdjacentElement('beforeend',listItemElement);
      render(presenter.actualView, listItemElement);
    }
    if(this.#tripEventsListView.isEmpty()) {
      showWelcomeMessage();
    }
  }
}
