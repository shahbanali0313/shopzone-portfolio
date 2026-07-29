let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");
const toast = document.getElementById("toast");

const products = document.querySelectorAll(".shop-section .box");
const searchInput = document.querySelector(".search-input");
const darkBtn = document.getElementById("darkModeBtn");
const backToTop = document.querySelector(".back-to-top");

/* ======================
   SEARCH PRODUCTS
====================== */
if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const query = searchInput.value.toLowerCase().trim();

    products.forEach(product => {
      const title = product.querySelector(".title").textContent.toLowerCase();

      if (title.includes(query)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
}

/* ======================
   ADD TO CART
====================== */
function addToCart(product){

    const name = product.querySelector(".title").textContent;
    const priceText = product.querySelector(".price").textContent;
    const price = parseInt(priceText.replace(/\D/g,""));

    const existing = cart.find(item => item.name === name);

    if(existing){

        existing.qty++;

    }else{

        cart.push({
            name,
            price,
            qty:1
        });

    }

    updateCart();

    showToast();

}

/* ======================
   UPDATE CART
====================== */
function updateCart() {
  // Count
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  // Cart Items
  if (cartItems) {
    cartItems.innerHTML = "";
  }

  let grandTotal = 0;

  cart.forEach((item, index) => {
    grandTotal += item.price * item.qty;

    if (cartItems) {
      const div = document.createElement("div");

      div.innerHTML = `
<strong>${item.name}</strong><br>

₹${item.price} × ${item.qty}

<button onclick="decreaseQty(${index})">➖</button>

<button onclick="increaseQty(${index})">➕</button>

<button onclick="removeItem(${index})">❌</button>
`;

      cartItems.appendChild(div);
    }
  });
  if (total) {
    total.textContent = grandTotal;
}

localStorage.setItem("cart", JSON.stringify(cart));

  // Total
  if (total) {
    total.textContent = grandTotal;
  }
}
function showToast(){

    if(!toast) return;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}
/* ======================
   REMOVE ITEM
====================== */
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}
function increaseQty(index){

    cart[index].qty++;

    updateCart();

}

function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

/* ======================
   BUTTON EVENTS
====================== */
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function () {
    const product = button.closest(".box");

    if (product) {
      addToCart(product);
     
    }
  });
});
document.querySelectorAll(".wishlist").forEach(heart=>{

    heart.addEventListener("click",function(){

        heart.classList.toggle("active");

        if(heart.classList.contains("active")){

            heart.textContent="❤️";

        }else{

            heart.textContent="🤍";

        }

    });

});

/* ======================
   DARK MODE
====================== */
if (darkBtn) {
  darkBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
}
// Load Saved Theme
if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
}

// Dark Mode Button
if(darkBtn){

    darkBtn.addEventListener("click",function(){

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
            ? "dark"
            : "light"
        );

    });

}
/* ======================
   BACK TO TOP
====================== */
if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
updateCart();
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelector(".filter-btn.active")?.classList.remove("active");

        button.classList.add("active");

        const category = button.dataset.category;

        products.forEach(product=>{

            if(category==="all" || product.dataset.category===category){

                product.style.display="block";

            }else{

                product.style.display="none";

            }

        });

    });

});
const checkoutBtn = document.getElementById("checkoutBtn");

if(checkoutBtn){
    checkoutBtn.addEventListener("click",function(){

        window.location.href="checkout.html";

    });
}
/* ==========================
   HERO SLIDER
========================== */

const hero = document.querySelector(".hero-section");

const heroImages = [
    "hero_image.jpg",
    "hero-section image1.jpg",
    "hero-section image2.jpg",
    "hero-section image3.jpg",
    "hero-section image4.jpg",
    "hero-section image5.jpg",
    "hero-section image6.jpg",
    
];

const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function showSlide(index){

    hero.style.backgroundImage = `url('${heroImages[index]}')`;

    dots.forEach(dot => dot.classList.remove("active"));

    dots[index].classList.add("active");

}

document.querySelector(".next").addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= heroImages.length){
        currentIndex = 0;
    }

    showSlide(currentIndex);

});

document.querySelector(".prev").addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = heroImages.length-1;
    }

    showSlide(currentIndex);

});

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentIndex = index;

        showSlide(currentIndex);

    });

});

setInterval(()=>{

    currentIndex++;

    if(currentIndex >= heroImages.length){
        currentIndex = 0;
    }

    showSlide(currentIndex);

},3000);

showSlide(currentIndex);