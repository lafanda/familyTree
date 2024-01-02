import React, {useState} from 'react';
import './styles.css'
import axios from 'axios';


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:4000/signup", {
                email: email,
                password: password
            });
            if (response.status === 200) {
                alert("Registeration Succesful")
            }
        } catch(error) {
            console.log(error);
        }
    };

    function showPassword (){
        var status = document.getElementById("toggleID");
        if (status.type === "password") {
            status.type = "text";
        } else {
            status.type = "password";
        }
    }

    return (
        <section className={""}>
            <div className={"Page"}>
                <img className={"Background"} src={"images/background2.png"} alt={"background"}></img>

                <div className={"Forum"}>
                    <h1 className={"Header"}>SignUp</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="inputPassword"  className="form-label" >Password</label>
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
                            <i className="far fa-eye" ></i>
                        </div>
                        <button type="submit" className="SignupButton btn btn-outline-secondary" on>Signup</button>
                    </form>

                    <p className={"Link"}>Already have an account? Login <a href={"/"}>here.</a></p>
                </div>

            </div>
        </section>);
}

export default Signup;