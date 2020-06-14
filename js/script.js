// Global Variables 
const listContainer = document.querySelector(".card-container");
let employees = [];
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const searchBar = document.getElementById("search");

const getRandomUsers = ()=>{
  fetch(url)
  /*
    Get api from server, 
    take results property and copy to response,
    send data to display funciton
  */
  .then(response => response.json())
  .then(response => response.results)
  .then(profile => display(profile))
  .catch(error=> console.log('There was an error!', error));

}

function display(employeeData){
  // copy data to employees array
  employees = employeeData;
  // console.log(employees);

  // assign data
  let employeeHTML = "";
  employees.forEach((employee, index) =>{
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    // setup HTML code and store it in variable
    employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" alt="profile pic">
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
    </div>
  </div>
    `;

  });
  // add HTML code to card container in HTML
  listContainer.innerHTML = employeeHTML;
}

function displayModal (index){
  // create object to hold info
  let {name, dob, phone, email, location:
     { city, street, state, postcode}, picture}
      = employees[index];
  // Data object for dob
  let date = new Date(dob.date);

  const modalHTML = `
  <img class="avatar" src="${picture.large}" alt="profile pic">
  <div class="modal-text">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.number} ${street.name} ${city}, ${state} ${postcode}</p>
    <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;

  // remove hidden class to display overlay of modal, and add modal HTML data
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

listContainer.addEventListener("click", e =>{
  // find closest card, and get index of that card
  if(e.target !== listContainer){
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
  // run function to display data from that specific index of card
  displayModal(index);
  }
});

// Close modal
modalClose.addEventListener("click", () =>{
  overlay.classList.add("hidden");
});

let people = [];
let answers = [];

const searchUser = ()=>{
  let index = [];
  let userInput = searchBar.value.toLowerCase();
  for(let i = 0; i < employees.length; i++){
    index = employees[i].name.first + " " + employees[i].name.last;
    if(people.indexOf(index) === -1){
      people.push(index);
    }
  }
  if(userInput !== ""){
    answers = people.filter(name => name.toLowerCase().indexOf(userInput) !== -1);
  }else{
    answers = [];
  }
  console.log(answers);
}

getRandomUsers();