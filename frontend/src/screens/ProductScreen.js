import { getProduct } from "../api";
import Rating from "../components/Rating";
import { hideLoading, parseRequestUrl, showLoading } from "../util";

const ProductScreen = {
        after_render: () => {
            const request = parseRequestUrl();
            document.querySelector("#add-button").addEventListener("click", () => {
                document.location.hash = `/cart/${request.id}`;
            });
        },

        render: async() => {
                const request = parseRequestUrl();
                showLoading();
                const product = await getProduct(request.id);
                if (product.error) {
                    return `<div>${product.error}</div>`;
                }
                hideLoading();
                return `
        <div class = "content">
            <div class="back-to-result">
            <a href ="/#/"> Back to products </a>
            </div>
            <div class = "details">
                <div class = "details-image">
                <img src = "${product.image}" alt = "${product.name}" />
                </div>
                <div class = "details-info">
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({
                              value: product.rating,
                              text: `${product.numReviews} reviews`,
                            })}
                        </li>
                        <li>Price: <strong>$${product.price}</strong></li>
                        <li>
                            Description:
                            <div>${product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                        <li>
                        Price: $${product.price}
                        </li>
                        <li>
                        Status: 
                            ${
                              product.countInStock > 0
                                ? `<span class ="available">Available</span>`
                                : `<span class = "unavailable">Sorry, out of stock!</span>`
                            }
                        </li>
                        <li>
                            <button id = "add-button" class = " fw primary">Add to cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        `;
  },
};
export default ProductScreen;