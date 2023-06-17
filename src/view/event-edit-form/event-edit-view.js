import AbstractView from '../../framework/view/abstract-view.js';
import EventBioView from './event-bio-view';
import EventDetailsView from './event-details-view';

export default class EventEditView extends AbstractView{
  tripEvent;
  bioView = new EventBioView();
  detailsView = new EventDetailsView();
  getOffers(){

  }
  setOffers(){

  }
  getDestination(){

  }
  setDestination(){

  }

  get template() {
    return `<form className="event event--edit" action="#" method="post">
  ${this.bioView.getTemplate(this.tripEvent)}
  ${this.detailsView.getTemplate(this.tripEvent)}
</form>`;
  }

  constructor(tripEvent) {
    super();
    this.tripEvent = tripEvent;
  }
}
