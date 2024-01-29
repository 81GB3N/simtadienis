import { sendUserData, userExists } from "../../utils/api";
import { FormattedMessage } from "react-intl";

export default function Signup({ setUserExists, leave }) {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target["name"].value;
        const surname = e.target["surname"].value;
        const password = e.target["password"].value;
        const repeatPassword = e.target["repeat-password"].value;

        const userData = {
            name: name,
            surname: surname,
            password: password,
            money: 0,
            admin: false
        };

        if (password !== repeatPassword) {
            console.log("passwords dont match");
            return;
        }

        if (await userExists(name, surname)) {
            console.log("this user already exists");
            return;
        }

        sendUserData(userData, "register").then((data) => console.log(data));
        setUserExists(true);
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="name">
                        <FormattedMessage id="name" />
                    </label>
                    <input type="text" placeholder="vardenis"
                        id="name" required></input>
                </div>
                <div >
                    <label htmlFor="surname">
                        <FormattedMessage id="surname" />
                    </label>
                    <input type="text" placeholder="pavardenis"
                        id="surname" required></input>
                </div>
                <div >
                    <label htmlFor="password">
                        <FormattedMessage id="password" />
                    </label>
                    <input type="password" id="password" required></input>
                </div>
                <div>
                    <label htmlFor="repeat-password">
                        <FormattedMessage id="repeat.password" />
                    </label>
                    <input type="password" id="repeat-password" required></input>
                </div>
                <input type="submit" id="register-submit"></input>
            </form>
            <button onClick={leave}>
                <FormattedMessage id="back" 
                />
            </button>
        </>
    )
}