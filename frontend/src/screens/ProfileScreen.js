import { update } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../util";

const ProfileScreen = {
    after_render: () => {
        document.querySelector("#signout-btn").addEventListener("click", () => {
            clearUser();
            document.location.hash = "/";
        });
        document
            .getElementById("profile-form")
            .addEventListener("submit", async(e) => {
                e.preventDefault();
                showLoading();
                const data = await update({
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
        const { name, email } = getUserInfo();
        if (!name) {
            document.location.hash = "/";
        }
        return ` 
            <div class = "form-container">
                <form id = "profile-form" >
                    <ul class = "form-items" >
                        <li> 
                            <h1> User Profile</h1>
                        </li >
                        <li>
                            <label for = "name" > Name </label> 
                            <input type = "name" name = "name" id = "name" value ="${name}"/>
                            </li> 
                        
                        <li>
                        <label for = "email" > Email </label> 
                        <input type = "email" name = "email" id = "email" value ="${email}"/>
                        </li> 
                    <li>
                            <label for = "password" > Password </label> 
                            <input type = "password" id = "password"name = "name"/>
                            </li>                            
                        <li>
                            <button type = "submit" class = "primary" > Update </button> 
                        </li> 
                        <li>
                            <button type = "button" id="signout-btn" class = "primary" > Sign-out </button> 
                        </li>
                        
                    </ul> 
                </form>
            </div>`;
    },
};
export default ProfileScreen;