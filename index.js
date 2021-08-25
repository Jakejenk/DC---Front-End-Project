console.log("sanity check");
let captureTeam = "Manchester City";
fetch("https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2019", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "6400f3fcefmshf14cd58e6a8360fp173368jsn4cb37f9ff815"
  }
})
  .then(response => {
    return response.json();
  })
  .then(response => {
    displayDropDown(response);
  });

// fetch(
//   "https://odds.p.rapidapi.com/v1/odds?sport=soccer_epl&region=eu&mkt=spreads&dateFormat=iso&oddsFormat=american",
//   {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "6400f3fcefmshf14cd58e6a8360fp173368jsn4cb37f9ff815",
//       "x-rapidapi-host": "odds.p.rapidapi.com"
//     }
//   }
// )
//   .then(response => {
//     console.log(response);
//     return response.json();
//   })
//   .then(betResponse => {
//     loadBetData(betResponse);
//   });

function displayDropDown(response) {
  const teams = response.response;
  let teamDropDown = document.getElementById("teamOptions");
  for (let i = 0; i < teams.length; i++) {
    let teamName = teams[i].team.name;
    let el = document.createElement("option");
    el.value = teams[i].team.id;
    el.innerText = teamName;
    teamDropDown.appendChild(el);
  }

  teamDropDown.addEventListener("change", e => {
    console.log(e);
    let teamId = parseInt(teamDropDown.value);
    // console.log(e.target.label);
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamId}&league=39&season=2019`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": "6400f3fcefmshf14cd58e6a8360fp173368jsn4cb37f9ff815"
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(result => {
        displayTeamData(result);
      })
      .catch(err => {
        console.error(err);
      });
    loadBetData();
  });
  function displayTeamData(result) {
    const teamInfo = result.response[0].team;
    const venueInfo = result.response[0].venue;
    const teamContainer = document.getElementById("team-container");
    // for (let i = 0; i < teamInfo.length; i++) {
    //   let div = document.createElement("div");
    //   div.teamContainer.appendChild();
    // }
  }
}
async function loadBetData(betResponse) {
  await fetch(
    "https://odds.p.rapidapi.com/v1/odds?sport=soccer_epl&region=eu&mkt=spreads&dateFormat=iso&oddsFormat=american",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6400f3fcefmshf14cd58e6a8360fp173368jsn4cb37f9ff815",
        "x-rapidapi-host": "odds.p.rapidapi.com"
      }
    }
  )
    .then(response => {
      // console.log(response);
      return response.json();
    })
    .then(betResponse => {
      displayBetData(betResponse);
    });
}

function displayBetData(betResponse) {
  let filterTeamName = betResponse.data.filter(team => {
    return team.home_team === captureTeam;
  });
  console.log(filterTeamName);
}
