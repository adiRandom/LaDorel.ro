const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

function submitForm() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    let error = false;
    if (!email.toString().match(emailRegex)) {
        //    invalid email
        document.querySelector("#email-error").innerHTML = "Invalid email"
        error = true;
    }
    if (password.toString().length < 8) {
        //    Invalid password
        document.querySelector("#password-error").innerHTML = "Password is shorter than 8 characters"
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
            headers:{"Content-Type":"application/json"}
        })
    }

}

function clearErrors(field){
    if(field === "email"){
        document.querySelector("#email-error").innerHTML = ""
    }
    if(field === "password"){
        document.querySelector("#password-error").innerHTML = ""
    }
}

document.querySelector("#auth-submit").addEventListener("click", submitForm)
document.querySelector("#email").addEventListener("change",()=>clearErrors("email"))
document.querySelector("#password").addEventListener("change",()=>clearErrors("password"))