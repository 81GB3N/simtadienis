import { getUserData, userExists } from "../../utils/api.js";
import { FormattedMessage } from "react-intl";

export default function Login({ setUserExists, leave }) {
    console.log('rendering login');

    function setUserLocalStorage(name, surname) {
        const user = { name: name, surname: surname, admin: false };
        localStorage.setItem("user", JSON.stringify(user));
    }

    async function infoIsCorrect(name, surname, password) {
        const info = await getUserData(name, surname);
        return password === info?.result[0]?.password ? true : false;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const name = e.target["name"].value;
        const surname = e.target["surname"].value;
        const password = e.target["password"].value;

        const userData = {
            name: name,
            surname: surname,
            admin: false
        };

        if (!await userExists(name, surname)) {
            console.log("user doesnt exist");
            return;
        }

        if (!await infoIsCorrect(name, surname, password)) {
            console.log("the entered user info doesnt match the password");
            return;
        }

        console.log('logging in as', name, surname);
        await setUserLocalStorage(name, surname);
        setUserExists(true);
    }

    return (
        <form method="get" onSubmit={handleSubmit}>
            <div >
                <label htmlFor="name">
                    <FormattedMessage id='name' />
                </label>
                <input type="text" placeholder="vardenis"
                    id="name" required></input>
            </div>
            <div >
                <label htmlFor="surname">
                    <FormattedMessage id='surname' />
                </label>
                <input type="text" placeholder="pavardnenis"
                    id="surname" required></input>
            </div>
            <div >
                <label htmlFor="password">
                    <FormattedMessage id='password' />
                </label>
                <input type="password" id="password" required></input>
            </div>
            <input type="submit" id="login-submit"></input>
            <button onClick={leave}>
                <FormattedMessage id="back"
                />
            </button>
        </form>)
}