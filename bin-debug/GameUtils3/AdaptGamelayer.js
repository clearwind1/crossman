/**
 * Created by pior on 16/3/14.
 */
var AdaptGamelayer = (function (_super) {
    __extends(AdaptGamelayer, _super);
    function AdaptGamelayer() {
        _super.call(this);
    }
    var d = __define,c=AdaptGamelayer,p=c.prototype;
    p.initlayer = function (maxheight) {
        this.maxheight = maxheight;
    };
    p.putItme = function (child) {
        this.addChild(child);
    };
    p.adpat = function (bscalex) {
        if (bscalex === void 0) { bscalex = true; }
        var sc = 1;
        // console.log('adh=====',this.$getHeight(),'maxh======',this.maxheight);
        if (this.$getHeight() > this.maxheight) {
            sc = this.maxheight / this.$getHeight();
            if (bscalex) {
                this.scaleX = this.scaleY = sc;
            }
            else {
                this.scaleY = sc;
            }
        }
        var disw = (this.mStageW - this.$getWidth() * this.scaleX) / 2;
        this.x = disw;
    };
    AdaptGamelayer._i = function () {
        if (this.inst == null) {
            this.inst = new AdaptGamelayer();
        }
        return this.inst;
    };
    return AdaptGamelayer;
}(GameUtil.BassPanel));
egret.registerClass(AdaptGamelayer,'AdaptGamelayer');
//# sourceMappingURL=AdaptGamelayer.js.map