// =====================
// Mobile Menu
// =====================
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) { bar.addEventListener('click', () => { nav.classList.add('show-menu'); }); }
if (close) { close.addEventListener('click', () => { nav.classList.remove('show-menu'); }); }


// =====================
// Cart Functionality
// =====================

// Update all subtotals and grand total
function updateTotal() {
    let cartSubtotal = 0;
    const shipping = 10.00;

    const rows = document.querySelectorAll('#cart-body tr');

    rows.forEach(row => {
        const priceCell = row.querySelector('.price');
        const subtotalCell = row.querySelector('.subtotal');
        const quantityInput = row.querySelector('input[type="number"]');

        if (priceCell && subtotalCell && quantityInput) {
            const price = parseFloat(priceCell.innerText.replace('$', ''));
            const quantity = parseInt(quantityInput.value);

            // Make sure quantity is at least 1
            if (quantity < 1) quantityInput.value = 1;

            const subtotal = price * quantity;
            subtotalCell.innerText = '$' + subtotal.toFixed(2);
            cartSubtotal += subtotal;
        }
    });

    // Update Cart Subtotal
    const grandTotalCell = document.querySelector('.grand-total');
    if (grandTotalCell) {
        grandTotalCell.innerText = '$' + cartSubtotal.toFixed(2);
    }

    // Update Final Total (subtotal + shipping)
    const finalTotalCell = document.querySelector('.final-total');
    if (finalTotalCell) {
        finalTotalCell.innerText = '$' + (cartSubtotal + shipping).toFixed(2);
    }
}

// Remove a cart row and recalculate
function removeItem(button) {
    const row = button.closest('tr');
    row.remove();
    updateTotal();

    // Show empty message if no items left
    const rows = document.querySelectorAll('#cart-body tr');
    if (rows.length === 0) {
        document.querySelector('#cart-body').innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding: 40px; color: #666;">
                    Your cart is empty. <a href="shop.html" style="color:#088178;">Continue Shopping</a>
                </td>
            </tr>
        `;
        // Reset totals to zero
        const grandTotalCell = document.querySelector('.grand-total');
        const finalTotalCell = document.querySelector('.final-total');
        if (grandTotalCell) grandTotalCell.innerText = '$0.00';
        if (finalTotalCell) finalTotalCell.innerText = '$10.00';
    }
}

// Coupon Code
function applyCoupon() {
    const code = document.getElementById('coupon-input').value.trim().toUpperCase();
    const msg = document.getElementById('coupon-msg');

    const validCoupons = {
        'TULLI10': 10,
        'SAVE20': 20,
        'WELCOME5': 5
    };

    if (validCoupons[code]) {
        msg.style.color = 'green';
        msg.innerText = '✅ Coupon applied! ' + validCoupons[code] + '% off your order.';
    } else {
        msg.style.color = 'red';
        msg.innerText = '❌ Invalid coupon code. Try TULLI10, SAVE20, or WELCOME5.';
    }
}

// Run updateTotal on page load to set correct values
document.addEventListener('DOMContentLoaded', updateTotal);