//  Libraries to go to the best travel blog webpage.

Toastify({
    text: 'The best travel blog webpage ever! Click here.',
    duracion: 10000, 
    destination: 'https://juan-hidalgo04.github.io/dw_entrega_final-Hidalgo/',
    newWindow: true,
}).showToast();

// Getting the destinations from JSON in two different ways. 

// Destination for the drop-down list. 

async function destinationPlaces() {
    try {
      const response = await fetch('./destination.json');
      const dataDesti = await response.json();
      destinationPlace(dataDesti);
      console.log(dataDesti);
    } catch (error) {
      console.log(error);
    }
  }

  // Destinations from JSON for calculations and info for the country and final calculations. 

  const fetchDestination = async()=>{
    const countriesJSON = await fetch('./destination.json');
    const countriesJSON0 = await countriesJSON.json()
    // console.log(countriesJSON0);
    return countriesJSON0
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
let final_answer = document.getElementById("final_answer");


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

const createCountry = async(desti1)=> {
    const dataDesti = await fetchDestination()
    const country0 = dataDesti.find(c => {
    return c.destination === desti1.destination
})
// console.log(country0);
return country0
}

const season0 = seasons.find(s => {
    return s.called === infoUser1.season
})

console.log(season0);

const finalFunction = async()=>{
    const country0 = await createCountry(infoUser1)
    console.log(country0);

    // calcu budget for trip
const finalFlight = calcu(calcu(country0.flight, season0.value, mult), infoUser1.travelers, mult)
const finalBudget = calcu(calcu(calcu(country0.budget, season0.value, mult), infoUser1.travelers, mult), infoUser1.days, mult)
const finalMoney = calcu(finalBudget, finalFlight, sum)

console.log(finalBudget, finalFlight, finalMoney)

// Modifying HTML final answer.

const infoUser = localStorage.getItem('infoUser')
const infoUserJS = JSON.parse(infoUser)
console.log(infoUser);
console.log(infoUserJS);
if (infoUser) {
    form0.remove()
    finale.remove()
    finale1.remove()
    final_answer.innerHTML = `<p>Thank you for choosing us, ${infoUserJS.name}. Next, you will find the final budget review.</p> <br>

    <p>To stay ${infoUserJS.days} days on ${country0.destination}, ${country0.country} during ${season0.called} for ${infoUserJS.travelers} travelers, we recommend a budget of USD ${finalBudget} to cover accommodation, food, and transportation expenses. Also, we estimate that you may need USD ${finalFlight} approx for flight tickets departing from El Dorado - Bogota. </p>
    <br>
    <p>The total budget is <b> USD ${finalMoney}.</b></p>
    <br> 
    <p>Moreover, here is some information to have in mind for your trip to ${country0.destination}, ${country0.country}: The estimated time of flight is ${country0.hours} hours, you will arrive to ${country0.airport} and the local currency will be ${country0.currency}.</p>
    <br>
    <p>We hope this information is useful for you.</p>
    `;
}
}

finalFunction()

