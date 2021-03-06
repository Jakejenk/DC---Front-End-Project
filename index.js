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
        "x-rapidapi-key": "ce6a7de74fmshdd457dee571ad31p15544ejsnf2f72efbc613"
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
    // event listener calls upon both
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
              "ce6a7de74fmshdd457dee571ad31p15544ejsnf2f72efbc613"
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

    //Displays Team Data in the Team container via
    async function displayTeamData() {
      await fetch(
        "https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2019",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "ce6a7de74fmshdd457dee571ad31p15544ejsnf2f72efbc613",
            "x-rapidapi-host": "odds.p.rapidapi.com"
          }
        }
      )
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(result => {
          displayTeamData(result);
        });
    }

    function displayTeamData(result) {
      const teamInfo = result.response[0].team.name;
      const venueInfo = result.response[0].venue.name;
      const teamContainer = document.getElementById("team-container");
      console.log(teamInfo);

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
        "x-rapidapi-key": "ce6a7de74fmshdd457dee571ad31p15544ejsnf2f72efbc613",
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

  let bettingSites = filterTeamName[0].sites;
  console.log(bettingSites);
  let awayTeam = filterTeamName[0].teams[0];
  let homeTeam = filterTeamName[0].teams[1];
  let matchUp = `${homeTeam} VS ${awayTeam}`;

  function makeBetsDisplay() {
    for (let i = 0; i < bettingSites.length; i++) {
      const betsContainer = document.getElementById("bets-container");
      // create card
      const cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "card w-75 m-2 shadow p-3 rounded");

      // create card body
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.setAttribute("class", "card-body");

      // create card title
      // const cardHeader = document.createElement("div");
      // cardHeader.setAttribute("class", "card-header text-white bg-primary");
      // cardHeader.setAttribute("href",`https://${websites}`);
      const websites = bettingSites[i].site_nice;
      // cardHeader.append(<a href="`https://${websites}`"/>);
      // Create anchor element.
      var cardHeader = document.createElement("a");
      cardHeader.setAttribute("class", "card-header text-white bg-primary");

      // Create the text node for anchor element.
      var link = document.createTextNode(`https://${websites}`);

      // Append the text node to anchor element.
      cardHeader.appendChild(link);

      // Set the title.
      cardHeader.title = `https://${websites}`;

      // Set the href property.
      cardHeader.href = `https://${websites}`;

      // create card subtitle (matchup)
      const cardSubTitle = document.createElement("div");
      cardSubTitle.setAttribute("class", "card-subtitle mb-2 text-black");
      cardSubTitle.append(`${matchUp}`);

      // create card odds and points section
      const odds = bettingSites[i].odds.spreads.odds;
      const homeOdds = odds[1];
      const awayOdds = odds[0];
      const points = bettingSites[i].odds.spreads.points;
      const homePoints = points[1];
      const awayPoints = points[0];
      const cardTextOdds = document.createElement("p");
      const cardTextPoints = document.createElement("p");
      cardTextOdds.setAttribute("class", "card-text card-decoration-none");
      cardTextPoints.setAttribute("class", "card-text card-decoration-none");
      cardTextOdds.append(`Home Odds: ${homeOdds} VS Away Odds: ${awayOdds}
      `);
      cardTextPoints.append(
        `Home Points: ${homePoints} VS Away Points: ${awayPoints}`
      );

      // append cards to container
      cardDiv.append(cardBodyDiv);
      cardDiv.append(cardHeader);
      cardBodyDiv.append(cardSubTitle);
      cardBodyDiv.append(cardTextOdds);
      cardBodyDiv.append(cardTextPoints);
      betsContainer.append(cardDiv);
    }
  }
  return makeBetsDisplay();
}
