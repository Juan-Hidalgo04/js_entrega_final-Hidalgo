//  Libraries

Toastify({
    text:'Welcome everybody. Click here if you want to see the best travel blog ever!',
    duration:10000,
    destinaton: 'https://www.google.com/',
}).showToast()

// First, I define the destinations:

// Getting the destination from JSON

let countries = [];

async function destinationPlaces() {
    try {
      const response = await fetch('./destination.json');
      const data = await response.json();
      destinationPlace(data)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  destinationPlaces();
    

// Creating options in the drop-down lists for destinations. 

function destinationPlace(destinationData) {
    const selectNodeDestination = document.querySelector('#destination')
    destinationData.forEach((p) => {
      const optionDest = document.createElement('option')
      optionDest.innerText = `${p.destination}`
      optionDest.setAttribute('id', p.id)
      selectNodeDestination.append(optionDest)
    })
  }

// Define the seasons

class Season {
    constructor(id, called, value) {
        this.id = id
        this.called = called
        this.value = value
    }
}

// Creating the season
const Low = new Season(1, 'Low Season', 1)
const Shoulder = new Season(2, 'Shoulder Season', 1.5)
const High = new Season(3, 'High Season', 2)

// saving the season
const seasons = [Low, Shoulder, High]

// Creating options in the drop-down lists for seasons. 

const selectNodeSeason = document.querySelector('#season')
seasons.forEach((p) => {
    const optionSeas = document.createElement('option')
    optionSeas.innerText = `${p.called}`
    optionSeas.setAttribute('id', p.id)
    selectNodeSeason.append(optionSeas)
})


// taking the values from the form: 

const form0 = document.getElementById('form0')
const inputName = document.getElementById('full_name')
const inputEmail = document.getElementById('email_address')
const inputDestination = document.getElementById('destination')
const inputSeason = document.getElementById('season')
const inputTravelers = document.getElementById('travelers')
const inputDays = document.getElementById('days')
const inputDate = document.getElementById('date')


// Click on Submit. 

form0.onsubmit = (e) => {
    // e.preventDefault() I want the answer when I click submit. This should not apply
    const infoUser = {
        name: inputName.value,
        email: inputEmail.value,
        destination: inputDestination.value,
        season: inputSeason.value,
        travelers: inputTravelers.value,
        days: inputDays.value,
        Date: inputDate.value
    }

    const infoUserJSON = JSON.stringify(infoUser);
    console.log(infoUserJSON);
    localStorage.setItem('infoUser', infoUserJSON);

}



// Cleaning the localstorage. 
const addButtonClear = document.querySelector('#clear')
addButtonClear.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
})


// Functions for final calcu: 

function sum(a, b) {
    return a + b
}
function rest(a, b) {
    return a - b
}
function mult(a, b) {
    return a * b
}
function div(a, b) {
    return a / b
}

function calcu(n1, n2, fn) {
    const result = fn(n1, n2)
    return result
}

// Taking info from localstorage

const infoUser0 = localStorage.getItem('infoUser')
console.log(infoUser0);
const infoUser1 = JSON.parse(infoUser0)
console.log(infoUser1);

console.log(infoUser1.season);

// verifying country and the season based on the answer. 
const country0 = countries.find(c => {
    return c.destination === infoUser1.destination
})

console.log( );
console.log(country0.id);

const season0 = seasons.find(s => {
    return s.called === infoUser1.season
})

console.log(season0);

// Execute the Fecth with some images for the project
// I was not able to find a good API for my project. I'll keep looking. 

const fetchPlaces = async(id)=>{
    try {
        const placesApi = await fetch(`https://rickandmortyapi.com/api/character`)
        const placesJSON = await placesApi.json()
        console.log(placesJSON.result);
        return placesJSON
    } catch (error) {
        console.log(error);
    }
    return placesJSON
}
fetchPlaces()

// Looking for one image for the response

const imagePlaces = async()=>{
    const country = countries.find((c) => c.destination === infoUser1.destination);
    const place = await fetchPlaces(country.id)
    console.log(place);
    return place
}

// calcu budget for trip
const finalFlight = calcu(calcu(country0.flight, season0.value, mult), infoUser1.travelers, mult)
const finalBudget = calcu(calcu(calcu(country0.budget, season0.value, mult), infoUser1.travelers, mult), infoUser1.days, mult)
const finalMoney = calcu(finalBudget, finalFlight, sum)

console.log(finalBudget, finalFlight, finalMoney)


// Modifying HTML final answer.

let final_answer = document.getElementById("final_answer");

const infoUser = localStorage.getItem('infoUser')
const infoUserJS = JSON.parse(infoUser)
if (infoUser) {
    form0.remove()
    finale.remove()
    finale1.remove()
    final_answer.innerHTML = `<p>Thank you for choosing us, ${infoUser1.name}. Next, you will find the final budget review.</p> <br>

    <p>To stay ${infoUser1.days} days on ${country0.destination}, ${country0.country} during ${season0.called} for ${infoUser1.travelers} travelers, we recommend a budget of USD ${finalBudget} to cover accommodation, food, and transportation expenses. Also, we estimate that you may need USD ${finalFlight} approx for flight tickets departing from El Dorado - Bogota. </p>
    <br>
    <p>The total budget is <b> USD ${finalMoney}.</b></p>
    <br> 
    <p>Moreover, here is some information to have in mind for your trip to ${country0.destination}, ${country0.country}: The estimated time of flight is ${country0.hours} hours, you will arrive to ${country0.airport} and the local currency will be ${country0.currency}.</p>
    <br>
    <p>We hope this information is useful for you.</p>
    <img class='center justify' src="" alt="${country0.id}">
    `;
    
}

