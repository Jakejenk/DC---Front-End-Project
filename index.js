// const data = null;

// const xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === this.DONE) {
//     console.log(this.responseText);
//   }
// });

// xhr.open(
//   "GET",
//   "https://odds.p.rapidapi.com/v1/odds?sport=soccer_epl&region=uk&mkt=h2h&dateFormat=iso&oddsFormat=decimal"
// );
// xhr.setRequestHeader(
//   "x-rapidapi-key",
//   "4058387ef9msh153247a8cc0ae8bp114b7ejsn04ba7f02c7ad"
// );
// xhr.setRequestHeader("x-rapidapi-host", "odds.p.rapidapi.com");

// xhr.send(data);

console.log("sanity check");

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
      console.log(betResponse);
      //   loadBetData(betResponse, "fetchid");
    });
};

loadBetData();
