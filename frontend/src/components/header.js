import { getUserInfo } from "../localStorage";

const Header = {
        render: () => {
                const { name } = getUserInfo();
                return `
        <div class="brand">
        <a href="/#/">Garage<span>Sale</span></a>
        </div>
        <div>
        <a href="/#/cart">Cart</a>
        ${name
            ? `<a href="/#/profile">${name}</a>`
            : `<a href="/#/signin">Sign in<a>`}        
        </div>`
    },
    after_render: () => {}
}
export default Header;