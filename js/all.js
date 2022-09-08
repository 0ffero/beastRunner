"use strict";Math.clamp=(a=0,b=1,c)=>!!checkType(c,"number")&&(c<a?a:c>b?b:c),String.prototype.capitalise=function(){return this.charAt(0).toUpperCase()+this.slice(1)};function arraySortByKey(a,c){return!!Array.isArray(a)&&a.sort(function(d,a){var b=d[c],e=a[c];return b<e?-1:b>e?1:0})}var checkType=(a,b)=>{let c=!1;switch(b){case"array":c=!!Array.isArray(a);break;case"boolean":case"bool":c=!("boolean"!=typeof a);break;case"float":c=!(Number.isInteger(a)||"number"!=typeof a);break;case"integer":case"int":c=!!Number.isInteger(a);break;case"number":c=!("number"!=typeof a);break;case"object":c=!("object"!=typeof a);break;case"string":case"str":c=!("string"!=typeof a);break;default:console.error(`This type (${b}) has no check!\nUnable to test variables validity.`),c=!1;}return c};function convertToRoman(a){let b={M:1e3,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},c="";for(let d of Object.keys(b)){let e=~~(a/b[d]);a-=e*b[d],c+=d.repeat(e)}return c}var crc32=function(b){for(var d,e=[],g=0;256>g;g++){d=g;for(var h=0;8>h;h++)d=1&d?3988292384^d>>>1:d>>>1;e[g]=d}for(var i=-1,j=0;j<b.length;j++)i=i>>>8^e[255&(i^b.charCodeAt(j))];return(-1^i)>>>0};function framesToMs(a){return!!Number.isInteger(a)&&1e3/60*a}function generateRandomID(a=!1){let b="",c=a?16:8;for(let d=0;d<c;d++)b+=~~(9*Math.random()+1).toString();return b}function generateUserID(){let a=Phaser.Utils.Array.NumberArray(0,9),b=32;for(let d=33;d<33+b-6;d++)a.push(String.fromCharCode(d+b));let c=[];[540541546547,176178179].forEach(b=>{for(let d,e=b.toString();e;)d=e.slice(-3),e=e.replace(d,""),c.push(~~d)}),c.reverse(),c.forEach(b=>{for(let c=2;c;)a.push(String.fromCharCode(b)),c--});let d="",e=[1,2,3,4,5];return e.forEach(b=>{for(let c,e=Math.pow(2,b-1);e;)c=getRandom(a),d+=c,e--;b<e.length?d+="_":null}),d}function getRandom(a,b=null){if(!Phaser)return console.error(`This function needs Phaser to be initialised before use!`),!1;if(Array.isArray(a))return Phaser.Math.RND.pick(a);return"number"==typeof a&&"number"==typeof b?Phaser.Math.RND.between(a,b):"string"==typeof a&&null===b?Phaser.Math.RND.pick(a.split("")):void console.error("The first passed var must either be an array, integer or string. If a 2nd value is passed it must be an integer")}function getStringExtForInt(a){if(!Number.isInteger(a))return!1;let b=a.toString(),c="th";return"1"===b.substr(-1)&&11!==a?c="st":"2"===b.substr(-1)&&12!==a?c="nd":"3"===b.substr(-1)&&13!==a&&(c="rd"),c}function isVar(a="Phaser"){let b="";for(var c in"Phaser"===a&&(b="No variable passed... Searching for Phaser variable\n"),window)if(window.hasOwnProperty(c)&&c===a)return b+=`Found the variable '${a}'`,vars.DEBUG?console.log(b):null,!0;return!1}function radToDeg(a){return 180/Math.PI*a}function shuffle(a){for(var b,c,d=a.length;0!==d;)c=Math.floor(Math.random()*d),d-=1,b=a[d],a[d]=a[c],a[c]=b;return a}var LZString=function(){function a(a,b){if(!c[a]){c[a]={};for(var d=0;d<a.length;d++)c[a][a.charAt(d)]=d}return c[a][b]}var b=String.fromCharCode,c={},d={compressToBase64:function(a){if(null==a)return"";var b=d._compress(a,6,function(a){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)});switch(b.length%4){default:case 0:return b;case 1:return b+"===";case 2:return b+"==";case 3:return b+"=";}},decompressFromBase64:function(b){return null==b?"":""==b?null:d._decompress(b.length,32,function(c){return a("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",b.charAt(c))})},compressToUTF16:function(a){return null==a?"":d._compress(a,15,function(a){return b(a+32)})+" "},decompressFromUTF16:function(a){return null==a?"":""==a?null:d._decompress(a.length,16384,function(b){return a.charCodeAt(b)-32})},compressToUint8Array:function(a){for(var b,c=d.compress(a),f=new Uint8Array(2*c.length),g=0,h=c.length;h>g;g++)b=c.charCodeAt(g),f[2*g]=b>>>8,f[2*g+1]=b%256;return f},decompressFromUint8Array:function(a){if(null===a||void 0===a)return d.decompress(a);for(var c=Array(a.length/2),f=0,g=c.length;g>f;f++)c[f]=256*a[2*f]+a[2*f+1];var h=[];return c.forEach(function(a){h.push(b(a))}),d.decompress(h.join(""))},compressToEncodedURIComponent:function(a){return null==a?"":d._compress(a,6,function(a){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(a)})},decompressFromEncodedURIComponent:function(b){return null==b?"":""==b?null:(b=b.replace(/ /g,"+"),d._decompress(b.length,32,function(c){return a("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",b.charAt(c))}))},compress:function(a){return d._compress(a,16,function(a){return b(a)})},_compress:function(b,g,j){if(null==b)return"";var k,n,o,q={},r={},p="",s="",w="",x=2,y=3,z=2,A=[],d=0,B=0;for(o=0;o<b.length;o+=1)if(p=b.charAt(o),Object.prototype.hasOwnProperty.call(q,p)||(q[p]=y++,r[p]=!0),s=w+p,Object.prototype.hasOwnProperty.call(q,s))w=s;else{if(Object.prototype.hasOwnProperty.call(r,w)){if(256>w.charCodeAt(0)){for(k=0;z>k;k++)d<<=1,B==g-1?(B=0,A.push(j(d)),d=0):B++;for(n=w.charCodeAt(0),k=0;8>k;k++)d=d<<1|1&n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n>>=1}else{for(n=1,k=0;z>k;k++)d=d<<1|n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n=0;for(n=w.charCodeAt(0),k=0;16>k;k++)d=d<<1|1&n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n>>=1}x--,0==x&&(x=Math.pow(2,z),z++),delete r[w]}else for(n=q[w],k=0;z>k;k++)d=d<<1|1&n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n>>=1;x--,0==x&&(x=Math.pow(2,z),z++),q[s]=y++,w=p+""}if(""!==w){if(Object.prototype.hasOwnProperty.call(r,w)){if(256>w.charCodeAt(0)){for(k=0;z>k;k++)d<<=1,B==g-1?(B=0,A.push(j(d)),d=0):B++;for(n=w.charCodeAt(0),k=0;8>k;k++)d=d<<1|1&n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n>>=1}else{for(n=1,k=0;z>k;k++)d=d<<1|n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n=0;for(n=w.charCodeAt(0),k=0;16>k;k++)d=d<<1|1&n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n>>=1}x--,0==x&&(x=Math.pow(2,z),z++),delete r[w]}else for(n=q[w],k=0;z>k;k++)d=d<<1|1&n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n>>=1;x--,0==x&&(x=Math.pow(2,z),z++)}for(n=2,k=0;z>k;k++)d=d<<1|1&n,B==g-1?(B=0,A.push(j(d)),d=0):B++,n>>=1;for(;;){if(d<<=1,B==g-1){A.push(j(d));break}B++}return A.join("")},decompress:function(a){return null==a?"":""==a?null:d._decompress(a.length,32768,function(b){return a.charCodeAt(b)})},_decompress:function(g,j,k){var e,n,o,q,r,x,y,z,B=[],f=4,C=4,D=3,E="",F=[],w={val:k(0),position:j,index:1};for(n=0;3>n;n+=1)B[n]=n;for(q=0,x=Math.pow(2,2),y=1;y!=x;)r=w.val&w.position,w.position>>=1,0==w.position&&(w.position=j,w.val=k(w.index++)),q|=(0<r?1:0)*y,y<<=1;switch(e=q){case 0:for(q=0,x=Math.pow(2,8),y=1;y!=x;)r=w.val&w.position,w.position>>=1,0==w.position&&(w.position=j,w.val=k(w.index++)),q|=(0<r?1:0)*y,y<<=1;z=b(q);break;case 1:for(q=0,x=Math.pow(2,16),y=1;y!=x;)r=w.val&w.position,w.position>>=1,0==w.position&&(w.position=j,w.val=k(w.index++)),q|=(0<r?1:0)*y,y<<=1;z=b(q);break;case 2:return"";}for(B[3]=z,o=z,F.push(z);;){if(w.index>g)return"";for(q=0,x=Math.pow(2,D),y=1;y!=x;)r=w.val&w.position,w.position>>=1,0==w.position&&(w.position=j,w.val=k(w.index++)),q|=(0<r?1:0)*y,y<<=1;switch(z=q){case 0:for(q=0,x=Math.pow(2,8),y=1;y!=x;)r=w.val&w.position,w.position>>=1,0==w.position&&(w.position=j,w.val=k(w.index++)),q|=(0<r?1:0)*y,y<<=1;B[C++]=b(q),z=C-1,f--;break;case 1:for(q=0,x=Math.pow(2,16),y=1;y!=x;)r=w.val&w.position,w.position>>=1,0==w.position&&(w.position=j,w.val=k(w.index++)),q|=(0<r?1:0)*y,y<<=1;B[C++]=b(q),z=C-1,f--;break;case 2:return F.join("");}if(0==f&&(f=Math.pow(2,D),D++),B[z])E=B[z];else{if(z!==C)return null;E=o+o.charAt(0)}F.push(E),B[C++]=o+E.charAt(0),f--,o=E,0==f&&(f=Math.pow(2,D),D++)}}};return d}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString),"use strict";var vars={DEBUG:!1,version:1.88,fonts:{default:{fontFamily:"Consolas",fontSize:"12px",color:"#ffffff",stroke:"#000000",strokeThickness:3},spritesheetPositions:{},init:()=>{let a={};for(let b=0;44>=b;b++){if(26>b){let c=String.fromCharCode(b+65);a[c]={position:b}}35<=b&&(a[b-35]={position:b})}["!","?","(",")",".",":","-",",","'","\xA9"].forEach((b,c)=>{a[b]="\xA9"===b?{position:45}:{position:c+26}}),vars.fonts.spritesheetPositions=a}},init:function(a){switch(a){case"PRELOAD":vars.files.loadAssets(),vars.files.audio.convertTrackTimes(),vars.localStorage.init();break;case"CREATE":vars.anims.init(),vars.audio.init(),vars.camera.init(),vars.containers.init(),vars.groups.init(),vars.input.init(),vars.UI.init(),vars.shaders.init();break;case"STARTAPP":vars.game.init();break;default:return console.error(`Phase (${a}) was invalid!`),!1;}},files:{loadCount:0,audio:{singleFile:!0,list:["01_Opening.ogg","02_Intro.ogg","03_Welcome.ogg","04_Inside_the_Tree.ogg","05_Aarbrons_Revenge.ogg","06_The_Power_Orb.ogg","07_In_the_Dark_Passages.ogg","08_The_Thing.ogg","09_The_Well.ogg","10_Beyond_the_Mind_and_Reality.ogg","11_Game_Over.ogg","12_Castle_Boss.ogg","13_Death.ogg"],tracks:[[1,"Opening","00:00:00"],[2,"Intro","03:25:27"],[3,"Welcome","04:53:30"],[4,"Inside the Tree","08:48:01"],[5,"Aarbrons Revenge","12:21:74"],[6,"The Power Orb","14:37:67"],[7,"In the Dark Passages","15:59:30"],[8,"The Thing","19:08:03"],[9,"The Well","21:23:52"],[10,"Beyond the Mind and Reality","22:30:41"],[11,"Game Over","24:37:64"],[12,"Castle Boss","25:11:59"],[13,"Death","27:11:26"]],convertTrackTimes:()=>{vars.files.audio.tracks.forEach(a=>{let b=a[2],c=b.split(":"),d=60*c[0]+~~c[1]+~~c[2]/100;a[2]=d})},load:()=>{let a=vars.files.audio;if(!a.singleFile){let b=a.list;return void b.forEach(a=>{let b=a.replace(".ogg","");vars.audio.musicTracks.push(b),scene.load.audio(b,`audio/${a}`),scene.load.on(`filecomplete-audio-${b}`,function(a){vars.phaserObjects.loader[a].setTint(65280)})})}scene.load.audio("all","audio/all.ogg"),scene.load.on("filecomplete",(a,b)=>{let c=`${b.toUpperCase()} File (${a}) Loaded...`;vars.UI.generateLoadedText(c),vars.files.loadCount++})}},fonts:{load:()=>{scene.load.spritesheet("defaultFont","fonts/default.png",{frameWidth:32,frameHeight:25})}},images:{load:()=>{scene.load.image("whitepixel","images/whitepixel.png"),scene.load.atlas("ui","images/ui.png","images/ui.json"),scene.load.atlas("beast","images/beast.png","images/beast.json"),scene.load.atlas("enemies","images/enemies.png","images/enemies.json"),scene.load.atlas("background_sprites","images/background_sprites.png","images/background_sprites.json"),scene.load.atlas("dayNightCycle","images/dayNightCycle.png","images/dayNightCycle.json")}},plugins:{load:()=>{scene.load.plugin("rexgrayscalepipelineplugin","plugins/grayscalepipelineplugin.min.js",!0)}},shaders:{load:()=>{scene.load.glsl("sunShader",`shaders/sun/star.frag`),scene.load.image("iChannel0","shaders/sun/iChannel0BW.jpg")}},loadAssets:()=>{scene.load.setPath("assets");let a=vars.files;a.plugins.load(),a.audio.load(),a.fonts.load(),a.images.load(),a.shaders.load()}},containers:{init:function(){let a=consts.depths;scene.containers?null:scene.containers={};let b=scene.containers,c=b.popup=scene.add.container().setName("popup").setDepth(a.popup);c.resetPosition=()=>{c.x=consts.canvas.width},c.y=64,b.trees=scene.add.container().setName("trees").setDepth(a.parallax_layer_3),b.help=scene.add.container().setName("help").setDepth(a.help).setAlpha(0),b.playerUI=scene.add.container().setName("playerUI").setDepth(a.playerUI).setAlpha(0)}},groups:{init:function(){scene.groups={}}},localStorage:{init:function(){window.localStorage}},plugins:{getGrayScalePipeLine:()=>scene.plugins.get("rexgrayscalepipelineplugin")},anims:{init:()=>{vars.DEBUG?console.log(`%cFN: anims > init`,`${consts.console.defaults} ${consts.console.colours.functionCall}`):null},initEnemies:()=>{scene.anims.create({key:"enemy_bat",frames:scene.anims.generateFrameNames("enemies",{prefix:"bat_",end:4}),repeat:-1,yoyo:!0,frameRate:10}),scene.anims.create({key:"enemy_demon_bat",frames:scene.anims.generateFrameNames("enemies",{prefix:"demon_bat_",end:4}),repeat:-1,yoyo:!0,frameRate:10}),scene.anims.create({key:"enemy_dragon",frames:scene.anims.generateFrameNames("enemies",{prefix:"dragon_",end:2}),repeat:-1,yoyo:!0,frameRate:6}),scene.anims.create({key:"enemy_dropper",frames:scene.anims.generateFrameNames("enemies",{prefix:"dropper_",end:3}),frameRate:8}),scene.anims.create({key:"enemy_rock",frames:scene.anims.generateFrameNames("enemies",{prefix:"rock_",end:3}),repeat:-1,frameRate:8})},initPlayer:()=>{scene.anims.create({key:"beast_run",frames:scene.anims.generateFrameNames("beast",{prefix:"beast_run_",end:5}),repeat:-1,frameRate:6})},tweenStar:a=>{a.tween=scene.tweens.add({targets:a,alpha:.9,duration:200,repeat:10,yoyo:!0,ease:"Quad",onStart:()=>{scene.tweens.add({targets:a,x:a.x+5*getRandom(1,2),duration:3800})},onComplete:(b,c)=>{if(.25>vars.phaserObjects.blackMask.alpha)return vars.game.night?vars.game.night=!1:null,void c[0].destroy();let d=vars.UI.chooseNewStarPosition();a.setPosition(d.x,d.y),vars.anims.tweenStar(a)}})}},audio:{available:[],currentlyPlaying:null,musicTracks:[],volume:null,volumeChangingTimeout:0,init:()=>{vars.DEBUG?console.log(`%cFN: audio > init`,`${consts.console.defaults} ${consts.console.colours.functionCall}`):null,vars.audio.volume=.4,scene.sound.volume=vars.audio.volume},getCurrentSpriteTrack:a=>{let b=vars.audio.currentlyPlaying.getCurrentTime(),c=null,d=a.reverse(),e=d.length;return d.forEach((a,d)=>{b>a[2]&&null===c&&(c={arrayIndex:e-1-d,trackdata:a})}),d.reverse(),c},getNextMusicTrack:()=>{let a=vars.audio;if(vars.files.audio.singleFile)return void a.getNextMusicTrackSprite();let b=a.musicTracks.shift();a.musicTracks.push(b),a.playTrack(b)},getNextMusicTrackSprite:(a=!0)=>{let b=vars.files.audio.tracks,c=vars.audio.getCurrentSpriteTrack(b);if(null===c)return`There was a problem finding the next track`;let d=a?c.arrayIndex+1:c.arrayIndex-1;0>d?d=b.length-1:d>b.length-1?d=0:null;let e=b[d];vars.DEBUG?console.log(`New track = ${e[1]}`):null,vars.audio.currentlyPlaying.setSeek(e[2]),vars.audio.currentTrackName=e[1],vars.UI.generatePopup(`Current music track: ${vars.audio.currentTrackName}`)},getPreviousMusicTrack:()=>{let a=vars.audio;if(vars.files.audio.singleFile)return void a.getNextMusicTrackSprite(!1);let b=a.musicTracks.pop();a.musicTracks.splice(0,0,b);let c=a.musicTracks[a.musicTracks.length-1];a.playTrack(c)},playAudioSprite:()=>{let a=vars.audio;a.currentlyPlaying=scene.sound.add("all",{loop:!0}),a.currentTrackName="01 Welcome",a.currentlyPlaying.play(),vars.input.enabled=!0},playSound:a=>{vars.DEBUG?console.log(`%c .. FN: audio > playSound`,`${consts.console.defaults} ${consts.console.colours.functionCall}`):null,scene.sound.add(a,{})},playTrack:a=>{vars.DEBUG?console.log(`  >> Playing track ${a}`):null;let b=vars.audio;b.currentlyPlaying?b.currentlyPlaying.destroy():null;let c=b.currentlyPlaying=scene.sound.add(a,{volume:0});return b.currentlyPlaying.play(),vars.UI.showMusicTrackPopup(),scene.tweens.add({targets:c,volume:1,duration:125,onComplete:()=>{vars.input.enabled=!0}}),c.on("complete",()=>{vars.audio.getNextMusicTrack(),vars.UI.showMusicTrackPopup()}),!0},setVolume:()=>{scene.sound.volume=vars.audio.volume,vars.UI.updateVolume()},startMusic:()=>vars.files.audio.singleFile?void vars.audio.playAudioSprite():void vars.audio.getNextMusicTrack()},camera:{currentZoom:10,minZoom:10,maxZoom:20,panning:!1,zoomInc:2,mainCam:null,init:function(){vars.DEBUG?console.log(`%cFN: camera > init`,`${consts.console.defaults} ${consts.console.colours.functionCall}`):null,vars.camera.mainCam=scene.cameras.main,vars.camera.initMoveWithMouse()},initMoveWithMouse:()=>{scene.input.on("pointermove",function(){}),scene.input.on("pointerup",()=>{})},panTo:(a=0,b=0,c=3e3)=>{return!1},zoomIn:(a=!0)=>{let b=vars.camera;a&&b.currentZoom<b.maxZoom?b.currentZoom+=b.zoomInc:!a&&b.currentZoom>b.minZoom&&(b.currentZoom-=b.zoomInc);b.mainCam.setZoom(b.currentZoom/10)},zoomReset:(a=1e3)=>{}},game:{dayNightCycle:null,night:!1,ready:!1,enemies:[],destroyEnemyByName:a=>{let b=vars.game.enemies.findIndex(b=>b.name===a);if(0<=b)return vars.game.enemies.splice(b,1),void vars.game.enemies.push(new Fauna);console.error(`Enemy with name ${a} was not found in the array`)},init:()=>{vars.DEBUG?console.log(`\n%cFN: game > init`,`${consts.console.defaults.replace("14","16")} ${consts.console.colours.important}`):null,vars.fonts.init(),vars.anims.initEnemies(),vars.UI.initVolumeBar()},begin:()=>{vars.parallax.enabled=!0,vars.UI.initGame(),vars.game.dayNightCycle=new DayNightCycle,scene.containers.help.show(!1),vars.player.object.play("beast_run"),vars.audio.startMusic(),vars.game.generateFauna()},generateFauna:(a=null)=>{a||vars.game.enemies.push(new Fauna)},generateStars:(a=100)=>{for(let b=0;b<a;b++)scene.tweens.addCounter({from:0,to:1,useFrames:!0,duration:3*b,onComplete:vars.UI.generateStar})}},input:{cursors:null,enabled:!1,init:()=>{vars.DEBUG?console.log(`%cFN: input > init`,`${consts.console.defaults} ${consts.console.colours.functionCall}`):null,scene.input.on("pointermove",function(){}),scene.input.on("pointerdown",()=>{!0!==vars.game.ready||vars.UI.ready||(delete vars.game.ready,vars.game.begin());scene.scale.isFullscreen||scene.scale.startFullscreen()}),scene.input.on("pointerup",a=>{vars.DEBUG?console.log(`${mouseButtonNames[a.button]} mouse button clicked`):null}),scene.input.on("wheel",function(a,b,c,d){0>d?vars.camera.zoomIn():vars.camera.zoomIn(!1)}),vars.input.initKeys(),scene.input.on("gameobjectdown",function(a,b){b.name}),scene.input.on("gameobjectover",function(a,b){b.name}),scene.input.on("gameobjectout",function(a,b){b.name})},initKeys:()=>{vars.input.cursors=scene.input.keyboard.createCursorKeys(),scene.input.keyboard.on("keydown",a=>{if(!vars.input.enabled)return"Input is currently disabled";let b=!0;switch(a.code){case"Equal":case"ArrowRight":vars.DEBUG?console.log(`Getting next track`):null,vars.audio.getNextMusicTrack(),b=!1;break;case"Minus":case"ArrowLeft":vars.DEBUG?console.log(`Getting previous track`):null,vars.audio.getPreviousMusicTrack(),b=!1;break;case"ArrowUp":vars.input.changeVolume();break;case"ArrowDown":vars.input.changeVolume(!1);break;case"Space":case"KeyW":vars.player.class.gamer?null:vars.player.class.gamerEnable(),vars.player.object.jump();break;case"KeyS":vars.player.class.gamer?null:vars.player.class.gamerEnable(),vars.player.object.slide();break;default:vars.DEBUG?console.log(`${a.code} has no handler`):null;}b||vars.files.audio.singleFile?null:vars.input.enabled=!1}),scene.input.keyboard.on("keyup",a=>{switch(a.code){case"Space":case"KeyW":vars.player.object.jumpKeyUp=!0;break;case"KeyS":vars.player.object.slideKeyUp=!0;break;case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":break;default:vars.DEBUG?console.log(`Unknown key ${a.code}`):null;}})},changeVolume:(a=!0)=>{let b=vars.audio;b.volume*=10,a?10>b.volume?b.volume++:10:0<b.volume?b.volume--:0;b.volume/=10,vars.audio.setVolume(),vars.audio.volumeChangingTimeout=90}},intro:{init:()=>{scene.containers?null:scene.containers={};let a=consts.canvas,b=scene.containers.intro=scene.add.container().setName("intro").setDepth(consts.depths.loadingImage+1),c=scene.add.image(a.cX,a.cY,"ui","beastImage_0"),d=scene.add.image(a.cX,a.cY,"ui","beastImage_1").setAlpha(0);b.add([c,d]),vars.intro.doFlash(d)},doFlash:a=>{let b=a;scene.tweens.addCounter({from:0,to:1,useFrames:!0,duration:4,yoyo:!0,repeat:10,onUpdate:(a,c)=>{b.alpha=.5>c.value?0:1},onComplete:()=>{b.alpha=0,scene.tweens.add({targets:b,alpha:1,duration:1e3,hold:2e3,yoyo:!0,onComplete:()=>{scene.tweens.add({targets:scene.containers.intro,alpha:0,duration:750}),vars.init("CREATE"),vars.init("STARTAPP")}})}})}},parallax:{enabled:!1,blimpSpeeds:{small:{durationMin:20,durationMax:30,delayMax:10},large:{durationMin:10,durationMax:15,delayMax:10}},smallBlimpTween:null,largeBlimpTween:null,init:()=>{let a=consts.canvas,b=vars.parallax,c=b.blimpSpeeds;c.small={...c.small,...{startX:a.width,endX:-32}},c.large={...c.large,...{startX:-64,endX:a.width}}},generateNewBlimpTween:(a="small")=>{let b=vars.parallax,c=b.blimpSpeeds,d=c[a],e=vars.phaserObjects[`${a}Blimp`];e.x=d.startX;let f=1e3*getRandom(d.durationMin,d.durationMax),g=1e3*getRandom(0,d.delayMax),h=d.endX;scene.tweens.add({targets:e,delay:g,duration:f,x:h,onComplete:()=>{b.generateNewBlimpTween(a)}})}},player:{object:null,class:null,init:()=>{let a=vars.player;a.class=new Player}},phaserObjects:{},shaders:{enabled:!0,sunShaderImage:null,init:()=>{if(vars.DEBUG?console.log(`%cFN: shaders > init`,`${consts.console.defaults} ${consts.console.colours.functionCall}`):null,!vars.shaders.enabled)return!1;let a=consts.canvas;scene.shaders={};scene.shaders.sunShader=scene.add.shader("sunShader",a.cX,a.cY,a.width,a.height,"iChannel0").setName("sunShader"),scene.shaders.sunShader.setRenderToTexture("sunShader")},generateSunShaderImage:()=>{let a=vars.shaders;return!!a.enabled&&void(a.sunShaderImage=scene.add.image(0,consts.canvas.height,"sunShader").setScale(.5).setOrigin(.5,.22).setBlendMode(1).setDepth(16).setTint(16744448))},updateSunShaderPosition:(a,b)=>{if(!vars.shaders.enabled)return!1;let c=vars.shaders;c.sunShaderImage.setPosition(a,b)}},UI:{ready:!1,showingIntroText:!0,yOffsets:null,init:()=>{let a=vars.plugins.getGrayScalePipeLine(),b=scene.children.getByName("loadingImage");scene.tweens.addCounter({from:.01,to:1,duration:1600,onUpdate:(c,d)=>{a.get(b)[0].setIntensity(d.value),b.alpha=1.1-d.value/1.5},onComplete:()=>{vars.game.ready=!0}}),vars.UI.initHelpScreen()},initGame:()=>{vars.DEBUG?console.log(`%cFN: ui > init`,`${consts.console.defaults} ${consts.console.colours.functionCall}`):null,vars.parallax.init();let a=consts.canvas,b=consts.depths,c=vars.phaserObjects,d=a.width;c.sky=scene.add.image(0,0,"background_sprites","sotb_bkg").setOrigin(0).setDepth(b.gameBG),c.moon=scene.add.image(.8*d,.2*a.height,"background_sprites","sotb_moon").setDepth(b.gameBG+2),c.largeBlimp=scene.add.image(-64,26,"background_sprites","airship-large").setName("largeBlimp").setOrigin(0).setDepth(b.blimps),c.smallBlimp=scene.add.image(d+64,82,"background_sprites","airship-small").setName("smallBlimp").setOrigin(0).setDepth(b.blimps),vars.parallax.generateNewBlimpTween("small"),vars.parallax.generateNewBlimpTween("large");let e=0,f=5;for(let a=1;a<=f;a++){let c=scene.textures.list.background_sprites.get(`s0${a}`),g=scene.add.tileSprite(d,e,2*c.width,c.height,"background_sprites",`s0${a}`).setOrigin(1).setDepth(b.parallax_layer_1).setName(`clouds_${a}`);g.impulse=f-(a-1),e+=g.height}let g=scene.add.tileSprite(d,a.height-30,640,73,"background_sprites","s06").setName("mountain_layer").setOrigin(1).setDepth(b.parallax_layer_1);g.impulse=1;let h=scene.add.tileSprite(d,a.height-28,6800,77,"background_sprites","s07").setName("dead_tree_layer").setOrigin(1).setDepth(b.parallax_layer_2);h.impulse=2;let i=scene.containers.trees,j=scene.add.image(d,a.height-25,"background_sprites","s08A").setName("tree_layer_A").setOrigin(1),k=-1*j.getLeftCenter().x;i.repeatX=k;let l=scene.add.tileSprite(-k,a.height-25,4864,175,"background_sprites","s08B").setName("tree_layer_B").setOrigin(1);i.width=-1*l.getLeftCenter().x-2432,i.reduceX=2432,i.add([j,l]),i.impulse=3;let m=scene.add.tileSprite(d,a.height-18,640,7,"background_sprites","s09").setName("grass_upper").setOrigin(1).setDepth(b.parallax_layer_4);m.impulse=4;let n=scene.add.tileSprite(d,a.height-11,640,7,"background_sprites","s10").setName("grass_middle").setOrigin(1).setDepth(b.parallax_layer_5);n.impulse=5;let o=scene.add.tileSprite(d,a.height,640,11,"background_sprites","s11").setName("grass_lower").setOrigin(1).setDepth(b.parallax_layer_6);o.impulse=6;let p=scene.add.tileSprite(d,a.height,640,22,"background_sprites","s12").setName("fence_layer").setOrigin(1).setDepth(b.fence_layer);p.impulse=7,vars.player.init(),vars.UI.initLogo();let q=consts.depths.blackMask;vars.phaserObjects.blackMask=scene.add.image(a.cX,a.cY,"whitepixel").setScale(a.width,a.height).setTint(0).setDepth(q).setAlpha(0),vars.shaders.generateSunShaderImage(),vars.UI.initPlayerUI(),scene.children.getByName("loadingImage").destroy(),vars.UI.ready=!0},initHelpScreen:()=>{let c=scene.containers.help;c.show=(a=!0)=>{let b=a?1:0;scene.tweens.add({targets:c,alpha:b,duration:1500})};let d=consts.canvas,e=.5*d.height,f=64,g=d.cX-f,a=scene.add.image(d.cX,d.cY,"whitepixel").setScale(d.width,d.height).setTint(0).setAlpha(.5);c.add(a);let h=["PREV TRACK","VOL -","NEXT TRACK","VOL +"];["LEFT","DOWN","RIGHT"].forEach((b,d)=>{let i=scene.add.image(g,e,"ui",`keyCaps_${b}`),a=scene.add.text(g,e+f/2,h[d],vars.fonts.default).setOrigin(.5).setTint(16776960);if(c.add([i,a]),"DOWN"===b){let a=scene.add.image(g,e-f,"ui",`keyCaps_UP`),b=scene.add.text(g,e-f/2,h[3],vars.fonts.default).setOrigin(.5).setTint(16776960);c.add([a,b])}g+=f});let i=scene.add.text(d.cX,.85*d.height,"Click to start",vars.fonts.default).setOrigin(.5).setTint(65280);i.tween=scene.tweens.add({targets:i,scale:1.2,yoyo:!0,repeat:-1,ease:"Quad"}),c.add(i),c.show(!0)},initLoadingScreen:()=>{let a=consts.canvas,b=consts.depths.loadingImage;scene.add.image(a.cX,a.cY,"loading").setName("loadingImage").setDepth(b),vars.phaserObjects.loader={};let c=vars.fonts.default;if(vars.files.audio.singleFile){let d=vars.phaserObjects.loadingText=scene.add.text(a.cX,.9*a.height,"LOADING FILES",c).setOrigin(.5,1).setDepth(b+1).setTint(16776960);return d.tween=scene.tweens.add({targets:d,alpha:.1,duration:500,yoyo:!0,repeat:-1}),void delete vars.phaserObjects.loader}let d=5;vars.files.audio.list.forEach(a=>{let e=a.replace(".ogg","");vars.phaserObjects.loader[e]=scene.add.text(5,d,e.replaceAll("_"," "),c).setOrigin(0).setDepth(b+1).setTint(16711680),d+=14})},initLogo:()=>{let a=consts.canvas,b=scene.containers.logo=scene.add.container().setDepth(100),c=scene.add.image(0,.275*a.height,"ui","beastLogo").setScale(256/320).setOrigin(0,.5),d=scene.add.image(5,.275*a.height+5,"ui","beastLogo").setScale(256/320).setOrigin(0,.5).setTintFill(0).setAlpha(.2);b.add([d,c]),b.x-=320,scene.tweens.add({targets:b,x:48,delay:2e3,duration:3e3,hold:3e3,onComplete:()=>{scene.tweens.add({targets:b,x:320,duration:2e3,onComplete:()=>{scene.tweens.addCounter({from:0,to:1,duration:1e3,onComplete:vars.UI.showIntroText})}})}})},initPlayerUI(){let a=consts.canvas,b=scene.containers.playerUI,c=scene.add.image(20,10,"ui","healthMeter").setOrigin(0),d=vars.phaserObjects.hpText=scene.add.text(32,12,"12",vars.fonts.default).setOrigin(.5,0).setTint(16776960),e=vars.phaserObjects.scoreText=scene.add.text(20,.98*a.height,"Score: 0",vars.fonts.default).setOrigin(0,1).setTint(16776960);b.add([c,e,d])},initVolumeBar:()=>{let a=consts.canvas,b=a.width-18,c=vars.phaserObjects.volumeBars=[];for(let a,d=0;10>d;d++)a=scene.add.image(b,50+10*d,"whitepixel").setOrigin(0).setTint(65280).setScale(16,5).setDepth(consts.depths.volume),c.push(a);c.reverse(),vars.UI.updateVolume()},chooseNewStarPosition:()=>{let a=consts.canvas,b=[10,a.width-10],c=getRandom(b[0],b[1]),d=[4,.75*a.height],e=getRandom(d[0],d[1]);return{x:c,y:e}},convertTextIntoSpriteSheetPositions:(a="")=>{if(!a.length)return!1;a=a.toUpperCase();let b=a.split(""),c=[];return b.forEach(a=>{let b=vars.fonts.spritesheetPositions[a],d=b?b.position:" ";c.push(d)}),c},generateLoadedText:(a="")=>{if(!a)return"No message passed... idiot";let b=consts.canvas,c=consts.depths.loadingImage+1,d={...vars.fonts.default,...{fontSize:10}},e=scene.add.text(b.cX,b.height,a,d).setOrigin(.5).setDepth(c).setTint(65280).setAlpha(0);scene.tweens.add({targets:e,alpha:2,y:-30,delay:125*vars.files.loadCount,duration:1500,onComplete:(a,b)=>{b[0].destroy()}})},generatePopup:a=>{let b=vars.UI,c=b.convertTextIntoSpriteSheetPositions(a),d=scene.containers.popup;d.getAll().forEach(a=>{a.destroy()}),d.tween?d.tween.remove():null;let e=0;c.forEach((a,b)=>{if(" "!==a){let c=scene.add.image(e,16,"defaultFont",a).setOrigin(0);c.tween=scene.tweens.add({targets:c,y:-16,yoyo:!0,repeat:-1,useFrames:!0,delay:5*b,duration:30,ease:"Quad.easeInOut"}),e+=c.width+5,d.add(c)}else e+=37;d.width=e}),d.x=consts.canvas.width;let f=1e3*(d.width/80);return d.tween=scene.tweens.add({targets:d,x:-d.width,duration:f,onComplete:()=>{d.removeAll(),d.width=0}}),f},generateStar:()=>{let a=vars.game.dayNightCycle,b=a.container,c=vars.UI.chooseNewStarPosition(),d=scene.add.image(c.x,c.y,"whitepixel").setAlpha(.05);b.add(d),vars.anims.tweenStar(d),b.bringToTop(a.moon)},showIntroText:()=>{let a=vars.UI.generatePopup(`Welcome to the Beast Auto Scroller.        Created by        offer0 - AUG 2022        Version ${vars.version}`);scene.tweens.addCounter({from:0,to:1,duration:a,onComplete:()=>{vars.UI.showingIntroText=!1,vars.files.audio.singleFile?vars.UI.showMusicTrackSpritePopup():vars.UI.showMusicTrackPopup()}})},showMusicTrackPopup:()=>!vars.UI.showingIntroText&&void(vars.files.audio.singleFile||vars.UI.generatePopup(`Current music track: ${vars.audio.musicTracks[vars.audio.musicTracks.length-1]}`)),showMusicTrackSpritePopup:()=>!vars.UI.showingIntroText&&void(!vars.files.audio.singleFile||vars.UI.generatePopup(`Current music track: ${vars.audio.currentTrackName}`)),updateLayers:()=>{if(vars.parallax.enabled){["mountain_layer","dead_tree_layer","grass_upper","grass_middle","grass_lower","fence_layer"].forEach(a=>{let b=scene.children.getByName(a);b.impulse&&(b.x+=b.impulse/2,b.x>b.width?b.x-=b.width/2:null)});for(let a,b=1;5>=b;b++)a=scene.children.getByName(`clouds_${b}`),a.x+=a.impulse/4,a.x>a.width?a.x-=a.width/2:null;["trees"].forEach(a=>{let b=scene.containers[a];b.x+=b.impulse/2,b.x>b.width+320?b.x-=b.reduceX:null})}},updateVolume:()=>{let a=10*vars.audio.volume,b=vars.phaserObjects.volumeBars;for(let c=0;10>c;c++)b[c].visible=!!(c<a),b[c].alpha=1;vars.audio.volumeChangingTimeout=90},updateVolumeBarTimeout:()=>{if(!vars.audio.volumeChangingTimeout)return!1;vars.audio.volumeChangingTimeout--,vars.audio.volumeChangingTimeout||vars.phaserObjects.volumeBars.forEach(a=>{a.alpha=0})}}};const consts={canvas:{width:320,height:200,cX:160,cY:100},console:{colours:{functionCall:"#4DA6FF",important:"#FFFF00",bad:"#FF0000",warn:"#FF0000",good:"#63e763"},defaults:"font-weight: bold; font-size: 14px; font: 'consolas'; color:"},depths:{gameBG:10,dayNightCycle:15,blimps:20,parallax_layer_1:25,parallax_layer_2:30,parallax_layer_3:35,tree_layer:35,parallax_layer_4:40,parallax_layer_5:50,parallax_layer_6:60,fence_layer:70,blackMask:80,player:90,enemies:100,playerUI:120,popup:200,loadingImage:300,help:400,volume:500},mouse:{buttons:{LEFT:0,MIDDLE:1,RIGHT:2,THUMB_1:3,THUMB_2:4},buttonNames:{0:"LEFT",1:"MIDDLE",2:"RIGHT",3:"THUMB_1",4:"THUMB_2"}}};var mouseButtons=consts.mouse.buttons,mouseButtonNames=consts.mouse.buttonNames;function update(){vars.UI.ready?vars.UI.updateLayers():null,vars.player.class?vars.player.class.update():null,vars.audio.volumeChangingTimeout?vars.UI.updateVolumeBarTimeout():null}