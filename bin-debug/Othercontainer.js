/**
 * Create by hardy on  16/12/21
 */
var Othercontainer = (function (_super) {
    __extends(Othercontainer, _super);
    function Othercontainer() {
        _super.call(this);
    }
    var d = __define,c=Othercontainer,p=c.prototype;
    p.init = function () {
        this.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.addChild(shap);
        this.show();
    };
    p.show = function () {
    };
    p.close = function () {
        egret.Tween.removeAllTweens();
        this.removeChildren();
        this.parent.removeChild(this);
    };
    return Othercontainer;
}(GameUtil.BassPanel));
egret.registerClass(Othercontainer,'Othercontainer');
//# sourceMappingURL=Othercontainer.js.map