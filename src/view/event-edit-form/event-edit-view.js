import EventBioView from './event-bio-view';
import EventDetailsView from './event-details-view';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';


export default class EventEditView extends AbstractStatefulView{
  #tripEvent;
  #bioView;
  #detailsView;
  #startDatePicker;
  #endDatePicker;

  constructor(tripEvent) {
    super();
    this.#bioView = new EventBioView(tripEvent);
    this.#detailsView = new EventDetailsView(tripEvent);
    this.#tripEvent = tripEvent;
    this.#setDatePickers();
    this._setState(EventEditView.parseEventToState(tripEvent));
  }

  get template() {
    return `<form class="event event--edit" action="#" method="post">
  ${this.#bioView.template}
  ${this.#detailsView.template}
</form>`;
  }

  _restoreHandlers() {
    this.#setDatePickers();
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatePicker) {
      this.#startDatePicker.destroy();
      this.#startDatePicker = null;
    }

    if (this.#endDatePicker) {
      this.#endDatePicker.destroy();
      this.#endDatePicker = null;
    }
  }

  #setDatePickers = () => {
    this.#startDatePicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this.#tripEvent.startDateTime,
        onChange: this.#startDateChangeHandler,
      }
    );
    this.#endDatePicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this.#tripEvent.endDateTime,
        minDate: this.#tripEvent.startDateTime,
        onChange: this.#endDateChangeHandler,
      }
    );
  };

  #startDateChangeHandler = ([userDate]) => {
    if (userDate) {
      this.#tripEvent.startDateTime = userDate.toISOString();
      this.#endDatePicker.set('minDate', userDate);
    }
    this.updateElement({});
  };

  #endDateChangeHandler = ([userDate]) => {
    if (userDate) {
      this.#tripEvent.startDateTime = userDate.toISOString();
    }
  };

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

  static parseEventToState(tripEvent) {
    return {
      ...tripEvent,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    const tripEvent = {...state};
    delete tripEvent.isDisabled;
    delete tripEvent.isSaving;
    delete tripEvent.isDeleting;
    return tripEvent;
  }
}
