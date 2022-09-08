let Player = class {
    constructor() {
        this.invincible = true; // if gamer && alive and just got hit by an enemy = player becomes invincible until the flashing has ended (immunity frames basically)

        // Game vars (only enabled when the player tries to jump or slide for the first time)
        this.gamer=false;
        this.alive=false;
        this.maxHP = 3;
        this.hp=null;
        this.score=null;


        this.init();
    }

    init() {
        let cC = consts.canvas;
        let depths = consts.depths;
        let pV = vars.player;
        
        vars.anims.initPlayer(); // set up the running animation

        let groundY = cC.height-25;
        this.object = pV.object = scene.physics.add.sprite(cC.width*0.75, groundY,'beast','beast_idle').setOrigin(0.5,1).setDepth(depths.player);
        this.changeHitBox('default');

        pV.object.groundY = groundY;
        pV.object.inAir = false;
        pV.object.sliding = false;
        pV.object.slideKeyUp = true; // slide key up stops the player from just holding slide (same for jump below)
        pV.object.jumpKeyUp = true;

        let yS = this.initJumpYOffsets(pV.object); // needed for the jump code
        pV.object.jumpOffsets = yS;

        pV.object.jump = ()=> {
            if (!pV.object.inAir && pV.object.jumpKeyUp && !pV.object.sliding) { // we are currently on the ground
                pV.object.inAir=true; // start the jump
                pV.object.jumpKeyUp=false; // the the game know that the key has been depressed (we will re-enable the button when the player has let go of it)
                pV.object.stop();
                pV.object.setFrame('beast_jump');
                // move the 0th yOffset to the last position
                let zero = pV.object.jumpOffsets.shift();
                pV.object.jumpOffsets.push(zero);
            };
        };

        pV.object.slide = ()=> {
            if (!pV.object.sliding && pV.object.slideKeyUp && !pV.object.inAir) {
                pV.object.sliding=true; // start the slide
                pV.object.slideKeyUp=false;
                pV.object.stop();
                pV.object.setFrame('beast_slide');
                pV.class.changeHitBox('slide');

                scene.tweens.addCounter({ from: 0, to: 1, duration: 750, onComplete: ()=> { pV.object.sliding=false; pV.class.changeHitBox('default'); pV.object.play('beast_run'); } });
            };
        };

    }

    initJumpYOffsets(_player) {
        let jumpHeight = 48;
        let yS = [];
        for (let a=0; a<Math.PI; a+=0.05) {
            yS.push(Math.sin(a)*jumpHeight|0);
        };
        return yS;
    }

    changeHitBox(_type) {
        switch (_type) {
            case 'default': this.object.setBodySize(this.object.width*0.4, this.object.height*0.9); break;
            case 'slide': this.object.setBodySize(this.object.width, this.object.height*0.33); this.object.setOffset(0,34); break;
            case 'jump': this.object.setBodySize(this.object.width*0.4, this.object.height*0.6); break;
        }
    }

    collideWithEnemy(_playerSprite,_enemySprite) {
        let pC = vars.player.class;
        if (!pC.alive || pC.invincible) return false;

        // check that they have "lives" left
        pC.hp--;
        vars.phaserObjects.hpText.setText(pC.hp);
        if (!pC.hp) { // player just died
            pC.death();
            return;
        }

        pC.invincible = true; // first, make them invincible...
        pC.flash(); // after flashing ends, invincible will be false
        //debugger;
    }

    death() {
        vars.DEBUG ? console.log(`🕱 Player just died!`) : null;
        this.alive=false;

        let pO = vars.phaserObjects;
        pO.hpText.alphaTween = scene.tweens.add({
            targets: pO.hpText, alpha: 0, useFrames: true, yoyo: true, duration: 10, repeat: -1
        });
        pO.scoreText.alphaTween = scene.tweens.add({
            targets: pO.scoreText, alpha: 0, useFrames: true, yoyo: true, duration: 10, repeat: -1,
        });

        let beast = this.object;
        beast.alphaTween = scene.tweens.add({
            targets: beast, alpha: 0, useFrames: true, yoyo: true, duration: 10, repeat: 12,
            onComplete: ()=> {  delete(beast.alphaTween); }
        });

        this.gamerReset();
    }

    fadeOutPlayerUIContainer() {
        let container = scene.containers.playerUI;
        scene.tweens.add({
            targets: container,
            alpha: 0, duration: 1500,
            onComplete: ()=> { vars.player.class.resetVars(); }
        });

        
    }

    flash() { // this happens when a player is hit by an enemy
        // flash the player
        scene.tweens.addCounter({
            from: 0, to: 1, useFrames: true, duration: 4, yoyo: true, repeat: 10,
            onUpdate: (_t,_v)=> { _v.value>0.5 ? this.object.setTintFill(0xffffff) : this.object.clearTint(); },
            onComplete: ()=> { vars.player.class.invincible=false; } // invincible ...until complete
        });
    }

    gamerEnable() {
        if (!this.gamer) {
            this.invincible = false; // player can now collide with enemies

            this.gamer=true;
            this.alive=true;
            this.hp=this.maxHP; // player can take n hits max (when built it was 12, may have changed)
            vars.phaserObjects.hpText.setText(this.hp);
            this.score=0;

            // show the container
            scene.containers.playerUI.alpha=1;
            return true;
        };

        return false;
    }
    gamerReset() {
        this.invincible = true; // re-enable invincibility
        let pC = vars.player.class;
        // after 5 seconds we hide the player UI container and vars (the score and hp has just started flashing)
        scene.tweens.addCounter({
            from: 0, to: 1, duration: 3500,
            onComplete: ()=> { pC.fadeOutPlayerUIContainer(); }
        });
        
        return true;
    }

    resetVars() {
        let pC = vars.player.class;
        pC.gamer=false;
        pC.alive=false;
        pC.hp=null;
        pC.score=null;

        // hide the container
        // kill the two tweens we added to the score and hp text
        let pO = vars.phaserObjects;

        pO.hpText.alphaTween.remove();
        delete(pO.hpText.alphaTween);
        pO.hpText.alpha=1;

        pO.scoreText.alphaTween.remove();
        delete(pO.scoreText.alphaTween);
        pO.scoreText.alpha=1;
    }

    update() {
        if (this.gamer && this.alive) {
            this.updateScore();
        };

        this.updateJump();
    }

    updateJump() {
        if (!vars.player.object.inAir) return false;

        let pV = vars.player;
        let yOffset = pV.object.jumpOffsets.shift(); // grab the first offset
        pV.object.jumpOffsets.push(yOffset); // push it back onto the array
        pV.object.y = pV.object.groundY-yOffset;

        if (!yOffset) { pV.object.inAir=false; pV.object.play('beast_run'); };
    }

    updateScore () {
        this.score+=1;
        vars.phaserObjects.scoreText.setText(`Score: ${this.score}`);
    }
}