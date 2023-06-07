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


document.addEventListener("DOMContentLoaded", documentReady);
