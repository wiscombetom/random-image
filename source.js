window.onload = () => {
    var pickList = [...data]; //valid picks, initialize as full copy of data
    var isLeft = true; //start at left

    var leftWrapper = document.querySelector('left');
    var rightWrapper = document.querySelector('right');

    var picks = {"left":null,"right":null}
    var tagRestrictions = [];

    var pick = () =>{
        let randomNumber = Math.floor(Math.random() * pickList.length);
        let leftOrRight = isLeft ? "left" : "right";
        
        //pick left, no tag restrictions
        pick.left = pickList[randomNumber];
        pickList.splice(randomNumber,1)
        tagRestrictions =  pick.left.tags;
        
        //pick right, consider tags.
        let rightPickList = [...pickList]
        for(let pickCounter = 0; pickCounter<rightPickList.length;pickCounter++){
            let newTags = rightPickList[pickCounter].tags;
            let maxTags = newTags.length+tagRestrictions.length;
            let compareTags = newTags.concat(tagRestrictions);
            compareTags = new Set(compareTags)
            if(a.size!==maxTags){
                rightPickList.splice(pickCounter,1);
                pickCounter--;
            }
        }

        if(rightPickList.length===0){
            //repopulate?
        }
        randomNumber = Math.floor(Math.random()*rightPickList.length);
        pick.right = rightPickList[randomNumber];
        pickList.splice(pickList.indexOf(pick.right),1);
        tagRestrictions = [];


        AnimationEffect()
        setImage()
        setImage()
        setTitle()
        setTitle()
        setDescription()
        setDescription()
        AnimationEffect()
        
        picks = {"left":null,"right":null}
    }
    /*
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

        //remove the pick from the pickList
        pickList.splice(randomNumber, 1);

        //remove the right pick from the pickList
        // pickList.splice(rightIndex, 1);

        if (pickList.length < 1) {
            console.log("Presented every image! Repopulating the list...")
            pickList = [...data];
        }
    }
*/
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
        pick();
    }

    var button = document.querySelector(".generate");
    button.addEventListener(`click`, generate);

    generate();
}