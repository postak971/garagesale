import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../util";

const RegisterScreen = {
    after_render: () => {
        document
            .getElementById("register-form")
            .addEventListener("submit", async(e) => {
                e.preventDefault();
                showLoading();
                const data = await register({
                    name: document.getElementById("name").value,
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
                    document.location.hash = "/";
                }
            });
    },
    render: () => {
        if (getUserInfo().name) {
            document.location.hash = "/";
        }
        return ` 
            <div class = "form-container">
                <form id = "register-form" >
                    <ul class = "form-items" >
                        <li> 
                            <h1> Create Account </h1></li >
                        <li>
                            <label for = "name" > Name </label> <input type = "name" name = "name" id = "name"/>
                            </li> 
                        
                        <li>
                        <label for = "email" > Email </label> <input type = "email" name = "email" id = "email"/>
                        </li> 
                    <li>
                            <label for = "password" > Password </label> 
                            <input type = "password" id = "password"name = "name"/>
                            </li> 
                            <li>
                            <label for = "repassword" > Confirm Password </label> 
                            <input type = "password" id = "repassword"name = "name"/>
                            </li> 
                        <li>
                            <button type = "submit" class = "primary" > Register </button> 
                        </li> 
                        <li > 
                            <div> Already registered ? <a href = "/#/signin"> Sign-in </a>
                            </div > 
                        </li> 
                    </ul> 
                </form>
            </div>`;
    },
};
export default RegisterScreen;