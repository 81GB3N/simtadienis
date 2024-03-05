import { useEffect } from "react";
import { sendUserData } from "../utils/api";

export default function SuperAdminPage() {

    useEffect(()=>{
    
    const port = 4000;
    const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:${port}` : '';
        async function fetchData(){
        const response = await fetch(`${baseUrl}/api/ssas`, {
            //set super admin storage
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log("setting token: ", data)
          localStorage.setItem("user", JSON.stringify(data));
        }
        fetchData();
    }
    ,[])
    
    const handleSubmit = (e) => {
        e.preventDefault();

        sendUserData({
            name: e.target[0].value,
            surname: e.target[1].value,
            password: e.target[2].value,
        }, 'register-admin')
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" placeholder='vardenis' />
            </label>
            <label>
                Surname
                <input type="text" placeholder="placeholder"></input>
            </label>
            <label>
                Password:
                <input type="text" placeholder={'password'} />
            </label>
            <button type="submit">Create Admin Account</button>
        </form>
    );
}

