/**
 * 获取网络图片
 * Created by pior on 15/11/13.
 */
var GetImageByUrl = (function (_super) {
    __extends(GetImageByUrl, _super);
    function GetImageByUrl(url, imgwidth, imgheight) {
        if (imgwidth === void 0) { imgwidth = 0; }
        if (imgheight === void 0) { imgheight = 0; }
        _super.call(this);
        this.imgUrl = url;
        this.imgwidth = imgwidth;
        this.imgheight = imgheight;
        this.init();
    }
    var d = __define,c=GetImageByUrl,p=c.prototype;
    p.init = function () {
        RES.getResByUrl(this.imgUrl, this.comp, this, RES.ResourceItem.TYPE_IMAGE);
    };
    p.comp = function (data) {
        console.log('data====', data);
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
    p.getimg = function () {
        return this.imag;
    };
    return GetImageByUrl;
}(egret.DisplayObjectContainer));
egret.registerClass(GetImageByUrl,'GetImageByUrl');
//# sourceMappingURL=GetImageByUrl.js.map