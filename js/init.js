vars.DEBUG ? console.log('Initialising...') : null;

var config = {
    title: "Beast Runner",
    type: Phaser.WEBGL,

    backgroundColor: '#111111',
    disableContextMenu: true,

    height: consts.canvas.height,
    width: consts.canvas.width,

    physics: {
        default: 'arcade',
        arcade: { debug: vars.DEBUG }
    },

    pixelArt: true,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: consts.canvas.width,
        height: consts.canvas.height,
    },

    scene: {
        preload: preload,
        create: create,
        update: update,
        pack: {
            files: [
                { type: 'image', key: 'loading', url: 'assets/images/loadingScreen.png' }
            ]
        }
    },
    banner: false, version: vars.version.toString(), url: window.location.href,
    loader:{ enableParallel: false, crossOrigin: 'anonymous' }
};

var game = new Phaser.Game(config);


/*
█████ ████  █████ █      ███  █████ ████  
█   █ █   █ █     █     █   █ █   █ █   █ 
█████ ████  ████  █     █   █ █████ █   █ 
█     █   █ █     █     █   █ █   █ █   █ 
█     █   █ █████ █████  ███  █   █ ████  
*/
function preload() {
    scene = this;

    vars.files.audio.singleFile = window.location.host==='offero.rf.gd' ? true : false;
    vars.DEBUG ? console.log(`Loading music tracks as ${vars.files.audio.singleFile ? 'a single file' : 'multiple files'}`) : null;
    vars.UI.initLoadingScreen();
    
    vars.init('PRELOAD');
};



/*
█████ ████  █████ █████ █████ █████ 
█     █   █ █     █   █   █   █     
█     ████  ████  █████   █   ████  
█     █   █ █     █   █   █   █     
█████ █   █ █████ █   █   █   █████ 
*/
function create() {
    let p = vars.plugins.getGrayScalePipeLine();
    let loadingScreen = scene.children.getByName('loadingImage');
    p.add(loadingScreen, { intensity: 0.1 });
    
    // destroy the music track list (if it exists)
    let lV = vars.phaserObjects.loader;
    // turns out I cant trust my temp host to allow all the music track requests (Im only allowed a specific amount of apache/php rqs at a time). Ive set them so they dont download in parallel
    // as there are 13 music tracks (outwith all the jsons and images) ive joined the music tracks into ALL
    if (lV) { // lV exists, we are using multiple audio tracks, NOT the ALL in one
        for (let key in lV) { scene.tweens.add({ targets: lV[key], alpha: 0, duration: 500, onComplete: (_t,_o)=> { _o[0].destroy(); } }) };
    } else { // new update due to host problem. the music tracks are now a single file. we simply need to destroy the loadingText
        vars.phaserObjects.loadingText.destroy();
    };

     vars.intro.init();
};