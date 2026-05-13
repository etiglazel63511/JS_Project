const button = document.querySelector("button")
let thisUser = {}
let i = 0

const savedUsers = localStorage.getItem("users")

// אם אין עדיין משתמשים רשומים, עבור להרשמה
if(!savedUsers || savedUsers=="" || savedUsers=="[]") window.location.replace('registar.html')

// מציאת המשתמש במערך המשתמשים
const user = (name,password)=>{
    const userArr = JSON.parse(localStorage.getItem("users"))
    for (i = 0; i < userArr.length; i++) {
        if (userArr[i].name === name && userArr[i].password === password) {
            thisUser=userArr[i]
            localStorage.setItem("thisUser", JSON.stringify(thisUser))
            window.location.replace('simon.html')
            break
        }
    }
	
    // אם אין משתמש כזה
    if (i === userArr.length)
        {
            alert("אינך רשום, הרשם עכשיו")
            window.location.replace('register.html')
        }
}

// לחיצה על היכנס
button.addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.querySelector("#name")
    const password = document.querySelector("#password")
    user(name.value,password.value)
})

