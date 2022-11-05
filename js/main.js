// Global variables
const apiKey = "8SwsfpAgMhBu45ikVWZDANcFdUQJSXVyrwmhNjss";
const apiURL = "https://api.nasa.gov/planetary/apod";

let thisMonth = new Date().getMonth() + 1;
let today = new Date().toISOString().slice(0, 10);

let loading = document.querySelector("#loading");

// Functions
let getMonthPics = () => {
  // Add the spinner to the DOM
  loading.classList.add("loading");

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
    .finally(
      // Close the spinner
      loading.classList.remove("loading")
    );
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
    thumbsDiv.innerHTML = "";
    let picsArr = data
      .map((pic) => {
        mediaType(pic);
        return `<div class="thumb"><div class="details"><h3>Date:</h3>
        <p>${pic.date}</p></div><div class="details"><h3>Title:</h3><p>${pic.title}</p></div><img src="${imgUrl}" alt="" />
        <h3>Explanation</h3>
        <p>${pic.explanation}</p></div>`;
      })
      .join("");

    thumbsDiv.innerHTML += picsArr;
  } else {
    thumbsDiv.innerHTML = "";
    let picObj = data;
    mediaType(data);
    let picContainer = `<div class="thumb"><div class="details"><h3>Date:</h3>
        <p>${picObj.date}</p></div><div class="details"><h3>Title:</h3><p>${picObj.title}</p></div><img src="${imgUrl}" alt="" />
        <h3>Explanation</h3>
        <p>${picObj.explanation}</p></div>`;
    thumbsDiv.innerHTML = picContainer;
  }
};

let selectedDate;
let dateInput = document.querySelector("#date-input");
dateInput.setAttribute("max", today);
dateInput.setAttribute("value", today);

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

let singleRequestBtn = document.querySelector("#single");
singleRequestBtn.addEventListener("click", getPicture);

let monthRequestBtn = document.querySelector("#month");
monthRequestBtn.addEventListener("click", getMonthPics);
