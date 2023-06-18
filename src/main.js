import MainPresenter from './presenter/main-presenter';
import TripEventListModel from './model/trip-event-list-model';
import {createRandomTripEvent} from './temp-data-factory';
import TimeFiltersModel from './model/time-filters-model';


const tripEventListModel = new TripEventListModel([createRandomTripEvent(), createRandomTripEvent()]);
const timeFiltersModel = new TimeFiltersModel(tripEventListModel);
const presenter = new MainPresenter(
  timeFiltersModel,
  tripEventListModel
);
presenter.init();
