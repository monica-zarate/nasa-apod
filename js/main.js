// Global variables
const apiKey = "8SwsfpAgMhBu45ikVWZDANcFdUQJSXVyrwmhNjss";
const endpoint = "https://api.nasa.gov/planetary/apod";

let thisMonth = new Date().getMonth() + 1;
console.log(thisMonth);
let thisMonthsPics = [];

// Functions

let getPictures = () => {
  // Add the spinner to the DOM

  fetch(
    `${endpoint}?api_key=${apiKey}&start_date=2022-${thisMonth}-01&thumbs=true`
  )
    .then((response) => response.json())
    .then((data) => {
      // Place the ids on an array
      console.log(data);
      displayPictures(data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally
    // Close the spinner
    ();
};

let displayPictures = (picsArr) => {
  let thumbs = picsArr
    .map((pic) => {
      let correctUrl = "";
      if (pic.media_type === "video") {
        correctUrl = pic.thumbnail_url;
      } else {
        correctUrl = pic.url;
      }
      return `<div><h3>Date:</h3>
        <p>${pic.date}</p>
        <img src="${correctUrl}" alt="" />
        <h3>Explanation</h3>
        <p>${pic.explanation}</p></div>`;
    })
    .join("");

  document.querySelector("#thumbs").innerHTML += thumbs;
};
