import { getUserData, userExists } from "../../utils/api.js";
import { FormattedMessage } from "react-intl";
import { useMenu } from '../MenuProvider';

export default function Login() {
    const { toggleMenu } = useMenu();

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
            password: password,
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
    }

    return (
        <form method="get" onSubmit={handleSubmit}>
            <div >
                <label for="name">
                    <FormattedMessage id='name' />
                </label>
                <input type="text" placeholder="vardenis"
                    id="name" required></input>
            </div>
            <div >
                <label for="surname">
                    <FormattedMessage id='surname' />
                </label>
                <input type="text" placeholder="pavardnenis"
                    id="surname" required></input>
            </div>
            <div >
                <label for="password">
                    <FormattedMessage id='password' />
                </label>
                <input type="password" id="password" required></input>
            </div>
            <input type="submit" id="login-submit"></input>
        </form>)
}