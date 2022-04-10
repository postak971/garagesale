const SigninScreen = {
    after_render: () => {},
    render: () => `
        <div class="form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li><h1>Sign-In</h1></li>
                    <li>
                        <label for ="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </li>
                    <li>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="name" />
                    </li>
                    <li>
                    <button type="submit" class ="primary">Signin</button>
                    </li>
                    <li><div>
                    New User? <a href="/#/register">Create Account</a></div></li>
                </ul>
            </form>
        </div>
        `,
};
export default SigninScreen;