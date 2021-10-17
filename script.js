// FUCNTION WHICH UPDATES THE DOM
function updateData(json, timeframe) {
  const container = document.querySelector("#grid-container");

  json.forEach((element) => {
    container.innerHTML += `
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
    `;
  });
}

// GETTING BUTTONS TO CHECK CLICKS
let currentTimeframe = "weekly";
const [dailyBtn, weeklyBtn, MonthlyBtn] =
  document.querySelectorAll(".profile-times");

dailyBtn.addEventListener("click", () => {
  currentTimeframe = "daily";
  console.log("clickkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
});
weeklyBtn.addEventListener("click", () => {
  currentTimeframe = "weekly";
});
MonthlyBtn.addEventListener("click", () => {
  currentTimeframe = "monthly";
});

// THE FETCH
fetch("./data.json") // returns a promise
  .then((response) => response.json()) // returns a promise
  .then((json) => updateData(json, currentTimeframe)); // gets json as an arg
