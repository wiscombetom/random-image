window.onload = () => {
    var imageWrapper = document.querySelector(".image-output");
    var descriptionWrapper = document.querySelector(".description-output");
    
    var generate = () => {
        var randomNumber = Math.floor(Math.random() * data.length);
        imageWrapper.innerHTML = `<img src="./images/${data[randomNumber].path}"></img>`;
        randomNumber = Math.floor(Math.random() * data.length);
        descriptionWrapper.innerHTML = `<p>${data[randomNumber].description}</p>`;
    }
        
    var button = document.querySelector(".generate");
    button.addEventListener(`click`, generate);

    generate();
}