const token = {
    get: () => {
        return sessionStorage.getItem('token');
    },
    set: (token) => {
        return sessionStorage.setItem('token', token);
    }
}

try {
    const userLoginButton = window.document.getElementById("user-login-button");

    const password = window.document.getElementById("inputPassword");
    const username = window.document.getElementById("inputUsername");

    userLoginButton.addEventListener("click", async (e) => {
        await loginAttempt(username.value, password.value);
    })

    password.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            await loginAttempt(username.value, password.value);
        }
    });

    username.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            await loginAttempt(username.value, password.value);
        }
    });

} catch (e) {
    console.log("ERROR", e);
}


const documentReady = () => {
    if (token.get() === null || undefined) {
        window.location.href = "/user";
    }
}

async function loginAttempt(username, password) {
    let data = null;

    const result = await fetch("http://localhost:3000/api/ticket", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (result.ok) {
        data = await result.json();
    }

    if (data === null) {
        alert("Login failed");
    } else {
        const {serviceTicket} = data.response;
        token.set(serviceTicket);
        window.location.href = "/";

    }
}

document.addEventListener("DOMContentLoaded", documentReady);
