// הצגת שם המשתמש
const header = document.querySelector("header")
const thisUser = JSON.parse(localStorage.getItem("thisUser"))
const userName = thisUser.name

header.innerText = header.innerText + " " + userName

// CSS הוספה דינאמית של קלאס 
header.classList.add("show")

// הצגת נצחונות
const winW = document.querySelector(".winW")
const userWin = thisUser.win
const userFail = thisUser.failure
winW.innerText = winW.innerText + " " + userWin + " " + "כשלונות: " + userFail

//התנתק
const button = document.querySelector("button")
button.addEventListener("click",()=>{
    const users = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
       if(users[i].name===thisUser.name)
        {
            users[i].win=thisUser.win
            users[i].failure=thisUser.failure
        }
    }
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.removeItem("thisUser")
    window.location.replace('enter.html')
})

//לאחר 5 שניות מתזכר לאדם להתחיל לשחק
setTimeout(() => {
  alert("מוכן לאתגר? לחץ על 'מעבר למשחק' ונתחיל😃")
}, 5000)
