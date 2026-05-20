// =============================================
// TULLI GARMENTS — script.js
// =============================================

// ── Mobile Menu ──
const bar   = document.getElementById("bar");
const close = document.getElementById("close");
const nav   = document.getElementById("navbar");

if (bar)   bar.addEventListener("click",  () => nav.classList.add("show-menu"));
if (close) close.addEventListener("click", () => nav.classList.remove("show-menu"));


// =============================================
// CART SYSTEM — localStorage
// =============================================

// Get cart array from localStorage
function getCart() {
    try {
        return JSON.parse(localStorage.getItem("tulliCart")) || [];
    } catch {
        return [];
    }
}

// Save cart array to localStorage
function saveCart(cart) {
    localStorage.setItem("tulliCart", JSON.stringify(cart));
}

// Add a product to cart (merges if same name+size already exists)
function addToCart(item) {
    const cart = getCart();

    // Check if same product + same size already in cart
    const existing = cart.find(c => c.name === item.name && c.size === item.size);
    if (existing) {
        existing.qty += item.qty;  // just increase quantity
    } else {
        cart.push(item);           // add as new item
    }

    saveCart(cart);
    updateCartCount();
}

// Update the cart badge count in the header
function updateCartCount() {
    const cart  = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);

    const badge1 = document.getElementById("cart-count");
    const badge2 = document.getElementById("cart-count-mobile");

    if (badge1) badge1.textContent = total;
    if (badge2) badge2.textContent = total;
}

// Toast notification (used across pages)
function showToast(msg, color) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent  = msg;
    toast.style.background = color || "#088178";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// ── Run on every page load — update the badge ──
document.addEventListener("DOMContentLoaded", updateCartCount);