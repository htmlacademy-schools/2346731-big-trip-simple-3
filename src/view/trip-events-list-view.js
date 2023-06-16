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
    const welcomeMessage = document.querySelector('.trip-events__msg');
    if(welcomeMessage){
      welcomeMessage.remove();
    }
    const listElement = createElement(createEventTemplate());
    render(tripEventView, listElement);
    this.getElement().append(listElement);
  }

  isEmpty(){
    if (!this.getElement()) {
      return true;
    }
    const tripEventListChildren = this.getElement().children;
    for (const child of tripEventListChildren){
      if (child.tagName === 'li'){
        return false;
      }
    }
    return true;
  }
}

export class EmptyListMessage{
  get template(){
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }
}
