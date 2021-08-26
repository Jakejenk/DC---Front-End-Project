console.log("sanity check");
//fills in Team name after change event
let captureTeam = "";

async function loadTeamNames() {
  //collects api team data
  await fetch(
    "https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2019",
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
    .then(response => {
      displayDropDown(response);
    });
  // Fills team Names in drop down menue the loadTeamNames function fires the below to fill in the data
  function displayDropDown(response) {
    const teams = response.response;
    let teamDropDown = document.getElementById("teamOptions");
    for (let i = 0; i < teams.length; i++) {
      let teamName = teams[i].team.name;
      let el = document.createElement("option");
      el.value = teamName;
      el.innerText = teamName;
      teamDropDown.appendChild(el);
    }

    teamDropDown.addEventListener("change", e => {
      console.log(e);
      let teamId = teamDropDown.value;
      captureTeam = teamDropDown.value;
      fetch(
        `https://api-football-v1.p.rapidapi.com/v3/teams?name=${teamId}&league=39&season=2019`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "6400f3fcefmshf14cd58e6a8360fp173368jsn4cb37f9ff815"
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result);
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

      //     <div class="card" style="width: 18rem;">
      //   <img src="..." class="card-img-top" alt="...">
      //   <div class="card-body">
      //     <h5 class="card-title">Card title</h5>
      //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      //     <a href="#" class="btn btn-primary">Go somewhere</a>
      //   </div>
      // </div>
    }
  }
}
async function loadBetData() {
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
      console.log(response);
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
