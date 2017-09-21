/**
 * 进度条类
 * Created by pior on 15/10/8.
 */
var GameUtil;
(function (GameUtil) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        /**
         * 创建一个进度条
         * @param imagename {string} 进度条图片文件名
         * @param x {number} 进度条X轴坐标
         * @param y {number} 进度条Y轴坐标
         * @param rect {egret.Rectangle} 进度条的九宫格矩形
         * @param anchorX {number} X轴锚点
         * @param anchorY {number} Y轴锚点
         */
        function ProgressBar(imagename, x, y, rect, anchorX, anchorY) {
            if (anchorX === void 0) { anchorX = 0; }
            if (anchorY === void 0) { anchorY = 0.5; }
            _super.call(this);
            this.mPercent = 100;
            this.init(imagename, x, y, rect, anchorX, anchorY);
        }
        var d = __define,c=ProgressBar,p=c.prototype;
        p.init = function (imagename, x, y, rect, anchorX, anchorY) {
            this.progressbar = new MyBitmap(RES.getRes(imagename), x, y);
            this.addChild(this.progressbar);
            this.progressbar.scale9Grid = rect;
            this.progressbar.setanchorOff(anchorX, anchorY);
        };
        /**
         * 设置进度条X轴坐标
         * @param x
         */
        p.setbarX = function (x) {
            this.progressbar.x = x;
        };
        /**
         * 设置进度条Y轴坐标
         * @param y
         */
        p.setbarY = function (y) {
            this.progressbar.y = y;
        };
        /**
         * 设置进度条百分比
         * @param percent {number} 进度条百分比
         */
        p.setPercent = function (percent) {
            if (percent < 0)
                return;
            this.mPercent = percent;
            this.updateWidth();
        };
        p.getPercent = function () {
            return this.mPercent;
        };
        /**
         * 更新显示进度条
         */
        p.updateWidth = function () {
            this.progressbar.width = this.progressbar.texture.textureWidth * this.mPercent;
        };
        return ProgressBar;
    }(egret.DisplayObjectContainer));
    GameUtil.ProgressBar = ProgressBar;
    egret.registerClass(ProgressBar,'GameUtil.ProgressBar');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=ProgressBar.js.map