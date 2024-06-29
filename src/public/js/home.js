//Traer el carrito desde el evento click en la etiqueta a(productsview)
async function getToCart(event) {
    event.preventDefault();
    try {
        let cartId = localStorage.getItem("cartId");
        
        if (!cartId) {
            const response = await fetch(`/api/cart/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            localStorage.setItem("cartId", data._id);
            cartId = data._id;
        }
        
        window.location.href = "/productsview";
    } catch (error) {
        console.error(error);
    }
}

    function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatWindow.style.display === 'none' || chatWindow.style.display === '' ? 'flex' : 'none';
}