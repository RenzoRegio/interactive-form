const nameField = document.querySelector('input[type="text"]');
const email = document.querySelector("#email");
const jobRoleOption = document.querySelector("#title");
const otherJobRoleInput = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const activitiesContainer = document.querySelector("#activities");
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

window.onload = () => {
  nameField.focus();
  otherJobRoleInput.style.display = "none";
  colorSelect.parentNode.style.display = "none";
  document.querySelector('[value="credit-card"]')["selected"] = true;
  payPalContainer.style.display = "none";
  bitCoinContainer.style.display = "none";
};

jobRoleOption.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRoleInput.style.display = "";
  } else {
    otherJobRoleInput.style.display = "none";
  }
});

designSelect.addEventListener("change", (e) => {
  colorSelect.parentNode.style.display = "";
  const colorOptions = colorSelect.children;
  for (let total = 0; total < colorOptions.length; total++) {
    colorOptions[total].style.display = "none";
    if (e.target.value === "heart js") {
      for (let i = 4; i < colorOptions.length; i++) {
        colorOptions[i].style.display = "";
      }
    } else if (e.target.value === "js puns") {
      for (let j = 0; j < 4; j++) {
        colorOptions[j].style.display = "";
      }
    }
  }
});

/**
 *
 */

activitiesContainer.addEventListener("change", (e) => {
  let clickedValue = parseInt(e.target.getAttribute("data-cost"));
  const activity = document.querySelectorAll("[data-day-and-time]");
  const selected = e.target.getAttribute("data-day-and-time");
  for (let i = 0; i < activity.length; i++) {
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
    activitiesTotalCost += clickedValue;
  } else {
    activitiesTotalCost -= clickedValue;
  }
  activitiesCost.textContent = `Total: $${activitiesTotalCost}`;
});

/**
 *
 * @param {*} element
 */

function removeDisplay(element) {
  element.style.display = "none";
}

function showDisplay(element) {
  element.style.display = "";
}

/**
 *
 */

paymentSelect.addEventListener("change", (e) => {
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
 *
 * @param {*} regex
 * @param {*} element
 */
function regexValidation(regex, element) {
  return regex.test(element.value);
}

/**
 *
 */

form.addEventListener("submit", (e) => {
  function invalidate(element, num) {
    element.parentNode.className = "not-valid";
    element.className = "box-validation";
    hints[num].classList.remove("hint");
  }
  function validate(element) {
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
 *
 */

const activitiesInput = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < activitiesInput.length; i++) {
  activitiesInput[i].addEventListener("focus", (e) => {
    e.target.parentNode.className = "focus";
  });
  activitiesInput[i].addEventListener("blur", () => {
    activitiesInput[i].parentNode.className = "";
  });
}

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
 *
 */

email.addEventListener("keyup", () => {
  const emailError = document.querySelector(".js-email");
  if (!email.value.includes("@")) {
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
});
