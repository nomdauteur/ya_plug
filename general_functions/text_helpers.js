function setText(textRu, textEn) {
    if (document.getElementById("lang").textContent.includes("ru")) {
        //console.log("Setting ru");
        return textRu;
    }
    else return textEn;
}

function indicesOf(string, symbol) {
    let indices = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] === symbol) {
            indices.push(i);
        }
    }
    return indices;
}