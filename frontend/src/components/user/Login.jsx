import { userExists, validatePassword } from "../../utils/api.js";
import { FormattedMessage } from "react-intl";

import { useRef, useState, useEffect } from "react";


export default function Login({ setUserExists, leave }) {

    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    function setUserLocalStorage(name, surname) {
        const user = { name: name, surname: surname };
        localStorage.setItem("user", JSON.stringify(user));
    }

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [name, surname, password])

    async function handleSubmit(e) {
        e.preventDefault();

        if (!await userExists(name, surname)) {
            console.log("user doesnt exist");
            return;
        }

        if(!await validatePassword(name, surname, password)){
            console.log("the entered user info doesnt match the password");
            return;
        }

        console.log('logging in as', name, surname);
        await setUserLocalStorage(name, surname);
        setUserExists(true);
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>Log In</h1>
            <form method="get" onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="name">
                        <FormattedMessage id='name' />
                    </label>
                    <input
                        type="text"
                        placeholder="vardenis"
                        id="name"
                        required
                        ref={nameRef}
                        onChange={(e) => setName(e.target.value)}
                        value={name}>
                    </input>
                </div>
                <div >
                    <label htmlFor="surname">
                        <FormattedMessage id='surname' />
                    </label>
                    <input
                        type="text"
                        placeholder="pavardnenis"
                        id="surname"
                        required
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}>
                    </input>
                </div>
                <div >
                    <label htmlFor="password">
                        <FormattedMessage id='password' />
                    </label>
                    <input
                        type="password"
                        id="password" 
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}>
                    </input>
                </div>
                <input type="submit" id="login-submit"></input>
                <button onClick={leave}>
                    <FormattedMessage id="back"
                    />
                </button>
            </form>
        </section>
    )
}