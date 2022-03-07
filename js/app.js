// global variables
const infoContainerId = document.getElementById("info-container");
const error = document.getElementById("error");
const detailsContainerId = document.getElementById("detailsId");

// fetch search api
const loadApi = () => {
  infoContainerId.innerHTML = "";
  detailsContainerId.innerHTML = "";

  const searchId = document.getElementById("search-text");
  const searchValue = searchId.value;
  const searchtext = parseInt(searchId.value);

  //error handle
  if (searchId.value == "") {
    error.innerText = "Please Enter Phone name!";
  } else if (isNaN(searchtext) == false) {
    error.innerText = "Invalid Phone Name!";
  }
  //for valid input
  else {
    error.innerText = "";
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => showInfo(data.data));
  }
  searchId.value = "";
};

// show information of search value
const showInfo = (data) => {
  infoContainerId.innerHTML = "";
  //   check for no match found
  if (data.length == 0) {
    error.innerText = "No DataFound!!";
  }
  data.forEach((element, index, arr) => {
    //   controll iteration of for each loop
    if (index >= 19) {
      arr.length = index + 1;
    }
    // create new div to contain search info
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="col bg-light p-2 rounded mcard">
          <div class="d-flex flex-column justify-content-center">
            <img src="${element.image}" class="card-img-top w-75 mx-auto" alt="..." />
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <h5 class="card-title">Name: <span class="h5">${element.phone_name}</span></h5>
            <h5 class="card-title">Brand: <span class="h5">${element.brand}</span></h5>
            <button type="button" class="btn btn-outline-info" onclick="loadDetail('${element.slug}')">See Detail</button>
            </div>
          </div>
        </div>
      `;
    infoContainerId.appendChild(div);
  });
};
// load detail information
const loadDetail = (data) => {
  const url = `https://openapi.programming-hero.com/api/phone/${data}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data.data));
};
// show phone details dunction
const showDetails = (data) => {
  detailsContainerId.innerHTML = "";
  //   release date handle
  let date = data.releaseDate;
  if (date == "") {
    date = "No relese date found!";
  } else {
    date = data.releaseDate;
  }
  //   get others object value using external function
  const otherInfo = getOthers(data.others);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card mb-3 bg-light">
        <div class="row g-0">
          <div class="col-md-12 col-lg-2 col-sm-12 col-12 d-flex justify-content-center align-items-center">
            <img src="${data.image}" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-12 col-lg-5 col-sm-12 col-12 d-flex justify-content-center align-items-center">
            <div class="card-body">
              <h5 class="card-title text-info"><span class="h5">Product Name: </span>${data.name}</h5>
              <h6>
                <span class="h5">Release Date:</span>
                <span id="date">${date}</span>
                
              </h6>
              <h6 class="h5">Features:</h6>
              <ul>
                <li><span class="fw-bold">Chip Set-</span>${data.mainFeatures.chipSet}</li>
                <li><span class="fw-bold">Memory-</span>${data.mainFeatures.memory}</li>
                <li><span class="fw-bold">Storage-</span>${data.mainFeatures.storage}</li>
                <li><span class="fw-bold">Display Size-</span>${data.mainFeatures.displaySize}</li>
              </ul>
            </div>
          </div>
          <div class="col-md-12 col-lg-5 col-sm-12 col-12 d-flex justify-content-center align-items-center">
            <ul>
              <li><span class="fw-bold">Sensor-</span>${data.mainFeatures.sensors}</li>
              <li><span class="fw-bold">Others-</span>${otherInfo}</li>
            </ul>
          </div>
        </div>
      </div>
  `;
  detailsContainerId.appendChild(div);
};

// handle others values
const getOthers = (data) => {
  let text = "";
  if (data == undefined) {
    text += `No available information found!`;
  } else {
    for (const keys in data) {
      text += `${keys}: ${data[keys]}.    `;
    }
  }
  return text;
};
