import { userExists, validatePassword } from "../../utils/api.js";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    function setAdminCache(name, surname) {
        const user = { name: name, surname: surname };
        localStorage.setItem("admin", JSON.stringify(user));
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const name = e.target[0].value;
        const surname = e.target[1].value;
        const password = e.target[2].value;

        console.log(name, surname, password);

        if (!await userExists(name, surname, 'admin')) {
            console.log("Admin account doesn't exist");
            setErrMsg("Admin account doesn't exist")
            return;
        }

        validatePassword(name, surname, password, 'admin').then((res) => {
            if (!res.result) {
                console.log("Incorrect Admin Information", res);
                setErrMsg("Incorrect Admin Information")
            }
            else {
                console.log('logging in as', name, surname);
                setErrMsg("");
                setAdminCache(name, surname);
                navigate('/admin/dashboard');
            }
        })

    }

    return (
        <section className="admin-login-container container">
            <h2 className="admin-login-title">Login</h2>
            <p className={`${errMsg ? "errmsg" : "offscreen"} take-space`}>{errMsg}</p>
            <form className="admin-login" method="get" onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="name">
                        <p>Name</p>
                    </label>
                    <input
                        type="text"
                        placeholder="vardenis"
                        id="name"
                        required>
                    </input>
                </div>
                <div >
                    <label htmlFor="surname">
                        <p>Surname</p>
                    </label>
                    <input
                        type="text"
                        placeholder="pavardnenis"
                        id="surname"
                        required>
                    </input>
                </div>
                <div className="admin-login-pass">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        required>
                    </input>
                </div>
                <input type="submit" id="login-submit"></input>
            </form>
        </section>
    )
}
