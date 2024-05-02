// Parse the JSON string back into an array
let datastorage;
if (localStorage.card != null) {
    datastorage = JSON.parse(localStorage.getItem('card'))

} else {
    datastorage = [];
}
let Wishlist;
if (localStorage.Wishlist != null) {
    Wishlist = JSON.parse(localStorage.getItem('Wishlist'))

} else {
    Wishlist = [];
}
let mycart;
if (localStorage.mycart != null) {
    mycart = JSON.parse(localStorage.getItem('mycart'))

} else {
    mycart = [];
}


showData(datastorage);
window.onload=showData(datastorage);

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
                    <div class="card-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="price">$${item.price}</p>
                        <button onclick="addtoCard(${index})" class="Buy-btn">Add to cart <span style="color: white;" >🛒</span></button>
                        <div class="admin-buttons">
                        <button class="but-categ" onclick="toggleWishlist(${index})" >
                            <i class="fa-solid fa-heart fa-2x" id="wishlistIcon${index}" style="color: white; cursor: pointer;"></i>
                        </button>
                    </div>
                    </div>`
    // Append the new div to the container 
    container.appendChild(newDiv);
})};

function getsearch() {
    var search = document.getElementById("search");
    search.focus();
}

function searchdate(value) {
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
            <button class="Buy-btn">Buy</button>
        </div>
        `
        }
        container.appendChild(newDiv);
    }
}

function removechild() {      // Remove all child elements to print array only
    var parentElement = document.getElementById('i');
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}


function addtoWishist(i)
{
    
    if (localStorage.Wishlist != null) {
        Wishlist = JSON.parse(localStorage.getItem('Wishlist'))
    
    }
    let productObj = {
        name: datastorage[i].name,
        price:  datastorage[i].price,
        Category : datastorage[i].Category,
        image:  datastorage[i].image, // Get the source URL of the selected file
        description: datastorage[i].description
    };
    Wishlist.push(productObj);
    // Convert the array to a JSON string
    var jsonString = JSON.stringify(Wishlist);
    // Store the JSON string in local storage
    localStorage.setItem('Wishlist', jsonString);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Added to wishlist"
      });
    
   
}
function toggleWishlist(index) {
    // Get the heart icon element
    const wishlistIcon = document.getElementById(`wishlistIcon${index}`);
    
    // Check if the icon color is red
    const isRed = wishlistIcon.style.color === "red";

    // Toggle the color of the heart icon
    wishlistIcon.style.color = isRed ? "white" : "red";
    let wishlist = JSON.parse(localStorage.getItem('Wishlist')) || [];
    const itemExists = wishlist.some(item => item.name === datastorage[index].name);
    // Call the addtoWishist function if the color is red
    if (!isRed && !itemExists) {
        addtoWishist(index);
    }else if (isRed && itemExists) {
        removefromWishlist(index);
    }
}



function removefromWishlist(index) {
    // Remove item from the wishlist
    let wishlist = JSON.parse(localStorage.getItem('Wishlist')) || [];
    wishlist = wishlist.filter(item => item.name !== datastorage[index].name);
    localStorage.setItem('Wishlist', JSON.stringify(wishlist));

    // Display success message
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Removed from wishlist"
    });
}

function addtoCard(i)
{
    if (localStorage.mycart != null) {
        mycart = JSON.parse(localStorage.getItem('mycart'))
    } 
    let productObj = {
        name: datastorage[i].name,
        price:  datastorage[i].price,
        Category : datastorage[i].Category,
        image:  datastorage[i].image, // Get the source URL of the selected file
        description: datastorage[i].description
    };
    mycart.push(productObj);
    // Convert the array to a JSON string
    var jsonString = JSON.stringify(mycart);
    // Store the JSON string in local storage
    localStorage.setItem('mycart', jsonString); 

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "added to cart"
      });
}