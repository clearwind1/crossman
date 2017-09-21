/**
 * Create by hardy on 16/12/21
 * 游戏结束页面
 */
var GameOverPageShow = (function (_super) {
    __extends(GameOverPageShow, _super);
    function GameOverPageShow() {
        _super.call(this);
    }
    var d = __define,c=GameOverPageShow,p=c.prototype;
    p.show = function () {
        var data = {
            'code': 1
        };
        this.showscene(data);
    };
    /**显示 */
    p.showscene = function (data) {
        //console.log('data-====', data['msg']);
        if (data['code'] == 1) {
            var bgname = 'gameoverbg_png';
            var gameoverbg = new MyBitmap(RES.getRes(bgname), this.mStageW / 2, this.mStageH / 2);
            this.addChild(gameoverbg);
            var bgtext = new MyBitmap(RES.getRes('gameovertext_png'), 315, 60, gameoverbg);
            this.addChild(bgtext);
            //gameover内容
            /**创建按钮 */
            var btname = ['gameoversharebtn_png', 'gameoverrestartbtn_png', 'gameoverretrunbtn_png'];
            var btnfun = [this.share, this.relife, this.turnback];
            for (var i = 0; i < 3; i++) {
                var btn = new GameUtil.Menu(this, btname[i], btname[i], btnfun[i]);
                this.addChild(btn);
                GameUtil.relativepos(btn, gameoverbg, 120 + 190 * i, 340);
            }
        }
        else {
            console.log(data['msg']);
        }
    };
    /**分享 */
    p.share = function () {
        if (!GameUtil.isSomeType(GameConfig.WeiXinstr)) {
            this.addChild(new GameUtil.TipsPanel(null, '请在微信中打开', true));
        }
        else {
            this.addChild(new SharePageShow());
        }
    };
    /**返回开始界面 */
    p.turnback = function () {
        // PlayerData._i().initdata();
        //GameData._i().currgamescore[0] = GameData._i().gamescore;
        GameData._i().GameOver = false;
        GameData._i().gamescore = 0;
        this.close();
        GameUtil.GameScene.runscene(new StartGameScene());
    };
    /**复活 */
    p.relife = function () {
        //PlayerData._i().initdata();
        GameData._i().GameOver = false;
        GameData._i().gamescore = 0;
        this.parent.restart();
        this.close();
    };
    return GameOverPageShow;
}(Othercontainer));
egret.registerClass(GameOverPageShow,'GameOverPageShow');
//# sourceMappingURL=GameOverPageShow.js.map