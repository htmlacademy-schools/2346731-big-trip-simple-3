const EVENTTYPE = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECKIN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};
class Destination{
  bio;
  name;
  photos;
}
class Offer{
  type;
  description;
  price;
}
export class Price{
  value;
  currency;

  constructor(value, currency) {
    this.value = value;
    this.currency = currency;
  }

  getString(){
    return this.value + this.currency;
  }
}
class TripEvent{

  type;
  set eventType (type) {
    if (Object.values(EVENTTYPE).includes(type)){
      this.type = type;
    }
  }

  get eventType() {
    return this.type;
  }

  #destination;
  setDestination(destination){
    if (destination instanceof Destination){
      this.#destination = destination;
    }
  }

  getDestination(){
    return this.#destination;
  }

  #offers = [];

  getOffers(){
    return this.#offers.slice(0);
  }

  setOffers(offers){
    if (Array.isArray(offers) && offers.every((offer) => offer instanceof Offer)) {
      this.#offers = offers;
    }
  }

  addOffer(offer){
    if (offer instanceof Offer){
      this.#offers.push(offer);
    }
  }

  startDateTime;
  endDateTime;
  price;
}

export {EVENTTYPE, Destination, Offer, TripEvent};
