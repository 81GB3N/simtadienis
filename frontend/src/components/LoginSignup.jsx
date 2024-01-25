import { sendUserData, getUserData, userExists } from "../utils/api"

export default function LoginSignup() {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const surname = e.target.surname.value;
        const password = e.target.password.value;
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

        console.log(name, surname)

        if (await userExists(name, surname)) {
            console.log("this user already exists");
            return;
        }

        console.log(`registering as ${name} ${surname}`);
        sendUserData(userData, "register");
    }

    return (
        <form method="post" class="register-form" onSubmit={handleSubmit}>
            <div class="name">
                <label for="name">NAME</label>
                <input type="text" placeholder="vardenis" id="name" required></input>
            </div>
            <div class="surname">
                <label for="surname">SURNAME</label>
                <input type="text" placeholder="pavardenis" id="surname" required></input>
            </div>
            <div class="password">
                <label for="password">PASSWORD</label>
                <input type="text" id="password" required></input>
            </div>
            <div class="repeat-password">
                <label for="repeat-password">REPEAT PASSWORD</label>
                <input type="text" id="repeat-password" required></input>
            </div>
            <input type="submit" value="Submit" id="register-submit"></input>
        </form>
    )


}