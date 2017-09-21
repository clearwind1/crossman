/**
 * 创建图片
 * Created by pior on 16/1/19.
 */
var MyBitmap = (function (_super) {
    __extends(MyBitmap, _super);
    function MyBitmap(texture, posx, posy, target) {
        if (posx === void 0) { posx = 0; }
        if (posy === void 0) { posy = 0; }
        if (target === void 0) { target = null; }
        _super.call(this);
        this.init(texture, posx, posy, target);
    }
    var d = __define,c=MyBitmap,p=c.prototype;
    p.init = function (texture, posx, posy, target) {
        this.texture = texture;
        this.$setX(posx);
        this.$setY(posy);
        this.setanchorOff(0.5, 0.5);
        if (target != null) {
            GameUtil.relativepos(this, target, posx, posy);
        }
    };
    p.setNewTexture = function (texture) {
        this.texture = texture;
        //this.setanchorOff(0.5,0.5);
    };
    p.setanchorOff = function (anchorx, anchory) {
        this.anchorOffsetX = this.$getWidth() * anchorx;
        this.anchorOffsetY = this.$getHeight() * anchory;
    };
    return MyBitmap;
}(egret.Bitmap));
egret.registerClass(MyBitmap,'MyBitmap');
//# sourceMappingURL=MyBitmap.js.map