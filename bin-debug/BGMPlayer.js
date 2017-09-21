/**
 * Create by hardy on 16/12/21
 * 背景音乐管理
 */
var BGMPlayer = (function () {
    function BGMPlayer() {
        this.init();
    }
    var d = __define,c=BGMPlayer,p=c.prototype;
    p.init = function () {
        this.curbgmtag = -1;
        this.volume = GameConfig._i().bgamemusic ? 1 : 0;
    };
    /**设置音量 */
    p.setVolme = function (value) {
        this.volume = value;
        if (this.curbgmtag == -1) {
            return;
        }
        GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
    };
    /**播放背景音乐 */
    p.play = function (bgmName) {
        if (this.curbgmtag != -1 && GameData._i().gamesound[this.curbgmtag]) {
            GameData._i().gamesound[this.curbgmtag].stop();
        }
        this.curbgmtag = bgmName;
        if (GameData._i().gamesound[this.curbgmtag]) {
            GameData._i().gamesound[this.curbgmtag].play(0, -1);
            GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
        }
    };
    BGMPlayer._i = function () {
        if (this._instance == null) {
            this._instance = new BGMPlayer();
        }
        return this._instance;
    };
    BGMPlayer._instance = null;
    return BGMPlayer;
}());
egret.registerClass(BGMPlayer,'BGMPlayer');
//# sourceMappingURL=BGMPlayer.js.map