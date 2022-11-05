// Global variables
const apiKey = "8SwsfpAgMhBu45ikVWZDANcFdUQJSXVyrwmhNjss";
const apiURL = "https://api.nasa.gov/planetary/apod";

let thisMonth = new Date().getMonth() + 1;

// Functions
let getMonthPics = () => {
  // Add the spinner to the DOM

  fetch(
    `${apiURL}?api_key=${apiKey}&start_date=2022-${thisMonth}-01&thumbs=true`
  )
    .then((response) => response.json())
    .then((data) => {
      // Place the ids on an array
      displayPictures(data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally
    // Close the spinner
    ();
};

let displayPictures = (data) => {
  let thumbsDiv = document.querySelector("#thumbs");

  let imgUrl = "";
  let mediaType = (picture) => {
    if (picture.media_type === "video") {
      imgUrl = picture.thumbnail_url;
    } else {
      imgUrl = picture.url;
    }
    return imgUrl;
  };

  if (Array.isArray(data)) {
    let picsArr = data
      .map((pic) => {
        mediaType(pic);
        return `<div><h3>Date:</h3>
        <p>${pic.date}</p>
        <img src="${imgUrl}" alt="" />
        <h3>Explanation</h3>
        <p>${pic.explanation}</p></div>`;
      })
      .join("");

    thumbsDiv.innerHTML += picsArr;
  } else {
    thumbsDiv.innerHTML = "";
    let picObj = data;
    mediaType(data);
    let picContainer = `<div><h3>Date:</h3>
        <p>${picObj.date}</p>
        <img src="${imgUrl}" alt="" />
        <h3>Explanation</h3>
        <p>${picObj.explanation}</p></div>`;
    thumbsDiv.innerHTML = picContainer;
  }
};

let selectedDate;
let dateInput = document.querySelector("#date-input");

let getSelectedDate = dateInput.addEventListener("change", () => {
  selectedDate = dateInput.value;
});

let getPicture = () => {
  // Add the spinner to the DOM

  fetch(`${apiURL}?api_key=${apiKey}&date=${selectedDate}&thumbs=true`)
    .then((response) => response.json())
    .then((data) => {
      // Place the ids on an array
      displayPictures(data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally
    // Close the spinner
    ();
};

let requestBtn = document.querySelector("#btn");
requestBtn.addEventListener("click", getPicture);
