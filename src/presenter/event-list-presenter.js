import {createElement, render} from '../render.js';
import TimeFiltersView from '../view/time-filters-view';
import TripEventsSortbarView from '../view/trip-events-sortbar-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripEventView from '../view/trip-event-view';
import EventEditView from '../view/event-edit-form/event-edit-view';

export default class EventListPresenter {
  #tripEventsSortBar = new TripEventsSortbarView();
  #tripEventsListView = new TripEventsListView();
  #timeFiltersView = new TimeFiltersView();
  addTripEvent(tripEvent){
    const tripEventView = new TripEventView(tripEvent);
    const editView = new EventEditView(tripEvent);
    this.#tripEventsListView.add(tripEventView);

    const replaceEventViewWithEditView = () => {
      tripEventView.element.replaceWith(editView.element);
    };

    const replaceEditViewWithEventView = () => {
      editView.element.replaceWith(tripEventView.element);
    };

    const editEventFormEscapeKeyHandler = (evt) => {
      if (evt.key === 'Escape' || evt.keyCode === 38) {
        evt.preventDefault();
        replaceEditViewWithEventView();
        document.body.removeEventListener('keydown', editEventFormEscapeKeyHandler);
        // eslint-disable-next-line no-use-before-define
        editView.element.removeEventListener('submit', editEventFormSubmitHandler);
      }
    };

    const editEventFormSubmitHandler = (evt) => {
      evt.preventDefault();
      replaceEditViewWithEventView();
      document.body.removeEventListener('keydown', editEventFormEscapeKeyHandler);
      editView.element.removeEventListener('submit', editEventFormSubmitHandler);
    };

    const tripEventUnwrapButtonHandler = (evt)=>{
      evt.preventDefault();
      replaceEventViewWithEditView();
      document.body.addEventListener('keydown', editEventFormEscapeKeyHandler);
      editView.setFormSubmitHandler(editEventFormSubmitHandler);
    };

    tripEventView.setUnwrapHandler(tripEventUnwrapButtonHandler);
  }

  init(){
    // Фильтры
    const filtersParentElement = document.querySelector('.trip-controls__filters');
    render(this.#timeFiltersView, filtersParentElement);
    const eventListParentElement = document.querySelector('.trip-events');

    if(this.#tripEventsListView.isEmpty()) {
      showWelcomeMessage();
    } else {
      //Сортировка
      render(this.#tripEventsListView, eventListParentElement);
      // Список
      render(this.#tripEventsListView, eventListParentElement);
    }
    // render(this.#tripEventsListView, eventListParentElement);
    // // Список
    // render(this.#tripEventsListView, eventListParentElement);
    // this.addTripEvent(createRandomTripEvent());
    // for (let i = 0; i < 3; i++) {
    //   this.addTripEvent(createRandomTripEvent());
    // }
  }
}

function showWelcomeMessage() {
  const eventListParentElement = document.querySelector('.trip-events');
  const welcomeMessageElement = createElement('<p class="trip-events__msg">Click New Event to create your first point</p>');
  eventListParentElement.insertAdjacentElement('beforeend', welcomeMessageElement);
}
