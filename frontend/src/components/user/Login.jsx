import { useRef, useState, useEffect } from "react";
import { userExists, validatePassword } from "../../utils/api.js";
import { FormattedMessage} from "react-intl";
import { useUser } from "../../context/UserProvider.jsx";
import FormInput from "./FormInput.jsx";

/**
 * Represents the Login component.
 * @component
 * @returns {JSX.Element} The rendered Login component
 */
export default function Login() {
    const { closeLogin, changeUserId } = useUser();

    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    /**
     * Sets the user data in the local storage.
     * @param {string} name - The user's name.
     * @param {string} surname - The user's surname.
     * @param {string} token - The user's token.
     * @returns {Promise<object>} A promise that resolves to the user object.
     */
    function setUserLocalStorage(name, surname, token) {
        return new Promise((resolve, reject) => {
            const user = { name: name, surname: surname, token: token };
            localStorage.setItem("user", JSON.stringify(user));
            resolve(user);
        });        
    }

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [name, surname, password])

    /**
     * Handles the form submission.
     * @param {Event} e - The form submit event.
     */
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

        const loginValidation = await validatePassword(name, surname, password);

        if (!loginValidation.result) {
            setErrMsg("Incorrect password");
            return;
        }
        
        await setUserLocalStorage(name, surname, loginValidation.result.token);
        console.log("User logged in");
        changeUserId(name, surname);
        closeLogin();
    }

    return (
        <section className="form-wrapper">
            <h3 className="form-title login-title">
                <FormattedMessage id="login" />
            </h3>
            <form className="form login" method="get" onSubmit={handleSubmit}>
                <FormInput ref={nameRef} id="name" onValueChange={(e) => setName(e.target.value)} inputValue={name} />
                <FormInput id="surname" onValueChange={(e) => setSurname(e.target.value)} inputValue={surname} />
                <FormInput id="password" onValueChange={(e) => setPassword(e.target.value)} inputValue={password} />
                <p ref={errRef} className={`errmsg ${errMsg ? "active" : ""}`}>{errMsg}</p>
                <div className="form__buttons">
                    <button className={`form-submit enabled`} type="submit" id="login-submit">
                        <FormattedMessage id="submit" />
                    </button>
                </div>
            </form>
        </section>
    )
}