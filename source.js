window.onload = () => {
    var pickList = [...data]; //valid picks, initialize as full copy of data
    //var isLeft = true; //start at left

    //var leftWrapper = document.querySelector('left');
    //var rightWrapper = document.querySelector('right');

    var picks = {"left":null,"right":null}
    var tagRestrictions = [];
    var timer = 0;
    //var leftOrRight = () => {return isLeft ? "left" : "right";}
    var animationTypes = ["SlideIn","SlideOut"];

    var generate = () =>{
        if(pickList.length === 0){
            pickList = [...data];
        }
        let randomNumber = Math.floor(Math.random() * pickList.length);

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
        setImage(picks.left.id,"left");
        setImage(picks.right.id,"right");
        setTitle(picks.left.id,"left");
        setTitle(picks.right.id,"right");
        setDescription(picks.left.id,"left");
        setDescription(picks.right.id,"right");

        picks = {"left":null,"right":null};
    }
    /*
    var pickOne = () => { //pick a picture+text
        let randomNumber = Math.floor(Math.random() * pickList.length);
        let leftOrRight() = isLeft ? "left" : "right";
        
        
        let imageWrapper = document.querySelector(`.image-${leftOrRight()}`);
        let descriptionWrapper = document.querySelector(`.description-${leftOrRight()}`);
        imageWrapper.innerHTML = `<img src="./images/${pickList[randomNumber].path}"></img>`;
        descriptionWrapper.innerHTML = `<p>${pickList[randomNumber].description}</p>`;
        
        
        //animation


        imageWrapper.classList.remove(`${leftOrRight()}Slide`)
        descriptionWrapper.classList.remove(`${leftOrRight()}Slide`)

        setTimeout(() => {
            imageWrapper.offsetWidth = imageWrapper.offsetWidth;
            descriptionWrapper.offsetWidth = descriptionWrapper.offsetWidth;
            imageWrapper.classList.add(`${leftOrRight()}Slide`);
            descriptionWrapper.classList.add(`${leftOrRight()}Slide`);

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

        //slideOut animation
        if(timer>10)setAnimation(imageWrapper, animationTypes[1], side);

        setTimeout(()=>{
            //replace the contents with the image
            imageWrapper.innerHTML = `<img src="./images/${data[index].path}"></img>`;
    
            //slideIn animation
            setAnimation(imageWrapper, animationTypes[0], side);
        },timer);

    }

    var setTitle = (index, side) => {
        //find the element
        let titleWrapper = document.querySelector(`.title-${side}`);

        //slideOut animation
        if(timer>10)setAnimation(titleWrapper, animationTypes[1], side);

        
        setTimeout(()=>{
            //replace the contents with the description
            titleWrapper.innerHTML = `<p>${data[index].title}</p>`;

            //slideIn animation
            setAnimation(titleWrapper, animationTypes[0], side);
        },timer);

    }

    var setDescription = (index, side) => {
        //find the element
        let descriptionWrapper = document.querySelector(`.description-${side}`);


        //slideOut animation
        if(timer>10)setAnimation(descriptionWrapper, animationTypes[1], side);

        setTimeout(()=>{
            //replace the contents with the description
            descriptionWrapper.innerHTML = `<p>${data[index].description}</p>`;
            
            //slideIn animation
            setAnimation(descriptionWrapper, animationTypes[0], side);
            
        },timer);
    }

    var setAnimation = (element, animation, side)=>{
        //remove all animation classes
        animationTypes.forEach((name)=>{
            element.classList.remove(`${side+name}`);
        });
        setTimeout(() => {
            element.offsetWidth = element.offsetWidth;
            element.classList.add(`${side+animation}`);
        }, 0);
        
    }
    var button = document.querySelector(".generate");
    button.addEventListener(`click`, generate);

    generate();
    timer = 1800;
}