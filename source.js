const panels = { panel1: -1, panel2: -1 } //id of the data for each panel

window.onload = () => {
    //setup for panels
    let s = window.location.search
    let u = new URLSearchParams(s)

    panels.panel1 = parseInt(u.get("panel1")) || -1;
    panels.panel2 = parseInt(u.get("panel2")) || -1;

    //for matching process
    var pickList; 
    var picks = { "left": null, "right": null } 
    var tagRestrictions = [];
    
    //for animation
    var timer = 0;//for animations
    var animationTypes = ["SlideIn", "SlideOut"];

    //panel functions
    var checkPanel1 = ()=>{
        return panels.panel1>-1 && panels.panel1<data.length;
    }
    var checkPanel2 = ()=>{
        return panels.panel2>-1 && panels.panel2<data.length;
    }
    var setPanel = (id, side)=>{
        setImage(id, side);
        setTitle(id, side);
        setDescription(id, side);
    } 

    //matching process
    var resetPickList = ()=>{
        pickList = [...data]; //reset permissible picks from json
        if(checkPanel1()){
            pickList.splice(panels.panel1,1);
        }
        let remVal = panels.panel2>panels.panel1 ? panels.panel2-1 : panels.panel2;
        if(checkPanel2()){
            pickList.splice(remVal, 1);
        }
        console.log("resetting picklist");
        alert("resetting picklist");
    }
    var makePicks = (prevPick, alreadyPicked=false, side="left", checkInfiniteLoop = 0)=>{
        if(checkInfiniteLoop >= 3){
            console.log("data is bad, preventing infinite loop.")
            alert("ERROR INFINITE LOOP, BAD DATA.");
            return;
        }
        let randomNumber;
        if(!alreadyPicked){ //simple random pick, no tag restrictions
            if (pickList.length === 0) {
                resetPickList();
            }
            randomNumber = Math.floor(Math.random() * pickList.length);
            prevPick = pickList[randomNumber];
            pickList.splice(randomNumber,1);
            tagRestrictions = prevPick.tags;
        }
        let secondPickList = [...pickList];
        for (let pickCounter = 0; pickCounter < secondPickList.length; pickCounter++) {
            let newTags = secondPickList[pickCounter].tags;
            let maxTags = newTags.length + tagRestrictions.length;
            let compareTags = newTags.concat(tagRestrictions);
            compareTags = new Set(compareTags);
            if (compareTags.size !== maxTags) {
                secondPickList.splice(pickCounter, 1);
                pickCounter--;
            }
        }
        //if no valid picks left?
        if (secondPickList.length === 0) {
            /*start over?? (risks infinite loop is dataset is bad)
             *Alternative is we repopulate (similar risk to above)
             *Or we rework the algorithm to prevent pairs of tags from being leftovers, a significantly harder task
             */
            console.log("Time to reset");
            tagRestrictions = [];
            resetPickList();
            console.log("reset ", pickList);
            alert("reshuffling");
            makePicks(prevPick, alreadyPicked, side, checkInfiniteLoop+1); //reset, but avoid infinite loop
            return;
        }
        randomNumber = Math.floor(Math.random() * secondPickList.length);
        newPick = secondPickList[randomNumber];
        if(side==="left"){
            picks.left = prevPick;
            picks.right = newPick;
        }else{
            picks.right = prevPick;
            picks.left = newPick;
        }
        
        pickList.splice(pickList.findIndex((e) => {return e.id === newPick.id }), 1);
        tagRestrictions = [];
    }
    var generate = () => { //pick an image. Check if they are not overwritten by URL params
        if(checkPanel1()&&checkPanel2()){ //2 params, override randomization
            picks.left = data[panels.panel1];
            picks.right = data[panels.panel2];
        }else if(checkPanel1()){
            makePicks(data[panels.panel1], true, "left");
        }else if(checkPanel2()){
            makePicks(data[panels.panel2], true, "right");
        }else{
            makePicks(null); 
            /*
            if (pickList.length === 0) {
                pickList = [...data];
            }
            let randomNumber = Math.floor(Math.random() * pickList.length);

            //pick left, no tag restrictions
            picks.left = pickList[randomNumber];
            pickList.splice(randomNumber, 1)
            tagRestrictions = picks.left.tags;

            //pick right, consider tags.
            let rightPickList = [...pickList]
            for (let pickCounter = 0; pickCounter < rightPickList.length; pickCounter++) {
                let newTags = rightPickList[pickCounter].tags;
                let maxTags = newTags.length + tagRestrictions.length;
                let compareTags = newTags.concat(tagRestrictions);
                compareTags = new Set(compareTags)
                if (compareTags.size !== maxTags) {
                    rightPickList.splice(pickCounter, 1);
                    pickCounter--;
                }
            }
            //if no valid picks left?
            if (rightPickList.length === 0) {
                //start over?? (risks infinite loop is dataset is bad)
                 //Alternative is we repopulate (similar risk to above)
                 //Or we rework the algorithm to prevent pairs of tags from being leftovers, a significantly harder task
                 //
                console.log("Time to reset");
                picks = { "left": null, "right": null };
                tagRestrictions = [];
                pickList = [...data];
                console.log("reset ", pickList);
                generate();
                return;
            }
            randomNumber = Math.floor(Math.random() * rightPickList.length);
            picks.right = rightPickList[randomNumber];
            pickList.splice(pickList.findIndex((e) => { e.id === picks.right.id }), 1);
            tagRestrictions = [];*/
        }
        //set html elements according to what was picked
            setPanel(picks.left.id, "left");
            setPanel(picks.right.id, "right");

        //reset picks for next, unless overridden by params
            if(!checkPanel1()){
                picks.left = null;
            }
            if(!checkPanel2()){
                picks.right = null;
            }
        }
    // panel functions
    var setImage = (index, side) => {
        //find the element
        let imageWrapper = document.querySelector(`.image-${side}`);

        //slideOut animation
        if (timer > 10) setAnimation(imageWrapper, animationTypes[1], side);

        setTimeout(() => {
            //replace the contents with the image
            imageWrapper.innerHTML = `<img src="./images/${data[index].path}"></img>`;

            //slideIn animation
            setAnimation(imageWrapper, animationTypes[0], side);
        }, timer);

    }

    var setTitle = (index, side) => {
        //find the element
        let titleWrapper = document.querySelector(`.title-${side}`);

        //slideOut animation
        if (timer > 10) setAnimation(titleWrapper, animationTypes[1], side);


        setTimeout(() => {
            //replace the contents with the description
            titleWrapper.innerHTML = `<h1>${data[index].title}</h1>`;

            //slideIn animation
            setAnimation(titleWrapper, animationTypes[0], side);
        }, timer);

    }

    var setDescription = (index, side) => {
        //find the element
        let descriptionWrapper = document.querySelector(`.description-${side}`);


        //slideOut animation
        if (timer > 10) setAnimation(descriptionWrapper, animationTypes[1], side);

        setTimeout(() => {
            //replace the contents with the description
            descriptionWrapper.innerHTML = `<p>${data[index].description}</p>`;

            //slideIn animation
            setAnimation(descriptionWrapper, animationTypes[0], side);

        }, timer);
    }

    var setAnimation = (element, animation, side) => {
        //remove all animation classes
        animationTypes.forEach((name) => {
            element.classList.remove(`${side+name}`);
        });
        setTimeout(() => {
            element.offsetWidth = element.offsetWidth;
            element.classList.add(`${side+animation}`);
        }, 0);

    }

    resetPickList();
    var button = document.querySelector(".generate");
    button.addEventListener(`click`, generate);

    if(checkPanel1()){
        setPanel(panels.panel1,"left");
    }
    if(checkPanel2()){
        setPanel(panels.panel2,"right");
    }
    timer = 1120;

    console.log(panels);
}