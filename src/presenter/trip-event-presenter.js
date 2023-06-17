import TripEventView from '../view/trip-event-view';
import EventEditView from '../view/event-edit-form/event-edit-view';

export default class TripEventPresenter{
  eventListPresenter;
  tripEventView;
  editView;
  actualView;

  constructor(tripEvent, eventListPresenter) {
    this.eventListPresenter = eventListPresenter;
    this.tripEventView = new TripEventView(tripEvent);
    this.editView = new EventEditView(tripEvent);
    this.actualView = this.tripEventView;
    this.tripEventView.setUnwrapHandler(this.tripEventUnwrapButtonHandler);
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
