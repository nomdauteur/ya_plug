document.body.addEventListener("load",load);
document.body.addEventListener("resize",() => {return false;});

let points = 0;
let lives = 3;

function lose(lb_name) {

    set_leaderboard(1,lb_name,Math.max(points,window.prev_score),ysdk.features.GameplayAPI?.stop);
    document.getElementById("lives").textContent=setText("Вы проиграли. Начать новую игру?", "You lost. Play again?");

    var btn2 = document.createElement("button");
    btn2.className = btn2.className + "button";

    btn2.textContent=setText("Ага","Ok");
    btn2.onclick = function() {document.getElementById(d.id).style.display = "none";
        show_ads(1, () => {document.body.removeChild(document.getElementById("leaderboard"));
            loadFunction();})

    };
    document.getElementById("lives").appendChild(btn2);
}

function setTimer(){
    window.sec = 10.0;
    window.timer = setInterval(function(){
        document.getElementById('safeTimerDisplay').innerHTML=setText("Таймер: ","Timer: ")+Math.floor(sec);
        window.sec=window.sec-0.01;
        if (window.sec < 0) {
            lives -=1;
            document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);
            clearInterval(window.timer);
            if (lives == 0) {
                lose();

            }
            else displayProblem();

        }
    }, 10);
}

function newGame(lb_name) {
    console.log("New game");
    lives = 3;
    points = 0;
    document.getElementById("points").textContent=setText("Счет: ","Count: ")+points;
    document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);
    get_leaderboard(1, lb_name, ysdk.features.GameplayAPI?.start);

    displayProblem();
}

function getRandomProblem() {
    //logic here
    return {"problem":problem,"correct_answer":correct_answer,"other_answer":other_answer}
}

function displayCorrect(id, lb_name) {
    clearInterval(window.timer);
    document.getElementById("right_button").removeAttribute("class");
    document.getElementById("left_button").removeAttribute("class");
    var points_earned = 10*Math.floor(window.sec);
    points +=points_earned;
    if (points > window.prev_score)
    {
        set_leaderboard(1,lb_name,points,()=>{window.prev_score = points;});
    }

    document.getElementById("points").innerHTML=setText("Счет: ","Count: ")+points;
    document.getElementById("points").innerHTML+="   <b style=\"color:green\">+"+points_earned+"</b>";

    console.log(document.getElementById("points"));

    displayProblem();
}

function displayIncorrect(id) {
    document.getElementById("points").innerHTML=setText("Счет: ","Count: ")+points;
    clearInterval(window.timer);
    document.getElementById("right_button").removeAttribute("class");
    document.getElementById("left_button").removeAttribute("class");
    lives -=1;
    document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);
    if (lives == 0) {
        lose();
    }
    else displayProblem();

}

function displayProblem() {
    problem = getRandomProblem();
    document.getElementById("problem_setting").innerHTML=problem.problem;

    var shuffle = Math.floor(Math.random()*2);

    if (shuffle==1) {
        document.getElementById("right_button").innerHTML=problem.correct_answer;
        document.getElementById("left_button").innerHTML=problem.other_answer;
        document.getElementById("right_button").onclick=function(){
            displayCorrect("right_button");
        };
        document.getElementById("left_button").onclick=function(){
            displayIncorrect("left_button");
        };
        document.getElementById("right_button").className="correct";
        document.getElementById("left_button").className="incorrect";
    }
    else {
        document.getElementById("left_button").innerHTML=problem.correct_answer;
        document.getElementById("right_button").innerHTML=problem.other_answer;

        document.getElementById("left_button").onclick=function(){
            displayCorrect("left_button");
        };

        document.getElementById("right_button").onclick=function(){
            displayIncorrect("right_button");
        };
        document.getElementById("right_button").className="incorrect";
        document.getElementById("left_button").className="correct";
    }
    clearInterval(window.timer);
    setTimer();
}

function load(lb_name) {
    get_leaderboard(1, lb_name,()=>{});
    init_with_lang(1,loadFunction);

}

function loadFunction() {
    let d = document.createElement("div");
    d.id="problem";
    document.getElementById("game").appendChild(d);
    let pr = document.createElement("p");
    pr.id = "problem_setting";
    pr.className="problem";
    pr.style.width="100%";
    pr.style.height = "auto";
    pr.style.overflow = "hidden";

    d.appendChild(pr);

    let b1=document.createElement("button");
    b1.id="left_button";
    d.appendChild(b1);
    let b2=document.createElement("button");
    b2.id="right_button";
    d.appendChild(b2);

    let l = document.createElement("p");
    l.id = "lives";

    d.appendChild(l);

    let p = document.createElement("p");
    p.id = "points";
    d.appendChild(p);

    let t = document.createElement("div");
    t.id="safeTimerDisplay";
    d.appendChild(t);

    let ll = document.createElement("div");
    ll.id = "leaderboard";

    document.body.appendChild(ll);

    newGame();
}


