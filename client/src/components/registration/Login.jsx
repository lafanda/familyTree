import React, {useState} from 'react';
import './styles.css'
import axios from 'axios'

function showPassword (){
    var status = document.getElementById("toggleID");
    if (status.type === "password") {
        status.type = "text";
    } else {
        status.type = "password";
    }
}
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                alert("log in success")
            } else {
                const errorResponse = await response.json();
                alert(errorResponse.message);
            }

        } catch (err) {
            console.log(err);
        }
    };


    return (
        <section className={""}>
            <div className={"Page"}>
                <img className={"Background"} src={"images/background.png"} alt={"background"}></img>

                <div className={"Forum"}>
                    <h1 className={"Header"}>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                value={email}
                                placeholder="name@example.com"
                                onChange={ev => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="toggleID"
                                placeholder="Password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                            />
                        </div>
                        <div className='Checkbox'>
                            <input type="checkbox" onChange={showPassword}/>
                            <i className="far fa-eye"></i>
                        </div>
                        <button type="submit" className="LoginButton btn btn-outline-secondary" on>Login</button>
                    </form>
                    <p className={"Link"}>Dont have an account? Sign up <a href={"/signup"}>here.</a></p>
                </div>

            </div>
        </section>);
}

export default Login;