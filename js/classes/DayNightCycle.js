let DayNightCycle = class {
    constructor() {
        vars.DEBUG ? console.log(`%cGenerating the Day Night Cycle`, consts.console.defaults + consts.console.colours.important) : null;

        this.isDayTime = true;
        this.isReady = false;
        this.crossOverPoint = 0.73; // this tells the scroller if its day time or night time (this is the crossoverpoint from day to night)

        // create the container, add the backgrounds, the sun and the moon
        this.init();

        // START THE CYCLE
        this.beginCycle();

        this.currentlyFadingImage = 1; // holds the image number we're currently working on. When this var changes (via getTimeOfDayImageAlpha) we set the previous image to alpha 1
    }

    init() {
        vars.DEBUG ? console.log(`   >> init`) : null;
        !scene.containers ? scene.containers = {} : null;
        let depth = consts.depths.dayNightCycle;
        
        this.container = scene.containers.dayNightCycle =  scene.add.container().setName('dayNightCycle'); // object reference and external reference
        this.container.setDepth(depth);
        
        // first add the backgrounds to the container
        this.initBackgrounds();

        // now add the sun and moon
        this.initSunMoon();
        this.initSunMoonTween(); // generates the sun and moon's X position tweens (both start off paused)

        this.initTimeOfDay();
    }
    initBackgrounds () {
        this.backgrounds = [];
        let cC = consts.canvas;
        for (let i=0; i<=6; i++) {
            let alpha = i ? 0 : 1;
            let bg = scene.add.image(cC.cX,cC.cY,'dayNightCycle',`dayNight_${i}`).setAlpha(alpha);
            this.container.add(bg);
            this.backgrounds.push(bg);
        };
    }
    initSunMoon() {
        let x = -32; let y = 180;
        this.sun = scene.add.image(x,y,'dayNightCycle','sun').setOrigin(0.5,0);
        this.sun.startY = y;
        this.sun.alphaTween = scene.tweens.add({ targets: this.sun, alpha: 0.9, duration: 125, repeat: -1, yoyo: true }); // an alpha tween for the sun to make it "flicker"
        this.moon = scene.add.image(x,y,'dayNightCycle','moon').setOrigin(0.5,0);
        this.moon.startY = y;

        this.container.add([this.sun,this.moon]);
    }
    initSunMoonTween() {
        vars.DEBUG ? console.log(`   >> initSunMoonTween`) : null;
        let sun = this.sun;
        this.sunTweenX = scene.add.tween({
            targets: sun,
            x: consts.canvas.width+32, // the sun starts 32 pixels from the left of the screen and ends 32 pixels from the right
            // NOTE: Y position is dealt with by another tween
            duration: (165-45)*1000,
            repeat: -1, paused: true,
            onStart: ()=> {
                vars.DEBUG ? console.log(`🌞 Sun Tween X has just started!`) : null; // note isDayTime is already true
            }
        });

        let moon = this.moon;
        this.moonTweenX = scene.add.tween({
            targets: moon,
            x: consts.canvas.width+32, // the sun starts 32 pixels from the left of the screen and ends 32 pixels from the right
            // NOTE: Y position is dealt with by another tween
            duration: (165-120)*1000,
            repeat: -1,
            paused: true
        });
    }
    // this function sets the alphas of the backgrounds
    // and the position of the sun/moon
    // the way we do this is by changing the begin cycles start point (which uses a number between 0 and 1)
    // which is can be used when getting or setting TimeOfDay
    initTimeOfDay() {
        // init the sun (bg) image timings
        let max=0.73;
        let images=12;
        this.dayCycleStep = ((max/images*1000)|0)/1000;

        let cV=0;
        let delayTimeForImages = []; // temp array that is only used when building the dFIAI object
        this.dTFIAI = {};
        while (cV<=max) {
            let value = ((cV*1000)|0)/1000;
            delayTimeForImages.push(value);
            this.dTFIAI[delayTimeForImages.length-1]= { value: value, image_int: images <= 6 ? images : 13-images };
            if (12-images===5) {
                cV+=this.dayCycleStep;
                value = ((cV*1000)|0)/1000;
                delayTimeForImages.push(value);
                this.dTFIAI[delayTimeForImages.length-1]= { value: value, image_int: 6 };
                images--;
            }
            cV+=this.dayCycleStep;
            images--;
        };
        this.dTFIAI[12]= { value: 0.73, image_int: 0 };
        //console.table(delayTimeForImages);
        //console.table(this.dTFIAI);
    }

    beginCycle() {
        this.isReady=true;

        this.dayNightCycleTween = scene.tweens.addCounter({
            from: 0, to: 1,
            duration: 165 * 1000, // 165 seconds total (120s for the sun, 45 for the moon)
            repeat: -1,
            onStart: ()=> { vars.game.dayNightCycle.startSunTween(); }, // tween just started, start the sun x tween (this tween oly deals with height or y position)
            onUpdate: (_t,_v)=> { vars.game.dayNightCycle.updateCycle(_v.value); }, // as were in a loop created by phaser, "this" is not this class, its the loop (gV.dNC = this class)
            onRepeat: ()=> {
                let o = vars.game.dayNightCycle;
                o.resetCycle(); 
            }
        });
    }

    getBGAlpha(_imageInt,_alpha) {
        if (!checkType(_imageInt,'int') || !checkType(_imageInt,'int')) return false;
        let maxAlpha=0.75;
        let darknessAlpha = _imageInt===2 ? (1-_alpha)/2 : (1-_alpha)/2+0.5;
        return darknessAlpha*maxAlpha;
    }

    getTimeOfDayImageAlpha(_value) {
        if (_value>0.73) return false; // if the value is greater than 0.73 its night and this can be ignored

        let found = null;
        let previousImageData = null; // the image were dealing with
        for (let aI in this.dTFIAI) {
            if (_value<this.dTFIAI[aI].value && found===null) {
                found = {...this.dTFIAI[aI], ...{ index: ~~aI} };
                previousImageData = this.dTFIAI[~~aI-1];
                break;
            };
        };

        let lowerValue = previousImageData.value;
        let alpha = ~~((_value-lowerValue)/this.dayCycleStep*1000)/1000;
        let modifyingImageInt = previousImageData.image_int;
        if (modifyingImageInt<1) return false; // this happens when its half past "night time" - it is still night time, so simply ignore the function

        
        // IF THE INDEX IS > 5 WE SHOULD BE SETTING THE ALPHA BACK TO 0 OVER TIME
        if (found.index > 6) { alpha = 1-alpha; };
        alpha = Math.clamp(0,1,alpha);
        
        this.backgrounds[modifyingImageInt].alpha = alpha;

        // we are now dealing with a new image
        if (this.currentlyFadingImage!==modifyingImageInt) {
            this.updateImageNumber(modifyingImageInt,alpha);
        };

        // if were modifying image 1 or 2 then we need to fade the "Darkness" in or out
        if (modifyingImageInt===1 || modifyingImageInt===2) {
            let darknessAlpha = this.getBGAlpha(modifyingImageInt,alpha);
            vars.phaserObjects.blackMask.setAlpha(darknessAlpha);
            if (!vars.game.night && darknessAlpha>0.25) {
                //console.log(`🌟 Generating stars`);
                !vars.game.night ? vars.game.night = true : null;
                vars.game.generateStars();
            };
        };

    }

    resetCycle() { // this function when called represents SUNRISE! (very important)
        this.isDayTime = !this.isDayTime;

        // move moon back to start position
        this.moon.x = -32;
        this.moon.y = this.moon.startY;
        this.moon.setVisible(false); // and hide it
        
        this.sun.x = -32; // move sun back to start position
        this.sun.y = this.sun.startY;
        this.sun.setVisible(true);

        // reset back to DAYTIME
        this.isDayTime = true;


    }

    getSinYOffset(_val) { // value is between 0 and 1
        if (_val<0 || _val>1) return false;
        
        _val*=Math.PI;
        return (Math.sin(_val)*164)|0;
    }

    startMoonTween() {
        // stop the sun tween
        this.sunTweenX.pause();
        this.moonTweenX.restart();
        this.moonTweenX.play();
    }

    startSunTween() { // begin cycle has just been called, start the sun animation
        // pause the moon tween
        this.moonTweenX.pause();
        this.sunTweenX.restart();
        this.sunTweenX.play();
    }

    updateCycle(_value) {
        this.updateIsDayTime(_value);
        // the incoming _value is a number between 0 and 1
        let movingThe = null;
        let percent;
        if (_value<=this.crossOverPoint) { // numbers less than 0.73 (inc) are sun positions
            percent = _value/this.crossOverPoint;
            movingThe = 'sun'; // i could just use the isDayTimeVar
        } else if (_value>this.crossOverPoint) { // numbers above 0.73 are moon positions
            percent = (_value-this.crossOverPoint)/(1-this.crossOverPoint);
            movingThe = 'moon';
        };

        switch (movingThe) {
            case 'sun':
                this.sun.y = this.sun.startY-this.getSinYOffset(percent);
                vars.shaders.enabled ? vars.shaders.updateSunShaderPosition(this.sun.x,this.sun.y) : null; // if the sun shader is enabled, update its position
                this.moon.visible ? this.moon.visible=false : null;
                !this.sun.visible ? this.sun.visible=true : null;
            break;

            case 'moon':
                this.moon.y = this.moon.startY-this.getSinYOffset(percent);
                this.sun.visible ? this.sun.visible=false : null;
                !this.moon.visible ? this.moon.visible=true : null;
            break;
        };

        
        this.getTimeOfDayImageAlpha(_value);

    }

    updateImageNumber(_newImageInt,_alpha) { // when the image we're dealing with changes, this function is called. it sets the alpha to 1 or 0 then updates the image we're working on
        // NOTE: The incoming alpha value is the alpha of the new image, not the previous one
        let alpha = null;
        if (_alpha<0.1) { // thats why if the incoming alpha < 0.1 it means the previous image was going to alpha 1
            alpha=1; // so set it to that
        } else if (_alpha>0.9) { // same here, the incoming alpha is > 0.9 meaning the previous image was fading out (alpha 0)
            alpha=0; // so set it to that
        } else { // if something weird happens warn the user and stop execution
            console.warn(`Alpha ${_alpha} wasnt in valid range (should have been <0.1 or >0.9)`);
            debugger;
            return false;
        };

        // now set the previous image to its proper alpha (0 or 1, instead of something like 0.001 and 0.999)
        this.backgrounds[this.currentlyFadingImage].alpha=alpha;

        // finally, update the image number were working on
        this.currentlyFadingImage=_newImageInt;
    }

    updateIsDayTime(_value) {
        if (_value<=this.crossOverPoint && !this.isDayTime) { this.isDayTime=true; vars.DEBUG ? console.log(`🌞 Its now day time!`) : null; this.startSunTween(); return; }; // sets isDayTime when were coming from night time
        if (_value>this.crossOverPoint && this.isDayTime) { this.isDayTime=false; vars.DEBUG ? console.log(`🌚 Its now night time!\nStarting the moon tween`) : null; this.startMoonTween(); return; }; // sets !isDayTime when entering night
    }
};