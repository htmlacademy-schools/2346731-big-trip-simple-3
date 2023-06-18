import {compareDates} from './date-time';


const comparePresentersByDay = (presenterA, presenterB) => {
  const timeA = presenterA.tripEventObject.startDateTime;
  const timeB = presenterB.tripEventObject.startDateTime;
  return compareDates(timeA, timeB);
};
const comparePresentersByPrice = (presenterA, presenterB) => {
  const priceA = presenterA.tripEventObject.price.value;
  const priceB = presenterB.tripEventObject.price.value;
  return priceA < priceB ;
};
const compareListElementsByDay = (elementA, elementB) => elementA.startDateTime.getTime() > elementB.startDateTime.getTime();
const compareListElementsByPrice = (elementA, elementB) => {
  const priceA = Number.parseInt(elementA.querySelector('.event__price-value').innerText, 10);
  const priceB = Number.parseInt(elementB.querySelector('.event__price-value').innerText, 10);
  return priceA < priceB;
};

function sortList(list, presentersList, comparator) {
  if (list.length < 2) {
    return;
  }
  let listItems, i, shouldSwitch;
  let switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    listItems = list.querySelectorAll('.trip-events__item');
    // Loop through all list items:
    for (i = 0; i < (listItems.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      if (comparator(presentersList[i], presentersList[i + 1])) {
        /* If next item is compared lower than current item,
        mark as a switch and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      listItems[i].parentNode.insertBefore(listItems[i + 1], listItems[i]);
      [presentersList[i], presentersList[i + 1]] = [presentersList[i + 1], presentersList[i]];
      switching = true;
    }
  }
  return presentersList;
}

export {sortList, comparePresentersByPrice, comparePresentersByDay, compareListElementsByDay, compareListElementsByPrice};
