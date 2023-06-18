import {compareDates} from './date-time';


const compareByDay = (eventA, eventB) => {
  const timeA = eventA.querySelector('time').dateTime;
  const timeB = eventB.querySelector('time').dateTime;
  return compareDates(timeA, timeB);
};
const compareByPrice = (eventA, eventB) => {
  const numberA = parseInt(eventA.querySelector('.event__price-value').innerText, 10);
  const numberB = parseInt(eventB.querySelector('.event__price-value').innerText, 10);
  return numberA < numberB ;
};

function sortList(list, comparator) {
  if (list.length < 2) {
    return;
  }
  let items, i, shouldSwitch;
  let switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    items = list.querySelectorAll('.trip-events__item');
    // Loop through all list items:
    for (i = 0; i < (items.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      if (comparator(items[i], items[i + 1])) {
        /* If next item is compared lower than current item,
        mark as a switch and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      items[i].parentNode.insertBefore(items[i + 1], items[i]);
      switching = true;
    }
  }
}

export {sortList, compareByPrice, compareByDay};
