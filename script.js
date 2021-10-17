// FUCNTION WHICH UPDATES THE DOM
function updateDOMwithData(json, timeframe) {
  const container = document.querySelector("#grid-container");

  // getting the profile element
  const profile = document.querySelector(".profile");
  // then clearing all stuff
  container.innerHTML = "";
  // inserting the profile element
  container.insertAdjacentElement("afterbegin", profile);

  // inserting all the cards according to the data given
  json.forEach((element) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
    <div class="card ${element.title.replace(" ", "-").toLowerCase()}">
      <div class="card-content">
        <div class="card-top-bar">
          <div class="card-title">${element.title}</div>
          <img class="ellipsis" src="./images/icon-ellipsis.svg" alt="ellipsis">
        </div>
        <h1 class="card-time">${element.timeframes[timeframe].current}hrs</h1>
        <p class="subtle">Last ${
          timeframe === "daily"
            ? "day"
            : timeframe === "weekly"
            ? "week"
            : timeframe === "monthly"
            ? "month"
            : "error"
        } - ${element.timeframes[timeframe].previous}hrs</p>
      </div>
    </div>
    `
    );
  });
}

// GETTING BUTTONS TO CHECK CLICKS
let currentTimeframe = "weekly";

const timeframeBtns = [...document.querySelectorAll(".profile-times")];
timeframeBtns.forEach((timeframeBtn) => {
  timeframeBtn.addEventListener("click", () => {
    currentTimeframe = timeframeBtn.innerHTML.toLowerCase();

    timeframeBtns.forEach((btn) => btn.classList.add("subtle"));
    timeframeBtn.classList.remove("subtle");

    fetch("./data.json") // returns a promise
      .then((response) => response.json()) // returns a promise
      .then((json) => updateDOMwithData(json, currentTimeframe)); // gets json as an arg
  });

  // timeframeBtn.classList.add("subtle");
  // if (timeframeBtn.innerHTML == currentTimeframe) {
  //   timeframeBtn.classList.remove("subtle");
  // }
});

// THE FETCH
fetch("./data.json") // returns a promise
  .then((response) => response.json()) // returns a promise
  .then((json) => updateDOMwithData(json, currentTimeframe)); // gets json as an arg
