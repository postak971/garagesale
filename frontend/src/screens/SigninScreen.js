import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../util";

const SigninScreen = {
    after_render: () => {
        document
            .getElementById("signin-form")
            .addEventListener("submit", async(e) => {
                e.preventDefault();
                showLoading();
                const data = await signin({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                });
                hideLoading();
                if (data.error) {
                    // eslint-disable-next-line no-alert
                    // alert(data.error);
                    showMessage(data.error);
                } else {
                    setUserInfo(
                        data
                    ); /* save user information in the local storage after successful login */
                    /* document.location.hash = "/"; */
                    redirectUser();
                }
            });
    },
    render: () => {
        if (getUserInfo().name) {
            redirectUser();
        }
        return ` 
            <div class = "form-container">
                <form id = "signin-form" >
                    <ul class = "form-items" >
                        <li> 
                            <h1> Sign-In </h1></li >
                        <li>
                            <label for = "email" > Email </label> <input type = "email" name = "email" id = "email"/>
                            </li> 
                        <li>
                            <label for = "password" > Password </label> 
                            <input type = "password" id = "password"name = "name"/>
                            </li> 
                        <li>
                            <button type = "submit" class = "primary" > Signin </button> 
                        </li> 
                        <li > 
                            <div> New User ? <a href = "/#/register"> Create Account </a>
                            </div > 
                        </li> 
                    </ul> 
                </form>
            </div>`;
    },
};
export default SigninScreen;