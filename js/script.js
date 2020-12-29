const nameField = document.querySelector('input[type="text"]');
const email = document.querySelector("#email");
const jobRoleOptions = document.querySelector("#title");
const otherJobRoleInput = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const activitiesContainer = document.querySelector("#activities");
const activitiesInput = document.querySelectorAll("input[type='checkbox']");
const activitiesCost = document.querySelector("#activities-cost");
const payPalContainer = document.querySelector("#paypal");
const bitCoinContainer = document.querySelector("#bitcoin");
const creditCardContainer = document.querySelector("#credit-card");
const paymentSelect = document.querySelector("#payment");
const form = document.querySelector("[novalidate]");
const creditCardBox = document.querySelector(".credit-card-box");
const zipNum = document.querySelector("#zip");
const cvvNum = document.querySelector("#cvv");
const ccNum = document.querySelector("#cc-num");
const hints = document.querySelectorAll(".hint");

let activitiesTotalCost = 0;

/**
 * Default when the page loads - configures the attributes of different elements to focused, displayed, or selected.
 */

window.onload = () => {
  nameField.focus();
  otherJobRoleInput.style.display = "none";
  colorSelect.parentNode.style.display = "none";
  document.querySelector('[value="credit-card"]')["selected"] = true;
  payPalContainer.style.display = "none";
  bitCoinContainer.style.display = "none";
};

/**
 * jobRoleOptions listens for a change event and if a change event occurs and the value is 'other', the otherJobRoleInput field will be displayed.
 */

jobRoleOptions.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRoleInput.style.display = "";
  } else {
    otherJobRoleInput.style.display = "none";
  }
});

/**
 * Listens for a change event and displays the corresponding elements values.
 */

designSelect.addEventListener("change", (e) => {
  colorSelect.parentNode.style.display = "";
  const colorOptions = colorSelect.children;
  for (let total = 0; total < colorOptions.length; total++) {
    colorOptions[total].style.display = "none";
    if (e.target.value === "heart js") {
      //Only displays the colors of the 'heart js' theme.
      for (let i = 4; i < colorOptions.length; i++) {
        colorOptions[i].style.display = "";
      }
    } else if (e.target.value === "js puns") {
      //Only displays the colors of the 'js puns' theme.
      for (let j = 0; j < 4; j++) {
        colorOptions[j].style.display = "";
      }
    }
  }
});

/**
 * activitiesContainer listens for a change event. When a change is detected an element containing the same workshop time is disabled (if true) and the total cost is either added or subtracted.
 */

activitiesContainer.addEventListener("change", (e) => {
  let clickedValue = parseInt(e.target.getAttribute("data-cost"));
  const activity = document.querySelectorAll("[data-day-and-time]");
  const selected = e.target.getAttribute("data-day-and-time");
  for (let i = 0; i < activity.length; i++) {
    //If an element is chosen and another element contains the same 'data-day-and-time' attribute, it disables the unchosen element so that it cannot not be selected with the element that has the same workshop time.
    const time = activity[i].getAttribute("data-day-and-time");
    e.target.parentNode.className = "";
    if (selected === time) {
      e.target.parentNode.className = "";
      if (e.target.checked) {
        activity[i].parentNode.className = "disabled";
      } else if (!e.target.checked) {
        activity[i].parentNode.className = "";
      }
    }
  }
  if (e.target.checked) {
    //Retrieves the value of the checked input and adds that value to the total cost.
    activitiesTotalCost += clickedValue;
  } else {
    //Retrieves the value of the unchecked input and subtracts that value to the total cost.
    activitiesTotalCost -= clickedValue;
  }
  activitiesCost.textContent = `Total: $${activitiesTotalCost}`;
});

/**
 * Select element for payment listens for a change event. When a change event occurs, certain payment methods are either shown or hidden.
 */

paymentSelect.addEventListener("change", (e) => {
  function removeDisplay(element) {
    element.style.display = "none";
  }

  function showDisplay(element) {
    element.style.display = "";
  }
  showDisplay(creditCardContainer);
  removeDisplay(payPalContainer);
  removeDisplay(bitCoinContainer);
  if (e.target.value === "paypal") {
    showDisplay(payPalContainer);
    removeDisplay(creditCardContainer);
  }
  if (e.target.value === "bitcoin") {
    showDisplay(bitCoinContainer);
    removeDisplay(creditCardContainer);
  }
});

/**
 * Listens for the submit event for the whole form and validates if each of the field's requirements have been fulfilled. If not, then an error will be displayed. If it is then a green check icon will be displayed next to the label of the input.
 */

form.addEventListener("submit", (e) => {
  function regexValidation(regex, element) {
    //Validates if the input's value fulfills the regex parameter and returns true or false.
    return regex.test(element.value);
  }

  function invalidate(element, num) {
    //For elements that returned false after regexValidation - provides the error layout for the specified element.
    element.parentNode.className = "not-valid";
    element.className = "box-validation";
    hints[num].classList.remove("hint");
    document.documentElement.scrollTop = 0;
  }
  function validate(element) {
    //For elements that returned true after regexValidation - provides the valid layout for the specified element.
    element.parentNode.className = "valid";
    element.className = "";
    element.nextElementSibling.style.display = "none";
  }
  e.preventDefault();
  const activityHeader = activitiesContainer.firstElementChild;
  for (let i = 0; i < hints.length; i++) {
    if (nameField.value === "") {
      invalidate(nameField, 0);
    } else {
      validate(nameField);
    }
    if (!regexValidation(/^[^@]+@\w+\.\w+/, email)) {
      invalidate(email, i);
    } else {
      validate(email, i);
    }
    if (activitiesCost.textContent === "Total: $0") {
      activityHeader.className = "not-valid";
      hints[i].classList.remove("hint");
    } else {
      activitiesCost.nextElementSibling.style.display = "none";
      activityHeader.className = "valid";
    }
    if (!regexValidation(/^\d{13,16}$/, ccNum)) {
      invalidate(ccNum, i);
    } else {
      validate(ccNum);
    }
    if (!regexValidation(/^\d{5}$/, zipNum)) {
      invalidate(zipNum, i);
    } else {
      validate(zipNum);
    }
    if (!regexValidation(/^\d{3}$/, cvvNum)) {
      invalidate(cvvNum, i);
    } else {
      validate(cvvNum);
    }
  }
});

/**
 * Contains two event listeners for the input elements of the activities section wherein the first listens for a focus event and adds the 'focus' class name while the second listens for a blur event and removes the 'focus' class name.
 */

for (let i = 0; i < activitiesInput.length; i++) {
  activitiesInput[i].addEventListener("focus", (e) => {
    e.target.parentNode.className = "focus";
  });
  activitiesInput[i].addEventListener("blur", () => {
    activitiesInput[i].parentNode.className = "";
  });
}

/**
 * Listens for the "keyup" event on all of the inputs of the creditCardBox. If the value of the input contains anything that is not a number then an error message will be shown.
 */

creditCardBox.addEventListener("keyup", () => {
  const errorMessage = document.querySelectorAll(".js-error");
  for (let i = 0; i < errorMessage.length; i++) {
    if (isNaN(ccNum.value)) {
      errorMessage[0].style.display = "block";
    } else {
      errorMessage[0].style.display = "none";
    }
    if (isNaN(zipNum.value)) {
      errorMessage[1].style.display = "block";
    } else {
      errorMessage[1].style.display = "none";
    }
    if (isNaN(cvvNum.value)) {
      errorMessage[2].style.display = "block";
    } else {
      errorMessage[2].style.display = "none";
    }
  }
});

/**
 * Listens for the "keyup" event on the email' input value and if it does not include the @ symbol then it will display the custom error.
 */

email.addEventListener("keyup", () => {
  const emailError = document.querySelector(".js-email");
  if (!email.value.includes("@")) {
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
});

/**
 * Listens for the "keyup" event on the other job role's input value. If it includes the same value in any of the select options textContent then it will display the custom error.
 */

otherJobRoleInput.addEventListener("keyup", () => {
  const options = document.querySelectorAll("[data-js]");
  const otherError = document.querySelector(".js-other");
  function repeatedValue() {
    for (let i = 0; i < options.length; i++) {
      const val = options[i].textContent
        .toLowerCase()
        .includes(otherJobRoleInput.value.toLowerCase());
      if (val && otherJobRoleInput.value !== "") {
        return true;
      }
    }
  }
  if (repeatedValue()) {
    otherError.style.display = "block";
  } else {
    otherError.style.display = "none";
  }
});
