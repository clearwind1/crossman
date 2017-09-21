/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.init = function () {
        BGMPlayer._i().play(SoundName.gamebgm);
        this.initdata();
        this.showbg();
        this.addeventlisten();
        this.gameinterval();
    };
    p.initdata = function () {
        this.intervalarr = [];
        this.offx = 150;
        this.endx = this.createEndX();
        this.bstartline = false;
        this.passtext = 1;
        this.hightscore = 0;
        this.curscore = 0;
        GameData._i().gamescore = 1000;
        this.beginpointx = 0;
        this.beginpointy = 0;
    };
    p.createEndX = function () {
        return RandomUtils.limit(this.offx + 300, this.mStageW - 150);
    };
    p.createblockwidth = function () {
        return RandomUtils.limit(90, 200);
    };
    /**
     * 显示背景
     */
    p.showbg = function () {
        var gamebg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0xde9f7c);
        this.addChild(gamebg);
        this.passtextT = new GameUtil.MyTextField(this.mStageW / 2, 100, 80, 0.5, 0.5);
        this.passtextT.setText('关数:' + this.passtext);
        this.addChild(this.passtextT);
        this.blockcurr = GameUtil.createRect(this.offx, this.mStageH / 2, this.createblockwidth(), this.mStageH / 2, 1, 0x1c2446);
        this.addChild(this.blockcurr);
        this.man = new Animation('spearrun', 8, 100, this.blockcurr.x + this.blockcurr.width / 2, this.mStageH / 2 - 43);
        this.addChild(this.man);
        this.man.setLoop(-1);
        this.man.play();
        //this.man.pause();
        for (var i = 0; i < 5; i++) {
            var posx = 100 + i * (this.mStageW / 5);
            var posy = this.mStageH;
            var img = new MyBitmap(RES.getRes('clound_png'), posx, posy);
            img.setanchorOff(0.5, 1);
            this.addChild(img);
            var startx = img.x;
            var tox = RandomUtils.limit(-1000, 1000);
            egret.Tween.get(img, { loop: true }).to({ x: tox }, 100200).to({ x: startx }, 132000);
        }
        this.line = GameUtil.createRect(this.offx + this.blockcurr.width, this.mStageH / 2, 10, 0);
        this.line.$setAnchorOffsetX(10);
        this.addChild(this.line);
        this.createnextblock();
        this.createline(0);
    };
    p.addeventlisten = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchend, this);
    };
    p.createnextblock = function () {
        GameData._i().GamePause = true;
        var endx = this.createEndX();
        this.blocknext = GameUtil.createRect(this.mStageW + 200, this.mStageH / 2, this.createblockwidth(), this.mStageH / 2, 1, 0x1c2446);
        var index = this.numChildren - 4;
        this.addChildAt(this.blocknext, index);
        egret.Tween.get(this.blocknext).to({ x: endx }, 500).call(function () {
            GameData._i().GamePause = false;
        });
    };
    p.createline = function (height) {
        this.line.graphics.clear();
        this.line.graphics.beginFill(0x2d53f7, 1);
        this.line.graphics.drawRect(0, -height, 10, height);
        this.line.graphics.endFill();
    };
    /**游戏定时器 */
    p.gameinterval = function () {
        GameUtil.trace('interval');
        //this.gameover();
    };
    p.checkgameover = function () {
        var bgameover = false;
        if (bgameover) {
            this.gameover();
        }
    };
    p.touchbegin = function (evt) {
        var _this = this;
        if (GameData._i().GamePause) {
            return;
        }
        this.bstartline = true;
        var h = this.line.height;
        this.lineInter = egret.setInterval(function () {
            h += 40;
            ;
            _this.createline(h);
        }, this, 100);
    };
    p.touchend = function (evt) {
        var _this = this;
        if (GameData._i().GamePause) {
            return;
        }
        if (!this.bstartline) {
            return;
        }
        GameData._i().GamePause = true;
        this.bstartline = false;
        egret.clearInterval(this.lineInter);
        //  console.log('blockdiss====', this.blocknext.x-(this.offx + this.blockcurr.width));        
        //  console.log('linehgiht====', this.line.height);
        var blockdiss = this.blocknext.x - (this.offx + this.blockcurr.width);
        var lineheight = this.line.height;
        var rotation = lineheight > blockdiss ? 90 : 180;
        egret.Tween.get(this.line).to({ rotation: rotation }, 500).call(function () {
            var tox = lineheight > blockdiss ? _this.line.x + lineheight + 20 : _this.line.x + 50;
            if (lineheight > blockdiss && lineheight - blockdiss <= _this.blocknext.width) {
                //成功
                egret.Tween.get(_this.man).to({ x: _this.blocknext.x + _this.blocknext.width / 2 }, 500).call(function () {
                    _this.nextlevelgame();
                });
            }
            else {
                //失败
                egret.Tween.get(_this.man).to({ x: tox }, 500).to({ rotation: 90 }, 100).to({ y: _this.mStageH + 200 }, 700).call(function () {
                    _this.gameover();
                }, _this);
            }
        });
    };
    /**游戏结束 */
    p.gameover = function () {
        var _this = this;
        GameUtil.trace('gameover');
        var gameovercontaint = new egret.DisplayObjectContainer;
        this.addChild(gameovercontaint);
        gameovercontaint.addChild(GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6));
        var posx = this.mStageW / 2;
        var posy = 200;
        var gametitletext = new GameUtil.MyTextField(posx, posy, 100, 0.5, 0.5);
        gametitletext.setText(GameConfig.GAMENAME);
        gametitletext.italic = true;
        gametitletext.textColor = 0x75bfea;
        gameovercontaint.addChild(gametitletext);
        var text = new GameUtil.MyTextField(posx, posy + 200, 70, 0.5, 0.5);
        text.setText('关数:' + (this.passtext - 1));
        text.textColor = 0xff0000;
        gameovercontaint.addChild(text);
        var btnname = '';
        var fun = function () {
            _this.removeChild(gameovercontaint);
            _this.restart();
        };
        var btn = new GameUtil.Menu(this, btnname, btnname, fun, [0]);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
        btn.addButtonText('重新开始', 30);
        gameovercontaint.addChild(btn);
        btn.x = posx;
        btn.y = this.mStageH / 2;
    };
    /**
     *下一关
     */
    p.nextlevelgame = function () {
        var _this = this;
        GameUtil.trace('nextlevelgame');
        var movedis = this.blocknext.x - this.offx;
        var curx = this.blockcurr.x - movedis;
        var manx = this.man.x - movedis;
        var linex = this.line.x - movedis;
        egret.Tween.get(this.blockcurr).to({ x: curx }, 500);
        egret.Tween.get(this.blocknext).to({ x: this.offx }, 500);
        egret.Tween.get(this.man).to({ x: manx }, 500);
        egret.Tween.get(this.line).to({ x: linex }, 500).call(function () {
            _this.blockcurr = _this.blocknext;
            _this.blocknext = null;
            _this.createnextblock();
            _this.line.x = _this.offx + _this.blockcurr.width;
            _this.createline(0);
            _this.line.rotation = 0;
            _this.passtext++;
            _this.passtextT.setText('关数:' + _this.passtext);
        }, this);
    };
    /**重置游戏数据 */
    p.reset = function () {
        this.gameinterval();
        this.restart();
    };
    /**清除定时器 */
    p.clearinter = function () {
        GameUtil.clearinterval(this.intervalarr);
        // for (var i: number = 0; i < this.enemyContain.numChildren; i++) {
        //     var enemysp: EnemySprite = <EnemySprite>this.enemyContain.getChildAt(i);
        //     GameUtil.clearinterval(enemysp.intervalarr);
        // }
    };
    p.exitgame = function () {
        GameUtil.GameScene.runscene(new StartGameScene());
    };
    p.restartask = function () {
        var _this = this;
        var askcon = new egret.DisplayObjectContainer();
        this.addChild(askcon);
        askcon.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        askcon.addChild(shap);
        var bgname = 'restartbg_png';
        var gameoverbg = new MyBitmap(RES.getRes(bgname), this.mStageW / 2, this.mStageH / 2);
        askcon.addChild(gameoverbg);
        var bgtext = new MyBitmap(RES.getRes('restarttext_png'), 330, 80, gameoverbg);
        askcon.addChild(bgtext);
        var btname = ['yesbtn_png', 'nobtn_png'];
        var btnfun = [this.restart,];
        for (var i = 0; i < 2; i++) {
            var btn = new GameUtil.Menu(this, btname[i], btname[i], function (id) {
                askcon.parent.removeChild(askcon);
                if (id == 0) {
                    _this.restart();
                }
            }, [i]);
            askcon.addChild(btn);
            GameUtil.relativepos(btn, gameoverbg, 175 + 290 * i, 260);
        }
    };
    p.restart = function () {
        GameData._i().gamescore = 0;
        this.curscore = 0;
        this.hightscore = 2;
        console.log('restart');
        this.man.x = this.blockcurr.x + this.blockcurr.width / 2;
        this.man.y = this.mStageH / 2 - 43;
        this.man.rotation = 0;
        this.removeChild(this.blocknext);
        this.blocknext = null;
        this.createnextblock();
        this.createline(0);
        this.line.rotation = 0;
        this.passtext = 1;
        this.passtextT.setText('关数:' + this.passtext);
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map