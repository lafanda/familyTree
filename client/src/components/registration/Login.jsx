import React from 'react';

function Login() {
    return (
        <section>
            <h1>Login</h1>
            <img src="images/logo.png" alt="logo" width={"300px"}/>
            <form action="">
                <div>
                    <label>
                        Email
                    </label>
                    <input type={"text"} placeholder={"example@email.com"} name={"email"} required={true}/>
                    <label>
                        Password
                    </label>
                    <input  type={"password"} placeholder={"password"} name={"password"} required={true}/>
                </div>
            </form>
            <p>Dont have an account? Sign up <a href={"/"}>here.</a></p>
        </section>
    );
}

export default Login;