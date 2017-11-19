// Task: We have a shopping list. Each list item contains a link.
// When the user clicks on that link, to indicate they have completed the task
// We want the item to be removed from the list

// First, declare a function, to get the element the user clicked on
//  - as per event delegation formula.
// Benefit of event delegation: memory and performance, as we are only responding to one element.
// Also, the function checks if there is no event object >(!e)
// - event objects (e) aren't supported by IE
// If not, get target of event using old IE 'event' object
function getTarget(e) {
  if (!e) {
    e = window.event;
  }
  return e.target || e.srcElement;
}

function itemDone(e) {
  // Create a function that removes the item from the list
  // Our function requires three pieces of information
  var target, elParent, elGrandparent;
  // Target holds the element the user clicked on, call getTarget()
  // It will be one of the links <a> which the <li> elements contain
  target = getTarget(e);
  // elParent holds that element's parent (the <li> element)
  // - as per event delegation formula: we attached one event listener to an ancestor
  // Thus responding to only one element
  // Instead of placing event listeners on links in each <li> element of our <ul> shopping list
  // And we use the event object's (e) target property to see which of its children (li) the event happened on
  elParent = target.parentNode;
  //elGrandparent holds that element's grandparent(the <ul> element)
  elGrandparent = target.parentNode.parentNode;
  // User completed the task: the <li> with its link is removed from our shopping list (<ul>)
  elGrandparent.removeChild(elParent);

  // Prevent the links from taking you elsewhere
  // Check if the browser supports preventDefault()
  // If so, use it. If no, use the older IE returnValue property
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
} // End of our itemDone() function

// Set up event listeners to call itemDone() on click
// i.e. when user completes the task and we want to remove the element in question
// First, get the <ul>, our shopping list
// As our event listener will be added to it
var el = document.getElementById("shopping-list");
// Check whether or not the browser supports addEventListener()
// If so, use it to call our itemDone() function when the user clicks anywhere on that list
// If not, use the old IE AttachEvent method
if (el.addEventListener) {
  el.addEventListener(
    "click",
    function(e) {
      // Don't forget to pass in the event object (e) as the parameter - or it won't work!
      // Use anon function as a second argument, as we have our named function itemDone(e)
      // We want this anon function() to be wrapped around our named itemDone(e) function
      // - as per formula for using parameters with event handlers and listeners, p. 256
      itemDone(e);
      // Use bubbling phase for flow, from child to ancestor
    },
    false
  );
} else {
  el.attachEvent("onclick", function(e) {
    itemDone(e);
  });
}
