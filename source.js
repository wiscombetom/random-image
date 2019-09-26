window.onload = () => {
    var pickList = [...data]; //valid picks, initialize as full copy of data
    var isLeft = true; //start at left

    var leftWrapper = document.querySelector('left');
    var rightWrapper = document.querySelector('right');

    var picks = {"left":null,"right":null}
    var tagRestrictions = [];

    var pick = () =>{
        if(pickList.length === 0){
            pickList = [...data];
        }
        let randomNumber = Math.floor(Math.random() * pickList.length);
        let leftOrRight = isLeft ? "left" : "right";
        console.log(pickList);
        //pick left, no tag restrictions
        picks.left = pickList[randomNumber];
        pickList.splice(randomNumber,1)
        tagRestrictions =  picks.left.tags;
        
        //pick right, consider tags.
        let rightPickList = [...pickList]
        for(let pickCounter = 0; pickCounter<rightPickList.length;pickCounter++){
            let newTags = rightPickList[pickCounter].tags;
            let maxTags = newTags.length+tagRestrictions.length;
            let compareTags = newTags.concat(tagRestrictions);
            compareTags = new Set(compareTags)
            if(compareTags.size!==maxTags){
                rightPickList.splice(pickCounter,1);
                pickCounter--;
            }
        }
        console.log("rightpicklist", rightPickList);
        //if no valid picks left?
        if(rightPickList.length===0){
            /*start over?? (risks infinite loop is dataset is bad)
             *Alternative is we repopulate (similar risk to above)
             *Or we rework the algorithm to prevent pairs of tags from being leftovers, a significantly harder task
            */
           console.log("Time to reset");
            picks = {"left":null, "right":null};
            tagRestrictions = [];
            pickList = [...data];
            console.log("reset ", pickList);
            generate();
            return;
        }
        randomNumber = Math.floor(Math.random()*rightPickList.length);
        picks.right = rightPickList[randomNumber];
        pickList.splice(pickList.findIndex((e)=>{e.id===picks.right.id}),1);
        tagRestrictions = [];

        //TODO
  //      AnimationEffect()
        setImage(picks.left.id,"left");
        setImage(picks.right.id,"right");
        setTitle(picks.left.id,"left");
        setTitle(picks.right.id,"right");
        setDescription(picks.left.id,"left");
        setDescription(picks.right.id,"right");
  //      AnimationEffect()

        picks = {"left":null,"right":null};
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
        imageWrapper.innerHTML = `<img src="./images/${data[index].path}"></img>`;
    }

    var setTitle = (index, side) => {
        //find the element
        let titleWrapper = document.querySelector(`.title-${side}`);

        //replace the contents with the description
        titleWrapper.innerHTML = `<p>${data[index].title}</p>`;
    }

    var setDescription = (index, side) => {
        //find the element
        let descriptionWrapper = document.querySelector(`.description-${side}`);

        //replace the contents with the description
        descriptionWrapper.innerHTML = `<p>${data[index].description}</p>`;
    }

    var generate = () => {
        pick();
    }

    var button = document.querySelector(".generate");
    button.addEventListener(`click`, generate);

    generate();
}