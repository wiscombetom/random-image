const panels = { panel1: -1, panel2: -1 } //id of the data for each panel

window.onload = () => {
    /**
     * Set Up & Initialize Variables 
     */
    
    //initialize things for panels
    let s = window.location.search
    let u = new URLSearchParams(s)

    panels.panel1 = parseInt(u.get("panel1")) === 0 ? 0 : parseInt(u.get("panel1")) || -1;
    panels.panel2 = parseInt(u.get("panel2")) === 0 ? 0 : parseInt(u.get("panel2")) || -1;    
    
    //for matching process
    
    var pickList; 
    var picks = { "left": null, "right": null } 
    var tagRestrictions = [];
    
    //for animation
    var timer = 0;//for animations
    var animationTypes = ["SlideIn", "SlideOut"];

    /**
     * Panel Functions
     * 
     */
    //URL Params
    var checkPanel1 = ()=>{
        return panels.panel1>-1 && panels.panel1<data.length;
    }
    var checkPanel2 = ()=>{
        return panels.panel2>-1 && panels.panel2<data.length;
    }

    //putting data into Panels
    var setPanel = (id, side)=>{
        setImage(id, side);
        setTitle(id, side);
        setDescription(id, side);
    }
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
            element.offsetWidth = element.offsetWidth;//weird workaround to reset animation count
            element.classList.add(`${side+animation}`);
        }, 0);
    }
    /**
     * User Input/Randomized Matching Process functions
     * 
     */

     //reset permissible picks
    var resetPickList = ()=>{
        pickList = [...data]; //grab master copy of data
        if(checkPanel1()){
            pickList.splice(panels.panel1,1);
        }
        let remVal = checkPanel1() && panels.panel2>panels.panel1 ? panels.panel2-1 : panels.panel2;
        if(checkPanel2()){
            pickList.splice(remVal, 1);
        }
        console.log("resetting picklist");
    }
     // set up our variables with the picks
    var makePicks = (prevPick, alreadyPicked=false, side="left", checkInfiniteLoop = 0)=>{
        if(checkInfiniteLoop >= 3){
            console.log("data is bad, preventing infinite loop.")
            alert("ERROR INFINITE LOOP, BAD DATA.");
            return;
        }

        //pick first random, if it's not already picked
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
        //pick second random, copy permissible picks and remove same tag picks
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
             *Alternative  we rework the algorithm to prevent pairs of tags from being leftovers, a significantly harder task
             */
            tagRestrictions = [];
            resetPickList();
            makePicks(prevPick, alreadyPicked, side, checkInfiniteLoop+1); //reset, but avoid infinite loop
            return;
        }

        //we know for sure we have a valid second pick now
        randomNumber = Math.floor(Math.random() * secondPickList.length);
        newPick = secondPickList[randomNumber];

        //apply to proper panels
        if(side==="left"){
            picks.left = prevPick;
            picks.right = newPick;
        }else{
            picks.right = prevPick;
            picks.left = newPick;
        }
        //still need to remove 2nd pick from permissible picks
        pickList.splice(pickList.findIndex((e) => {return e.id === newPick.id }), 1);
        tagRestrictions = [];
    }
    // user input starts the whole process off here.
    var generate = () => { 
        
        //Check if there are URL params, pick images
        if(checkPanel1()&&checkPanel2()){ //2 params, override randomization
            picks.left = data[panels.panel1];
            picks.right = data[panels.panel2];
        }else if(checkPanel1()){
            makePicks(data[panels.panel1], true, "left");
        }else if(checkPanel2()){
            makePicks(data[panels.panel2], true, "right");
        }else{
            makePicks(null); 
        }
        //set html elements according to what was picked
            setPanel(picks.left.id, "left");
            setPanel(picks.right.id, "right");
            timer = 1024; //set animation timer after first generate call

        //reset picks for next, unless overridden by params
            if(!checkPanel1()){
                picks.left = null;
            }
            if(!checkPanel2()){
                picks.right = null;
            }
        }

    /** 
     * Back to initialization! 
     */
    //initialize permissible picks
    resetPickList(); 

    //Button for user input
    var button = document.querySelector(".generate"); 
    button.addEventListener(`click`, generate);

    //Set up the panels if there are URL Params
    if(checkPanel1()){
        setPanel(panels.panel1,"left");
    }
    if(checkPanel2()){
        setPanel(panels.panel2,"right");
    }
}