/* form-list.html script */
function addItem() {
  let fullName = document.getElementById("full_name").value;
  let id = document.getElementById("form_id").value;

  let fullNamePattern = /[a-zA-Z0-9]+/;
  let idPattern = /[0-9]+/;

  if (fullNamePattern.test(fullName) && idPattern.test(id)) {
    let itemList = document.getElementById("item_list");
    let li = document.createElement("li");
    li.innerHTML = "Name: " + fullName + "&nbsp;  &nbsp; &nbsp; ID: " + id + "";
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
      li.parentNode.removeChild(li);
    };
    li.appendChild(deleteButton);
    itemList.appendChild(li);

    // Reset input fields
    document.getElementById("full_name").value = "";
    document.getElementById("form_id").value = "";
  } else {
    if (!fullNamePattern.test(fullName)) {
      alert("Name must contain at least one alphanumeric character.");
    }
    if (!idPattern.test(form_id)) {
      alert("ID must contain only and at least one numeric character.");
    }
  }
}

/* timer.html script */
let timerInterval;
let seconds = 0;

window.onload = function () {
  window.onload = function () {
    let navigationEntries = window.performance.getEntriesByType("navigation");
    if (
      navigationEntries.length > 0 &&
      navigationEntries[0].type === "reload"
    ) {
      clearInterval(timerInterval);
      document.getElementById("timer_counter").style.display = "none";
    }
  };
};

function startTimer() {
  stopTimer();
  timerInterval = setInterval(updateTimer, 1000);
  document.getElementById("timer_heading").style.display = "none"; 
  document.getElementById("timer_counter").style.display = "inline";
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resumeTimer() {
  clearInterval(timerInterval); // Clear any existing interval
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  document.getElementById("timer_counter").textContent = seconds;
  document.getElementById("timer_heading").style.display = "inline";
  document.getElementById("timer_counter").style.display = "none";
}

function updateTimer() {
  seconds++;
  document.getElementById("timer_counter").textContent = seconds;
}
