const colorsArr = document.querySelectorAll(".a")
console.log(colorsArr)
const audiosArr = document.querySelector("#b")
const errorAudio = document.querySelector("#error")
const goodAudio = document.querySelector("#good")
const thisUser = JSON.parse(localStorage.getItem("thisUser"))
const start = document.querySelector(".start")
const gameOverView = document.querySelector(".game_over")
const winView = document.querySelector(".win")
let randomArr = []
let clickArr = []

const randomLight = () => {
    randomArr.push(Math.floor(Math.random() * 4));
    let index = 0;

    // מציג את האורות 
    const func = () => {
        const audio = document.getElementById("b1")
        if (index < randomArr.length) {
            colorsArr[randomArr[index]].style.background = "orange";
            setTimeout(() => {
                colorsArr[randomArr[index]].style.background = "";
                index++;
                setTimeout(() => {
                    func()
                }, 200)
            }, 350);
        }
    }
    func(); // הרץ את הפונקציה להציג את האורות
}

// קריאה ראשונית להתחלת המשחק
start.addEventListener("click", () => {
    clickArr = [];
    randomArr = [];
    randomLight()
})

// בדיקת לחיצה של המשתמש
const check = (clickNum) => {
    clickArr.push(clickNum); // הוספת לחיצה למערך
    audiosArr.play();

    // בדיקה אם הלחיצה לא נכונה
    if (clickArr[clickArr.length - 1] !== randomArr[clickArr.length - 1]) {
        errorAudio.play()
        thisUser.failure++
        gameOverView.style.display = "flex"
        localStorage.setItem("thisUser", JSON.stringify(thisUser))
        clickArr = [];
        randomArr = [];
        return
    }
    else audiosArr.play()

    // קונפטי
    function showConfetti() {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }

    // אם כל הלחיצות היו נכונות
    if (clickArr.length === randomArr.length) {
        if (randomArr.length === 8) {
            goodAudio.play();
            showConfetti();
            thisUser.win++
            localStorage.setItem("thisUser", JSON.stringify(thisUser))
            winView.style.display = "flex"
            randomArr = []
            clickArr = []
        }
        else {
            setTimeout(randomLight, 1000); // סיבוב חדש
            clickArr = [];
        }
    }
}

colorsArr[0].addEventListener("click", () => { check(0) })
colorsArr[1].addEventListener("click", () => { check(1) })
colorsArr[2].addEventListener("click", () => { check(2) })
colorsArr[3].addEventListener("click", () => { check(3) })


// buttons
const loby = document.querySelector(".loby")
const log_out = document.querySelector(".log_out")
const tryAgein = document.querySelector(".try")
const agein = document.querySelector(".agein")
console.log(tryAgein)
loby.addEventListener("click", () => {
    window.location.replace('simon.html')
})

log_out.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === thisUser.name) {
            users[i].win = thisUser.win
            users[i].failure = thisUser.failure
        }
    }
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.removeItem("thisUser")
    window.location.replace('enter.html')
})

tryAgein.addEventListener("click", () => {
    window.location.replace('play.html')
})

agein.addEventListener("click", () => {
    window.location.replace('play.html')
})