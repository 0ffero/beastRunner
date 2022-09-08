let Fauna = class {
    constructor(_type) {
        
        this.types = ['rock','bat','demon_bat','dropper','dragon']
        this.randomList = [...this.types].splice(0,4); // the dragon cant be a random enemy, as it drops enemies onto the playfield
        if (!_type || !this.types.includes(_type)) { // select a random enemy type
            this.type = shuffle(this.randomList)[0];
            //console.log(`Selected random enemy - ${this.type}`);
        } else {
            this.type = _type;
        };

        if (this.type.includes('bat')) { // bat can be behind the trees... for fun
            let depth = consts.depths.tree_layer;
            this.depth = getRandom([depth-1,consts.depths.enemies]);
        } else { // default depth
            this.depth = consts.depths.enemies;
        };

        this.init();
        this.initCollision();

        this.addTween();
    }

    init() {
        
        let cC = consts.canvas;
        let scale = getRandom(5,8)/10;
        let groundLevel = cC.height-25; // 25 = 3 layers of grass (11px + 2 x 7px)
        

        let flyingOffset = [4,28];
        let randomFlyingOffset = getRandom(flyingOffset);

        switch(this.type) {
            // ENEMIES THAT MOVE FROM LEFT TO RIGHT
            case 'bat':
                if (this.depth>consts.depths.tree_layer) {
                    this.object = scene.physics.add.sprite(-32, groundLevel-randomFlyingOffset, 'enemies', 'bat_0');
                    this.object.setBodySize(this.object.width*0.8, this.object.height*0.33);
                } else {
                    this.object = scene.add.sprite(-32, groundLevel-randomFlyingOffset, 'enemies', 'bat_0');
                };
                this.object.setOrigin(0.5,1).setScale(scale).setDepth(this.depth);
                this.object.play('enemy_bat');
                this.endXY = [cC.width+32,null];
            break;

            case 'demon_bat':
                if (this.depth>consts.depths.tree_layer) {
                    this.object = scene.physics.add.sprite(-32, groundLevel-randomFlyingOffset, 'enemies', 'demon_bat_0');
                    this.object.setBodySize(this.object.width*0.8, this.object.height*0.33);
                } else {
                    this.object = scene.add.sprite(-32, groundLevel-randomFlyingOffset, 'enemies', 'demon_bat_0');
                };
                this.object.setOrigin(0.5,1).setScale(scale).setDepth(this.depth);
                this.object.play('enemy_demon_bat');
                this.endXY = [cC.width+32,null];
            break;

            case 'rock':
                this.rockMaxYOffset = 26;
                this.object = scene.physics.add.sprite(-32, groundLevel-this.rockMaxYOffset, 'enemies', 'rock_0'); // rocks are ALWAYS in front of the tree layer, hence always physics objects
                this.object.setBodySize(this.object.width*0.6, this.object.height*0.6);
                this.object.setOrigin(0.5,1).setScale(scale).setDepth(this.depth);
                this.object.play('enemy_rock');
                this.endXY = [cC.width+32,null];
            break;

            // ENEMIES THAT MOVE FROM RIGHT TO LEFT
            case 'dragon':
                this.object = scene.add.sprite(cC.width+144, groundLevel, 'enemies', 'dragon_0').setOrigin(0).setDepth(this.depth);
                this.object.play('enemy_dragon');
                this.endXY = [0-144,null];
            break;

            // ENEMIES THAT COME FROM THE SKY
            case 'dropper': // same as rocks, droppers are always in front of the tree line
                this.object = scene.physics.add.sprite(32, 0, 'enemies','dropper_0').setOrigin(1).setScale(scale).setDepth(this.depth);                
                this.object.setBodySize(this.object.width*0.8, this.object.height*0.75);
                this.endXY = [null,groundLevel];
            break;

        };

        this.name = `${this.type}_${generateRandomID()}`;
        this.object.name = this.name;
        this.object.type = this.type;

        
    }
    initCollision() {
        let pV = vars.player;
        scene.physics.add.overlap(pV.object, this.object, pV.class.collideWithEnemy, null, this);
    }

    addTween() {
        if (this.endXY[0]!==null) { // add a tween moving left to right
            if (this.type==='rock') {
                this.object.bounceTween = scene.tweens.add({
                    targets: this.object,
                    y: this.object.y+this.rockMaxYOffset,
                    duration: 500,
                    yoyo: true, repeat: -1,
                    ease: 'Quad.easeIn'
                });
            };
            this.object.tween = scene.tweens.add({
                targets: this.object,
                duration: 3000,
                x: this.endXY[0],
                onComplete: (_t,_o)=> {
                    let object = _o[0];
                    vars.game.destroyEnemyByName(object.name);
                    object.destroy();
                    //console.log(`Destroyed the enemy object ${object.type} named ${object.name}`);
                }
            });
        } else if (this.endXY[1]!==null) {
            this.object.tween = scene.tweens.add({
                targets: this.object,
                duration: 3000,
                ease: 'Expo.easeIn',
                y: this.endXY[1],
                onComplete: (_t,_o)=> { // this is where we would start the dropper animation! and kill the other enemies
                    let object = _o[0];
                    switch (object.type) {
                        case 'dropper':
                            object.play('enemy_dropper');
                            // now it should travel the length of the screen
                            object.tween = scene.tweens.add({ targets: object, x: consts.canvas.width+16, duration: 3000, onComplete: (_t,_o)=> { let object = _o[0]; vars.game.destroyEnemyByName(object.name); object.destroy(); }});
                        break;

                        default:
                            vars.game.destroyEnemyByName(object.name);
                            object.destroy();
                            //console.log(`Destroyed the enemy ${object.type}`);
                        break;
                    }
                }
            });
        } else {
            console.warn(`Invalid tween info (not end x or y)`);
        };
    }
};