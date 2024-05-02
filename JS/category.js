
let Categorystorage;
if (localStorage.Category != null) {
    Categorystorage = JSON.parse(localStorage.Category)

} else {
    Categorystorage = [];
}


// Call the function to create divs when the page loads
window.onload = showData(Categorystorage);
// Function to create div elements based on the array
function showData(arrData){
    
    var container = document.getElementById('i'); //Get main Div
    
    removechild() //Delete the current show data

    arrData.forEach(function (item, index) {
            // Create a new div element
            var newDiv = document.createElement('div');
            // Set content for the div
            newDiv.className = "cat-card";
            // Set content for the div
            newDiv.innerHTML += `
            <a href="product.html"><img src="images/${item.image}" alt="Not Found"></a>
            <div class="card-content">
                <p class="debart" id = "${item.name}">${item.name}</p>
            <div class="admin-buttons">
                    <button  onclick="updateData(${index})">Update</button>
                    <button  onclick="deleteitem(${index})" style="background-color: red;">Delete</button>
            </div>
            </div>
            `

            // Append the new div to the container 
            container.appendChild(newDiv);
    });
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();    // Prevents the default form submission
    // Get values from form inputs
    let CategoryName = document.getElementById('name').value;
    let CategoryImage = document.getElementById('image');
    // Create an object to store the product information
    let CategoryObj = {
        name: CategoryName,
        image: CategoryImage.files[0].name, // Get the source URL of the selected file
    };
    Categorystorage.push(CategoryObj);
    // Convert the array to a JSON string
    var jsonString = JSON.stringify(Categorystorage);
    // Store the JSON string in local storage
    localStorage.setItem('Category', jsonString);
    showData(Categorystorage);
    closeModal()
    cleardata()
});

// Functions to open and close the add model
function openModal() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';

}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

function removechild() {      // Remove all child elements to print array only
    var parentElement = document.getElementById('i');
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function cleardata() {
    document.getElementById('name').value = ""
    document.getElementById('image').value = ""
}

function updateData(i) {
    //return already data of item in form 
    document.getElementById('name').value = Categorystorage[i].name;
    document.getElementById('image').src = Categorystorage[i].image.src;
    openModal();
    //display of btns
    document.getElementById("add").hidden = 1;
    document.getElementById("Update").hidden = 0;
    //change data to another enter data 
    document.getElementById("Update").onclick = function () {
        Categorystorage[i].name = document.getElementById('name').value
        Categorystorage[i].image.src = document.getElementById('image').src
        document.getElementById("add").hidden = 0;
        document.getElementById("Update").hidden = 1;
        closeModal();
        localStorage.Category = JSON.stringify(Categorystorage)
        showData(Categorystorage);
    }
}

function deleteitem(i) {
    Categorystorage.splice(i, 1);
    localStorage.Category = JSON.stringify(Categorystorage)
    showData(Categorystorage);
}
function searchdate(value) {

    var container = document.getElementById('i');

    removechild();
    
    for (let i = 0; i < Categorystorage.length; i++) {
        var newDiv = document.createElement('div');
        newDiv.className ="cat-card";
        if (Categorystorage[i].name.toLowerCase().includes(value.toLowerCase())) {
            
            newDiv.innerHTML += `
            <a href="product.html"><img src="images/${Categorystorage[i].image}" alt="Not Found"></a>
            <div class="card-content">
                <p class="debart" id = "${Categorystorage[i].name}">${Categorystorage[i].name}</p>
            <div class="admin-buttons">
                    <button  onclick="updateData(${i})">Update</button>
                    <button  onclick="deleteitem(${i})" style="background-color: red;">Delete</button>
            </div>
            </div>
            `
        }
        container.appendChild(newDiv);
    }
}

function Categoryfilter(array, name) {
    return array.filter(item => item.Name === name);
}
function getsearch() {
    var search = document.getElementById("search");
    search.focus();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
  }

