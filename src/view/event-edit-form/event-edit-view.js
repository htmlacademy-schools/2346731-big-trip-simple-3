import EventBioView from './event-bio-view';
import EventDetailsView from './event-details-view';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

export default class EventEditView extends AbstractStatefulView{
  tripEvent;
  bioView = new EventBioView();
  detailsView = new EventDetailsView();

  constructor(tripEvent) {
    super();
    this.tripEvent = tripEvent;
  }

  get template() {
    return `<form class="event event--edit" action="#" method="post">
  ${this.bioView.getTemplate(this.tripEvent)}
  ${this.detailsView.getTemplate(this.tripEvent)}
</form>`;
  }

  _restoreHandlers() {
    return undefined;
  }

  setDestinationChangeHandler = (callback) => {
    this._callback.destinationChange = callback;
    const destinationInput = this.element.querySelector('.event__input--destination');
    destinationInput.addEventListener('change', this.#eventTypeChangeHandler);
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.destinationChange(evt);
  };

  setEventTypeChangeHandler = (callback) => {
    this._callback.eventTypeChange = callback;
    const radios = this.element.querySelectorAll('.event__type-list input');
    for (const radio of radios) {
      radio.addEventListener('change', this.#eventTypeChangeHandler);
    }
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.eventTypeChange(evt);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(evt);
  };
}
