import { sendUserData, userExists } from "../../utils/api";
import { FormattedMessage } from "react-intl";

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z0-9]{3,30}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/;

export default function Signup({ setUserExists, leave }) {

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

        const userData = {
            name: name,
            surname: surname,
            password: password,
            money: 0,
            admin: false
        };

        // #TODO, check additionally if submit button was enabled via console

        if (await userExists(name, surname)) {
            console.log("this user already exists");
            return;
        }

        sendUserData(userData, "register").then((data) => console.log(data));
        setUserExists(true);
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>Sign Up</h1>
            <form method="post" onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="name">
                        <FormattedMessage id="name" />
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        placeholder="vardenis"
                        id="name"
                        ref={nameRef}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}>
                    </input>
                    <p className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        3 to 30 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                <div >
                    <label htmlFor="surname">
                        <FormattedMessage id="surname" />
                        <FontAwesomeIcon icon={faCheck} className={validSurname ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validSurname || !surname ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        placeholder="pavardenis"
                        id="surname"
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                        required
                        onFocus={() => setSurnameFocus(true)}
                        onBlur={() => setSurnameFocus(false)}>
                    </input>
                    <p className={surnameFocus && surname && !validSurname ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        3 to 30 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                <div >
                    <label htmlFor="password">
                        <FormattedMessage id="password" />
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}>
                    </input>
                    <p className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        At least 5 characters.<br />
                        Must include letter and number<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>
                <div>
                    <label htmlFor="repeat-password">
                        <FormattedMessage id="repeat.password" />
                        <FontAwesomeIcon icon={faCheck} className={validMatch ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="repeat-password"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        value={matchPassword}
                        required
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}>

                    </input>
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                </div>
                <input
                    type="submit"
                    id="register-submit"
                    disabled={!validName || !validPassword || !validMatch}>
                </input>
                <button onClick={leave}>
                    <FormattedMessage id="back"
                    />
                </button>
            </form >
        </section>
    )
}