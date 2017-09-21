/**
 * Create by hardy on 16/12/21
 * 游戏结束页面
 */
class GameOverPageShow extends Othercontainer {
    public constructor() {
        super();
    }
    protected show() {
        var data: any = {
            'code': 1
        };
        this.showscene(data);
    }
    /**显示 */
    private showscene(data: any) {
        //console.log('data-====', data['msg']);
        if (data['code'] == 1) {
            var bgname: string = 'gameoverbg_png';
            var gameoverbg: MyBitmap = new MyBitmap(RES.getRes(bgname), this.mStageW / 2, this.mStageH / 2);
            this.addChild(gameoverbg);
            var bgtext: MyBitmap = new MyBitmap(RES.getRes('gameovertext_png'), 315, 60, gameoverbg);
            this.addChild(bgtext);

            //gameover内容


            /**创建按钮 */
            var btname: string[] = ['gameoversharebtn_png', 'gameoverrestartbtn_png', 'gameoverretrunbtn_png'];
            var btnfun: Function[] = [this.share, this.relife, this.turnback];
            for (var i: number = 0; i < 3; i++) {
                var btn: GameUtil.Menu = new GameUtil.Menu(this, btname[i], btname[i], btnfun[i]);
                this.addChild(btn);
                GameUtil.relativepos(btn, gameoverbg, 120 + 190 * i, 340);
            }
        }
        else {
           console.log(data['msg']);
        }
    }
    /**分享 */
    private share() {
        if (!GameUtil.isSomeType(GameConfig.WeiXinstr)) {
            this.addChild(new GameUtil.TipsPanel(null, '请在微信中打开', true));
        } else {
            this.addChild(new SharePageShow());
        }
    }
    /**返回开始界面 */
    private turnback() {
        // PlayerData._i().initdata();
        //GameData._i().currgamescore[0] = GameData._i().gamescore;
        GameData._i().GameOver = false;
        GameData._i().gamescore = 0;
        this.close();
        GameUtil.GameScene.runscene(new StartGameScene());
    }
    /**复活 */
    private relife() {
        //PlayerData._i().initdata();
        GameData._i().GameOver = false;
        GameData._i().gamescore = 0;
        (<GameScene>this.parent).restart();
        this.close();
    }
}