const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

function submitForm() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    let error = false;
    if (!email.toString().match(emailRegex)) {
        //    invalid email
        document.querySelector("#email-error").innerHTML = "Email invalid"
        error = true;
    }
    if (password.toString().length < 8) {
        //    Invalid password
        document.querySelector("#password-error").innerHTML = "Parola are mai putin de 8 caractere"
        error = true;
    }

    if (!error) {
        //    Form is valid,submit it
        fetch("http://localhost:3000/api/auth", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {"Content-Type": "application/json"}
        }).then(res => res.ok?res:res.json()).then(res => {
            if (res.error) {
                //There was an error
                document.querySelector("#email-error").innerHTML = res.error;
            } else {
                //Authentication was successful,redirect to home
                window.location.replace("/")
            }
        }).catch(e => {
            console.log(e);
            alert("A aparut o eroare. Incercati mai tarziu.")
        })
    }

}

function clearErrors(field) {
    if (field === "email") {
        document.querySelector("#email-error").innerHTML = ""
    }
    if (field === "password") {
        document.querySelector("#password-error").innerHTML = ""
    }
}

function submitOnEnter(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        submitForm()
    }
}

document.querySelector("#auth-submit").addEventListener("click", submitForm)
document.querySelector("#email").addEventListener("change", () => clearErrors("email"))
document.querySelector("#password").addEventListener("change", () => clearErrors("password"))
document.querySelector("#email").addEventListener("keyup", submitOnEnter);
document.querySelector("#password").addEventListener("keyup", submitOnEnter);