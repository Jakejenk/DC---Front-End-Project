console.log("sanity check");

fetch("https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2019", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "ce6a7de74fmshdd457dee571ad31p15544ejsnf2f72efbc613"
  }
})
  .then(response => {
    return response.json();
  })
  .then(response => {
    console.log(response);
    displayTeamData(response);
  });

loadBetData = () => {
  fetch(
    "https://odds.p.rapidapi.com/v1/odds?sport=soccer_epl&region=eu&mkt=spreads&dateFormat=iso&oddsFormat=american",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "ce6a7de74fmshdd457dee571ad31p15544ejsnf2f72efbc613",
        "x-rapidapi-host": "odds.p.rapidapi.com"
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .then(betResponse => {
      console.log(betResponse.data);
      //   loadBetData(betResponse, "fetchid");
    });
};

loadBetData();

function displayTeamData(response) {
  const teams = response.response;
  let teamDropDown = document.getElementById("teamOptions");
  for (let i = 0; i < teams.length; i++) {
    let teamOptions = teams[i].team.name;
    let el = document.createElement("option");
    el.value = teams[i].team.id;
    el.innerText = teamOptions;
    teamDropDown.appendChild(el);
  }
  let result = teamDropDown.value;
  teamDropDown.addEventListener("click", e => {
    let teamId = e.target.value;
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamId}&league=39&season=2019`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": "ce6a7de74fmshdd457dee571ad31p15544ejsnf2f72efbc613"
        }
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  });
}
