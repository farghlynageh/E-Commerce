
let mycart;
if (localStorage.mycart != null) {
    mycart = JSON.parse(localStorage.getItem('mycart'))

} else {
    mycart = [];
}
showData(mycart);
window.onload=showData(mycart);

function showData(arrData) {
    var container = document.getElementById('cartcontianer'); //Get main Div
    removechild() //Delete the current show data
    
        arrData.forEach(function (item, index) {
            // Create a new div element
            var newDiv = document.createElement('div');
            // Set content for the div
            newDiv.className = "addcart-container";
            // the contain of new Div:
            newDiv.innerHTML += `
            <div class="addcart-item">
            <img src="images/${item.image}" alt="Product 1">
            <div class="addcart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span style="color: #007bff;">$21</span>
            </div>
            <button class="but-2" onclick= 'removeCart(${index})' onclick="deleteitem(${index})" style="background-color: red;">Remove</button>
            </div>
            `
    // Append the new div to the container 
    container.appendChild(newDiv);
})};



function removechild() {      // Remove all child elements to print array only
    var parentElement = document.getElementById('cartcontianer');
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);


    }
}





//   function buy(){
//     Swal.fire({
//         title: "Do you want Buying ?",
//         showDenyButton: true,
//         showCancelButton: true,
//         confirmButtonText: "Buy",
//         denyButtonText: `Don't Buy`
//       }).then((result) => {
//         /* Read more about isConfirmed, isDenied below */
//         if (result.isConfirmed) {
//           Swal.fire("Buying!", "", "success");
//         } else if (result.isDenied) {
//           Swal.fire(" not Buying it", "", "info");
//         }
//       });
//   }
 
//remove
function removeCart(){

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
            text: "Your cart has been deleted.",
            icon: "success"
          }).then (function deleteitem(i) {
            mycart.splice(i, 1);
            localStorage.mycart = JSON.stringify(mycart)
            showData(mycart);
        });
        }
      })

};
 


// function buy() {
//     let checkoutContainer = document.getElementById('cartcontianer');
//     let totalPrice = 0;

//     mycart.forEach(item => {
//         let checkoutItem = document.createElement('div');
//         checkoutItem.innerHTML = `
//             <div>${item.name}</div>
//             <div>$${item.price.toFixed(2)}</div>
//         `;
//         checkoutContainer.appendChild(checkoutItem);

//         totalPrice += item.price;

//     });

//     totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
// }

// let totalPrice = 0;
// function buy(){
//     var container = document.getElementById('cartcontianer'); //Get main Div
    
//    //Delete the current show data
    
//         arrData.forEach(function (item, index) {
//             // Create a new div element
//             var newDiv = document.createElement('div');
//             // Set content for the div
//             newDiv.className = "addcart-container";
//             // the contain of new Div:
//             newDiv.innerHTML += `
//             <div>${item.name}</div>
//          <div>$${item.price.toFixed(2)}</div>
//             `
//     // Append the new div to the container 
//     container.appendChild(newDiv);
//     totalPrice += item.price;
// })
// alert('totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`');

// };
