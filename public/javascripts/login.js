try {
    const userLoginButton = window.document.getElementById("user-login-button");

    const password = window.document.getElementById("inputPassword");
    const username = window.document.getElementById("inputUsername");

    userLoginButton.addEventListener("click", async (e) => {
        await loginAttempt(username.value, password.value);
    }, {
        passive: true
    })

    password.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            await loginAttempt(username.value, password.value);
        }
    }, {
        passive: true
    });

    username.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            await loginAttempt(username.value, password.value);
        }
    }, {
        passive: true
    });
} catch (e) {
    console.log("ERROR", e);
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
