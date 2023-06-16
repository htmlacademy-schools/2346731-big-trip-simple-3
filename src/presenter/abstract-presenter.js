import {createElement, render} from '../render.js';
import TimeFiltersView from '../view/time-filters-view';
import TripEventsSortbarView from '../view/trip-events-sortbar-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripEventView from '../view/trip-event-view';
import EventEditView from '../view/event-edit-form/event-edit-view';
import {createRandomTripEvent} from '../temp-data-factory';
export default class AbstractPresenter {
  #tripEventsSortBar = new TripEventsSortbarView();
  #tripEventsListView = new TripEventsListView();
  addTripEvent(tripEvent){
    const tripEventView = new TripEventView(tripEvent);
    const editView = new EventEditView(tripEvent);
    this.#tripEventsListView.add(tripEventView);

    const replaceEventViewWithEditView = () => {
      tripEventView.getElement().replaceWith(editView.getElement());
    };

    const replaceEditViewWithEventView = () => {
      editView.getElement().replaceWith(tripEventView.getElement());
    };

    const editEventFormEscapeKeyHandler = (evt) => {
      if (evt.key === 'Escape' || evt.keyCode == '38') {
        evt.preventDefault();
        replaceEditViewWithEventView();
        document.body.removeEventListener('keydown', editEventFormEscapeKeyHandler);
      }
    };

    const editEventFormSubmitHandler = (evt) => {
      evt.preventDefault();
      replaceEditViewWithEventView();
      document.body.removeEventListener('keydown', editEventFormEscapeKeyHandler);
    };

    const tripEventUnwrapButtonHandler = (evt)=>{
      evt.preventDefault();
      replaceEventViewWithEditView();
      document.body.addEventListener('keydown', editEventFormEscapeKeyHandler);
    };

    const tripEventUnwrapButton = tripEventView.getElement().querySelector('.event__rollup-btn');
    tripEventUnwrapButton.addEventListener('click', tripEventUnwrapButtonHandler);
  }

  init(){
    // Фильтры
    const filtersParentElement = document.querySelector('.trip-controls__filters');
    render(new TimeFiltersView(), filtersParentElement);

    const eventListParentElement = document.querySelector('.trip-events');

    //Сортировка
    render(this.#tripEventsListView, eventListParentElement);
    // Список
    render(this.#tripEventsListView, eventListParentElement);
    this.addTripEvent(createRandomTripEvent());
    //3хТочка Маршрута
    for (let i = 0; i < 3; i++) {
      this.addTripEvent(createRandomTripEvent());
    }

  }
}
