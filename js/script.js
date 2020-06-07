const listContainer = document.querySelector(".card-container");
let employees = [];
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;

fetch(url)
.then(response => response.json())
.then(response => response.results)
.then(profile => display(profile))
.catch(error=> console.log('There was an error!', error));

function display(employeeData){
  employees = employeeData;
  console.log(employees);
  let employeeHTML = "";
  employees.forEach((employee, index) =>{
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

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
  listContainer.innerHTML = employeeHTML;
}

function displayModal (index){
  let {name, dob, phone, email, location:
     { city, street, state, postcode}, picture}
      = employees[index];

  let date = new Date(dob.date);

const modalHTML = `
<img class="avatar" src="${picture.large}" alt="profile pic">
<div class="modal-text">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  <hr />
  <p>${phone}</p>
  <p class="address">${street.number} ${street.name} ${state} ${postcode}</p>
  <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
</div>
`;

overlay.classList.remove("hidden");
modalContainer.innerHTML = modalHTML;
}

listContainer.addEventListener("click", e =>{
  if(e.target !== listContainer){
    console.log("clicked");
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
  
  displayModal(index);
  }
});

modalClose.addEventListener("click", () =>{
  overlay.classList.add("hidden");
});


