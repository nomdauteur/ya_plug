function drawLeaderboard(lb_name, lb_label_ru, lb_label_en) {
    ll = document.getElementById("leaderboard");

    while (ll.firstChild) {
        ll.removeChild(ll.lastChild);
    }

    var h = document.createElement("h1");
    h.textContent=setText(lb_label_ru, lb_label_en);
    h.style.textAlign="left";
    h.style.paddingLeft=vmin(2).toString();

    ll.appendChild(h);


    for (i = 0; i < window.leaderboard.entries.length;i++) {
        var d = document.createElement("p");
        d.style.display="table-row";
        var d1=document.createElement("div");
        d1.style.display="table-cell";
        d1.style.textAlign="left";
        d1.style.paddingLeft=vmin(2);

        var d2=document.createElement("div");
        d2.style.display="table-cell";
        d2.style.textAlign="right";
        d2.style.paddingRight=vmin(2);

        d1.textContent=window.leaderboard.entries[i].rank+". "+window.leaderboard.entries[i].player.publicName;

        d2.textContent=window.leaderboard.entries[i].score;
        d.appendChild(d1);
        d.appendChild(d2);

        ll.appendChild(d);
    }

}
