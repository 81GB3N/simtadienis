import { userExists, validatePassword } from "../../utils/api.js";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../Input";

/**
 * Renders the AdminLogin component.
 * Allows administrators to log in with their credentials.
 *
 * @returns {JSX.Element} The rendered AdminLogin component.
 */
export default function AdminLogin() {
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Sets the admin user information in the local storage.
     *
     * @param {string} name - The admin user's name.
     * @param {string} surname - The admin user's surname.
     * @param {string} token - The admin user's authentication token.
     */
    function setAdminCache(name, surname, token) {
        const user = { name: name, surname: surname, token: token };
        localStorage.setItem("admin", JSON.stringify(user));
    }

    /**
     * Displays an error message for a specified duration.
     *
     * @param {string} msg - The error message to display.
     */
    function displayError(msg) {
        setErrMsg(msg);
        setTimeout(() => {
            setErrMsg("");
        }, 3000);
    }

    /**
     * Handles the form submission event.
     *
     * @param {Event} e - The form submission event.
     */
    async function handleSubmit(e) {
        e.preventDefault();

        if (!await userExists(name, surname, 'admin')) {
            console.log("Admin account doesn't exist");
            displayError("Admin account doesn't exist");
            return;
        }

        const response = await validatePassword(name, surname, password, 'admin')
        
        if (!response.result) {
            console.log("Incorrect Admin Information", response);
            displayError("Incorrect Admin Information");
            return;
        }

        console.log('logging in as', name, surname);
        setErrMsg("");
        console.log(response.result.token);
        setAdminCache(name, surname, response.result.token);
        navigate('/admin/users');
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
                    <Input
                        type="text"
                        placeholder="vardenis"
                        id="name"
                        inputValue={name}
                        onValueChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div >
                    <label htmlFor="surname">
                        <p>Surname</p>
                    </label>
                    <Input
                        type="text"
                        placeholder="pavardnenis"
                        id="surname"
                        inputValue={surname}
                        onValueChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>
                <div className="admin-login-pass">
                    <label htmlFor="password">
                        Password
                    </label>
                    <Input
                        type="password"
                        id="password"
                        inputValue={password}
                        onValueChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <input type="submit" id="admin-login-submit"></input>
            </form>
        </section>
    )
}
