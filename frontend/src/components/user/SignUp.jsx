import { sendUserData, userExists } from "../../utils/api";

import { FormattedMessage } from "react-intl";
import { useRef, useState, useEffect } from "react";

import { useUser } from "../../context/UserProvider";

import FormInput from "../Input";

const USER_REGEX = /^[a-zA-Z0-9]{3,30}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/;
const TIMEOUT_DURATION = 1000; // in ms

export default function Signup() {
    const { closeSignup } = useUser();

    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [surname, setSurname] = useState("");
    const [validSurname, setValidSurname] = useState(false);
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const [signupTimeout, setSignupTimeout] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidSurname(USER_REGEX.test(surname));
    }, [surname])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg("");
    }, [name, surname, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSignupTimeout(true);
        setTimeout(() => {
            setSignupTimeout(false);
        }, TIMEOUT_DURATION);

        const userName = name;
        const userSurname = surname;

        const userData = {
            name: userName,
            surname: userSurname,
            password: password,
            money: 0,
            image: null,
            galleryCnt: 0
        };

        // #TODO, check additionally if submit button was enabled via console
        if (await userExists(userName, userSurname)) {
            setErrMsg("User already exists.");
            return;
        }

        await sendUserData(userData, "register")
        closeSignup();
    }

    return (
        <section className="form-wrapper">
            <h3 className="form-title signup-title">
                <FormattedMessage id="signup" />
            </h3>
            <form className="form signup" method="post" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <FormInput
                        ref={nameRef}
                        id="name"
                        customClassNames={`form-input ${validName || !name ? "" : "invalid"}`}
                        onValueChange={(e) => setName(e.target.value)}
                        inputValue={name} onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                    />
                    <p className={`instructions ${nameFocus && name && !validName ? "show" : ""}`}>
                        3 to 30 characters.
                        Must begin with a letter.
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                <div className="input-wrapper">
                    <FormInput
                        id="surname"
                        customClassNames={`form-input ${validSurname || !surname ? "" : "invalid"}`}
                        onValueChange={(e) => setSurname(e.target.value)}
                        inputValue={surname}
                        onFocus={() => setSurnameFocus(true)}
                        onBlur={() => setSurnameFocus(false)}
                    />
                    <p className={`instructions ${surnameFocus && surname && !validSurname ? "show" : ""}`}>
                        3 to 30 characters.
                        Must begin with a letter.
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                <div className="input-wrapper">
                    <FormInput
                        id="password"
                        customClassNames={`form-input ${validPassword || !password ? "" : "invalid"}`}
                        onValueChange={(e) => setPassword(e.target.value)}
                        inputValue={password}
                        type="password"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p className={`instructions ${passwordFocus && password && !validPassword ? "show" : ""}`}>
                        At least 5 characters.
                        Must include letter and number
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>
                <div className="input-wrapper">
                    <FormInput 
                        id="rpassword"
                        customClassNames={`form-input ${validMatch || !matchPassword ? "" : "invalid"}`}
                        onValueChange={(e) => setMatchPassword(e.target.value)}
                        inputValue={matchPassword}
                        type="password"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p className={`instructions ${matchFocus && matchPassword && !validMatch ? "show" : ""}`}>
                        Must match the first password input field.
                    </p>
                </div>
                <p className="password-forget"></p>

                <p ref={errRef} className={`errmsg ${errMsg ? "active" : ""}`}>{errMsg}</p>
                <div className="form__buttons">
                    <button
                        className={`form-submit ${!validName || !validPassword || !validMatch ? '' : 'enabled'}`}
                        type="submit"
                        id="register-submit"
                        disabled={!validName || !validPassword || !validMatch}>
                        <FormattedMessage id="submit" />
                    </button>
                </div>
            </form>
        </section>
    )
}