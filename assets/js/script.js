const userFormEl = document.querySelector("#user-form");
const restaurantEl = document.querySelector("#zipcode-entry");
const restaurantContainerEl = document.querySelector("#restaurant-container");
const restaurantSearchTerm = document.querySelector("#restaurant-search-term");
let  subtitle = document.querySelector(".subtitle");
let  message = document.querySelector("#message");

const displayRestaurants = function(restaurants, zipcode) {
    // console.log(restaurants);
    // console.log(zipcode);

    // error handler: check if API returned any restaurant data
    if (restaurants.data.length === 0) {
        message.classList.add('hide');
        subtitle.classList.add('hide');
        restaurantContainerEl.textContent = "No restaurants found."
        return;
    }

    //clear old content every time search is performed
    restaurantContainerEl.textContent = "";
    //show on page which zip code is entered
    restaurantSearchTerm.textContent = zipcode;

    // loop over restaurants
    for (let i = 0; i < restaurants.data.length; i++) {
        // var random = Math.floor(Math.random() * 12)

        //create a constainer for each restaurant
        const resEl = document.createElement("div");
        resEl.classList = "list-item"


        //format the name line
        const restaurantName =  restaurants.data[i].restaurant_name;

        //create span to hold the name line
        const nameEl = document.createElement("span");
        nameEl.textContent = restaurantName;

        // append span
        resEl.appendChild(nameEl);

        //format address
        const address = restaurants.data[i].address.formatted;

        // add class to js 
        // have to declare the class in css

        //create p to hold address
        const addressEl = document.createElement("p");
        addressEl.textContent = address;

        //appendd p
        resEl.appendChild(addressEl);

        //format phone
        const phone = restaurants.data[i].restaurant_phone;

        //create p to hold phone
        const phoneEl = document.createElement("p");
        phoneEl.textContent = "Phone:"+  phone;

        //append
        resEl.appendChild(phoneEl);

        //format hours
        const hours = restaurants.data[i].hours;

        //create p to hold phone
        const hoursEl = document.createElement("p");
        if (hours) {
            hoursEl.textContent = "Hours: " + hours;
        } else {
            hoursEl.textContent = "Hours: Info not available."
        }
        
        //append
        resEl.appendChild(hoursEl);

        // append container
        restaurantContainerEl.appendChild(resEl);
    }
}

const getRestaurantInfo = function(zipcode) {
    // format the restaurant API url
    const apiUrl = 'https://api.documenu.com/v2/restaurants/zip_code/' + zipcode + '?key=793006f22693e3cf72dd2543359b45db'
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        //add zipcode not found error
        if (response.ok) {
            response.json().then(function(data) {
                displayRestaurants(data, zipcode);
            })
        } else {
            // alert("Error: zipcode info not found");
            //error text trigger
            const modalEl = document.createElement("p");
            // modalEl.classList = "waves-effect waves-light btn modal-trigger"
            modalEl.classList = "list-item"
            modalEl.textContent = "Error: zipcode info not found"
            restaurantContainerEl.appendChild(modalEl)
        }  
    })
    .catch(function(error) {
        // alert("Unable to connect to network");
        //error text trigger
        const modalEl = document.createElement("p");
        // modalEl.classList = "waves-effect waves-light btn modal-trigger"
        modalEl.classList = "list-item"
        modalEl.textContent = "Unable to connect to network"
        restaurantContainerEl.appendChild(modalEl)
    })
}

const formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from the input element
    const zipcode = restaurantEl.value.trim();

    if (zipcode) {
        getRestaurantInfo(zipcode);
        restaurantEl.value = "";

        // stops hiding subtitle and message from html 
        message.classList.remove('hide');
        subtitle.classList.remove('hide');
    } else {
        // alert("Please enter a zipcode")
        // error text trigger
        const modalEl = document.createElement("p");
        // modalEl.classList = "waves-effect waves-light btn modal-trigger"
        modalEl.classList = "list-item"
        modalEl.textContent = "Please enter a zipcode"
        restaurantContainerEl.appendChild(modalEl)
    }

    //local storage 
    localStorage.setItem("zipcode", JSON.stringify(zipcode));
    console.log(localStorage);
}

function myFunction() {
    var searchTerm = document.querySelector('#searchTerm').value;

    fetch(
        'https://api.giphy.com/v1/gifs/search?q=' +
          searchTerm +
          '&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
    )
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
         // console.log(response.data[0]);
          // Create a variable that will select the <div> where the GIF will be displayed
          var responseContainerEl = document.querySelector('#response-container');
    // Empty out the <div> before we append a GIF to it
    // the initial div that was searched for does not stay because this is used, it empties everything out
    responseContainerEl.innerHTML = '';


    var gifImg = document.createElement('img');
    gifImg.setAttribute('src', response.data[0].images.fixed_height.url);

    // Append 'gifImg' to the <div>
    responseContainerEl.appendChild(gifImg);
    });
}

userFormEl.addEventListener("submit", formSubmitHandler);

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
//   });