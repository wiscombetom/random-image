window.onload = () => {
    var imageWrapper = document.querySelector(".image-output");
    var descriptionWrapper = document.querySelector(".description-output");
    
    var generate = () => {
        console.log(`button clicked`);
        var randomNumber = Math.floor(Math.random() * data.length);
        console.log(`${data[randomNumber].path}`);
        console.log(`${data[randomNumber].description}`);
        imageWrapper.innerHTML = `<img src="./images/${data[randomNumber].path}"></img>`;
        descriptionWrapper.innerHTML = `<p>${data[randomNumber].description}</p>`;
    }
        
    var button = document.querySelector(".generate");
    button.addEventListener(`click`, generate);

    generate();
}