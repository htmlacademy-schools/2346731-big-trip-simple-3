import TripEventView from '../view/trip-event-view';
import EventEditView from '../view/event-edit-form/event-edit-view';

export default class TripEventPresenter{
  tripEventObject;
  eventListPresenter;
  tripEventView;
  editView;
  actualView;

  constructor(tripEvent, eventListPresenter) {
    this.tripEventObject = tripEvent;
    this.eventListPresenter = eventListPresenter;
    this.tripEventView = new TripEventView(tripEvent);
    this.editView = new EventEditView(tripEvent);
    this.actualView = this.tripEventView;
    this.setupHandlers();
  }

  resetToTripEventView(){
    if (this.actualView === this.editView){
      this.replaceEditViewWithEventView();
    }
  }

  replaceEventViewWithEditView = () => {
    this.eventListPresenter.resetAllEventPresentersToEventView();
    this.tripEventView.element.replaceWith(this.editView.element);
    this.actualView = this.editView;
  };

  replaceEditViewWithEventView = () => {
    this.editView.element.replaceWith(this.tripEventView.element);
    this.actualView = this.tripEventView;
  };


  //-----Handlers-handling=)---------------------------------
  setupHandlers(){
    this.tripEventView.setUnwrapHandler(this.tripEventUnwrapButtonHandler);
    this.editView.setEventTypeChangeHandler(this.eventTypeChangeHandler);
    this.editView.setDestinationChangeHandler(this.destinationChangeHandler);
  }

  eventTypeChangeHandler = (evt) => {
    this.tripEventObject.setOffers();
    this.editView.update(this.tripEventObject);
  };

  destinationChangeHandler = (evt) => {
    this.tripEventObject.update(this.tripEventObject);
  };

  editEventFormEscapeKeyHandler = (evt) => {
    if (evt.key === 'Escape' || evt.keyCode === 38) {
      evt.preventDefault();
      this.replaceEditViewWithEventView();
      document.body.removeEventListener('keydown', this.editEventFormEscapeKeyHandler);
      // eslint-disable-next-line no-use-before-define
      this.editView.element.removeEventListener('submit', this.editEventFormSubmitHandler);
    }
  };

  editEventFormSubmitHandler = (evt) => {
    evt.preventDefault();
    this.replaceEditViewWithEventView();
    document.body.removeEventListener('keydown', this.editEventFormEscapeKeyHandler);
    this.editView.element.removeEventListener('submit', this.editEventFormSubmitHandler);
  };

  tripEventUnwrapButtonHandler = (evt)=>{
    evt.preventDefault();
    this.replaceEventViewWithEditView();
    document.body.addEventListener('keydown', this.editEventFormEscapeKeyHandler);
    this.editView.setFormSubmitHandler(this.editEventFormSubmitHandler);
  };
}
