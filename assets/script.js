// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $("button").on("click", function(event) {
    var buttonElement = $(this);
    var parentContainer = buttonElement.parent();
    var textareaContent = parentContainer.find('.description').val();
    console.log(textareaContent);
    localStorage.setItem(parentContainer.attr('id'), textareaContent);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // Function to update the time-block colors

  function updateColors() {

    // Get the current time

    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var isPM = currentHour >= 12;

    // Iterate through each time-block element

    $(".time-block").each(function(index, element) {
      var elementHour = parseInt($(element).attr("id").split("-")[1]);
      var isElementPM = elementHour >= 12;

      // Compare the current time with the element's time

      if ((isElementPM && currentHour > elementHour) || (!isElementPM && currentHour >= elementHour)) {

        // Past hour

        $(element).addClass("past").removeClass("present future");
      } else if (currentHour === elementHour) {

        // Current hour

        $(element).addClass("present").removeClass("past future");
      } else {

        // Future hour

        $(element).addClass("future").removeClass("past present");
      }
    });
  }

  // Initial update on page load

  updateColors();

  // Set up an interval to update colors every minute, 60000 milliseconds = 1 minute

  setInterval(updateColors, 60000);

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    var savedContent = localStorage.getItem(blockId);

    if (savedContent) {
      $(this).find(".description").val(savedContent);
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  
  var today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY h:mm A'));
});
