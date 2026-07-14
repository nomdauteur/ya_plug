function init_with_lang(ya_flag, foo, foo_before=()=>{}) {
    if (ya_flag===0) {
        foo();
        return;
    }
    else {
        YaGames.init()
            .then((ysdk) => {
                document.getElementById("lang").textContent=ysdk.environment.i18n.lang;
                foo_before();
                ysdk.features.LoadingAPI?.ready();

                while (document.getElementById("lang").textContent == "Language") {
                    sleep(20);
                }

                foo();

            })
            .catch(console.error);
    }
}

function start(ya_flag) {
    if (ya_flag===0) return;

    YaGames.init()
        .then((ysdk) => {
            // Informing about starting the gameplay.
            ysdk.features.GameplayAPI?.start();
        });
}

function stop(ya_flag) {
    if (ya_flag===0) return;

    YaGames.init()

        .then((ysdk) => {

            ysdk.features.GameplayAPI?.stop();
        });
}

function show_ads(ya_flag, foo, start_flag) {
    var shouldShow = Math.random();
    if (shouldShow > 0.5 && ya_flag===1) {
        YaGames.init()
            .then((ysdk) => {
                ysdk.adv.showFullscreenAdv({
                    callbacks: {
                        onClose: function(wasShown) {
                            if (start_flag==1) {ysdk.features.GameplayAPI?.start;}
                            foo();
                        },
                        onError: function(error) {
                            console.log(error);
                        }
                    }
                });
            });
    }
    else {
        foo();
    }
}

function set_leaderboard(ya_flag, lb_name, value, foo_after, stop_flag) {
    if (ya_flag==0) return;

    YaGames.init()
        .then((ysdk) => {
            ysdk.leaderboards.setScore(lb_name, value);

            if (stop_flag==1) {
                ysdk.features.GameplayAPI?.stop();
            }

            foo_after();
        }).catch(console.error);;
}

function get_leaderboard(ya_flag, lb_name, start_flag) {
    if (ya_flag==0) return;

    YaGames.init()

        .then((ysdk) => {

            ysdk.leaderboards.getEntries(lb_name, { quantityTop: 3, includeUser: true, quantityAround: 3 })
                .then(res => {window.leaderboard=res; if (start_flag==1) {ysdk.features.GameplayAPI?.start;} drawLeaderboard(lb_name,lb_label_ru,lb_label_en)});
            ysdk.leaderboards.getPlayerEntry(lb_name)
                .then(res => {
                    window.prev_score=res.score;})
                .catch(err => {
                    if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
                        window.prev_score=0;}
                });
        });
}
