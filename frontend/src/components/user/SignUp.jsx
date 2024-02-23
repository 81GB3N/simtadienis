import { sendUserData, userExists } from "../../utils/api";
import { FormattedMessage, useIntl } from "react-intl";

import { useRef, useState, useEffect } from "react";
import BackArrow from "../backArrow";

const USER_REGEX = /^[a-zA-Z0-9]{3,30}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/;

export default function Signup({ setUserExists, leave }) {
    const intl = useIntl();

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

    const [backArrowAnimate, setBackArrowAnimate] = useState(false);


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
            money: 0
        };

        // #TODO, check additionally if submit button was enabled via console

        if (await userExists(name, surname)) {
            setErrMsg("User already exists.");
            return;
        }

        sendUserData(userData, "register").then((data) => console.log("signup: ", data));
        // userExists is changed to rerender hamburgerMenu, which is dependent on this state
        // this causes an unecessary render of userProfile but oh well
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

            <h3 className="form-title signup-title">
                <FormattedMessage id="signup" />
            </h3>
            <form className="form signup" method="post" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input
                        className={`form-input form-name ${validName || !name ? "" : "invalid"}`}
                        type="text"
                        placeholder={intl.formatMessage({ id: "name" })}
                        id="name"
                        ref={nameRef}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}>
                    </input>
                    <p className={`instructions ${nameFocus && name && !validName ? "show" : ""}`}>
                        3 to 30 characters.
                        Must begin with a letter.
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                <div className="input-wrapper">
                    <input
                        className={`form-input surname-input ${validSurname || !surname ? "" : "invalid"}`}
                        type="text"
                        placeholder={intl.formatMessage({ id: "surname" })}
                        id="surname"
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                        required
                        onFocus={() => setSurnameFocus(true)}
                        onBlur={() => setSurnameFocus(false)}>
                    </input>
                    <p className={`instructions ${surnameFocus && surname && !validSurname ? "show" : ""}`}>
                        3 to 30 characters.
                        Must begin with a letter.
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                <div className="input-wrapper">
                    <input
                        className={`form-input form-password ${validPassword || !password ? "" : "invalid"}`}
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={intl.formatMessage({ id: "password" })}
                        value={password}
                        required
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}>
                    </input>
                    <p className={`instructions ${passwordFocus && password && !validPassword ? "show" : ""}`}>
                        At least 5 characters.
                        Must include letter and number
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>
                <div className="input-wrapper">
                    <input
                        className="form-input form-rpassword"
                        type="password"
                        id="repeat-password"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        placeholder={intl.formatMessage({ id: "repeat.password" })}
                        value={matchPassword}
                        required
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}>
                    </input>
                    <p className={`instructions ${matchFocus && matchPassword && !validMatch ? "show" : ""}`}>
                        Must match the first password input field.
                    </p>
                </div>
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