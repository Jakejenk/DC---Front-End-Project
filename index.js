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
    displayDropDown(response);
  });

// loadBetData = () => {
//   fetch(
//     "https://odds.p.rapidapi.com/v1/odds?sport=soccer_epl&region=eu&mkt=spreads&dateFormat=iso&oddsFormat=american",
//     {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": "ce6a7de74fmshdd457dee571ad31p15544ejsnf2f72efbc613",
//         "x-rapidapi-host": "odds.p.rapidapi.com"
//       }
//     }
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(betResponse => {
//       console.log(betResponse.data);
//       //   loadBetData(betResponse, "fetchid");
//     });
// };

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
    // console.log(teamDropDown.value);
    let teamId = parseInt(teamDropDown.value);
    // console.log(teamId);
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
        return response.json();
      })
      .then(result => {
        // displayTeamData(result.response[0]);
        console.log(result);
        console.log(result.response[0]);
      })
      .catch(err => {
        console.error(err);
      });
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
