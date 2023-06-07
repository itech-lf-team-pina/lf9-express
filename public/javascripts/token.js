const token = {
    get: () => {
        // get token from cookie
        const cookies = document.cookie.split("; ");
        const cookie = cookies.find((cookie) => cookie.startsWith("token="));
        if (cookie === undefined) {
            return null;
        }
        return cookie.split("=")[1];
    },
    set: (tokenToSet) => {
        const d = new Date();
        d.setTime(d.getTime() + (900 * 1000));
        // set token or add token to cookie
        document.cookie = `token=${tokenToSet};expires=${d.toUTCString()};`;
    }
}


const documentReady = () => {
    if (token.get() === null || undefined) {
        if (window.location.pathname.includes("/user") === false) {
            window.location.href = "/user";
        }
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
        window.location.body = JSON.stringify({
            error: "Login failed"
        });
        window.location.method = "POST";
        window.location.href = "/user";


    } else {
        const {serviceTicket} = data.response;
        token.set(serviceTicket);
        window.location.href = "/";
    }
}

document.addEventListener("DOMContentLoaded", documentReady);
