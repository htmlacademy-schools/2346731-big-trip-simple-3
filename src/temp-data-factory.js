import {Destination, EVENTTYPE, Offer, TripEvent, Price} from './model/trip-event';

const randomOfferDescriptions = ['Add luggage','Add meal','Switch to comfort class'];
const cities = ['Rome','Berlin','Paris','Madrid','Prague','Vienna','Munchen','Helsinki'];
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomString(){
  const loremIpsum = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
  const sentences = loremIpsum.split('.');
  return sentences[getRandomInt(sentences.length - 1)];
}
function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomEventType(){
  return EVENTTYPE[getRandomProperty(EVENTTYPE)];
}

function getRandomDestination(){
  const destination = new Destination();
  destination.bio = getRandomString();
  destination.name = cities[getRandomInt(cities.length - 1)];
  destination.photos = [`img/${getRandomInt(3) + 1}.jpg`];
  return destination;
}

function getRandomOffer(){
  const offer = new Offer();
  offer.type = getRandomEventType();
  offer.description = randomOfferDescriptions[getRandomInt(randomOfferDescriptions.length - 1)];
  offer.price = new Price(getRandomInt(50) + 1, 'USD');
  return offer;
}

export function createRandomTripEvent(){
  const newEvent = new TripEvent();
  newEvent.eventType = getRandomEventType();
  newEvent.setDestination(getRandomDestination());
  newEvent.addOffer(getRandomOffer());
  newEvent.addOffer(getRandomOffer());
  newEvent.startDateTime = new Date();
  newEvent.endDateTime = new Date();
  newEvent.price = new Price(getRandomInt(1500) + 1, 'EUR');
  return newEvent;
}
