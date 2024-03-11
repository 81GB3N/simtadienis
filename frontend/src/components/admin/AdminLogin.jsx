import { userExists, validatePassword } from "../../utils/api.js";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    function setAdminCache(name, surname, token) {
        const user = { name: name, surname: surname, token: token };
        localStorage.setItem("admin", JSON.stringify(user));
    }

    function displayError(msg) {
        setErrMsg(msg);
        setTimeout(() => {
            setErrMsg("");
        }, 3000);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const name = e.target[0].value;
        const surname = e.target[1].value;
        const password = e.target[2].value;

        if (!await userExists(name, surname, 'admin')) {
            console.log("Admin account doesn't exist");
            displayError("Admin account doesn't exist");
            return;
        }

        validatePassword(name, surname, password, 'admin').then((res) => {
            if (!res.result) {
                console.log("Incorrect Admin Information", res);
                displayError("Incorrect Admin Information");
            }
            else {
                console.log('logging in as', name, surname);
                setErrMsg("");
                console.log(res.result.token);
                setAdminCache(name, surname, res.result.token);
                navigate('/admin/dashboard');
            }
        })

    }

    return (
        <section className="admin-login-container container">
            <h2 className="admin-login-title">Login</h2>
            <p className={`${errMsg ? "errmsg" : "noerr"} take-space`}>{errMsg}</p>
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
                <input type="submit" id="admin-login-submit"></input>
            </form>
        </section>
    )
}
