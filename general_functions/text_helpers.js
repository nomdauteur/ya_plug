function setText(textRu, textEn) {
    if (document.getElementById("lang").textContent.includes("ru")) {
        //console.log("Setting ru");
        return textRu;
    }
    else return textEn;
}

