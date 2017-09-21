/**
 * Created by pior on 15/12/22.
 */
var GameUtil;
(function (GameUtil) {
    var GetResByany = (function (_super) {
        __extends(GetResByany, _super);
        function GetResByany(url, imgwidth, imgheight) {
            if (imgwidth === void 0) { imgwidth = 0; }
            if (imgheight === void 0) { imgheight = 0; }
            _super.call(this);
            this.imgUrl = url;
            this.imgwidth = imgwidth;
            this.imgheight = imgheight;
            this.init();
        }
        var d = __define,c=GetResByany,p=c.prototype;
        p.init = function () {
            RES.getResAsync(this.imgUrl, this.comp, this);
        };
        p.comp = function (data) {
            this.imag = new egret.Bitmap();
            this.imag.texture = data;
            this.addChild(this.imag);
            if (this.imgwidth != 0) {
                this.imag.width = this.imgwidth;
            }
            if (this.imgheight != 0) {
                this.imag.height = this.imgheight;
            }
            this.imag.anchorOffsetX = this.imgwidth / 2;
            this.imag.anchorOffsetY = this.imgheight / 2;
        };
        return GetResByany;
    }(egret.DisplayObjectContainer));
    GameUtil.GetResByany = GetResByany;
    egret.registerClass(GetResByany,'GameUtil.GetResByany');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=GetResByany.js.map