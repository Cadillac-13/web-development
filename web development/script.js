const subscribeButtons = document.querySelectorAll(".subscribeButton");

subscribeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        alert("Thank you for subscribing.");
    });
});


function getCart() {
    const storedCart = sessionStorage.getItem("bookHavenCart");

    if (storedCart) {
        return JSON.parse(storedCart);
    }

    return [];
}


function saveCart(cart) {
    sessionStorage.setItem("bookHavenCart", JSON.stringify(cart));
}


function updateCartCount() {
    const cart = getCart();

    const cartCount = document.getElementById("cart-count");
    const galleryCartCount = document.getElementById("gallery-cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    if (galleryCartCount) {
        galleryCartCount.textContent = cart.length;
    }
}


const addToCartButtons = document.querySelectorAll(".addToCartButton");

addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const product = button.closest("article");

        if (!product) {
            return;
        }

        const titleElement = product.querySelector("h3");

        if (!titleElement) {
            return;
        }

        const title = titleElement.textContent.trim();

        const paragraphs = product.querySelectorAll("p");

        let price = "";

        paragraphs.forEach(function(paragraph) {
            if (paragraph.textContent.includes("Price:")) {
                price = paragraph.textContent
                    .replace("Price:", "")
                    .trim();
            }
        });

        const cart = getCart();

        cart.push({
            title: title,
            price: price
        });

        saveCart(cart);
        updateCartCount();

        alert("Item added to the cart.");
    });
});


const viewCartButton = document.getElementById("viewCartButton");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const closeCartButton = document.getElementById("closeCartButton");


function displayCart() {
    const cart = getCart();

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Your shopping cart is empty.";
        cartItems.appendChild(message);
        return;
    }

    cart.forEach(function(item, index) {
        const itemElement = document.createElement("p");

        itemElement.textContent =
            (index + 1) +
            ". " +
            item.title +
            " - " +
            item.price;

        cartItems.appendChild(itemElement);
    });
}


if (viewCartButton) {
    viewCartButton.addEventListener("click", function() {
        displayCart();

        if (cartModal) {
            cartModal.hidden = false;
        }
    });
}


if (closeCartButton) {
    closeCartButton.addEventListener("click", function() {
        if (cartModal) {
            cartModal.hidden = true;
        }
    });
}


function clearCart() {
    sessionStorage.removeItem("bookHavenCart");

    updateCartCount();
    displayCart();

    alert("Cart cleared.");
}


const clearCartButton = document.getElementById("clearCartButton");
const modalClearCartButton = document.getElementById("modalClearCartButton");


if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
}


if (modalClearCartButton) {
    modalClearCartButton.addEventListener("click", clearCart);
}


function processOrder() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your shopping cart is empty.");
        return;
    }

    sessionStorage.removeItem("bookHavenCart");

    updateCartCount();
    displayCart();

    alert("Thank you for your order.");
}


const processOrderButton = document.getElementById("processOrderButton");
const modalProcessOrderButton =
    document.getElementById("modalProcessOrderButton");


if (processOrderButton) {
    processOrderButton.addEventListener("click", processOrder);
}


if (modalProcessOrderButton) {
    modalProcessOrderButton.addEventListener("click", processOrder);
}


const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!newsletterForm.checkValidity()) {
            newsletterForm.reportValidity();
            return;
        }

        alert("Thank you for subscribing.");

        newsletterForm.reset();
    });
}


const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!feedbackForm.checkValidity()) {
            feedbackForm.reportValidity();
            return;
        }

        const feedbackData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            feedback: document.getElementById("feedback").value
        };

        localStorage.setItem(
            "bookHavenFeedback",
            JSON.stringify(feedbackData)
        );

        alert("Thank you for your message.");

        feedbackForm.reset();
    });
}


const customOrderForm = document.getElementById("customOrderForm");

if (customOrderForm) {
    customOrderForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!customOrderForm.checkValidity()) {
            customOrderForm.reportValidity();
            return;
        }

        const orderData = {
            customerName:
                document.getElementById("customer-name").value,

            bookTitle:
                document.getElementById("book-title").value,

            author:
                document.getElementById("author").value,

            quantity:
                document.getElementById("quantity").value,

            orderDetails:
                document.getElementById("order-details").value
        };

        localStorage.setItem(
            "bookHavenCustomOrder",
            JSON.stringify(orderData)
        );

        alert("Thank you for your custom order.");

        customOrderForm.reset();
    });
}


updateCartCount();