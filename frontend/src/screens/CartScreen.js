import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../util";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        }
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
        // eslint-disable-next-line no-use-before-define
        rerender(CartScreen);
    }
};
const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart';
    } else {
        // eslint-disable-next-line no-use-before-define
        rerender(CartScreen);
    }
};

const CartScreen = {
        // update the subtotal
        after_render: () => {
            const qtySelects = document.getElementsByClassName('qty-select');
            Array.from(qtySelects).forEach((qtySelect) => {
                qtySelect.addEventListener('change', (e) => {
                    const item = getCartItems().find((x) => x.product === qtySelect.id);
                    addToCart({...item, qty: Number(e.target.value) }, true);
                });
            });
            const deleteButtons = document.getElementsByClassName('delete-button');
            Array.from(deleteButtons).forEach((deleteButton) => {
                deleteButton.addEventListener('click', () => {
                    removeFromCart(deleteButton.id);
                });
            });
            document.getElementById('checkout-button').addEventListener('click', () => {
                document.location.hash = '/signin';
            });
        },
        // eslint-disable-next-line arrow-body-style
        render: async() => {
                const request = parseRequestUrl();
                if (request.id) {
                    const product = await getProduct(request.id);
                    if (product.countInStock > 0) {
                        addToCart({
                            product: product._id,
                            name: product.name,
                            image: product.image,
                            price: product.price,
                            countInStock: product.countInStock,
                            qty: 1,
                        });
                    }

                }
                const cartItems = getCartItems();
                return `<div class = "content cart">
            <div class ="cart-list">
                <ul class = "cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    
                    ${
                      cartItems.length === 0
                        ? '<div>Nothing in the cart yet. <a href ="/#/"> Go shopping </a>'
                        : cartItems
                            .map(
                              (item) => `
                        <li>
                            <div class ="cart-image">
                                <img src="${item.image}" alt="${item.name}" />
                            </div>
                            <div class ="cart-name">
                                <div>
                                    <a href="/#/product/${item.product}">
                                    ${item.name}
                                    </a>
                                </div>
                                <div>
                            
                                    Quantity:  <select class="qty-select" id="${item.product}">
                                    ${[...Array(item.countInStock).keys()].map((x) =>
                                      item.qty === x + 1
                                        ? `<option selected value="${x + 1}">${x + 1}</option>`
                                        : `<option  value="${x + 1}">${x + 1}</option>`
                                    )}  
                  
                                    </select>
                                    
                                    <button type ="button" class ="delete-button" id ="${item.product}"> Remove Item
                                    </button>
                                </div>
                            </div>
                            <div class = "cart-price">
                                $${item.price}
                            </div>
                            
                        </li>
                        `
                            )
                            .join("\n") // Remove comma between list items
                    }
                    
            </ul>
        </div>
       
        <div class = "cart-action">
            <h3>Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
            :$${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button id ="checkout-button" class ="primary fw">Proceed to Checkout</button>
        </div>

    </div>`;
  },
};
export default CartScreen;