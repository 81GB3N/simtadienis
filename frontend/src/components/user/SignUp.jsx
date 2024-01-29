import { sendUserData, userExists } from "../../utils/api";
import { FormattedMessage } from "react-intl";

export default function Signup({ resetMenu }) {
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

        console.log(`singing up as ${name} ${surname}`);
        sendUserData(userData, "register")
            .then((response) => {
                console.log(response);
                resetMenu();
            }
            )

    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div >
                <label for="name">
                    <FormattedMessage id="name" />
                </label>
                <input type="text" placeholder="vardenis"
                    id="name" required></input>
            </div>
            <div >
                <label for="surname">
                    <FormattedMessage id="surname" />
                </label>
                <input type="text" placeholder="pavardenis"
                    id="surname" required></input>
            </div>
            <div >
                <label for="password">
                    <FormattedMessage id="password" />
                </label>
                <input type="password" id="password" required></input>
            </div>
            <div>
                <label for="repeat-password">
                    <FormattedMessage id="repeat.password" />
                </label>
                <input type="password" id="repeat-password" required></input>
            </div>
            <input type="submit" id="register-submit"></input>
        </form>
    )
}