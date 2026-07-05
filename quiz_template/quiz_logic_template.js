var lb_name="cmpQuiz";
var lb_label_ru="Лучшие математики";
var lb_label_en="Best at maths";
var ya_flag=1;

window.prev_score=0;

document.addEventListener("DOMContentLoaded",load);
window.addEventListener("resize",() => {return false;});

points = 0;
lives = 3;

function lose() {
    var value = Math.max(points,window.prev_score);
    console.log("Points to record after losing: "+value);
    set_leaderboard(ya_flag,lb_name,value,()=>{},1);
    document.getElementById("lives").textContent=setText("Вы проиграли. Начать новую игру?", "You lost. Play again?");

    var btn2 = document.createElement("button");
    btn2.className = btn2.className + "button";

    btn2.textContent=setText("Ага","Ok");
    btn2.onclick = function() {
        document.getElementById("game").removeChild(document.getElementById("problem"))
        show_ads(ya_flag, () => {document.body.removeChild(document.getElementById("leaderboard"));
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

function newGame() {
    console.log("New game");
    lives = 3;
    points = 0;
    document.getElementById("points").textContent=setText("Счет: ","Count: ")+points;
    document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);
    get_leaderboard(ya_flag, lb_name, 1);

    displayProblem();
}

function getRandomProblem() {
    //Cmp two numbers, 3>2, -2>-3, 1/2 > 1/3, 2<3
    var property = Math.random(); // 0 to 0.5 "more", 0.5 to 1 "less"
    var minus = Math.random(); // 0 to 0.5 "positive", 0.5 to 1 "negative"
    var degree = Math.random(); // 0 to 0.5 "1", 0.5 to 1 "-1"

    var problem;
    var correct_answer;
    var other_answer;
    var no_1 = 1+randomInt(8);
    var no_2 = 1+randomInt(8);
    while (no_2==no_1) no_2 = 1+randomInt(8);
    var first_no_bigger=(no_1>no_2);
    problem = setText("Что "+(property<=0.5? "больше" : "меньше"), "What's "+(property<=0.5? "more" : "less"))+"?";
    var correct_no;
    var other_no;
    if (property <= 0.5) {
        if (first_no_bigger) {
            correct_no = ((minus<=0.5) == (degree <=0.5)) ? no_1 : no_2;
            other_no = ((minus<=0.5) == (degree <=0.5)) ? no_2 : no_1;
        }
        else {
            correct_no = ((minus<=0.5) == (degree <=0.5)) ? no_2 : no_1;
            other_no = ((minus<=0.5) == (degree <=0.5)) ? no_1 : no_2;
        }
    }
    else {
        if (first_no_bigger) {
            correct_no = ((minus<=0.5) == (degree <=0.5)) ? no_2 : no_1;
            other_no = ((minus<=0.5) == (degree <=0.5)) ? no_1 : no_2;
        }
        else {
            correct_no = ((minus<=0.5) == (degree <=0.5)) ? no_1 : no_2;
            other_no = ((minus<=0.5) == (degree <=0.5)) ? no_2 : no_1;
        }

    }

    if (degree>0.5) {
        correct_answer="<sup>1</sup>&frasl;<sub>"+correct_no+"</sub>";
        other_answer="<sup>1</sup>&frasl;<sub>"+other_no+"</sub>";
    }
    else {
        correct_answer=""+correct_no+"";
        other_answer=""+other_no+"";
    }
    if (minus>0.5) {
        correct_answer="&minus;"+correct_answer;
        other_answer="&minus;"+other_answer;
    }

    return {"problem":problem,"correct_answer":correct_answer,"other_answer":other_answer};
}

function displayCorrect(id) {
    clearInterval(window.timer);
    document.getElementById("right_button").removeAttribute("class");
    document.getElementById("left_button").removeAttribute("class");
    var points_earned = 10*Math.floor(window.sec);
    points +=points_earned;
    if (points > window.prev_score)
    {
        set_leaderboard(ya_flag,lb_name,points,()=>{window.prev_score = points;},1);
    }

    document.getElementById("points").innerHTML=setText("Счет: ","Count: ")+points;
    document.getElementById("points").innerHTML+="   <b style=\"color:green\">+"+points_earned+"</b>";



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
    console.log("Setting problem");
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

function load() {
    document.body.addEventListener("resize",() => {return false;});
    get_leaderboard(ya_flag, lb_name, 0);
    init_with_lang(ya_flag,loadFunction);

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


