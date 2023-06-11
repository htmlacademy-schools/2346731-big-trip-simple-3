import AbstractView from './abstract-view.js';
import {createElement, render} from '../render';

const createListTemplate = () => (`
  <ul class="trip-events__list"></ul>
`);

const createEventTemplate = () => (`
  <li class="trip-events__item"></li>
`);

export default class TripEventsListView extends AbstractView {
  get template() {
    return createListTemplate();
  }

  add(tripEventView){
    const listElement = createElement(createEventTemplate());
    render(tripEventView, listElement);
    this.getElement().append(listElement);
  }
}
