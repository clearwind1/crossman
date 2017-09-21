/**
 * Created by pior on 16/12/6.
 */
var MySound = (function () {
    function MySound(soundname) {
        this.isadddone = false;
        this.init(soundname);
    }
    var d = __define,c=MySound,p=c.prototype;
    p.init = function (soundname) {
        this.sound = new egret.Sound();
        var self = this;
        this.sound.addEventListener(egret.Event.COMPLETE, function loadOver(event) {
            self.isadddone = true;
        }, this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event) {
            console.log("loaded error!");
        }, this);
        this.sound.load("resource/assets/sound/" + soundname);
    };
    p.play = function (startTime, loops) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 1; }
        //alert('isread');
        if (this.soundtype == egret.Sound.EFFECT && !GameConfig._i().bgamesound) {
            return;
        }
        //alert('isplay');
        var tsound = this.sound;
        if (this.isadddone) {
            //alert('isdone');
            this.soundchannel = tsound.play(startTime, loops);
        }
    };
    p.stop = function () {
        if (this.soundchannel)
            this.soundchannel.stop();
    };
    p.setvolume = function (vaule) {
        if (this.soundchannel) {
            this.soundchannel.volume = vaule;
        }
    };
    return MySound;
}());
egret.registerClass(MySound,'MySound');
//# sourceMappingURL=MySound.js.map