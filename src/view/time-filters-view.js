import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio"
           name="trip-filter" value="everything">
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
           value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`
);

export default class TimeFiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }

  setFilterChangeHandler = (callback)=>{
    this._callback.filterChange = callback;
    const filtersInputs = this.element.querySelectorAll('.trip-filters__filter-input');
    for (const filterInput of filtersInputs) {
      filterInput.addEventListener('change', this.#filterChangeHandler);
    }
  };

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterChange(evt);
  };
}
