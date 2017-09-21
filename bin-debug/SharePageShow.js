/**
 * Create by hardy on 16/12/21
 * 游戏分享提示页面
 */
var SharePageShow = (function (_super) {
    __extends(SharePageShow, _super);
    function SharePageShow() {
        _super.call(this);
    }
    var d = __define,c=SharePageShow,p=c.prototype;
    p.show = function () {
        var self = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.close();
        }, this);
        var sharetip = new MyBitmap(RES.getRes('sharetip_png'), this.mStageW, 0);
        sharetip.setanchorOff(1, 0);
        this.addChild(sharetip);
    };
    return SharePageShow;
}(Othercontainer));
egret.registerClass(SharePageShow,'SharePageShow');
//# sourceMappingURL=SharePageShow.js.map