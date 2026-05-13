const button = document.querySelector("button")

// בדיקה שאין שם כפול
const checkName = (name) => {
    // אם לא הוכנס שם משתמש
    if (name.length === 0)
        return false
    
    const checkUserArr = JSON.parse(localStorage.getItem("users"))
    const same = checkUserArr.filter((obj) => {
        return obj.name === name
    })
    if (same.length > 0) {
        alert("השם כבר קיים במערכת")
        return false
    }
    return true
}

// בדיקה שהסיסמא עומדת בתנאים
const checkPassword = (password) => {
    if (password.length < 8) {
        alert("סיסמא חייבת להיות באורך 8 תויים, הכוללת: אות גדולה, אות קטנה ומספרים")
        return false
    }
    const flags = [0, 0, 0]
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) >= 'A' && password.charAt(i) <= 'Z')
            flags[0]++
        if (password.charAt(i) >= 'a' && password.charAt(i) <= 'z')
            flags[1]++
        if (password.charAt(i) >= '0' && password.charAt(i) <= '9')
            flags[2]++
    }
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] === 0) {
            alert("הקוד לא עונה על התנאים: אות גדולה, אות קטנה ומספרים")
            return false
        }
        return true
    }
}

// הוספת משתמש ומעבר לעמוד הבא
const newUser = (name, password) => {
    let win = 0
    let failure = 0
    let obj = {
        name, password, win, failure
    }
    let userArr = []
    const a = JSON.parse(localStorage.getItem("users"))
    if (a != null)
        userArr = a
    userArr.push(obj)
    console.log(userArr)
    localStorage.setItem("users", JSON.stringify(userArr))
    localStorage.setItem("thisUser", JSON.stringify(obj))

    window.location.replace('../html/simon.html')
}

// בעת לחיצה על היכנס
button.addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.querySelector("#newName")
    const password = document.querySelector("#newPassword")
    const realPassword = document.querySelector("#realPassword")
    
    // בדיקת אימות סיסמא
    if (password.value != realPassword.value) {
        alert("הסיסמאות אינן תואמות")
        return
    }

    // אם המשתמש הוא משתמש ראשון
    if (localStorage.getItem("users") === null && checkPassword(password.value)) {
        newUser(name.value, password.value)
    }

    // בדיקה שאין שם כפול ושהסיסמא עומדת בתנאים
    else if (checkPassword(password.value) && checkName(name.value)) {
        newUser(name.value, password.value)// שליחה לפונקציה להוספת המשתמש
    }
})

