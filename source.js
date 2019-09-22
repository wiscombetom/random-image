window.onload = () => {
    var pickList = [...data]; //valid picks, initialize as full copy of data
    var isLeft = true; //start at left
    var pickOne = () => { //pick a picture+text
        let randomNumber = Math.floor(Math.random()*pickList.length);
        let leftOrRight = isLeft ? "left" : "right";
        let imageWrapper = document.querySelector(`.image-${leftOrRight}`);
        let descriptionWrapper = document.querySelector(`.description-${leftOrRight}`);
        imageWrapper.innerHTML = `<img src="./images/${pickList[randomNumber].path}"></img>`;
        descriptionWrapper.innerHTML = `<p>${pickList[randomNumber].description}</p>`;
        
        //reset globals
        isLeft = !isLeft;
        pickList.splice(randomNumber,1);
        if(pickList.length<1){
            console.log("Presented every image! Repopulating the list...")
            pickList = [...data];
        }
    }

    var generate = () => {
        pickOne();
        pickOne();
    }
        
    var button = document.querySelector(".generate");
    button.addEventListener(`click`, generate);

    generate();
}