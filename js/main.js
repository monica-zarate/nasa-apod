// Monica Zarate - A01310492
// App Development Strategy 1 - Assignment 3

// Hello and welcome to NASA's Picture of the Day!
// API Documentation URL: https://github.com/nasa/apod-api

// Global variables
const apiKey = "8SwsfpAgMhBu45ikVWZDANcFdUQJSXVyrwmhNjss";
const apiURL = "https://api.nasa.gov/planetary/apod";

let thisMonth = new Date().getMonth() + 1;
let today = new Date().toISOString().slice(0, 10);

// DOM elements
let loading = document.querySelector("#loading");
let dateInput = document.querySelector("#date-input");
let thumbsDiv = document.querySelector("#thumbs");

// Dynamically setting today as the max range for the date picker and as value when the page loads
dateInput.setAttribute("max", today);
dateInput.setAttribute("value", today);

// Functions

// getToday() will retrieve today's picture
let getToday = () => {
  // Add spinner to the DOM
  loading.classList.add("loading");

  fetch(`${apiURL}?api_key=${apiKey}&date=${today}&thumbs=true`)
    .then((response) => response.json())
    .then((data) => {
      displayPictures(data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      // Close the spinner
      loading.classList.remove("loading");
    });
};

// We call getToday() when the DOM is rendered
window.addEventListener("load", getToday);

// getMonthPics() will retrieve the current month's pictures
let getMonthPics = () => {
  // Add the spinner to the DOM
  loading.classList.add("loading");

  fetch(
    `${apiURL}?api_key=${apiKey}&start_date=2022-${thisMonth}-01&thumbs=true`
  )
    .then((response) => response.json())
    .then((data) => {
      displayPictures(data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      // Close the spinner
      loading.classList.remove("loading");
    });
};

// We call getMonthPics() when the "See this month's pictures" button is clicked
document.querySelector("#month").addEventListener("click", getMonthPics);

// getPicture() will retrieve a specific day's picture
let getPicture = () => {
  // Add the spinner to the DOM
  loading.classList.add("loading");
  let selectedDate = dateInput.value;

  fetch(`${apiURL}?api_key=${apiKey}&date=${selectedDate}&thumbs=true`)
    .then((response) => response.json())
    .then((data) => {
      displayPictures(data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(
      // Close the spinner
      () => {
        loading.classList.remove("loading");
      }
    );
};

// getPicture() is called when the user clicks the "Find" button
document.querySelector("#single").addEventListener("click", getPicture);

// displayPictures is a function that gets called every time we make a request to the API in order to display the results on the DOM
let displayPictures = (data) => {
  // If the data we receive is an array (Pictures of this month will return an array of objects), we map out the array to print a card per object. If we receive a single object (for Today's Picture or a Specific Day) we print one card only.
  if (Array.isArray(data)) {
    thumbsDiv.innerHTML = "";

    let picsArr = data
      .map((pic) => {
        cardContent(pic);
      })
      .join("");

    thumbsDiv.innerHTML += picsArr;
  } else {
    thumbsDiv.innerHTML = "";

    cardContent(data);
  }
};

// cardContent() is a function that creates an instance of the html template and populates the card content accordingly
let cardContent = (data) => {
  // Is today's photo not up yet, or was an invalid date entered somehow?
  if (data.code === 404 || data.code === 400) {
    let picContainer = document.querySelector("#not-found");

    const clone = picContainer.content.cloneNode(true);

    thumbsDiv.appendChild(clone);
  } else {
    // If the Picture of the Day is actually a video, we display the video thumbnail image
    let imgUrl = "";

    let mediaType = (picture) => {
      if (picture.media_type === "video") {
        imgUrl = picture.thumbnail_url;
      } else {
        imgUrl = picture.url;
      }
      return imgUrl;
    };

    mediaType(data);

    let cardTemplate = document.querySelector("#thumb");

    const clone = cardTemplate.content.cloneNode(true);

    // Setting the card's content
    let date = clone.querySelector("#date");
    let title = clone.querySelector("#title");
    let imgSrc = clone.querySelector("#img");
    let expl = clone.querySelector("#expl");
    date.textContent = data.date;
    title.textContent = data.title;
    imgSrc.setAttribute("src", imgUrl);
    imgSrc.setAttribute("alt", data.title);
    expl.textContent = data.explanation;

    thumbsDiv.appendChild(clone);
  }
};
