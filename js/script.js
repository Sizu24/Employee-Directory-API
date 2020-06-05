let listContainer = document.querySelector('main');
let userinfo = [];

for(let i = 0; i < 12; i++){
  getProfiles('https://randomuser.me/api/');
}

function getProfiles(url){
  fetch(url)
  .then(response => response.json())
  // data.results[0]
  // picture.thumbnail or large or medium
  // name, email, location.city
  .then(data => userinfo = (data.results[0]))
  .then(arr => getArray(arr))
  .then(profile => display(profile))
  .then(listItems => listContainer.appendChild(listItems))
  .catch(error=> console.log('There was an error!', error));
}

let getArray = (info)=>{
  let names = [];
  names.push(`<img src=${info.picture.large} alt="profile-pic">`);
  names.push(`<h2>${info.name.first} ${info.name.last}</h2>`);
  names.push(`<p>${info.email}</p>`);
  names.push(`<p>${info.location.city}</p>`);
  return names;
}

// if info.email.length > 26, p.style.paddingRight = "10px";

let display = (array)=>{
  let list = document.createElement('ul');
  let listItem = "";
  array.forEach(item => {
    listItem += `<li>${item}</li>`;
    list.innerHTML = listItem;
  });
  return list;
}


