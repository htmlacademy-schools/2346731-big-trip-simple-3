
const getOfferTemplate = (offer) => (`
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">Add luggage</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price.value}</span>
  </label>
</div>
`
);

const getOffersTemplate = (offers) => {
  let template = '';
  for (const offer of offers) {
    template += getOfferTemplate(offer);
  }
  // offers.forEach((offer)=>(template += getOfferTemplate(offer)));
  return template;
};

const getEventDetailsTemplate = (event) => (`
  <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${getOffersTemplate(event.getOffers())}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
                  </section>
                </section>
`);

export default class EventDetailsView {
  getTemplate(tripEvent){
    return getEventDetailsTemplate(tripEvent);
  }
}
