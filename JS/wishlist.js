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
showData(Wishlist);
window.onload=showData(Wishlist);

function showData(arrData) {
    var container = document.getElementById('wishlistContainer'); //Get main Div
    removechild() //Delete the current show data
    
        arrData.forEach(function (item, index) {
            // Create a new div element
            var newDiv = document.createElement('div');
            // Set content for the div
            newDiv.className = "wishlist-item";
            // the contain of new Div:
            newDiv.innerHTML += `
            
                    <img src="images/${item.image}" alt="Product 1">
            <div class="wishlist-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span>$${item.price}</span>
            </div>
            <button class="but-2" onclick= 'removeWish(${index})' onclick="deleteitem(${index})" style="background-color: red;">Remove</button>
            <button class="but-2" onclick="addtoCard(${index})">Add to card</button>
            `
    // Append the new div to the container 
    container.appendChild(newDiv);
})};

//Deleted
function removeWish(){

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your wishlist has been deleted.",
            icon: "success"
          }).then (function deleteitem(i) {
            Wishlist.splice(i, 1);
            localStorage.Wishlist = JSON.stringify(Wishlist)
            showData(Wishlist);
        });
        }
      })

};

function removechild() {      // Remove all child elements to print array only
    var parentElement = document.getElementById('wishlistContainer');
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function addtoCard(i)
{
    if (localStorage.mycart != null) {
        mycart = JSON.parse(localStorage.getItem('mycart'))
    
    } 
    let productObj = {
        name: Wishlist[i].name,
        price:  Wishlist[i].price,
        Category : Wishlist[i].Category,
        image:  Wishlist[i].image, // Get the source URL of the selected file
        description: Wishlist[i].description
    };
    mycart.push(productObj);
    // Convert the array to a JSON string
    var jsonString = JSON.stringify(mycart);
    // Store the JSON string in local storage
    localStorage.setItem('mycart', jsonString);
    //sweetalert
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "added to cart",
        showConfirmButton: false,
        width:300,
        height:150,
        timer: 1500
      });
   
}