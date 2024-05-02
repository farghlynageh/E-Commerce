let Categorystorage;
if (localStorage.Category != null) {
    Categorystorage = JSON.parse(localStorage.Category)

} else {
    Categorystorage = [];
}

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
            <a href="productuser.html"><img src="images/${item.image}" alt="Not Found"></a>
            <div class="card-content">
                <p class="debart" id = "${item.name}">${item.name}</p>
            </div>
            `
    // Append the new div to the container 
    container.appendChild(newDiv);
});}

function removechild() {      // Remove all child elements to print array only
    var parentElement = document.getElementById('i');
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function getsearch() {
    var search = document.getElementById("search");
    search.focus();
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
            </div>
            `
        }
        container.appendChild(newDiv);
    }
}