//Log out the user


function setCookie(cookieName, cookieValue, expireDate) {
    const expires = "expires=" + expireDate.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function logOut() {
    //Set the session cookie to exp in the past
    const expDate = new Date();
    expDate.setFullYear(1971)
    setCookie("session", "", expDate);

    window.location.replace("/")
}

document.querySelector("#log-out").addEventListener("click", logOut)