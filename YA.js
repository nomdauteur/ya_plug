function init_with_lang(ya_flag, foo) {
    if (ya_flag===0) {
        foo();
        return;
    }
    else {
        YaGames.init()
            .then((ysdk) => {
                document.getElementById("lang").textContent=ysdk.environment.i18n.lang;
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

function show_ads(ya_flag, foo) {
    var shouldShow = Math.random();
    if (shouldShow > 0.5 && ya_flag===1) {
        YaGames.init()
            .then((ysdk) => {
                ysdk.adv.showFullscreenAdv({
                    callbacks: {
                        onClose: function(wasShown) {
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