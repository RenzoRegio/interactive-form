const nameField = document.querySelector('input[type="text"]');
const jobRoleOption = document.querySelector("#title");
const otherJobRoleInput = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const activities = document.querySelector("#activities");
const cc = document.querySelector('[value="credit-card"]');
const payPalContainer = document.querySelector("#paypal");
const bitCoinContainer = document.querySelector("#bitcoin");
const creditCardContainer = document.querySelector("#credit-card");
const paymentSelect = document.querySelector("#payment");
const form = document.querySelector("[novalidate]");
const email = document.querySelector("#email");
const activitiesCost = document.querySelector("#activities-cost");

window.onload = () => {
  nameField.focus();
  otherJobRoleInput.style.display = "none";
  colorSelect.parentNode.style.display = "none";
  cc["selected"] = true;
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

let value = 0;

activities.addEventListener("change", (e) => {
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
  let currentValue = parseInt(e.target.getAttribute("data-cost"));
  if (e.target.checked) {
    value += currentValue;
  } else {
    value -= currentValue;
  }
  document.querySelector("#activities-cost").textContent = `Total: $${value}`;
});

paymentSelect.addEventListener("change", (e) => {
  creditCardContainer.style.display = "";
  payPalContainer.style.display = "none";
  bitCoinContainer.style.display = "none";

  if (e.target.value === "paypal") {
    payPalContainer.style.display = "";
    creditCardContainer.style.display = "none";
  }
  if (e.target.value === "bitcoin") {
    bitCoinContainer.style.display = "";
    creditCardContainer.style.display = "none";
  }
});

function validate() {
  const regex = /^[^@]+@\w+\.\w+/;
  return regex.test(email.value);
}

function ccVal() {
  const number = /^\d{13,16}$/;
  const ccNum = document.querySelector("#cc-num");
  return number.test(ccNum.value);
}

function zipVal() {
  const number = /^\d{5}$/;
  const zip = document.querySelector("#zip");
  return number.test(zip.value);
}

function cvvVal() {
  const number = /^\d{3}$/;
  const cvv = document.querySelector("#cvv");
  return number.test(cvv.value);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValid = validate();
  const ccNum = ccVal();
  const zipValid = zipVal();
  const cvvValid = cvvVal();
  if (nameField.value === "") {
    nameField.className = "notValidated";
  }
  if (!emailValid) {
    email.className = "notValidated";
  }
  if (activitiesCost.textContent === "Total: $0") {
    const activityHeader = activities.firstElementChild;
    activityHeader.textContent = "*Please choose at least one activity*";
    activityHeader.className = "not-valid";
  }
  if (!ccNum) {
    const cc = document.querySelector("#cc-num");
    cc.className = "notValidated";
  }
  if (!zipValid) {
    const zip = document.querySelector("#zip");
    zip.className = "notValidated";
  }
  if (!cvvValid) {
    const cvv = document.querySelector("#cvv");
    cvv.className = "notValidated";
  } else {
    cvv.className = "";
  }
});
