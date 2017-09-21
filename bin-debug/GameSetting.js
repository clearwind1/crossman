/**
 * Create by hardy on 16/12/21
 * 游戏设置页面
 */
var GameSetting = (function (_super) {
    __extends(GameSetting, _super);
    function GameSetting() {
        _super.call(this);
        this.soundswitch = []; //是否打开声音
    }
    var d = __define,c=GameSetting,p=c.prototype;
    p.show = function () {
        this.soundswitch[1] = GameConfig._i().bgamesound;
        this.soundswitch[0] = GameConfig._i().bgamemusic;
        this.switchbtn = [];
        var setttingbg = new MyBitmap(RES.getRes('settingbg_png'), this.mStageW / 2, this.mStageH / 2);
        this.addChild(setttingbg);
        for (var i = 0; i < 2; i++) {
            var switchonoff = new MyBitmap(RES.getRes('settingswitch_png'));
            this.addChild(switchonoff);
            var onposx = 342;
            var offposx = 448;
            var posx = this.soundswitch[i] ? onposx : offposx;
            GameUtil.relativepos(switchonoff, setttingbg, posx, 75 + i * 114);
            var tex = this.soundswitch[i] ? 'settingswitchon_png' : 'settingswitchoff_png';
            this.switchbtn[i] = new GameUtil.Menu(this, tex, tex, this.settingswitch, [i, switchonoff, (onposx - offposx)]);
            this.addChild(this.switchbtn[i]);
            this.swapChildren(switchonoff, this.switchbtn[i]);
            GameUtil.relativepos(this.switchbtn[i], setttingbg, 394, 75 + i * 114);
        }
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.close);
        this.addChild(close);
        GameUtil.relativepos(close, setttingbg, 530, 17);
    };
    /**设置开关 */
    p.settingswitch = function (type, swilog, swidis) {
        this.soundswitch[type] = !this.soundswitch[type];
        swilog.x += (this.soundswitch[type] ? swidis : -swidis);
        var tex = this.soundswitch[type] ? 'settingswitchon_png' : 'settingswitchoff_png';
        this.switchbtn[type].setButtonTexture(tex, tex);
        GameConfig._i().bgamesound = this.soundswitch[1];
        GameConfig._i().bgamemusic = this.soundswitch[0];
        var smusicv = GameConfig._i().bgamemusic ? '1' : '0';
        var ssoundv = GameConfig._i().bgamesound ? '1' : '0';
        GameUtil.saveLocalData(GameConfig.GAMEMUSIC, smusicv);
        GameUtil.saveLocalData(GameConfig.GAMESOUND, ssoundv);
        var volume = GameConfig._i().bgamemusic ? 1 : 0;
        // if (GameConfig._i().bgamemusic) {
        //     window['playaudio']();
        // } else {
        //     window['stopaudio']();
        // }
        //GameData._i().gamesound[SoundName.startgamebgm].setvolume(volume);
        BGMPlayer._i().setVolme(volume);
    };
    return GameSetting;
}(Othercontainer));
egret.registerClass(GameSetting,'GameSetting');
//# sourceMappingURL=GameSetting.js.map