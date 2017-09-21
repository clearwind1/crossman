/**
 * 滚动框
 * Created by pior on 15/11/3.
 */
var GameUtil;
(function (GameUtil) {
    /**
     * 创建一个滚动框
     */
    var ScrollView = (function (_super) {
        __extends(ScrollView, _super);
        function ScrollView(swidth, sheight, speed) {
            if (speed === void 0) { speed = 0.5; }
            _super.call(this);
            this.scrollview = new egret.ScrollView();
            this.content = new egret.DisplayObjectContainer();
            this.addChild(this.scrollview);
            this.scrollview.width = swidth;
            this.scrollview.height = sheight;
            this.scrollview.scrollSpeed = speed;
            this.init();
        }
        var d = __define,c=ScrollView,p=c.prototype;
        p.init = function () {
            this.scrollview.setContent(this.content);
        };
        /**
         * 添加滚动元素
         * @param item {any} 元素
         */
        p.putItem = function (item) {
            this.content.addChild(item);
        };
        p.clearItem = function () {
            this.content.removeChildren();
        };
        p.getScorllTop = function () {
            return this.scrollview.scrollTop;
        };
        p.setScorllTop = function (value) {
            this.scrollview.scrollTop = value;
        };
        p.getScorllView = function () {
            return this.scrollview;
        };
        return ScrollView;
    }(egret.DisplayObjectContainer));
    GameUtil.ScrollView = ScrollView;
    egret.registerClass(ScrollView,'GameUtil.ScrollView');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=ScrollView.js.map