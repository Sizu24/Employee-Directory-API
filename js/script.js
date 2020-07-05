// Global Variables 
const listContainer = document.querySelector(".card-container");
let employees;
let data = [];
let filteredNames = [];
let people =[];

const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const searchBar = document.getElementById("search");


const getData = async () => {
  const response = await fetch(url);
  data = await response.json();
  employees = await data.results;
  display(data);
}

getData();



searchBar.addEventListener("keyup", () => {

  let personName = document.querySelectorAll(".name");
  let card = document.querySelectorAll(".card");
  let userInput = searchBar.value.toLowerCase();
  for(let i = 0; i < data.results.length; i++){
    if(searchBar !== ""){
      if(personName[i].textContent.toLowerCase().indexOf(userInput) === -1){
        console.log(personName[i].textContent); 
        card[i].style.display = "none";
      }else{
        card[i].style.display = "";
      }
    }
    
  }

});

function display(data){ 
  // copy data to employees array
  // assign data
  let employeeHTML = "";
  for(let i = 0; i < employees.length; i ++){
    let name = employees[i].name;
    let email = employees[i].email;
    let city = employees[i].location.city;
    let picture = employees[i].picture;

    // setup HTML code and store it in variable
    employeeHTML += `
    <div class="card" data-index="${i}">
    <img class="avatar" src="${picture.large}" alt="profile pic">
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
    </div>
  </div>
    `;

  };
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


  
