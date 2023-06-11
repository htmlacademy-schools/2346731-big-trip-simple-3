import AbstractView from '../abstract-view';
import EventBio from './event-bio';
import EventDetails from './event-details';

export default class EventEditView extends AbstractView{
  bio = new EventBio();
  details = new EventDetails();
  get template() {
    return `<form className="event event--edit" action="#" method="post">
  ${this.bio}
  ${this.details}
</form>`;
  }
}
