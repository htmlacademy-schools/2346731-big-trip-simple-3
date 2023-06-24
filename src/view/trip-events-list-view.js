import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createListTemplate = () => (`
  <ul class="trip-events__list"></ul>
`);


export default class TripEventsListView extends AbstractStatefulView {
  get template() {
    return createListTemplate();
  }

  isEmpty(){
    if (!this.element) {
      return true;
    }
    const tripEventListChildren = this.element.children;
    for (const child of tripEventListChildren){
      if (child.tagName === 'li'){
        return false;
      }
    }
    return true;
  }

  _restoreHandlers() {
    return undefined;
  }
}
