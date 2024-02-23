import { userExists, validatePassword } from "../../utils/api.js";
import { FormattedMessage, useIntl } from "react-intl";
import BackArrow from "../backArrow.jsx"

import { useRef, useState, useEffect } from "react";


export default function Login({ setUserExists, leave }) {
    const intl = useIntl();

    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [backArrowAnimate, setBackArrowAnimate] = useState(false);


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
            try {
                setErrMsg("User does not exist");
                return;
            }
            catch (err) {
                setErrMsg("Something went wrong: ", err);
            }
        }

        if (!await validatePassword(name, surname, password)) {
            setErrMsg("Incorrect password");
            return;
        }

        await setUserLocalStorage(name, surname);
        setUserExists(true);
    }

    const handleBackArrowClick = () => {
        setBackArrowAnimate(true);
        setTimeout(() => {
            leave(); 
        }, 500); 
    };

    return (
        <section className="form-wrapper">
             <button className="form-leave" onClick={handleBackArrowClick}>
             <BackArrow animate={backArrowAnimate} onAnimate={() => {}}/>
         </button>
            <h3 className="form-title login-title">
                <FormattedMessage id="login" />
            </h3>
            <form className="form login" method="get" onSubmit={handleSubmit}>
                <input
                    className="form-input form-name"
                    type="text"
                    placeholder={intl.formatMessage({ id: "name" })}
                    id="name"
                    required
                    ref={nameRef}
                    onChange={(e) => setName(e.target.value)}
                    value={name}>
                </input>
                <input
                    className="form-input form-surname"
                    type="text"
                    placeholder={intl.formatMessage({ id: "surname" })}
                    id="surname"
                    required
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}>
                </input>
                <input
                    className="form-input form-password"
                    type="password"
                    id="password"
                    placeholder={intl.formatMessage({ id: "password" })}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}>
                </input>
                <p ref={errRef} className={`errmsg ${errMsg ? "active" : ""}`}>{errMsg}</p>
                <div className="form__buttons">
                    <button  className={`form-submit enabled`} type="submit" id="login-submit"
                        //{ disabled={!validName || !validPassword || !validMatch}}
                        >
                        <FormattedMessage id="submit" />
                    </button>
                </div>
            </form>
        </section>
    )
}