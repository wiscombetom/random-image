window.onload = () => {

    // //valid picks, initialize as full copy of data
    // var pickList = [...data];

    // //start at left
    // var isLeft = true;

    // let leftIndex;
    // let rightIndex;

    // //pick a picture+text
    // var pickOne = () => {
    //     if (isLeft) {
    //         //get a random number
    //         leftIndex = Math.floor(Math.random() * pickList.length);

    //         //set the left image and decription 
    //         setImage(leftIndex, "left");
    //         setDescription(leftIndex, "left");
    //     } else {
    //         //get legal pairs with current "left"
    //         let pairs = pickList[leftIndex].pairs;

    //         //reset the right index so we can start the validation loop
    //         rightIndex = -1;

    //         //index of the current pair
    //         let tries = 0;

    //         //loop until we get an id that exists in the left pairs and in the picklist
    //         while (rightIndex < 0) {

    //             //get the next id from the legal pairs
    //             let current = pairs[tries];

    //             //loop through the remaining pickList
    //             for (let i = 0; i < pickList.length; i++) {
    //                 //skip the left image/description
    //                 if (i == leftIndex) {
    //                     continue;
    //                 }
    //                 //if the id matches, set the rightIndex and break
    //                 if (pickList[i].id == current) {
    //                     rightIndex = i;
    //                     break;
    //                 }
    //             }

    //             //increase the tries (also increases the index used to pull the next legal pair)
    //             tries++;

    //             //if we already reached the end of the pairs list, break and set the rightIndex the same as the leftIndex to display a problem
    //             if (tries == pairs.length) {
    //                 rightIndex = leftIndex;

    //                 //hit the end of the pairs list
    //                 break;
    //             }
    //         }

    //         //get a random number
    //         // rightIndex = Math.floor(Math.random() * pickList.length);

    //         if (rightIndex == leftIndex) {
    //             console.log("Indices are the same... no valid pairs.");
    //         }
    //         //set the right image and decription 
    //         setImage(rightIndex, "right");
    //         setDescription(rightIndex, "right");

    //     }
    var pickList = [...data]; //valid picks, initialize as full copy of data
    var isLeft = true; //start at left
    var pickOne = () => { //pick a picture+text
        let randomNumber = Math.floor(Math.random() * pickList.length);
        let leftOrRight = isLeft ? "left" : "right";
        let imageWrapper = document.querySelector(`.image-${leftOrRight}`);
        let descriptionWrapper = document.querySelector(`.description-${leftOrRight}`);
        imageWrapper.innerHTML = `<img src="./images/${pickList[randomNumber].path}"></img>`;
        descriptionWrapper.innerHTML = `<p>${pickList[randomNumber].description}</p>`;

        //animation


        imageWrapper.classList.remove(`${leftOrRight}Slide`)
        descriptionWrapper.classList.remove(`${leftOrRight}Slide`)

        setTimeout(() => {
            imageWrapper.offsetWidth = imageWrapper.offsetWidth;
            descriptionWrapper.offsetWidth = descriptionWrapper.offsetWidth;
            imageWrapper.classList.add(`${leftOrRight}Slide`);
            descriptionWrapper.classList.add(`${leftOrRight}Slide`);

        }, 10);

        //reset globals
        isLeft = !isLeft;
    }

    var setImage = (index, side) => {
        //find the element
        let imageWrapper = document.querySelector(`.image-${side}`);

        //replace the contents with the image
        imageWrapper.innerHTML = `<img src="./images/${pickList[index].path}"></img>`;
    }

    var setDescription = (index, side) => {
        //find the element
        let descriptionWrapper = document.querySelector(`.description-${side}`);

        //replace the contents with the description
        descriptionWrapper.innerHTML = `<p>${pickList[index].description}</p>`;
    }

    var generate = () => {
        pickOne();
        pickOne();

        //remove the left pick from the pickList
        pickList.splice(leftIndex, 1);

        //remove the right pick from the pickList
        pickList.splice(rightIndex, 1);

        if (pickList.length < 1) {
            console.log("Presented every image! Repopulating the list...")
            pickList = [...data];
        }
    }

    var button = document.querySelector(".generate");
    button.addEventListener(`click`, generate);

    generate();
}