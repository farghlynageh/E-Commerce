// Check of Data in Local Storage
let datastorage;
if (localStorage.card != null) {
    datastorage = JSON.parse(localStorage.getItem('card'))

} else {
    datastorage = [];
}

// Call the function to create divs when the page loads
window.onload = showData(datastorage);
function showData(arrData) {

    var container = document.getElementById('i'); //Get main Div
    
    removechild() //Delete the current show data

        arrData.forEach(function (item, index) {
            // Create a new div element
            var newDiv = document.createElement('div');
            // Set content for the div
            newDiv.className = "card";
            // the contain of new Div:
            newDiv.innerHTML += `
                <img src="images/${item.image}" alt="NotFound" width="300" height="200">
            <div class="card-content" width = 30%>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">$${item.price}</p>
                <div class="admin-buttons">
                    <button onclick="updateData(${index})">Update</button>
                    <button onclick="deleteitem(${index})" style="background-color: red;">Delete</button>
                </div>
            </div>
            `
            // Append the new div to the container i
            container.appendChild(newDiv);
        });
}


document.getElementById('form').addEventListener('submit', function (event) {
     // Prevents the default form submission
    event.preventDefault();   
    // Get values from form inputs
    let productName = document.getElementById('name').value;
    let productPrice = document.getElementById('price').value;
    let Category = document.getElementById('Category').value;
    let productImage = document.getElementById('image');
    let productDescription = document.getElementById('description').value;
    // Create an object to store the product information
    let productObj = {
        name: productName,
        price: productPrice,
        Category : Category,
        image: productImage.files[0].name, // Get the source URL of the selected file
        description: productDescription
    };
    if(!(productPrice>0))
    {
    alert("This in not vaid price")
    event.preventDefault();   
    }
    else {
        datastorage.push(productObj);
        // Convert the array to a JSON string
        var jsonString = JSON.stringify(datastorage);
        // Store the JSON string in local storage
        localStorage.setItem('card', jsonString);
    }
    showData(datastorage);
    closeModal()
    cleardata()
});

// Functions to open and close the add model(add and update model)
function openModal() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';

}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

 // Remove all child elements to print array only
function removechild() {     
    var parentElement = document.getElementById('i');
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

// clear data in text in model
function cleardata() {
    document.getElementById('name').value = ""
    document.getElementById('price').value = ""
    document.getElementById('image').value = ""
    document.getElementById('description').value = ""
}

// Update data of current Model
function updateData(i) {
    //return already data of item in form 
    document.getElementById('name').value = datastorage[i].name;
    document.getElementById('price').value = datastorage[i].price;
    document.getElementById('image').src = datastorage[i].image.src;
    document.getElementById('description').value = datastorage[i].description;
    openModal();
    //display of btns
    document.getElementById("add").hidden = 1;
    document.getElementById("Update").hidden = 0;
    //change data to another entery data when user click
    document.getElementById("Update").onclick = function () {
        datastorage[i].name = document.getElementById('name').value
        datastorage[i].price = document.getElementById('price').value
        datastorage[i].image.src = document.getElementById('image').src
        datastorage[i].description = document.getElementById('description').value
        document.getElementById("add").hidden = 0;
        document.getElementById("Update").hidden = 1;
        closeModal();
        localStorage.card = JSON.stringify(datastorage)
        showData(datastorage);    }
}

// Delete data of current Model
function deleteitem(i) {
    datastorage.splice(i, 1);
    localStorage.card = JSON.stringify(datastorage)
    showData(datastorage);
}

function searchData(value) {
    var container = document.getElementById('i');
    
    removechild();
    for (let i = 0; i < datastorage.length; i++) {
        
        var newDiv = document.createElement('div');
        newDiv.className = "card";
        if (datastorage[i].name.toLowerCase().includes(value.toLowerCase())) {
           
            newDiv.innerHTML += `
                <img src="images/${datastorage[i].image}" alt="NotFound" width="300" height="200">
            <div class="card-content">
                <h3>${datastorage[i].name}</h3>
                <p>${datastorage[i].description}</p>
                <p class="price">$${datastorage[i].price}</p>
                <div class="admin-buttons">
                <button onclick="updateData(${i})">Update</button>
                <button onclick="deleteitem(${i})" style="background-color: red;">Delete</button>
            </div>
            </div>
            `
        }
        container.appendChild(newDiv);
    }
}

function Categoryfilter(array, name)
{
        return array.filter(item => item.Name === name);      
}

function getsearch() {
    var search = document.getElementById("search");
    search.focus();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
  }