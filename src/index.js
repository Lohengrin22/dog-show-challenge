document.addEventListener('DOMContentLoaded', () => {
    const url = `http://localhost:3000/dogs`
    const tableBody = document.querySelector("#table-body")
    const dogForm = document.querySelector("#dog-form")
fetchDogs()



//########### Fetch/Network Calls#####//

function fetchDogs(){
    fetch(url)
    .then(res => res.json())
    .then(dogsArray => dogsArray.forEach(dog => renderADog(dog)));
}

//#########Logic##########//

function renderADog(dog) {
    tableBody.innerHTML += `
    <tr id=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit-button">Edit Dog</button></td></tr>
    `
    
}

function editDogForm(e){
    const dogChildren = e.target.closest('tr').children
    const dogId = e.target.closest('tr').id
    if (e.target.innerText === "Edit Dog") {
        dogForm.innerHTML = `
        <input type="text" name="name" value="${dogChildren[0].innerText}" id="${dogId}" placeholder="dog's name"  />
        <input type="text" name="breed" value="${dogChildren[1].innerText}" placeholder="dog's breed" />
        <input type="text" name="sex" value="${dogChildren[2].innerText}" placeholder="dog's sex" />
        <input type="submit" value="Submit" />
        `
    
    }
}

function editDog(e){
    e.preventDefault()
  const id = e.target[0].id
  const name = e.target[0].value
  const breed = e.target[1].value
  const sex = e.target[2].value
    fetch(`${url}/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, breed, sex})
    })
    tableBody.innerHTML = ""
    dogForm.innerHTML = `
    <input type="text" name="name" placeholder="dog's name" value="" />
    <input type="text" name="breed" placeholder="dog's breed" value="" />
    <input type="text" name="sex" placeholder="dog's sex" value="" />
    <input type="submit" value="Submit" /> `
    fetchDogs()
    // .reset()
}

//########## Event Handling ###########//

tableBody.addEventListener("click", editDogForm)
dogForm.addEventListener("submit", editDog)



})