/**
 * Created by pior on 16/12/19.
 */
/**
 * 新手引导页面
 */
var GuideLayer = (function (_super) {
    __extends(GuideLayer, _super);
    function GuideLayer() {
        _super.call(this);
    }
    var d = __define,c=GuideLayer,p=c.prototype;
    p.init = function () {
        this.guidestep = 0;
        GameConfig._i().bguidedone = false;
        this.touchEnabled = true;
        var coversp = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        coversp.name = 'coversp';
        this.addChild(coversp);
        this.creatstepthing();
        this.tipframe = new MyBitmap(RES.getRes('guidetipframe_png'), 0, 0);
        this.addChild(this.tipframe);
        this.hand = new MyBitmap(RES.getRes('guidehand_png'), 0, 0);
        this.addChild(this.hand);
        this.tiptext = new GameUtil.MyTextField(0, 0, 30, 0, 0);
        this.tiptext.setText('');
        this.tiptext.textColor = 0x007aa6;
        this.tiptext.width = 346;
        this.addChild(this.tiptext);
        this.Guidestep();
    };
    /**创建引导物（高亮） */
    p.creatstepthing = function () {
    };
    /**引导步骤 */
    p.Guidestep = function () {
        var step = this.guidestep;
        switch (step) {
            case 0:
                this.tipframe.x = this.mStageW / 2;
                this.tipframe.y = this.mStageH - 550;
                GameUtil.relativepos(this.hand, this.tipframe, 237, 234);
                GameUtil.relativepos(this.tiptext, this.tipframe, 70, 36);
                this.tiptext.text = '在摇杆范围内滑动手指可使角色四向移动，点击中间位置可施放炸弹.';
                break;
            case 1:
                this.tiptext.text = '点击屏幕任意地方继续游戏。';
                var self = this;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    self.checkdone();
                }, this);
                break;
        }
    };
    /**检查引导结果 */
    p.checkdone = function () {
        this.guidestep++;
        //console.log('guidestep====',this.guidestep);
        if (this.guidestep != GameConfig.GUIDESTEPNUM) {
            this.Guidestep();
        }
        else {
            GameConfig._i().bguidedone = true;
            //这里有一步做正式开始游戏的函数
            this.removeChildren();
            this.parent.removeChild(this);
            GuideLayer.remove();
        }
    };
    GuideLayer.remove = function () {
        this._inst = null;
    };
    GuideLayer._i = function () {
        return (this._inst = (this._inst == null ? new GuideLayer() : this._inst));
    };
    GuideLayer._inst = null;
    return GuideLayer;
}(GameUtil.BassPanel));
egret.registerClass(GuideLayer,'GuideLayer');
//# sourceMappingURL=GuideLayer.js.map