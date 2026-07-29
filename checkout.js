const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

let total = 0;

cart.forEach(item => {

    total += item.price;

    const div = document.createElement("div");

    div.innerHTML = `
        <span>${item.name}</span>
        <span>₹${item.price}</span>
    `;

    checkoutItems.appendChild(div);

});

checkoutTotal.textContent = total;
const form = document.getElementById("checkoutForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    localStorage.removeItem("cart");

    window.location.href="ordersucess.html";

});